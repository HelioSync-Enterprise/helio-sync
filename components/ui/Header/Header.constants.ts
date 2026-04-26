import type { NavItem } from './Header.types';

export const headerNavItems: readonly NavItem[] = [
	{ label: 'Início', href: '#inicio' },
	{ label: 'Funcionalidades', href: '#funcionalidades' },
	{ label: 'Sobre', href: '#sobre' },
	{ label: 'Contato', href: '#contato' },
] as const;
