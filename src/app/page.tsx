import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import CollageReveal from "@/components/sections/CollageReveal";
import Focus from "@/components/sections/Focus";
import Tools from "@/components/sections/Tools";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main id="main">
      <Nav />
      <Hero />
      <CollageReveal />
      <Focus />
      <Tools />
      <Work />
      <Services />
      <Stats />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
