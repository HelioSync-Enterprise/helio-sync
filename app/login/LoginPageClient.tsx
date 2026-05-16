'use client';

import { useMemo, useState } from 'react';
import { LoginCard } from './LoginCard';
import { LoginForm } from './LoginForm';
import { LoginHeroGlows } from './LoginHeroGlows';
import { LotusPanel } from './LotusPanel';

const MAX_PASSWORD_LENGTH = 12;

export default function LoginPageClient() {
	const [mode, setMode] = useState<'signin' | 'signup'>('signin');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

	const progress = useMemo(() => {
		return Math.min(password.length / MAX_PASSWORD_LENGTH, 1);
	}, [password.length]);

	const progressLabel = useMemo(() => {
		const percent = Math.round(progress * 100);
		return `${percent}% de crescimento`;
	}, [progress]);
	const isComplete = progress >= 1;

	const handleToggleMode = () => {
		setMode(current => (current === 'signin' ? 'signup' : 'signin'));
		setFeedback(null);
	};

	const handleSubmit = async () => {
		setFeedback(null);
		setIsSubmitting(true);

		try {
			const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';
			const payload = mode === 'signup' ? { name, email, password } : { email, password };

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			const data = (await response.json().catch(() => null)) as { message?: string } | null;
			if (!response.ok) {
				throw new Error(data?.message ?? 'Nao foi possivel concluir a solicitacao.');
			}

			setFeedback({
				type: 'success',
				message: mode === 'signup' ? 'Conta criada com sucesso.' : 'Login realizado.',
			});
			setPassword('');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Erro inesperado.';
			setFeedback({ type: 'error', message });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="relative flex items-center justify-center min-h-dvh overflow-hidden bg-helio-bg-primary">
			<LoginHeroGlows />
			<LoginCard>
				<LoginForm
					mode={mode}
					name={name}
					email={email}
					password={password}
					progress={progress}
					progressLabel={progressLabel}
					isSubmitting={isSubmitting}
					feedback={feedback}
					onNameChange={setName}
					onEmailChange={setEmail}
					onPasswordChange={setPassword}
					onToggleMode={handleToggleMode}
					onSubmit={handleSubmit}
				/>
				<LotusPanel passwordLength={password.length} isComplete={isComplete} />
			</LoginCard>
		</main>
	);
}
