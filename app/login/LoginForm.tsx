import type { ChangeEvent } from 'react';

import { Button } from '@/components/ui/Button';

type LoginFormProps = {
	email: string;
	password: string;
	progress: number;
	progressLabel: string;
	onEmailChange: (value: string) => void;
	onPasswordChange: (value: string) => void;
};

export function LoginForm({
	email,
	password,
	progress,
	progressLabel,
	onEmailChange,
	onPasswordChange,
}: LoginFormProps) {
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
			<p className="mt-2 max-w-xl text-lead text-muted sm:mt-4 hidden sm:inline-block	">
				Acompanhe sua energia solar em tempo real. Use seus dados para crescer com o sol.
			</p>

			<form className="flex flex-col gap-4 sm:mt-8 sm:gap-6 text-start ">
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

				<div className="flex gap-3 justify-between pr-4 sm:pr-0 sm:items-center sm:flex-row sm:justify-between">
					<Button variant="sendMessage" className="sm:w-auto max-w-1/2 sm:max-w-none h-10 sm:h-auto" type="submit">
						Entrar
					</Button>
					<button
						type="button"
						className="text-caption font-semibold text-helio-green-light cursor-pointer transition-colors hover:text-primary "
					>
						Esqueci minha senha
					</button>
				</div>
			</form>
		</section>
	);
}
