import { mockPanels } from '@/lib/mockData';

function countByStatus(status: (typeof mockPanels)[number]['status']) {
	return mockPanels.filter(panel => panel.status === status).length;
}

export function PanelStatusCard() {
	const total = mockPanels.length || 1;
	const online = countByStatus('online');
	const maintenance = countByStatus('maintenance');
	const offline = countByStatus('offline');
	const onlineRate = (online / total) * 100;
	const maintenanceRate = (maintenance / total) * 100;
	const offlineRate = (offline / total) * 100;

	return (
		<div className="flex h-full flex-col justify-between rounded-2xl border border-foreground/10 bg-[linear-gradient(180deg,rgba(6,14,6,0.92),rgba(6,14,6,0.6))] lg:col-span-1 lg:row-span-1">
			<div className="flex items-start justify-between">
				<div className="flex flex-col w-full gap-2 p-4 pb-0">
					<div className="flex justify-between items-center">
						<span className="text-[10px] uppercase tracking-[0.28em] text-muted">Status das placas</span>
						<span className="text-sm font-semibold text-primary">{onlineRate.toFixed(0)}%</span>
					</div>
					<div className="flex gap-1 w-full items-center">
						<div className="relative flex h-3 flex-1 overflow-hidden rounded-full border border-foreground/10 bg-white/5">
							<div
								className="h-full bg-helio-green-light/80"
								style={{ width: `${onlineRate}%` }}
							/>
							<div
								className="h-full bg-helio-gold/20"
								style={{ width: `${maintenanceRate}%` }}
							/>
							<div
								className="h-full bg-helio-rose/20"
								style={{ width: `${offlineRate}%` }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex text-xs text-muted 2xl:p-4 p-2 pt-0 gap-2">
				<div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-helio-green/30 bg-white/4 px-2 py-1">
					<span className="text-[10px] uppercase tracking-[0.22em] text-helio-green-light">Online</span>
					<span className="text-base font-semibold text-helio-green-light">{online}</span>
				</div>
				<div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-helio-gold/30 bg-white/4 px-2 py-1">
					<span className="text-[10px] uppercase tracking-[0.22em] text-helio-gold">Manut.</span>
					<span className="text-base font-semibold text-helio-gold">{maintenance}</span>
				</div>
				<div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-helio-rose/30 bg-white/4 px-2 py-1">
					<span className="text-[10px] uppercase tracking-[0.22em] text-helio-rose">Offline</span>
					<span className="text-base font-semibold text-helio-rose">{offline}</span>
				</div>
			</div>
		</div>
	);
}
