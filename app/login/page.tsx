'use client';

import { useMemo, useState } from 'react';

import { LoginCard } from './LoginCard';
import { LoginForm } from './LoginForm';
import { LoginHeroGlows } from './LoginHeroGlows';
import { LotusPanel } from './LotusPanel';

const MAX_PASSWORD_LENGTH = 12;

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const progress = useMemo(() => {
		return Math.min(password.length / MAX_PASSWORD_LENGTH, 1);
	}, [password.length]);

	const progressLabel = useMemo(() => {
		const percent = Math.round(progress * 100);
		return `${percent}% de crescimento`;
	}, [progress]);
	const isComplete = progress >= 1;

	return (
		<main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-helio-bg-primary">
			<LoginHeroGlows />
			<LoginCard>
				<LoginForm
					email={email}
					password={password}
					progress={progress}
					progressLabel={progressLabel}
					onEmailChange={setEmail}
					onPasswordChange={setPassword}
				/>
				<LotusPanel passwordLength={password.length} isComplete={isComplete} />
			</LoginCard>
		</main>
	);
}
