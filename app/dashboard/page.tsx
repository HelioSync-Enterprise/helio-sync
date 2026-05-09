import { FaRegBell } from 'react-icons/fa';
import { mockTelemetry } from '@/lib/mockData';

const chartWidth = 640;
const chartHeight = 260;
const chartPaddingX = 52;
const chartPaddingY = 28;
const chartGridLines = 4;

type TelemetryPoint = {
	timestamp: number;
	voltageV: number;
};

function buildTelemetrySeries(): TelemetryPoint[] {
	const grouped = new Map<number, { sum: number; count: number }>();

	for (const entry of mockTelemetry) {
		const timestamp = Date.parse(entry.timestamp);
		const current = grouped.get(timestamp) ?? { sum: 0, count: 0 };
		current.sum += entry.voltageV;
		current.count += 1;
		grouped.set(timestamp, current);
	}

	return Array.from(grouped.entries())
		.sort((a, b) => a[0] - b[0])
		.map(([timestamp, value]) => ({
			timestamp,
			voltageV: value.sum / value.count,
		}));
}

function formatHourLabel(timestamp: number) {
	return new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function buildChartPaths(series: TelemetryPoint[]) {
	if (series.length === 0) {
		return { linePath: '', areaPath: '', minValue: 0, maxValue: 0 };
	}

	const values = series.map(point => point.voltageV);
	const minValue = Math.min(...values);
	const maxValue = Math.max(...values);
	const range = Math.max(maxValue - minValue, 1);

	const points = series.map((point, index) => {
		const ratio = series.length === 1 ? 0 : index / (series.length - 1);
		const x = chartPaddingX + ratio * (chartWidth - chartPaddingX * 2);
		const y =
			chartPaddingY +
			(1 - (point.voltageV - minValue) / range) * (chartHeight - chartPaddingY * 2);
		return { x, y };
	});

	const linePath = points
		.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
		.join(' ');

	const lastPoint = points[points.length - 1];
	const firstPoint = points[0];
	const areaPath = `${linePath} L ${lastPoint.x.toFixed(2)} ${(chartHeight - chartPaddingY).toFixed(2)} L ${firstPoint.x.toFixed(2)} ${(chartHeight - chartPaddingY).toFixed(2)} Z`;

	return { linePath, areaPath, minValue, maxValue };
}

export default function DashboardPage() {
	const series = buildTelemetrySeries();
	const { linePath, areaPath, minValue, maxValue } = buildChartPaths(series);
	const latestVoltage = series.at(-1)?.voltageV ?? 0;
	const peakVoltage = maxValue;
	const averageVoltage = series.length
		? series.reduce((acc, point) => acc + point.voltageV, 0) / series.length
		: 0;
	const chartRange = Math.max(maxValue - minValue, 1);
	const startLabel = series.length ? formatHourLabel(series[0].timestamp) : '--:--';
	const endLabel = series.length ? formatHourLabel(series[series.length - 1].timestamp) : '--:--';
	const midLabel = series.length ? formatHourLabel(series[Math.floor(series.length / 2)].timestamp) : '--:--';
	return (
		<main className="min-h-screen px-6 py-10">
			<div className="mx-auto flex w-full max-w-8/10 flex-col gap-6">
				<header className="flex flex-col gap-4 rounded-2xl border border-foreground/5 bg-white/3 px-5 py-4 backdrop-blur-sm">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-col gap-1">
							<h1 className="text-xl font-semibold text-primary">Dashboard</h1>
						</div>
						<div className="flex items-center gap-3">
							<button
								type="button"
								className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-white/5 text-primary transition hover:text-helio-gold"
								aria-label="Notificacoes"
							>
								<FaRegBell size={16} />
								<span className="absolute right-1/5 top-1/5 h-2 w-2 rounded-full bg-helio-gold" />
							</button>
						</div>
					</div>

					<nav className="flex items-center gap-6 text-sm">
						<a href="#" className="relative pb-2 text-primary transition hover:text-helio-gold">
							Visao geral
							<span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-helio-gold" />
						</a>
						<a href="#" className="relative pb-2 text-secondary transition hover:text-helio-gold">
							Frota
							<span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-transparent transition group-hover:bg-helio-gold" />
						</a>
					</nav>
				</header>

				<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:auto-rows-[140px]">
					<div className="flex h-full flex-col gap-6 rounded-2xl border border-foreground/10 bg-[linear-gradient(180deg,rgba(6,14,6,0.9),rgba(6,14,6,0.6))] p-5 lg:col-span-3 lg:row-span-4">
						<div className="flex flex-wrap items-start justify-between gap-4">
							<div className="flex flex-col gap-2">
								<span className="text-xs uppercase tracking-[0.24em] text-secondary">Analytics de geracao</span>
								<h2 className="text-lg font-semibold text-primary">Frota completa - volts gerados hoje</h2>
								<span className="text-sm text-secondary">Atual: {latestVoltage.toFixed(1)} V</span>
							</div>
							<div className="flex items-center gap-3 text-xs text-secondary">
								<span className="rounded-full border border-foreground/10 bg-white/5 px-3 py-1 text-primary">Hoje</span>
								<span>Semana</span>
								<span className="rounded-full border border-helio-green/40 bg-helio-green/10 px-3 py-1 text-helio-green-light">
									+12.5%
								</span>
							</div>
						</div>

						<div className="relative flex-1 rounded-2xl border border-foreground/5 bg-white/2 p-4">
							{series.length === 0 ? (
								<div className="flex h-full min-h-[220px] items-center justify-center text-sm text-muted">
									Sem dados de telemetria.
								</div>
							) : (
								<svg
									viewBox={`0 0 ${chartWidth} ${chartHeight}`}
									className="h-full min-h-[220px] w-full"
									preserveAspectRatio="none"
									role="img"
									aria-label="Grafico de volts gerados por tempo"
								>
									<defs>
										<linearGradient id="telemetry-area" x1="0" x2="0" y1="0" y2="1">
											<stop offset="0%" stopColor="#90EE90" stopOpacity="0.35" />
											<stop offset="100%" stopColor="#90EE90" stopOpacity="0" />
										</linearGradient>
									</defs>
									{Array.from({ length: chartGridLines + 1 }, (_, index) => {
										const y =
											chartPaddingY +
											(index / chartGridLines) * (chartHeight - chartPaddingY * 2);
										const value = maxValue - (index / chartGridLines) * chartRange;
										return (
											<g key={`grid-${index}`}>
												<line
													x1={chartPaddingX}
													y1={y}
													x2={chartWidth - chartPaddingX}
													y2={y}
												stroke="rgba(243,255,233,0.08)"
												strokeDasharray="4 6"
											/>
												<text
													x={chartPaddingX - 14}
													y={y + 4}
													fill="rgba(243,255,233,0.55)"
													fontSize="10"
													textAnchor="end"
												>
													{value.toFixed(1)} V
												</text>
											</g>
										);
									})}
											<text
												x={chartPaddingX}
												y={chartHeight - chartPaddingY + 18}
												fill="rgba(243,255,233,0.45)"
												fontSize="10"
												textAnchor="start"
											>
												{startLabel}
											</text>
											<text
												x={chartWidth / 2}
												y={chartHeight - chartPaddingY + 18}
												fill="rgba(243,255,233,0.45)"
												fontSize="10"
												textAnchor="middle"
											>
												{midLabel}
											</text>
											<text
												x={chartWidth - chartPaddingX}
												y={chartHeight - chartPaddingY + 18}
												fill="rgba(243,255,233,0.45)"
												fontSize="10"
												textAnchor="end"
											>
												{endLabel}
											</text>
									<path d={areaPath} fill="url(#telemetry-area)" />
									<path d={linePath} fill="none" stroke="#90EE90" strokeWidth="2" />
								</svg>
							)}
						</div>

						<div className="grid gap-4 text-sm text-secondary sm:grid-cols-3">
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.22em] text-muted">Pico</span>
								<span className="text-lg font-semibold text-primary">{peakVoltage.toFixed(1)} V</span>
								<span className="text-xs">as {endLabel}</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.22em] text-muted">Media</span>
								<span className="text-lg font-semibold text-primary">{averageVoltage.toFixed(1)} V</span>
								<span className="text-xs">dia inteiro</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-xs uppercase tracking-[0.22em] text-muted">Geracao</span>
								<span className="text-lg font-semibold text-helio-green-light">8.4 kWh</span>
								<span className="text-xs">estimado</span>
							</div>
						</div>
					</div>
					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-2 lg:row-span-2" />
					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-2 lg:row-span-2" />

					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-1 lg:row-span-1" />
					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-1 lg:row-span-1" />
					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-1 lg:row-span-1" />
					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-1 lg:row-span-1" />
					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-1 lg:row-span-1" />
				</section>
			</div>
		</main>
	);
}
