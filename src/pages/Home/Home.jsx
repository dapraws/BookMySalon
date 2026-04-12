import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { LazySection } from "../../components/Lazy"; // pastikan path sesuai

// ─── Lazy load sections ─────────────────────────────
const HeroSection = lazy(() => import("../../section/hero"));
const WhyChooseUsSection = lazy(() => import("../../section/Why"));
const ToolsSection = lazy(() => import("../../section/tools"));
const VideoSection = lazy(() => import("../../section/video"));
const GallerySection = lazy(() => import("../../section/Gallery"));
const MapSection = lazy(() => import("../../section/Map"));
const TestimonialsSection = lazy(() => import("../../section/Testi"));
const CTASection = lazy(() => import("../../section/CTA"));

// ─── Carousel Images ──────────────────────────────────────────
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop", alt: "Salon Interior" },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop", alt: "Hair Styling" },
  { src: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&h=600&fit=crop", alt: "Beauty Treatment" },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop", alt: "Makeup Studio" },
  { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=600&fit=crop", alt: "Nail Art" },
  { src: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&h=600&fit=crop", alt: "Spa Relaxation" },
];

// ─── Salon Tools Data ─────────────────────────────────────────
const salonTools = [
  { icon: "💈", name: "Barber Chair", desc: "Ergonomic luxury styling chair", color: "from-amber-100 to-orange-100" },
  { icon: "✂️", name: "Pro Scissors", desc: "Japanese steel precision shears", color: "from-stone-100 to-amber-100" },
  { icon: "💨", name: "Hair Dryer", desc: "Ionic technology, frizz-free finish", color: "from-orange-100 to-rose-100" },
  { icon: "🪮", name: "Styling Brush", desc: "Boar bristle round brush set", color: "from-amber-100 to-yellow-100" },
  { icon: "⚡", name: "Flat Iron", desc: "Ceramic plates, 230°C max heat", color: "from-rose-100 to-orange-100" },
  { icon: "🧴", name: "Premium Products", desc: "Kerastase & Olaplex range", color: "from-green-100 to-amber-100" },
];

// ─── MAIN APP ─────────────────────────────────────────────
export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);
  const [tilt, setTilt] = useState({});

  const handleNext = () => setCurrent((p) => (p + 1) % galleryImages.length);
  const handlePrev = () => setCurrent((p) => (p - 1 + galleryImages.length) % galleryImages.length);
  const handleMouseMove = (idx, x, y) => setTilt((prev) => ({ ...prev, [idx]: { x, y } }));
  const handleMouseLeave = (idx) => setTilt((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));

  useEffect(() => {
    if (!isAutoPlay) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(handleNext, 3500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  return (
    <div className="bg-white min-h-screen w-full">
      <Suspense fallback={<div>Loading Hero...</div>}><HeroSection /></Suspense>
      <Suspense fallback={<div>Loading Why Choose Us...</div>}><WhyChooseUsSection /></Suspense>

      <LazySection minHeight="760px">
        <Suspense fallback={<div>Loading Tools...</div>}>
          <ToolsSection tools={salonTools} tilt={tilt} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
        </Suspense>
      </LazySection>

      <LazySection minHeight="760px">
        <Suspense fallback={<div>Loading Video...</div>}><VideoSection /></Suspense>
      </LazySection>

      <LazySection minHeight="760px">
        <Suspense fallback={<div>Loading Gallery...</div>}>
          <GallerySection
            images={galleryImages}
            current={current}
            onNext={handleNext}
            onPrev={handlePrev}
            onDot={setCurrent}
            isAutoPlay={isAutoPlay}
            setIsAutoPlay={setIsAutoPlay}
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="700px">
        <Suspense fallback={<div>Loading Map...</div>}><MapSection /></Suspense>
      </LazySection>

      <LazySection minHeight="420px">
        <Suspense fallback={<div>Loading Testimonials...</div>}><TestimonialsSection /></Suspense>
      </LazySection>

      <LazySection minHeight="280px">
        <Suspense fallback={<div>Loading CTA...</div>}><CTASection /></Suspense>
      </LazySection>
    </div>
  );
}