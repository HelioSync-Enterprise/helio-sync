import { FaRegBell } from 'react-icons/fa';

export default function DashboardPage() {
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
					<div className="rounded-2xl border border-foreground/10 bg-white/5 p-4 lg:col-span-3 lg:row-span-4" />
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
