import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAuthToken, JWT_COOKIE_NAME } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/lib/models/user';

const MIN_PASSWORD_LENGTH = 8;

function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type SignupBody = {
	name?: string;
	email?: string;
	password?: string;
};

export async function POST(request: Request) {
	await connectToDatabase();
	const body = (await request.json().catch(() => null)) as SignupBody | null;

	if (!body) {
		return NextResponse.json({ message: 'Payload invalido.' }, { status: 400 });
	}

	const name = body.name?.trim();
	const email = body.email?.trim().toLowerCase();
	const password = body.password;

	if (!name || !email || !password) {
		return NextResponse.json({ message: 'Nome, e-mail e senha sao obrigatorios.' }, { status: 400 });
	}

	if (!isValidEmail(email)) {
		return NextResponse.json({ message: 'E-mail invalido.' }, { status: 400 });
	}

	if (password.length < MIN_PASSWORD_LENGTH) {
		return NextResponse.json(
			{ message: `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.` },
			{ status: 400 },
		);
	}

	const existing = await UserModel.findOne({ email }).lean();
	if (existing) {
		return NextResponse.json({ message: 'E-mail ja cadastrado.' }, { status: 409 });
	}

	const passwordHash = await bcrypt.hash(password, 10);
	const user = await UserModel.create({ name, email, passwordHash, role: 'viewer' });

	const token = await createAuthToken({
		sub: user.id,
		email: user.email,
		role: user.role,
		name: user.name,
	});

	const response = NextResponse.json(
		{
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		},
		{ status: 201 },
	);

	response.cookies.set(JWT_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
		secure: process.env.NODE_ENV === 'production',
	});

	return response;
}
