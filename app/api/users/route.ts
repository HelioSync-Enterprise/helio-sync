import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/lib/models/user';

export async function GET() {
	await connectToDatabase();
	const users = await UserModel.find().lean();
	return NextResponse.json({ data: users });
}

type CreateUserBody = {
	name?: string;
	email?: string;
	role?: 'admin' | 'user';
};

export async function POST(request: Request) {
	await connectToDatabase();
	const body = (await request.json().catch(() => null)) as CreateUserBody | null;

	if (!body) {
		return NextResponse.json({ message: 'Payload invalido.' }, { status: 400 });
	}

	const name = body.name?.trim();
	const email = body.email?.trim();
	const role = body.role;

	if (!name || !email) {
		return NextResponse.json({ message: 'Nome e e-mail sao obrigatorios.' }, { status: 400 });
	}

	const user = await UserModel.create({ name, email, role });
	return NextResponse.json({ data: user }, { status: 201 });
}
