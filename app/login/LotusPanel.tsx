import { useMemo } from 'react';

type LotusPanelProps = {
	passwordLength: number;
	isComplete: boolean;
	totalPetals?: number;
};

export function LotusPanel({ passwordLength, isComplete, totalPetals = 12 }: LotusPanelProps) {
	const petals = useMemo(() => Array.from({ length: totalPetals }, (_, index) => index), [totalPetals]);
	const visiblePetals = Math.min(passwordLength, petals.length);
	const outerAngles = useMemo(() => petals.map(index => index * 30), [petals]);
	const innerAngles = useMemo(() => petals.map(index => index * 30 + 15), [petals]);

	return (
		<section className="relative flex items-center justify-center">
			<div
				className="absolute inset-0 rounded-4xl border border-foreground/10 bg-[linear-gradient(135deg,rgba(12,32,18,0.65),rgba(9,14,10,0.6))]"
				style={{ boxShadow: 'inset 0 0 80px rgba(50, 205, 50, 0.08)' }}
			/>
			<div className="relative z-10 flex flex-col items-center gap-4 text-center">
				<svg aria-hidden="true" viewBox="0 0 512 512" className="h-56 w-56">
					<style>{`
						.lotus-petal {
							transition: opacity 180ms ease-out;
						}
						.lotus-rotator {
							transform-origin: 0 0;
						}
						.lotus-rotator-active {
							animation: lotus-spinup 600ms cubic-bezier(0.42, 0, 1, 1) both,
								lotus-rotate 18s linear infinite;
							animation-delay: 0ms, 600ms;
						}
						@keyframes lotus-spinup {
							from {
								transform: rotate(0deg);
							}
							to {
								transform: rotate(15deg);
							}
						}
						@keyframes lotus-rotate {
							from {
								transform: rotate(15deg);
							}
							to {
								transform: rotate(375deg);
							}
						}
					`}</style>
					<defs>
						<path id="petal" d="M0,-180 C40,-140 40,-60 0,-20 C-40,-60 -40,-140 0,-180 Z" />
						<path id="vein" d="M0,-100 Q3,-90 2,-60 Q1,-35 0,-22 Q-1,-35 -2,-60 Q-3,-90 0,-100 Z" />
						<radialGradient id="center-grad" cx="35%" cy="35%" r="65%">
							<stop offset="0%" stopColor="#fff3a0" />
							<stop offset="55%" stopColor="#f4d03f" />
							<stop offset="100%" stopColor="#e4b92d" />
						</radialGradient>
					</defs>
					<g transform="translate(256 256)">
						<g className={`lotus-rotator ${isComplete ? 'lotus-rotator-active' : ''}`}>
							<g>
								{outerAngles.map((angle, index) => (
									<use
										key={`outer-${index}`}
										href="#petal"
										transform={`rotate(${angle})`}
										fill="#8e44ad"
										className="lotus-petal"
										style={{ opacity: index < visiblePetals ? 1 : 0 }}
									/>
								))}
							</g>
							<g>
								{innerAngles.map((angle, index) => (
									<use
										key={`inner-${index}`}
										href="#petal"
										transform={`rotate(${angle})`}
										fill="#a569bd"
										className="lotus-petal"
										style={{ opacity: index < visiblePetals ? 1 : 0 }}
									/>
								))}
							</g>
							<g>
								{innerAngles.map((angle, index) => (
									<use
										key={`small-${index}`}
										href="#petal"
										transform={`rotate(${angle}) scale(0.7)`}
										fill="#d2b4de"
										className="lotus-petal"
										style={{ opacity: index < visiblePetals ? 1 : 0 }}
									/>
								))}
							</g>
							<g>
								{innerAngles.map((angle, index) => (
									<use
										key={`vein-${index}`}
										href="#vein"
										transform={`rotate(${angle})`}
										fill="#7d3c98"
										opacity={index < visiblePetals ? 0.55 : 0}
										className="lotus-petal"
									/>
								))}
							</g>
						</g>
						<circle cx="0" cy="0" r="60" fill="url(#center-grad)" />
						<circle cx="-12" cy="-16" r="14" fill="#fff7b3" opacity="0.7" />
					</g>
				</svg>
			</div>
		</section>
	);
}
