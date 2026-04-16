import { HeroSection } from '@/components/sections/hero/HeroSection';
import Header from '../components/ui/Header/Header';

export default function Home() {
	return (
		<main className="isolate min-h-screen overflow-hidden bg-helio-hero px-6 py-14 text-foreground md:px-12">
			<Header />
			<HeroSection />
		</main>
	);
}
