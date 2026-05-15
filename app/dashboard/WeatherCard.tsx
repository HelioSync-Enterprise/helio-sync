'use client';
import { useState, useEffect } from 'react';

type ClimaType = {
	name: string;
	main: { temp: number; humidity: number };
	weather: { description: string }[];
	wind: { speed: number };
	clouds?: { all: number };
};

export function WeatherGridCard() {
	const [clima, setClima] = useState<ClimaType | null>(null);

	useEffect(() => {
		const carregarClima = async () => {
			try {
				const res = await fetch('/api/weather?city=Sorocaba');
				if (res.ok) {
					const data = await res.json();
					setClima(data);
				}
			} catch (error) {
				console.error('Erro na telemetria:', error);
			}
		};
		carregarClima();
	}, []);

	if (!clima) {
		return (
			<div className="col-span-2 row-span-2 flex h-full items-center justify-center rounded-xl border border-white/5 bg-black/20">
				<span className="text-[10px] uppercase tracking-[0.3em] text-white/20 animate-pulse">
					Sincronizando
				</span>
			</div>
		);
	}

	return (
		<div className="col-span-2 row-span-2 flex h-full flex-col justify-between rounded-xl border border-white/10 bg-black/40 p-6 shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Status Ambiental</span>
					<h2 className="text-sm font-medium text-white/90 uppercase tracking-tight">{clima.name}</h2>
				</div>
				<div className="h-1.5 w-1.5 rounded-full bg-helio-green-light shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
			</div>

			<div className="flex flex-col items-center py-2">
				<div className="flex items-start">
					<span
						suppressHydrationWarning
						className="text-7xl font-light tracking-tighter text-white leading-none"
					>
						{Math.round(clima.main.temp)}
					</span>
					<span className="text-2xl font-light text-white/30 leading-none mt-1">°</span>
				</div>
				<span suppressHydrationWarning className="text-[9px] uppercase tracking-[0.2em] text-white/30 mt-2">
					{clima.weather[0]?.description}
				</span>
			</div>

			<div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-5">
				<div className="flex flex-col gap-1">
					<span className="text-[8px] uppercase tracking-wider text-white/20">Nuvens</span>
					<span suppressHydrationWarning className="text-xs font-medium text-white/80">
						{clima.clouds?.all ?? '--'}%
					</span>
				</div>
				<div className="flex flex-col gap-1 border-x border-white/5 px-2 text-center">
					<span className="text-[8px] uppercase tracking-wider text-white/20">Vento</span>
					<span suppressHydrationWarning className="text-xs font-medium text-white/80">
						{Math.round(clima.wind.speed)} <small className="text-[8px] opacity-40">km/h</small>
					</span>
				</div>
				<div className="flex flex-col gap-1 text-right">
					<span className="text-[8px] uppercase tracking-wider text-white/20">Irrad.</span>
					<span suppressHydrationWarning className="text-xs font-medium text-helio-green-light">
						{100 - (clima.clouds?.all ?? 0)}%
					</span>
				</div>
			</div>
		</div>
	);
}
