export type MockUser = {
	id: string;
	name: string;
	email: string;
	role: 'admin' | 'operator' | 'viewer';
	createdAt: string;
};

export type MockPanel = {
	id: string;
	label: string;
	latitude: number;
	longitude: number;
	status: 'online' | 'offline' | 'maintenance';
	currentAngleAzimuth: number;
	currentAngleElevation: number;
	petalsStatus: 'open' | 'closed' | 'moving';
	lastSyncAt: string;
};

export type MockTelemetry = {
	id: string;
	panelId: string;
	timestamp: string;
	voltageV: number;
	powerW: number;
	angleDeg: number;
};

export type MockAlert = {
	id: string;
	panelId: string;
	type: 'performance' | 'connection' | 'maintenance';
	severity: 'low' | 'medium' | 'high';
	message: string;
	createdAt: string;
};

export const mockUsers: MockUser[] = [
	{
		id: 'usr_001',
		name: 'Renan Rodrigues',
		email: 'renan@heliosync.local',
		role: 'admin',
		createdAt: '2026-05-01T10:00:00Z',
	},
	{
		id: 'usr_002',
		name: 'Igor Leocadio',
		email: 'igor@heliosync.local',
		role: 'operator',
		createdAt: '2026-05-02T09:20:00Z',
	},
];

export const mockPanels: MockPanel[] = [
	{
		id: 'pnl_001',
		label: 'Helio-Alpha',
		latitude: -23.55,
		longitude: -46.633,
		status: 'online',
		currentAngleAzimuth: 112.5,
		currentAngleElevation: 38.2,
		petalsStatus: 'open',
		lastSyncAt: '2026-05-05T12:05:00Z',
	},
	{
		id: 'pnl_002',
		label: 'Helio-Beta',
		latitude: -23.6,
		longitude: -46.7,
		status: 'maintenance',
		currentAngleAzimuth: 96.1,
		currentAngleElevation: 12.4,
		petalsStatus: 'moving',
		lastSyncAt: '2026-05-04T18:42:00Z',
	},
	{
		id: 'pnl_003',
		label: 'Helio-Gamma',
		latitude: -23.45,
		longitude: -46.5,
		status: 'offline',
		currentAngleAzimuth: 180,
		currentAngleElevation: 0,
		petalsStatus: 'closed',
		lastSyncAt: '2026-05-03T06:18:00Z',
	},
];

export const mockTelemetry: MockTelemetry[] = [
	{
		id: 'tel_001',
		panelId: 'pnl_001',
		timestamp: '2026-05-05T08:00:00Z',
		voltageV: 21.4,
		powerW: 420,
		angleDeg: 12.4,
	},
	{
		id: 'tel_002',
		panelId: 'pnl_001',
		timestamp: '2026-05-05T08:30:00Z',
		voltageV: 22.1,
		powerW: 260,
		angleDeg: 14.1,
	},
	{
		id: 'tel_003',
		panelId: 'pnl_002',
		timestamp: '2026-05-05T09:00:00Z',
		voltageV: 21.9,
		powerW: 300,
		angleDeg: 16.3,
	},
	{
		id: 'tel_004',
		panelId: 'pnl_001',
		timestamp: '2026-05-05T09:30:00Z',
		voltageV: 22.6,
		powerW: 340,
		angleDeg: 18.7,
	},
	{
		id: 'tel_005',
		panelId: 'pnl_001',
		timestamp: '2026-05-05T10:00:00Z',
		voltageV: 23.2,
		powerW: 380,
		angleDeg: 20.1,
	},
	{
		id: 'tel_006',
		panelId: 'pnl_001',
		timestamp: '2026-05-05T10:30:00Z',
		voltageV: 23.6,
		powerW: 410,
		angleDeg: 21.6,
	},
	{
		id: 'tel_007',
		panelId: 'pnl_002',
		timestamp: '2026-05-05T08:15:00Z',
		voltageV: 20.8,
		powerW: 140,
		angleDeg: 10.8,
	},
	{
		id: 'tel_008',
		panelId: 'pnl_002',
		timestamp: '2026-05-05T08:45:00Z',
		voltageV: 21.1,
		powerW: 160,
		angleDeg: 12.0,
	},
	{
		id: 'tel_009',
		panelId: 'pnl_002',
		timestamp: '2026-05-05T09:15:00Z',
		voltageV: 21.5,
		powerW: 175,
		angleDeg: 13.2,
	},
];

export const mockAlerts: MockAlert[] = [
	{
		id: 'alt_001',
		panelId: 'pnl_002',
		type: 'maintenance',
		severity: 'medium',
		message: 'Inspecao preventiva recomendada.',
		createdAt: '2026-05-04T16:00:00Z',
	},
	{
		id: 'alt_002',
		panelId: 'pnl_003',
		type: 'connection',
		severity: 'high',
		message: 'Painel sem comunicacao ha mais de 12 horas.',
		createdAt: '2026-05-03T18:30:00Z',
	},
];
