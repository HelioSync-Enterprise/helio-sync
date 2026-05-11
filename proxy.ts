import { NextRequest, NextResponse } from 'next/server';
import { JWT_COOKIE_NAME, verifyAuthToken } from '@/lib/auth';

export async function proxy(req: NextRequest) {
	const token = req.cookies.get(JWT_COOKIE_NAME)?.value;
	if (!token) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	const payload = await verifyAuthToken(token);
	if (!payload) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
