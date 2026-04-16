type NavItem = {
	label: string;
	href: string;
};

type HeaderNavMenuProps = {
	items: readonly NavItem[];
};

export function HeaderNavMenu({ items }: HeaderNavMenuProps) {
	return (
		<ul className="flex items-center gap-8 px-6 py-4 text-base font-medium text-foreground/80">
			{items.map(i => (
				<li key={i.label}>
					<a href={i.href}>{i.label}</a>
				</li>
			))}
		</ul>
	);
}
