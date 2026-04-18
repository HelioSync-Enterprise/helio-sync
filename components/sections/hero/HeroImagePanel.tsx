import Image from 'next/image';

export function HeroImagePanel() {
	return (
		<div className="relative z-10 w-full max-w-2xl hero-enter enter-delay-3 lg:max-w-[46%]">
			<Image
				src="/images/hero-img.png"
				alt="Imagem de um campo"
				width={800}
				height={800}
				className="mx-auto h-64 w-full rounded-3xl object-cover sm:h-80 md:h-96 lg:h-112 xl:h-128"
			/>
			{/* Painel de destaque com borda e fundo translúcido, posicionado sobre a imagem */}
			<div className="absolute bottom-3 left-1/2 flex w-[92%] -translate-x-1/2 items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground/10 p-3 text-caption backdrop-blur-sm hero-enter enter-delay-4 sm:bottom-4 sm:gap-4 sm:p-4">
				<div className="size-12 rounded-full bg-helio-gradient-gold sm:size-14 md:size-16" />
				<div className="flex flex-col justify-center">
					<p className="text-body text-primary">Eficiência aumentada em</p>
					<h3 className="text-gradient-green-light text-subtitle sm:text-emphasis">+50% vs painéis fixos</h3>
				</div>
			</div>
		</div>
	);
}
