import type { ReactNode } from 'react';

type LoginCardProps = {
	children: ReactNode;
};

export function LoginCard({ children }: LoginCardProps) {
	return (
		<div className="absolute flex flex-col items-stretch justify-center self-start place-self-start border-none min-h-dvh w-full max-w-6xl rounded-none bg-[linear-gradient(160deg,rgba(7,20,10,0.62),rgba(4,12,6,0.6))] p-2 opacity-90 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.9)] backdrop-blur-md sm:grid sm:flex-none sm:gap-10 sm:place-self-auto sm:self-auto sm:border sm:border-foreground/10 sm:min-h-0 sm:rounded-[2.5rem] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:flex-row lg:flex-nowrap">
			{children}
		</div>
	);
}
