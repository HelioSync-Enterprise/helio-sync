import { Button } from '@/components/ui/Button';

export function HeroActions() {
	return (
		<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
			<Button variant="explore" className="w-full sm:w-auto">
				Explorar
			</Button>
			<Button variant="createAccount" className="w-full sm:w-auto">
				Criar Conta
			</Button>
		</div>
	);
}
