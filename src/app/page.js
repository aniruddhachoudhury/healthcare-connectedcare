import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Services } from "@/components/services";
import { Specialties } from "@/components/specialties";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Security } from "@/components/security";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Services />
      <Specialties />
      <Stats />
      <Security />
      <CTA />
      <Footer />
    </main>
  );
}
