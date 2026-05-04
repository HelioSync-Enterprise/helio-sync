'use client';

import { FiPause, FiPlay } from 'react-icons/fi';
import { SimulatorModeSwitch } from './SimulatorModeSwitch';
import { SimulatorSpeedControls } from './SimulatorSpeedControls';

type SimulatorControlsProps = {
	isPlaying: boolean;
	onTogglePlay: () => void;
	mode: 'globe' | 'plane';
	onToggleMode: () => void;
	speed: number;
	onDecreaseSpeed: () => void;
	onIncreaseSpeed: () => void;
	latitude: number;
	onLatitudeChange: (value: number) => void;
	dayOfYear: number;
	onDayOfYearChange: (value: number) => void;
	hourAngle: number;
	onHourAngleChange: (value: number) => void;
};

export function SimulatorControls({
	isPlaying,
	onTogglePlay,
	mode,
	onToggleMode,
	speed,
	onDecreaseSpeed,
	onIncreaseSpeed,
	latitude,
	onLatitudeChange,
	dayOfYear,
	onDayOfYearChange,
	hourAngle,
	onHourAngleChange,
}: SimulatorControlsProps) {
	return (
		<div className="flex flex-col gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
			<div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-4">
				<div className="flex items-center gap-3">
					<button
						onClick={onTogglePlay}
						className="flex h-11 w-11 items-center justify-center rounded-full bg-helio-gold text-helio-bg-secondary transition-transform hover:scale-105 active:scale-95"
						aria-label={isPlaying ? 'Pausar simulação' : 'Iniciar simulação'}
					>
						{isPlaying ? <FiPause size={20} /> : <FiPlay size={20} className="ml-1" />}
					</button>
					<span className="text-body font-medium text-secondary">
						{isPlaying ? 'Simulando ao vivo' : 'Simulador Pausado'}
					</span>
				</div>

				<div className="flex items-center gap-3">
					<SimulatorModeSwitch mode={mode} onToggle={onToggleMode} />
					<SimulatorSpeedControls speed={speed} onDecrease={onDecreaseSpeed} onIncrease={onIncreaseSpeed} />
				</div>
			</div>

			<div className="flex flex-col gap-1 pt-2">
				<label className="text-sm text-secondary">Latitude: {latitude.toFixed(2)}°</label>
				<input
					type="range"
					min="-90"
					max="90"
					value={latitude}
					onChange={event => onLatitudeChange(parseFloat(event.target.value))}
					className="accent-helio-gold"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-sm text-secondary">Dia do Ano (1-365): {dayOfYear}</label>
				<input
					type="range"
					min="1"
					max="365"
					value={dayOfYear}
					onChange={event => onDayOfYearChange(parseInt(event.target.value))}
					className="accent-helio-gold"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-sm text-secondary">
					Ângulo Horário: {hourAngle.toFixed(2)}° ({Math.floor(hourAngle / 15) + 12}:
					{Math.abs(Math.floor((hourAngle % 15) * 4))
						.toString()
						.padStart(2, '0')}
					)
				</label>
				<input
					type="range"
					min="-180"
					max="180"
					value={hourAngle}
					onChange={event => onHourAngleChange(parseFloat(event.target.value))}
					className="accent-helio-gold"
				/>
			</div>
		</div>
	);
}
