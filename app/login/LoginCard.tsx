import type { ReactNode } from 'react';

type LoginCardProps = {
	children: ReactNode;
};

export function LoginCard({ children }: LoginCardProps) {
	return (
		<div className="absolute grid h-full sm:h-auto rounded-0 w-full max-w-6xl gap-10 opacity-90 sm:rounded-[2.5rem] border border-foreground/10 bg-[linear-gradient(160deg,rgba(7,20,10,0.62),rgba(4,12,6,0.6))] p-6 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
			{children}
		</div>
	);
}
