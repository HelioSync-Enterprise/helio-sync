'use client';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SolarTracker } from './SolarTracker';

type SimulatorSceneProps = {
	mode: 'globe' | 'plane';
	latitude: number;
	dayOfYear: number;
	hourAngle: number;
};

export function SimulatorScene({ mode, latitude, dayOfYear, hourAngle }: SimulatorSceneProps) {
	const cameraPosition: [number, number, number] = mode === 'globe' ? [0, 0, 55] : [5, 5, 5];

	return (
		<div className="relative h-64 min-h-75 w-full flex-1 md:h-full">
			<Canvas
				key={mode}
				camera={{ position: cameraPosition, fov: mode === 'globe' ? 45 : 50 }}
				shadows={{ type: THREE.PCFShadowMap }}
			>
				<OrbitControls makeDefault />
				<SolarTracker latitude={latitude} dayOfYear={dayOfYear} hourAngle={hourAngle} mode={mode} />
			</Canvas>
		</div>
	);
}
