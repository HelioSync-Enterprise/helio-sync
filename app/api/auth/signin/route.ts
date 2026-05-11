import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAuthToken, JWT_COOKIE_NAME } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/lib/models/user';

type SigninBody = {
	email?: string;
	password?: string;
};

export async function POST(request: Request) {
	await connectToDatabase();
	const body = (await request.json().catch(() => null)) as SigninBody | null;

	if (!body) {
		return NextResponse.json({ message: 'Payload invalido.' }, { status: 400 });
	}

	const email = body.email?.trim().toLowerCase();
	const password = body.password;

	if (!email || !password) {
		return NextResponse.json({ message: 'E-mail e senha sao obrigatorios.' }, { status: 400 });
	}

	const user = await UserModel.findOne({ email });
	if (!user) {
		return NextResponse.json({ message: 'Credenciais invalidas.' }, { status: 401 });
	}

	const isValid = await bcrypt.compare(password, user.passwordHash);
	if (!isValid) {
		return NextResponse.json({ message: 'Credenciais invalidas.' }, { status: 401 });
	}

	const token = await createAuthToken({
		sub: user.id,
		email: user.email,
		role: user.role,
		name: user.name,
	});

	const response = NextResponse.json({
		data: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		},
	});

	response.cookies.set(JWT_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
		secure: process.env.NODE_ENV === 'production',
	});

	return response;
}
