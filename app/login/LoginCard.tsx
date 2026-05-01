import type { ReactNode } from 'react';

type LoginCardProps = {
	children: ReactNode;
};

export function LoginCard({ children }: LoginCardProps) {
	return (
		<div className="absolute grid self-start place-self-start border-none sm:place-self-auto sm:self-auto min-h-dvh w-full max-w-6xl gap-6 rounded-none sm:border sm:border-foreground/10 bg-[linear-gradient(160deg,rgba(7,20,10,0.62),rgba(4,12,6,0.6))] p-4 opacity-90 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)] backdrop-blur-md sm:min-h-0 sm:gap-10 sm:rounded-[2.5rem] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:flex-row lg:flex-nowrap">
			{children}
		
		</div>
	);
}
