'use client';

import { useEffect, useState } from 'react';
import { HeaderActions } from './HeaderActions';
import { HeaderBrand } from './HeaderBrand';

const navItems = [
	{ label: 'Início', href: '#' },
	{ label: 'Funcionalidades', href: '#' },
	{ label: 'Sobre', href: '#' },
	{ label: 'Contato', href: '#' },
] as const;

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`fixed top-4 left-25 right-25 z-50 backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
				isScrolled ? 'bg-(--helio-bg-primary)/95' : 'bg-helio-hero/80'
			}`}
		>
			<nav className=" flex items-center px-3 py-3 justify-between gap-4 rounded-full">
				<HeaderBrand />
				<HeaderActions items={navItems} />
			</nav>
		</header>
	);
}
