'use client';

import { FiFastForward, FiRewind } from 'react-icons/fi';

type SimulatorSpeedControlsProps = {
	speed: number;
	onDecrease: () => void;
	onIncrease: () => void;
};

export function SimulatorSpeedControls({ speed, onDecrease, onIncrease }: SimulatorSpeedControlsProps) {
	return (
		<div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-white/5 p-1">
			<button
				onClick={onDecrease}
				className="flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white/10 hover:text-primary"
				title="Desacelerar"
			>
				<FiRewind size={16} />
			</button>
			<span className="w-10 text-center font-mono text-sm text-secondary">{speed.toFixed(1)}x</span>
			<button
				onClick={onIncrease}
				className="flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white/10 hover:text-primary"
				title="Acelerar"
			>
				<FiFastForward size={16} />
			</button>
		</div>
	);
}
