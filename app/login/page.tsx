import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { JWT_COOKIE_NAME, verifyAuthToken } from '@/lib/auth';
import LoginPageClient from './LoginPageClient';

export default async function LoginPage() {
	const cookieStore = await cookies();
	const authCookie = cookieStore.get(JWT_COOKIE_NAME)?.value;

	if (authCookie) {
		const payload = await verifyAuthToken(authCookie);
		if (payload) {
			redirect('/dashboard');
		}
	}

	return <LoginPageClient />;
}
