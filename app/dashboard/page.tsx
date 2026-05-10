'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardGrid } from './DashboardGrid';

export default function DashboardPage() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 640);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	if (isMobile) {
		return (
			<div className="absolute flex h-full w-full items-center justify-center p-4 text-center">
				<p className="text-lg text-muted">
					Esta pagina nao esta disponivel em dispositivos moveis. Por favor, acesse a partir de um computador
					ou tablet para visualizar o dashboard.
				</p>
			</div>
		);
	}

	return (
		<main className="min-h-screen px-6 py-10">
			<div className="mx-auto flex w-full max-w-8/10 flex-col gap-6">
				<DashboardHeader />
				<DashboardGrid />
			</div>
		</main>
	);
}
