import { HeroGlow } from '@/components/ui/HeroGlow';

export function LoginHeroGlows() {
	return (
		<div className="hero-glow-enter">
			<HeroGlow
				className="-top-20 -left-16 h-56 w-56 md:-top-24 md:-left-20 md:h-80 md:w-80"
				color="#32CD32"
				opacityClass="opacity-20"
			/>
			<HeroGlow
				className="top-12 right-[10%] h-48 w-48 md:top-16 md:right-[12%] md:h-72 md:w-72"
				color="#90EE90"
				opacityClass="opacity-[0.12]"
			/>
			<HeroGlow
				className="bottom-12 left-[8%] h-64 w-64 md:bottom-16 md:left-[12%] md:h-96 md:w-96"
				color="#FFD700"
				opacityClass="opacity-15"
			/>
			<HeroGlow
				className="-bottom-8 right-[4%] h-56 w-56 md:-bottom-10 md:right-[6%] md:h-80 md:w-80"
				color="#F4A460"
				opacityClass="opacity-[0.1]"
			/>
			<HeroGlow
				className="top-2/3 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 md:h-96 md:w-96"
				color="#32CD32"
				opacityClass="opacity-20"
			/>
		</div>
	);
}
