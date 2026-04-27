import type { NavItem } from './Header.types';

type HeaderNavMenuProps = {
	items: readonly NavItem[];
	className?: string;
	itemClassName?: string;
	linkClassName?: string;
	onItemClick?: () => void;
};

export function HeaderNavMenu({ items, className, itemClassName, linkClassName, onItemClick }: HeaderNavMenuProps) {
	const baseLinkClassName =
		'relative inline-flex py-1 text-secondary transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-helio-green after:transition-transform after:duration-300 hover:after:scale-x-100';

	const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		// Essa função faz a rolagem suave para seções internas da página. Se o link for externo (não começar com '#'), ela apenas chama onItemClick e retorna.
		if (!href.startsWith('#')) {
			onItemClick?.();
			return;
		}

		event.preventDefault();

		const targetId = href.slice(1);
		const target = document.getElementById(targetId);

		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			window.history.replaceState(null, '', href);
		}

		onItemClick?.();
	};

	return (
		<ul className={`flex items-center gap-8 px-6 py-4 text-nav text-secondary ${className ?? ''}`}>
			{items.map((i, index) => (
				<li key={i.label} className={itemClassName} style={{ animationDelay: `${index * 80}ms` }}>
					<a
						href={i.href}
						className={linkClassName ?? baseLinkClassName}
						onClick={event => handleAnchorClick(event, i.href)}
					>
						{i.label}
					</a>
				</li>
			))}
		</ul>
	);
}
