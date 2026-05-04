'use client';

import { useEffect, useState } from 'react';
import { SimulatorControls } from './SimulatorControls';
import { SimulatorScene } from './SimulatorScene';

export default function SimulatorContainer() {
	const [latitude, setLatitude] = useState(-23.55); // Aproximadamente a Latitude de São Paulo
	const [dayOfYear, setDayOfYear] = useState(172); // Ao redor do dia 21 de Junho
	const [hourAngle, setHourAngle] = useState(0); // 0 ângulo horário, ou seja, exatos "Meio Dia"

	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [mode, setMode] = useState<'globe' | 'plane'>('globe');
	useEffect(() => {
		let animationFrameId: number;
		let lastTime = performance.now();

		const loop = (time: number) => {
			const deltaMs = time - lastTime;
			lastTime = time;

			if (isPlaying) {
				// Avança 15 graus (1 hora real) a cada segundo quando a simulação está na velocidade 1x
				const degreesPerMs = 15 / 1000;
				const deltaAng = degreesPerMs * speed * deltaMs;

				setHourAngle(prev => {
					let next = prev + deltaAng;
					// Se virou o dia, ajusta o ângulo e passa pro próximo dia no ano
					if (next > 180) {
						next -= 360;
						setDayOfYear(prevDay => (prevDay >= 365 ? 1 : prevDay + 1));
					} else if (next < -180) {
						next += 360;
						setDayOfYear(prevDay => (prevDay <= 1 ? 365 : prevDay - 1));
					}
					return next;
				});
			}
			animationFrameId = requestAnimationFrame(loop);
		};

		animationFrameId = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(animationFrameId);
	}, [isPlaying, speed]);

	return (
		<div className="flex h-full w-full flex-col gap-4">
			<SimulatorScene mode={mode} latitude={latitude} dayOfYear={dayOfYear} hourAngle={hourAngle} />
			<SimulatorControls
				isPlaying={isPlaying}
				onTogglePlay={() => setIsPlaying(prev => !prev)}
				mode={mode}
				onToggleMode={() => setMode(prev => (prev === 'globe' ? 'plane' : 'globe'))}
				speed={speed}
				onDecreaseSpeed={() => setSpeed(current => Math.max(0.5, current - 0.5))}
				onIncreaseSpeed={() => setSpeed(current => Math.min(24, current + 0.5))}
				latitude={latitude}
				onLatitudeChange={value => setLatitude(value)}
				dayOfYear={dayOfYear}
				onDayOfYearChange={value => setDayOfYear(value)}
				hourAngle={hourAngle}
				onHourAngleChange={value => setHourAngle(value)}
			/>
		</div>
	);
}
