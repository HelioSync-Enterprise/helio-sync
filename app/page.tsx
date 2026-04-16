import { HeroSection } from '@/components/sections/hero/HeroSection';
import Header from '../components/ui/Header/Header';
import Features from '@/components/sections/features/Features';

export default function Home() {
	return (
		<main className="isolate min-h-screen overflow-hidden bg-helio-hero text-foreground">
			<Header />
			<HeroSection />
			<Features/>
		</main>
	);
}
