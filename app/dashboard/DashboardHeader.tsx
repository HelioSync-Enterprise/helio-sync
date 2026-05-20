import { useEffect, useState } from 'react';
import { FaRegBell } from 'react-icons/fa';

export type DashboardTab = 'overview' | 'fleet';

type DashboardHeaderProps = {
	activeTab: DashboardTab;
	onTabChange: (tab: DashboardTab) => void;
};

export function DashboardHeader({ activeTab, onTabChange }: DashboardHeaderProps) {
	const [isHd, setIsHd] = useState(false);

	useEffect(() => {
		const updateHd = () => setIsHd(window.innerHeight <= 800);
		updateHd();
		window.addEventListener('resize', updateHd);
		return () => window.removeEventListener('resize', updateHd);
	}, []);

	const getTabClass = (tab: DashboardTab) =>
		`relative pb-2 transition cursor-pointer ${
			tab === activeTab
				? 'text-primary'
				: 'text-secondary hover:text-helio-gold'
		}`;

	return (
		<header className="flex flex-col gap-4 rounded-2xl border border-foreground/5 bg-white/3 px-5 2xl:py-4 py-2 backdrop-blur-sm">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-col gap-1">
					<h1 className="text-xl font-semibold text-primary">Dashboard</h1>
				</div>
				{isHd && (
					<nav className="flex items-center gap-6 text-sm mr-auto ml-4">
						<button type="button" className={getTabClass('overview')} onClick={() => onTabChange('overview')}>
							Visão geral
							<span
								className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full ${
									activeTab === 'overview' ? 'bg-helio-gold' : 'bg-transparent'
								}`}
							/>
						</button>
						<button type="button" className={getTabClass('fleet')} onClick={() => onTabChange('fleet')}>
							Frota
							<span
								className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full ${
									activeTab === 'fleet' ? 'bg-helio-gold' : 'bg-transparent'
								}`}
							/>
						</button>
					</nav>
				)}
				<div className="flex items-center gap-3">
					<button
						type="button"
						className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-white/5 text-primary transition hover:text-helio-gold"
						aria-label="Notificações"
					>
						<FaRegBell size={16} />
						<span className="absolute right-1/5 top-1/5 h-2 w-2 rounded-full bg-helio-gold" />
					</button>
				</div>
			</div>

			{!isHd && (
				<nav className="flex items-center gap-6 text-sm">
					<button type="button" className={getTabClass('overview')} onClick={() => onTabChange('overview')}>
						Visão geral
						<span
							className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full ${
								activeTab === 'overview' ? 'bg-helio-gold' : 'bg-transparent'
							}`}
						/>
					</button>
					<button type="button" className={getTabClass('fleet')} onClick={() => onTabChange('fleet')}>
						Frota
						<span
							className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full ${
								activeTab === 'fleet' ? 'bg-helio-gold' : 'bg-transparent'
							}`}
						/>
					</button>
				</nav>
			)}
		</header>
	);
}
