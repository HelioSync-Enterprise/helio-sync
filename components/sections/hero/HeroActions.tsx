'use client';

import { Button } from '@/components/ui/Button';
import { buttonVariants } from '@/styles/variants';
import Link from 'next/link';

function handleScrollTo(elementId: string) {
	const element = document.getElementById(elementId);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
}

export function HeroActions() {
	return (
		<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
			<Button variant="explore" className="w-full sm:w-auto" onClick={() => handleScrollTo('funcionalidades')}>
				Explorar
			</Button>
			<Link href="/login" className={`${buttonVariants({ variant: 'createAccount' })} w-full sm:w-auto`} >
				Criar Conta
			</Link>
		</div>
	);
}
