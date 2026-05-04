'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SolarTracker } from './SolarTracker';

type SimulatorSceneProps = {
	mode: 'globe' | 'plane';
	latitude: number;
	dayOfYear: number;
	hourAngle: number;
};

type SimulatorOrbitControlsProps = {
	minDistance: number;
	maxDistance: number;
};

function SimulatorOrbitControls({ minDistance, maxDistance }: SimulatorOrbitControlsProps) {
	const controlsRef = useRef<OrbitControlsImpl | null>(null);
	const { camera } = useThree();

	useFrame(() => {
		const controls = controlsRef.current;
		if (!controls) {
			return;
		}

		// Scale rotation sensitivity by camera distance for a more consistent feel when zooming.
		const distance = camera.position.distanceTo(controls.target);
		const normalized = THREE.MathUtils.clamp((distance - minDistance) / (maxDistance - minDistance), 0, 1);
		controls.rotateSpeed = THREE.MathUtils.lerp(0.25, 0.9, normalized);
	});

	return <OrbitControls ref={controlsRef} makeDefault minDistance={minDistance} maxDistance={maxDistance} />;
}

export function SimulatorScene({ mode, latitude, dayOfYear, hourAngle }: SimulatorSceneProps) {
	const cameraPosition: [number, number, number] = mode === 'globe' ? [0, 0, 55] : [5, 5, 5];
	const minDistance = mode === 'globe' ? 22 : 1;
	const maxDistance = mode === 'globe' ? 90 : 200;

	return (
		<div className="relative h-64 min-h-75 w-full flex-1 md:h-full">
			<Canvas
				key={mode}
				camera={{ position: cameraPosition, fov: mode === 'globe' ? 45 : 50 }}
				shadows={{ type: THREE.PCFShadowMap }}
			>
				<SimulatorOrbitControls minDistance={minDistance} maxDistance={maxDistance} />
				<SolarTracker latitude={latitude} dayOfYear={dayOfYear} hourAngle={hourAngle} mode={mode} />
			</Canvas>
		</div>
	);
}
