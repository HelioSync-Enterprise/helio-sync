'use client';

import { FaGlobeAmericas } from 'react-icons/fa';
import { GiFlatPlatform } from 'react-icons/gi';

type SimulatorModeSwitchProps = {
	mode: 'globe' | 'plane';
	onToggle: () => void;
};

export function SimulatorModeSwitch({ mode, onToggle }: SimulatorModeSwitchProps) {
	const isGlobe = mode === 'globe';
	const knobShift = isGlobe ? 'translate-x-0' : 'translate-x-10';
	const globeTone = isGlobe ? 'text-helio-bg-secondary' : 'text-secondary';
	const planeTone = isGlobe ? 'text-secondary' : 'text-helio-bg-secondary';
	const label = isGlobe ? 'Trocar para modo plano' : 'Trocar para modo globo';

	return (
		<button
			onClick={onToggle}
			className="relative flex items-center justify-between rounded-full border border-foreground/10 bg-white/5 gap-2"
			aria-pressed={isGlobe}
			aria-label={label}
			title={label}
		>
			<div
				className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-helio-gold transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${knobShift}`}
			/>
			<div className={`relative z-10 h-8 w-8 flex items-center justify-center ${globeTone}`}>
				<FaGlobeAmericas size={16} />
			</div>
			<div className={`relative z-10 h-8 w-8 flex items-center justify-center ${planeTone}`}>
				<GiFlatPlatform size={16} />
			</div>
		</button>
	);
}
