'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { HeroGlow } from '@/components/ui/HeroGlow';

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

	const petals = useMemo(() => Array.from({ length: 12 }, (_, index) => index), []);
	const visiblePetals = Math.min(password.length, petals.length);
	const outerAngles = useMemo(() => petals.map(index => index * 30), [petals]);
	const innerAngles = useMemo(() => petals.map(index => index * 30 + 15), [petals]);

	return (
		<main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-helio-bg-primary">
			<div className="hero-glow-enter">
				<HeroGlow
					className="-top-20 -left-16 h-56 w-56 md:-top-24 md:-left-20 md:h-80 md:w-80"
					color="#32CD32"
					opacityClass="opacity-20"
				/>
				<HeroGlow
					className="top-12 right-[10%] h-48 w-48 md:top-16 md:right-[12%] md:h-72 md:w-72"
					color="#90EE90"
					opacityClass="opacity-[0.12]"
				/>
				<HeroGlow
					className="bottom-12 left-[8%] h-64 w-64 md:bottom-16 md:left-[12%] md:h-96 md:w-96"
					color="#FFD700"
					opacityClass="opacity-15"
				/>
				<HeroGlow
					className="-bottom-8 right-[4%] h-56 w-56 md:-bottom-10 md:right-[6%] md:h-80 md:w-80"
					color="#F4A460"
					opacityClass="opacity-[0.1]"
				/>
				<HeroGlow
					className="top-2/3 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 md:h-96 md:w-96"
					color="#32CD32"
					opacityClass="opacity-20"
				/>
			</div>

			<div className="absolute grid h-full sm:h-auto rounded-0 w-full max-w-6xl gap-10 opacity-90 sm:rounded-[2.5rem] border border-foreground/10 bg-[linear-gradient(160deg,rgba(7,20,10,0.62),rgba(4,12,6,0.6))] p-6 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
				<section className="flex flex-col justify-center">
					<h1 className="mt-4 text-heading text-primary">
						Bem-vindo de volta ao <span className="text-gradient-green-light">HelioSync</span>
					</h1>
					<p className="mt-4 max-w-xl text-lead text-muted">
						Acompanhe sua energia solar em tempo real. Use seus dados para crescer com o sol.
					</p>

					<form className="mt-8 flex flex-col gap-6">
						<div className="space-y-2">
							<label htmlFor="login-email" className="text-caption font-semibold text-secondary">
								Email
							</label>
							<input
								id="login-email"
								type="email"
								placeholder="você@heliosync.com"
								value={email}
								onChange={event => setEmail(event.target.value)}
								className="h-13 w-full rounded-2xl border border-foreground/12 bg-white/3 px-5 text-body text-foreground placeholder:text-muted/90 transition-all duration-300 focus:border-helio-green-light/60 focus:outline-none focus:ring-2 focus:ring-helio-green-light/20"
								required
							/>
						</div>

						<div className="space-y-3">
							<label htmlFor="login-password" className="text-caption font-semibold text-secondary">
								Senha
							</label>
							<input
								id="login-password"
								type="password"
								placeholder="Digite sua senha"
								value={password}
								onChange={event => setPassword(event.target.value)}
								className="h-13 w-full rounded-2xl border border-foreground/12 bg-white/3 px-5 text-body text-foreground placeholder:text-muted/90 transition-all duration-300 focus:border-helio-gold/60 focus:outline-none focus:ring-2 focus:ring-helio-gold/20"
								required
							/>

							<div className="space-y-2">
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
							<Button variant="sendMessage" className="sm:w-auto" type="submit">
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

				<section className="relative flex items-center justify-center">
					<div
						className="absolute inset-0 rounded-4xl border border-foreground/10 bg-[linear-gradient(135deg,rgba(12,32,18,0.65),rgba(9,14,10,0.6))]"
						style={{ boxShadow: 'inset 0 0 80px rgba(50, 205, 50, 0.08)' }}
					/>
					<div className="relative z-10 flex flex-col items-center gap-4 text-center">
						<svg aria-hidden="true" viewBox="0 0 512 512" className="h-56 w-56">
							<style>{`
								.lotus-petal {
									transition: opacity 180ms ease-out;
								}
							`}</style>
							<defs>
								<path id="petal" d="M0,-180 C40,-140 40,-60 0,-20 C-40,-60 -40,-140 0,-180 Z" />
								<path id="vein" d="M0,-100 Q3,-90 2,-60 Q1,-35 0,-22 Q-1,-35 -2,-60 Q-3,-90 0,-100 Z" />
								<radialGradient id="center-grad" cx="35%" cy="35%" r="65%">
									<stop offset="0%" stopColor="#fff3a0" />
									<stop offset="55%" stopColor="#f4d03f" />
									<stop offset="100%" stopColor="#e4b92d" />
								</radialGradient>
							</defs>
							<g transform="translate(256 256)">
								<g>
									{outerAngles.map((angle, index) => (
										<use
											key={`outer-${index}`}
											href="#petal"
											transform={`rotate(${angle})`}
											fill="#8e44ad"
											className="lotus-petal"
											style={{ opacity: index < visiblePetals ? 1 : 0 }}
										/>
									))}
								</g>
								<g>
									{innerAngles.map((angle, index) => (
										<use
											key={`inner-${index}`}
											href="#petal"
											transform={`rotate(${angle})`}
											fill="#a569bd"
											className="lotus-petal"
											style={{ opacity: index < visiblePetals ? 1 : 0 }}
										/>
									))}
								</g>
								<g>
									{innerAngles.map((angle, index) => (
										<use
											key={`small-${index}`}
											href="#petal"
											transform={`rotate(${angle}) scale(0.7)`}
											fill="#d2b4de"
											className="lotus-petal"
											style={{ opacity: index < visiblePetals ? 1 : 0 }}
										/>
									))}
								</g>
								<g>
									{innerAngles.map((angle, index) => (
										<use
											key={`vein-${index}`}
											href="#vein"
											transform={`rotate(${angle})`}
											fill="#7d3c98"
											opacity={index < visiblePetals ? 0.55 : 0}
											className="lotus-petal"
										/>
									))}
								</g>
								<circle cx="0" cy="0" r="60" fill="url(#center-grad)" />
								<circle cx="-12" cy="-16" r="14" fill="#fff7b3" opacity="0.7" />
							</g>
						</svg>
					</div>
				</section>
			</div>
		</main>
	);
}
