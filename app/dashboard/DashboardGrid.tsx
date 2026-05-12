import type { ReactNode } from 'react';

import { TelemetryChartCard } from './TelemetryChartCard';

export function DashboardGrid() {
	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:auto-rows-[140px]">
			<TelemetryChartCard />
			<Card xSize={2} ySize={2} />
			<Card xSize={2} ySize={2} />
			<Card xSize={1} ySize={1} />
			<Card xSize={1} ySize={1} />
			<Card xSize={1} ySize={1} />
			<Card xSize={1} ySize={1} />
			<Card xSize={1} ySize={1} />
		</section>
	);
}
export type CardProps = {
	children?: ReactNode;
	xSize: 1 | 2 | 3 | 4 | 5;
	ySize: 1 | 2 | 3 | 4;
};

const colSpanClasses: Record<CardProps['xSize'], string> = {
	1: 'lg:col-span-1',
	2: 'lg:col-span-2',
	3: 'lg:col-span-3',
	4: 'lg:col-span-4',
	5: 'lg:col-span-5',
};

const rowSpanClasses: Record<CardProps['ySize'], string> = {
	1: 'lg:row-span-1',
	2: 'lg:row-span-2',
	3: 'lg:row-span-3',
	4: 'lg:row-span-4',
};

export function Card({ children, xSize, ySize }: CardProps) {
	return (
		<div
			className={`rounded-2xl border border-foreground/10 bg-white/5 p-4 ${colSpanClasses[xSize]} ${rowSpanClasses[ySize]}`}
		>
			{children}
		</div>
	);
}
