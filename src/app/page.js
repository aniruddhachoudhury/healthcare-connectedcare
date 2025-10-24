import { CTA } from "@/components/cta";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Security } from "@/components/security";
import { Services } from "@/components/services";
import { Specialties } from "@/components/specialties";
import { Stats } from "@/components/stats";

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
