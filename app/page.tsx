import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import ArtistSection from "@/components/artist-section"
import ProcessSection from "@/components/process-section"
import ContactSection from "@/components/contact-section"
import ColorfulCursor from "@/components/colorful-cursor"
import ArtisticLoader from "@/components/artistic-loader"

export default function Home() {
  return (
    <>
      <ArtisticLoader />
      <ColorfulCursor />
      <main className="overflow-hidden">
        <HeroSection />
         <ArtistSection />
        <GallerySection />
        <ProcessSection />
        <ContactSection />
      </main>
    </>
  )
}
