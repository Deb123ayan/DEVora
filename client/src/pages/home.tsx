import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Projects from "@/components/projects";
import WhyChooseUs from "@/components/why-choose-us";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </Layout>
  );
}
