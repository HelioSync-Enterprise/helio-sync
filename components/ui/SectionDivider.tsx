const sparkles = [
	{ left: '12%', top: '64%', size: 'h-1 w-1', opacity: 'opacity-55' },
	{ left: '26%', top: '62%', size: 'h-[3px] w-[3px]', opacity: 'opacity-45' },
	{ left: '41%', top: '65%', size: 'h-[2px] w-[2px]', opacity: 'opacity-40' },
	{ left: '58%', top: '63%', size: 'h-[3px] w-[3px]', opacity: 'opacity-50' },
	{ left: '71%', top: '64%', size: 'h-1 w-1', opacity: 'opacity-45' },
	{ left: '86%', top: '61%', size: 'h-[3px] w-[3px]', opacity: 'opacity-55' },
];

const sunRays = Array.from({ length: 20 }, (_, index) => ({
	angle: index * 18,
	lengthClass: index % 2 === 0 ? 'h-5' : 'h-3.5',
	opacityClass: index % 2 === 0 ? 'opacity-95' : 'opacity-75',
}));

export function SectionDivider() {
	return (
		<div
			aria-hidden="true"
			className="relative h-20 w-full overflow-hidden bg-[linear-gradient(180deg,#051a0d_0%,#042113_58%,#022013_100%)]"
		>
			<div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_84px,rgba(50,205,50,0.04)_85px,transparent_86px)]" />
			<div className="absolute inset-x-0 top-[58%] h-px bg-linear-to-r from-transparent via-[#f6d75d]/90 to-transparent" />
			<div className="absolute inset-x-0 top-[58%] h-1.5 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,215,0,0.25)_0%,rgba(255,215,0,0.12)_25%,transparent_65%)]" />

			{sparkles.map((sparkle, index) => (
				<span
					key={`sparkle-${index}`}
					className={`absolute rounded-full bg-[#ffd966] ${sparkle.size} ${sparkle.opacity}`}
					style={{ left: sparkle.left, top: sparkle.top }}
				/>
			))}

			<div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2">
				<span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffe990]/80 bg-[#ffcf3f] shadow-[0_0_16px_rgba(255,207,63,0.85)]" />

				{sunRays.map(ray => (
					<span
						key={`ray-${ray.angle}`}
						className={`absolute left-1/2 top-1/2 ${ray.lengthClass} w-px origin-bottom bg-linear-to-t from-[#f7cd42] to-transparent ${ray.opacityClass}`}
						style={{ transform: `translate(-50%, -100%) rotate(${ray.angle}deg)` }}
					/>
				))}
			</div>
		</div>
	);
}
