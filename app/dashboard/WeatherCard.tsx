'use client';
import { useState, useEffect } from 'react';

type ClimaType = {
	name: string;
	main: { temp: number; humidity: number };
	weather: { description: string }[];
	wind: { speed: number };
	clouds?: { all: number };
};

type WeatherIconKind = 'rain' | 'cloud' | 'sun' | 'partly';

function getWeatherKind(description: string) {
	const normalized = description.toLowerCase();
	if (normalized.includes('chuva') || normalized.includes('rain')) {
		return 'rain';
	}
	if (normalized.includes('parcial') || normalized.includes('partly')) {
		return 'partly';
	}
	if (normalized.includes('sol') || normalized.includes('sun') || normalized.includes('clear')) {
		return 'sun';
	}
	if (normalized.includes('nublado') || normalized.includes('cloud')) {
		return 'cloud';
	}
	return 'cloud';
}

const WEATHER_ICON_MAP: Record<WeatherIconKind, string> = {
	rain: '/images/amcharts_weather_icons_1.0.0/animated/rainy-2.svg',
	cloud: '/images/amcharts_weather_icons_1.0.0/animated/cloudy.svg',
	sun: '/images/amcharts_weather_icons_1.0.0/animated/day.svg',
	partly: '/images/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg',
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
			<div className="col-span-2 row-span-2 flex h-full items-center justify-center rounded-3xl border border-white/5 bg-black/20">
				<span className="text-[10px] uppercase tracking-[0.3em] text-white/20 animate-pulse">
					Sincronizando
				</span>
			</div>
		);
	}

	const weatherDescription = clima.weather[0]?.description ?? '---';
	const iconKind = getWeatherKind(weatherDescription);
	const iconSrc = WEATHER_ICON_MAP[iconKind];
	const dayLabel = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date());

	return (
		<div className="relative col-span-2 row-span-2 flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-[radial-gradient(circle_at_top_left,rgba(50,205,50,0.14),transparent_55%),linear-gradient(180deg,rgba(6,14,6,0.96),rgba(6,14,6,0.78))] p-6 shadow-[0_30px_50px_-40px_rgba(6,14,6,0.9)]">
			<div className="pointer-events-none absolute -left-28 -top-24 h-64 w-64 rounded-full bg-helio-green/12 blur-3xl" />
			<div className="pointer-events-none absolute -right-20 top-6 h-44 w-44 rounded-full bg-helio-gold/6 blur-3xl" />
			<div className="relative grid grid-cols-[minmax(0,1fr)_120px] items-start gap-6">
				<div className="flex flex-col gap-5">
					<div className="flex items-end gap-2">
						<span
							suppressHydrationWarning
							className="text-6xl font-light leading-none tracking-tight text-white"
						>
							{Math.round(clima.main.temp)}
						</span>
						<span className="pb-1 text-xl font-light text-white/40">°C</span>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Status Ambiental</span>
						<h2 className="text-lg font-semibold text-white/90 uppercase tracking-tight">{clima.name}</h2>
						<div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/30">
							<span suppressHydrationWarning>{dayLabel}</span>
							<span className="h-1 w-1 rounded-full bg-helio-green-light/60" aria-hidden="true" />
							<span suppressHydrationWarning>{weatherDescription}</span>
						</div>
					</div>
				</div>
				<div className="flex h-full flex-col items-end justify-between">
					<span className="text-[10px] uppercase tracking-[0.4em] text-helio-green-light/70">Agora</span>
					<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-black/45 ring-1 ring-white/10">
						<img src={iconSrc} alt={weatherDescription} className="h-14 w-14" loading="lazy" />
					</div>
				</div>
			</div>
			<div className="relative grid grid-cols-4 gap-3 rounded-2xl border border-foreground/10 bg-white/4 px-4 py-3">
				<div className="flex flex-col gap-1">
					<span className="text-[8px] uppercase tracking-widest text-white/30">Nuvens</span>
					<span suppressHydrationWarning className="text-xs font-semibold text-white/80">
						{clima.clouds?.all ?? '--'}%
					</span>
				</div>
				<div className="flex flex-col gap-1 text-center">
					<span className="text-[8px] uppercase tracking-widest text-white/30">Umidade</span>
					<span suppressHydrationWarning className="text-xs font-semibold text-white/80">
						{clima.main.humidity}%
					</span>
				</div>
				<div className="flex flex-col gap-1 text-center">
					<span className="text-[8px] uppercase tracking-widest text-white/30">Vento</span>
					<span suppressHydrationWarning className="text-xs font-semibold text-white/80">
						{Math.round(clima.wind.speed)} <small className="text-[8px] opacity-40">km/h</small>
					</span>
				</div>
				<div className="flex flex-col gap-1 text-right">
					<span className="text-[8px] uppercase tracking-widest text-white/30">Irrad.</span>
					<span suppressHydrationWarning className="text-xs font-semibold text-helio-green-light">
						{100 - (clima.clouds?.all ?? 0)}%
					</span>
				</div>
			</div>
		</div>
	);
}
