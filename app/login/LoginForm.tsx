import type { ChangeEvent } from 'react';

import { Button } from '@/components/ui/Button';

type LoginFormProps = {
	mode: 'signin' | 'signup';
	name: string;
	email: string;
	password: string;
	progress: number;
	progressLabel: string;
	isSubmitting: boolean;
	feedback: { type: 'success' | 'error'; message: string } | null;
	onNameChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onPasswordChange: (value: string) => void;
	onToggleMode: () => void;
	onSubmit: () => void;
};

export function LoginForm({
	mode,
	name,
	email,
	password,
	progress,
	progressLabel,
	isSubmitting,
	feedback,
	onNameChange,
	onEmailChange,
	onPasswordChange,
	onToggleMode,
	onSubmit,
}: LoginFormProps) {
	const isSignUp = mode === 'signup';

	const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit();
	};

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		onNameChange(event.target.value);
	};
	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		onEmailChange(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		onPasswordChange(event.target.value);
	};

	return (
		<section className="flex flex-col text-center sm:text-start sm:justify-center mb-10 sm:mb-0 order-2 sm:order-1">
			<h1 className="mt-2 text-heading text-primary sm:mt-4 hidden sm:inline-block">
				Bem-vindo de volta ao <span className="text-gradient-green-light">HelioSync</span>
			</h1>
			<p className="mt-2 max-w-xl text-lead text-muted sm:mt-4 hidden sm:inline-block">
				Acompanhe sua energia solar em tempo real. Use seus dados para crescer com o sol.
			</p>

			<form className="flex flex-col gap-4 sm:mt-8 sm:gap-6 text-start" onSubmit={handleSubmit}>
				{isSignUp && (
					<div className="space-y-2">
						<label htmlFor="login-name" className="text-caption font-semibold text-secondary pl-10">
							Nome
						</label>
						<input
							id="login-name"
							type="text"
							placeholder="Seu nome"
							value={name}
							onChange={handleNameChange}
							className="h-12 w-full rounded-2xl border border-foreground/12 bg-white/3 px-4 text-body text-foreground placeholder:text-muted/90 transition-all duration-300 focus:border-helio-green-light/60 focus:outline-none focus:ring-2 focus:ring-helio-green-light/20 sm:h-13 sm:px-5"
							required
						/>
					</div>
				)}
				<div className="space-y-2">
					<label htmlFor="login-email" className="text-caption font-semibold text-secondary pl-10">
						Email
					</label>
					<input
						id="login-email"
						type="email"
						placeholder="você@heliosync.com"
						value={email}
						onChange={handleEmailChange}
						className="h-12 w-full rounded-2xl border border-foreground/12 bg-white/3 px-4 text-body text-foreground placeholder:text-muted/90 transition-all duration-300 focus:border-helio-green-light/60 focus:outline-none focus:ring-2 focus:ring-helio-green-light/20 sm:h-13 sm:px-5"
						required
					/>
				</div>

				<div className="space-y-3">
					<label htmlFor="login-password" className="text-caption font-semibold text-secondary pl-10">
						Senha
					</label>
					<input
						id="login-password"
						type="password"
						placeholder="Digite sua senha"
						value={password}
						onChange={handlePasswordChange}
						className="h-12 w-full rounded-2xl border border-foreground/12 bg-white/3 px-4 text-body text-foreground placeholder:text-muted/90 transition-all duration-300 focus:border-helio-gold/60 focus:outline-none focus:ring-2 focus:ring-helio-gold/20 sm:h-13 sm:px-5"
						required
					/>

					<div className="space-y-2 hidden sm:block">
						<div className="flex items-center justify-end text-caption text-muted">
							<span aria-live="polite">{progressLabel}</span>
						</div>
						<div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
							<div
								className="h-full rounded-full bg-linear-to-r from-helio-green to-helio-gold transition-[width] duration-300"
								style={{ width: `${progress * 100}%` }}
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex w-full gap-3 sm:w-auto">
						<Button
							variant="sendMessage"
							className="h-10 flex-1 sm:h-auto sm:flex-none"
							type="submit"
							disabled={isSubmitting}
						>
							{isSignUp ? 'Criar conta' : 'Entrar'}
						</Button>
						<Button
							variant="sendMessage"
							className="h-10 flex-1 sm:hidden"
							type="button"
							onClick={onToggleMode}
							disabled={isSubmitting}
						>
							{isSignUp ? 'Ja tenho conta' : 'Criar conta'}
						</Button>
					</div>
					<div className="flex items-center justify-between gap-4 text-caption">
						{!isSignUp && (
							<button
								type="button"
								className="font-semibold text-helio-green-light cursor-pointer transition-colors hover:text-primary"
							>
								Esqueci minha senha
							</button>
						)}
						<button
							type="button"
							className="hidden font-semibold text-secondary transition-colors hover:text-primary sm:inline-flex"
							onClick={onToggleMode}
							disabled={isSubmitting}
						>
							{isSignUp ? 'Ja tenho conta' : 'Criar conta'}
						</button>
					</div>
				</div>
				{feedback && (
					<p
						className={`text-caption ${
							feedback.type === 'success' ? 'text-helio-green-light' : 'text-helio-amber'
						}`}
					>
						{feedback.message}
					</p>
				)}
			</form>
		</section>
	);
}
