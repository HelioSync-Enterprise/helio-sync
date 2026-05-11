import { SignJWT, jwtVerify } from 'jose';

export const JWT_COOKIE_NAME = 'auth';

const JWT_ALG = 'HS256';
const JWT_EXPIRES_IN = '7d';

type AuthTokenPayload = {
	sub: string;
	email: string;
	role: string;
	name?: string;
};

function getJwtSecret() {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET nao definido.');
	}

	return new TextEncoder().encode(secret);
}

export async function createAuthToken(payload: AuthTokenPayload) {
	const secret = getJwtSecret();
	return new SignJWT(payload)
		.setProtectedHeader({ alg: JWT_ALG })
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRES_IN)
		.sign(secret);
}

export async function verifyAuthToken(token: string) {
	try {
		const secret = getJwtSecret();
		const { payload } = await jwtVerify<AuthTokenPayload>(token, secret);
		return payload;
	} catch {
		return null;
	}
}
