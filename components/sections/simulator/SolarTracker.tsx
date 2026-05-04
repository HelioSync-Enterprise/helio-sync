import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { calculateSolarAngles, degToRad } from './utils/solar-calculations';

interface SolarTrackerProps {
	latitude: number;
	dayOfYear: number;
	hourAngle: number;
	mode?: 'globe' | 'plane';
}

export function SolarTracker({ latitude, dayOfYear, hourAngle, mode = 'globe' }: SolarTrackerProps) {
	const earthTexture = useLoader(THREE.TextureLoader, '/images/earth-map.png');
	const isGlobe = mode === 'globe';

	const earthMaterial = useMemo(() => {
		const texture = earthTexture.clone();
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.anisotropy = 4;
		texture.needsUpdate = true;
		return new THREE.MeshStandardMaterial({ map: texture, roughness: 1, metalness: 0 });
	}, [earthTexture]);

	const globeRadius = 20;
	const sunDistance = 30;
	const panelScale = 1;
	const panelHeight = 0.35 * panelScale;
	const saoPauloLongitude = degToRad(-46.633);
	const planeSunDistance = 10;

	const { alpha, azimute } = useMemo(() => {
		if (isGlobe) {
			return { alpha: 0, azimute: 0 };
		}

		return calculateSolarAngles(latitude, dayOfYear, hourAngle);
	}, [isGlobe, latitude, dayOfYear, hourAngle]);

	const surfacePosition = useMemo(() => {
		const lat = degToRad(latitude);
		const lon = -saoPauloLongitude;
		return new THREE.Vector3(
			Math.cos(lat) * Math.cos(lon) * globeRadius,
			Math.sin(lat) * globeRadius,
			Math.cos(lat) * Math.sin(lon) * globeRadius,
		);
	}, [latitude, globeRadius, saoPauloLongitude]);

	const basePosition = useMemo(() => surfacePosition.clone().setLength(globeRadius), [surfacePosition, globeRadius]);
	const panelPosition = useMemo(
		() => surfacePosition.clone().setLength(globeRadius + panelHeight),
		[surfacePosition, globeRadius, panelHeight],
	);

	const sunPosition = useMemo(() => {
		if (!isGlobe) {
			const sunX = Math.sin(azimute) * Math.cos(alpha) * planeSunDistance;
			const sunY = Math.sin(alpha) * planeSunDistance;
			const sunZ = -Math.cos(azimute) * Math.cos(alpha) * planeSunDistance;
			return new THREE.Vector3(sunX, sunY, sunZ);
		}

		const declination = degToRad(23.45 * Math.sin(degToRad((360 / 365) * (dayOfYear - 81))));
		const angle = degToRad(hourAngle);
		const y = Math.sin(declination) * sunDistance;
		const horizontalRadius = Math.cos(declination) * sunDistance;
		return new THREE.Vector3(Math.cos(angle) * horizontalRadius, y, Math.sin(angle) * horizontalRadius);
	}, [isGlobe, azimute, alpha, hourAngle, dayOfYear, planeSunDistance, sunDistance]);

	const globeState = useMemo(() => {
		if (!isGlobe) {
			return null;
		}

		const surfaceUp = panelPosition.clone().normalize();
		const baseUp = new THREE.Vector3(0, 1, 0);
		const surfaceQuat = new THREE.Quaternion().setFromUnitVectors(baseUp, surfaceUp);
		const sunDirection = sunPosition.clone().sub(panelPosition).normalize();
		const isNightAtPanel = sunDirection.dot(surfaceUp) <= 0;

		if (isNightAtPanel) {
			return { surfaceQuat, panelQuat: surfaceQuat, isNightAtPanel };
		}

		const axis = new THREE.Vector3().crossVectors(surfaceUp, sunDirection);
		if (axis.lengthSq() < 1e-6) {
			return { surfaceQuat, panelQuat: surfaceQuat, isNightAtPanel };
		}

		const maxTilt = degToRad(75);
		const angle = surfaceUp.angleTo(sunDirection);
		const tiltQuat = new THREE.Quaternion().setFromAxisAngle(axis.normalize(), Math.min(angle, maxTilt));
		const panelQuat = tiltQuat.multiply(surfaceQuat);

		return { surfaceQuat, panelQuat, isNightAtPanel };
	}, [isGlobe, panelPosition, sunPosition]);

	const planeState = useMemo(() => {
		if (isGlobe) {
			return null;
		}

		const isNightAtPanel = alpha < 0;
		const minAlphaForPanel = degToRad(15);
		const panelAlpha = isNightAtPanel ? degToRad(90) : Math.max(minAlphaForPanel, alpha);
		const panelAzimute = isNightAtPanel ? 0 : azimute;

		return { isNightAtPanel, panelAlpha, panelAzimute };
	}, [isGlobe, alpha, azimute]);

	const isNightAtPanel = isGlobe ? (globeState?.isNightAtPanel ?? false) : (planeState?.isNightAtPanel ?? false);

	return (
		<>
			{/* A noite, a luz ambiente fica mais escura para simular a ausência de sol */}
			<ambientLight intensity={isNightAtPanel ? 0.2 : 0.35} />

			{/* Luz direcionada que age efetivamente como raios de Sol - desliga se estiver abaixo do horizonte */}
			<directionalLight position={sunPosition.toArray()} intensity={1.4} castShadow />

			{/* Esfera Amarela simulando visualmente onde o sol está flutuando */}
			<mesh position={sunPosition.toArray()}>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshBasicMaterial color="#fbbf24" />
			</mesh>

			{isGlobe && globeState ? (
				<>
					<mesh receiveShadow>
						<sphereGeometry args={[globeRadius, 64, 64]} />
						<primitive object={earthMaterial} attach="material" />
					</mesh>

					{/* Poste central Fixo, onde a placa vai ser fixada */}
					<group position={basePosition.toArray()} quaternion={globeState.surfaceQuat}>
						<mesh position={[0, 0.25 * panelScale, 0]} castShadow receiveShadow>
							<cylinderGeometry args={[0.07 * panelScale, 0.09 * panelScale, 0.5 * panelScale, 16]} />
							<meshStandardMaterial color="#475569" />
						</mesh>
					</group>

					<group position={panelPosition.toArray()} quaternion={globeState.panelQuat}>
						<mesh position={[0, 0.12 * panelScale, 0]} castShadow receiveShadow>
							<boxGeometry args={[1.3 * panelScale, 0.06 * panelScale, 0.9 * panelScale]} />
							<meshStandardMaterial color="#1e3a8a" />
						</mesh>
					</group>
				</>
			) : (
				<>
					<mesh position={[0, 0.5, 0]} castShadow receiveShadow>
						<boxGeometry args={[0.5 * panelScale, 1 * panelScale, 0.5 * panelScale]} />
						<meshStandardMaterial color="#475569" />
					</mesh>

					<group position={[0, 1.1 * panelScale, 0]} rotation={[0, -(planeState?.panelAzimute ?? 0), 0]}>
						<group rotation={[(planeState?.panelAlpha ?? 0) - Math.PI / 2, 0, 0]}>
							<mesh position={[0, 0, 0]} castShadow receiveShadow>
								<boxGeometry args={[3 * panelScale, 0.1 * panelScale, 2 * panelScale]} />
								<meshStandardMaterial color="#1e3a8a" />
							</mesh>
						</group>
					</group>

					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
						<planeGeometry args={[20, 20]} />
						<meshStandardMaterial color="#2d3748" />
					</mesh>
				</>
			)}
		</>
	);
}
