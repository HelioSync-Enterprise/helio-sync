import { TelemetryChartCard } from './TelemetryChartCard';

export function DashboardGrid() {
	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:auto-rows-[140px]">
			<TelemetryChartCard />
            <Card xSize={2} ySize={2}/>
            <Card xSize={2} ySize={2}/>
            <Card xSize={1} ySize={1}/>
            <Card xSize={1} ySize={1}/>
            <Card xSize={1} ySize={1}/>
            <Card xSize={1} ySize={1}/>
            <Card xSize={1} ySize={1}/>

		</section>
	);
}
export type CardProps = {
    children?: React.ReactNode;
    xSize: number;
    ySize: number;
};

export function Card({ children, xSize, ySize }: CardProps) {
    return (
        <div className={`rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-${xSize} lg:row-span-${ySize}`}>
            {children}
        </div>
    );
}
