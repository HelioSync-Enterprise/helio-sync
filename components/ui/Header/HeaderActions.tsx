import Link from 'next/link';

import { buttonVariants } from '@/styles/variants/button';
import { HeaderNavMenu } from './HeaderNavMenu';
import type { NavItem } from './Header.types';

type HeaderActionsProps = {
	items: readonly NavItem[];
};

export function HeaderActions({ items }: HeaderActionsProps) {
	return (
		<div className="flex items-center gap-6">
			<HeaderNavMenu items={items} />
			<Link href="/login" className={buttonVariants({ variant: 'enter' })}>
				Entrar
			</Link>
		</div>
	);
}
