import { HeroGlow } from '@/components/ui/HeroGlow';

import { HeroActions } from './HeroActions';
import { HeroCopy } from './HeroCopy';
import { HeroImagePanel } from './HeroImagePanel';

export function HeroSection() {
	return (
		<section className="mx-auto flex bg-helio-hero min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden px-5 py-24 sm:px-6 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-14 min-[1920px]:max-w-[78%] min-[1920px]:gap-20"
					style={{ background: 'linear-gradient(0deg, var(--helio-bg-primary) 0%, transparent 10%)' }}

		>
			<div className="hero-glow-enter">
				<HeroGlow
					className="-top-20 -left-16 h-56 w-56 md:-top-24 md:-left-20 md:h-80 md:w-80"
					color="#2E8B57"
					opacityClass="opacity-[0.24]"
				/>

				<HeroGlow
					className="top-16 right-[18%] h-72 w-72 md:top-20 md:right-1/4 md:h-125 md:w-125"
					color="#32CD32"
					opacityClass="opacity-20"
				/>

				<HeroGlow
					className="top-1/6 left-[8%] h-44 w-44 md:left-[15%] md:h-64 md:w-64"
					color="#90EE90"
					opacityClass="opacity-[0.12]"
				/>

				<HeroGlow
					className="bottom-14 left-[12%] h-72 w-72 md:bottom-20 md:left-1/4 md:h-100 md:w-100"
					color="#FFD700"
					opacityClass="opacity-15"
				/>

				<HeroGlow
					className="bottom-0 right-[2%] h-72 w-72 md:right-[6%] md:h-96 md:w-96"
					color="#F4A460"
					opacityClass="opacity-[0.1]"
				/>

				<HeroGlow
					className="top-[10%] right-0 h-40 w-40 md:top-[12%] md:right-[2%] md:h-56 md:w-56"
					color="#228B22"
					opacityClass="opacity-[0.1]"
				/>
			</div>

			<div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-4 hero-enter enter-delay-1 lg:max-w-xl lg:items-start">
				<HeroCopy />
				<div className="hero-enter enter-delay-3">
					<HeroActions />
				</div>
			</div>

			<HeroImagePanel />
		</section>
	);
}
