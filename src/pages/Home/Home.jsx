import React, { useState, useEffect, useRef, Suspense, lazy } from "react";

// ─── LazySection ─────────────────────────────────────────────────────────────
function LazySection({ children, minHeight = "320px", rootMargin = "200px" }) {
  const [shouldRender, setShouldRender] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={wrapperRef} style={{ minHeight }}>{shouldRender ? children : <div style={{ minHeight }} />}</div>;
}

// ─── LazyImage with WebP + Responsive ─────────────────────────────────────────
function LazyImage({ src, alt, className = "", wrapperClassName = "", style, eager = false, ...props }) {
  const [isVisible, setIsVisible] = useState(eager);
  const [isLoaded, setIsLoaded] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (eager) return;
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={style}>
      {isVisible ? (
        <img
          src={`${src}&fm=webp`}
          srcSet={`${src}&w=400&h=225&fit=crop&fm=webp 400w, ${src}&w=800&h=450&fit=crop&fm=webp 800w, ${src}&w=1600&h=900&fit=crop&fm=webp 1600w`}
          sizes="(max-width: 768px) 100vw, 1600px"
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 animate-pulse" />
      )}
    </div>
  );
}

// ─── LazyIframe Component ─────────────────────────────────────────────────────
function LazyIframe({ src, title, wrapperClassName = "", className = "", style, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={style}>
      {isVisible ? (
        <iframe
          src={src}
          title={title}
          className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 animate-pulse flex items-center justify-center">
          <div className="text-amber-600 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}

// ─── HeroSection optimized for WebP + responsive ─────────────────────────────
function HeroSection() {
  const imageUrl = "https://images.unsplash.com/photo-1560066984-138dadb4c035";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <LazyImage
          src={`${imageUrl}?w=1600&h=900&fit=crop`}
          alt="Modern Salon Interior"
          eager
          fetchPriority="high"
          wrapperClassName="w-full h-full"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/50 to-stone-900/60" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
              Your Beauty,
              <br />
              Our Priority
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mb-6 lg:mb-8 text-amber-50">
              Experience luxury treatments in a serene and elegant atmosphere.
              Professional care tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <a
                href="/services"
                className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 transition px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-semibold text-center shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                View Services
              </a>
              <a
                href="tel:+6281234567890"
                className="border-2 border-white hover:bg-white hover:text-amber-900 transition px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-semibold text-center text-sm sm:text-base"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Carousel Images ──────────────────────────────────────────────────────────
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
    alt: "Salon Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    alt: "Hair Styling",
  },
  {
    src: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&h=600&fit=crop",
    alt: "Beauty Treatment",
  },
  {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    alt: "Makeup Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=600&fit=crop",
    alt: "Nail Art",
  },
  {
    src: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&h=600&fit=crop",
    alt: "Spa Relaxation",
  },
];

// ─── Salon Tools Data ─────────────────────────────────────────────────────────
const salonTools = [
  {
    icon: "💈",
    name: "Barber Chair",
    desc: "Ergonomic luxury styling chair",
    color: "from-amber-100 to-orange-100",
  },
  {
    icon: "✂️",
    name: "Pro Scissors",
    desc: "Japanese steel precision shears",
    color: "from-stone-100 to-amber-100",
  },
  {
    icon: "💨",
    name: "Hair Dryer",
    desc: "Ionic technology, frizz-free finish",
    color: "from-orange-100 to-rose-100",
  },
  {
    icon: "🪮",
    name: "Styling Brush",
    desc: "Boar bristle round brush set",
    color: "from-amber-100 to-yellow-100",
  },
  {
    icon: "⚡",
    name: "Flat Iron",
    desc: "Ceramic plates, 230°C max heat",
    color: "from-rose-100 to-orange-100",
  },
  {
    icon: "🧴",
    name: "Premium Products",
    desc: "Kerastase & Olaplex range",
    color: "from-green-100 to-amber-100",
  },
];

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
function WhyChooseUsSection() {
  const features = [
    {
      icon: "✨",
      title: "Professional Team",
      text: "Experienced beauticians with international certifications",
    },
    {
      icon: "🏆",
      title: "Premium Products",
      text: "Only the best quality products for your treatments",
    },
    {
      icon: "💎",
      title: "Luxury Experience",
      text: "Elegant ambiance designed for your comfort and relaxation",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 text-amber-900">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-amber-100"
            >
              <div className="text-4xl lg:text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-2 text-amber-900">
                {item.title}
              </h3>
              <p className="text-sm lg:text-base text-stone-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOOLS SECTION ────────────────────────────────────────────────────────────
function ToolsSection({ tools, tilt, onMouseMove, onMouseLeave }) {
  const frameRef = useRef(null);

  const handleMouseMove = (e, idx) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const card = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - card.left) / card.width - 0.5) * 20;
      const y = ((e.clientY - card.top) / card.height - 0.5) * -20;
      onMouseMove(idx, x, y);
    });
  };

  const handleMouseLeaveInternal = (idx) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    onMouseLeave(idx);
  };

  return (
    <section className="py-12 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Our Equipment
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900">
            Professional Salon Tools
          </h2>
          <p className="text-stone-500 mt-3 text-sm lg:text-base max-w-xl mx-auto">
            We use only industry-leading equipment to ensure the finest results for every client.
          </p>
        </div>

        <div className="mb-10 lg:mb-14 rounded-2xl overflow-hidden shadow-xl border border-amber-100">
          <div className="bg-gradient-to-r from-amber-800 to-orange-700 px-5 py-3 flex items-center gap-2">
            <span className="text-white text-sm font-semibold">
              🌐 3D Salon Interior — Interactive Model
            </span>
            <span className="ml-auto text-amber-200 text-xs">
              Drag to rotate • Scroll to zoom
            </span>
          </div>

          <LazyIframe
            title="3D Salon Chair"
            src="https://sketchfab.com/models/1081a053dd40441a82e668759f8b3f81/embed?autospin=1&autostart=1&ui_theme=dark&camera=2"
            wrapperClassName="w-full"
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            style={{ height: "420px" }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool, i) => {
            const t = tilt[i] || { x: 0, y: 0 };
            return (
              <div
                key={i}
                className="cursor-pointer select-none"
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeaveInternal(i)}
                style={{ willChange: "transform" }}
              >
                <div
                  className={`bg-gradient-to-br ${tool.color} rounded-2xl p-4 text-center shadow-md hover:shadow-xl border border-amber-100 h-full`}
                  style={{
                    transform: `perspective(600px) rotateY(${t.x}deg) rotateX(${t.y}deg) scale(${t.x || t.y ? 1.06 : 1})`,
                    transition: t.x || t.y ? "none" : "transform 0.4s ease",
                    willChange: "transform",
                  }}
                >
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  <p className="font-bold text-amber-900 text-sm mb-1">{tool.name}</p>
                  <p className="text-stone-500 text-xs leading-snug">{tool.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── VIDEO SECTION ────────────────────────────────────────────────────────────
function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const YT_ID = "Hf6abfL1la4";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing) {
          setVisible(true);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [playing]);

  const fadeIn = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-20 bg-gradient-to-br from-stone-900 to-amber-950"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 lg:mb-12 transition-all duration-700 ${fadeIn}`}>
          <span className="inline-block bg-amber-600/30 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Salon Profile
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            See Our World-Class Salon
          </h2>
          <p className="text-stone-400 mt-3 text-sm lg:text-base">
            Take a virtual tour of our luxurious space and services.
          </p>
        </div>

        <div
          className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-700/40 transition-all duration-700 delay-200 ${fadeIn}`}
          style={{ paddingTop: "56.25%" }}
        >
          {!playing && (
            <div
              className="absolute inset-0 cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              <LazyImage
                src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
                alt="Salon Video Thumbnail"
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-amber-600 hover:bg-amber-500 transition rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 duration-300">
                  <svg
                    className="w-7 h-7 lg:w-9 lg:h-9 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                ▶ Play Salon Profile Video
              </div>
            </div>
          )}

          {playing && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&rel=0&modestbranding=1`}
              title="Salon Profile Video"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <p className="text-center text-stone-500 text-xs mt-4">
          Video plays when you click • Click fullscreen for best experience
        </p>
      </div>
    </section>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
function GallerySection({
  images,
  current,
  onNext,
  onPrev,
  onDot,
  isAutoPlay,
  setIsAutoPlay,
}) {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Gallery
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900">
            Our Work & Ambiance
          </h2>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden shadow-xl mb-4"
          style={{ height: "400px" }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === current ? 1 : 0,
                zIndex: i === current ? 1 : 0,
              }}
            >
              <LazyImage
                src={img.src}
                alt={img.alt}
                eager={i === current}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="absolute top-3 right-3 z-10 bg-black/40 text-white text-xs px-2.5 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onDot(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-amber-600"
                  : "w-2.5 h-2.5 bg-amber-200 hover:bg-amber-400"
              }`}
            />
          ))}

          <button
            onClick={() => setIsAutoPlay((p) => !p)}
            className={`ml-2 text-xs px-3 py-1 rounded-full border transition ${
              isAutoPlay
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-white text-amber-700 border-amber-300"
            }`}
          >
            {isAutoPlay ? "⏸ Auto" : "▶ Auto"}
          </button>
        </div>

        <div className="grid grid-cols-6 gap-2 lg:gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onDot(i)}
              className={`rounded-xl overflow-hidden aspect-square transition-all duration-300 ${
                i === current
                  ? "ring-2 ring-amber-500 ring-offset-2 scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <LazyImage
                src={img.src}
                alt={img.alt}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAP SECTION ──────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Find Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900">
            Our Location
          </h2>
          <p className="text-stone-500 mt-3 text-sm lg:text-base">
            Visit us at our salon — centrally located for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-amber-100 space-y-5">
            <div>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">
                Address
              </p>
              <p className="text-stone-700 text-sm font-medium">
                Jl. Mengger Hilir No.162
                <br />
                Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40267
              </p>
            </div>

            <div>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">
                Opening Hours
              </p>
              <div className="text-stone-700 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="font-medium">09:00 – 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">08:00 – 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">10:00 – 18:00</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">
                Contact
              </p>
              <p className="text-stone-700 text-sm">📞 +62 812-3456-7890</p>
              <p className="text-stone-700 text-sm">✉️ hello@beautysalon.id</p>
            </div>

            <a
              href="https://maps.app.goo.gl/P7jQ824q55hUtvdRA"
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:from-amber-700 hover:to-orange-700 transition"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <LazyIframe
            title="Salon Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=107.629487,-6.975054,107.631487,-6.973054&layer=mapnik&marker=-6.974054,107.630487"
            wrapperClassName="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-amber-100"
            className="w-full h-full"
            style={{ height: "380px" }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const reviews = [
    {
      name: "Sarah Johnson",
      text: "Amazing experience! The staff is professional and the atmosphere is so relaxing.",
    },
    {
      name: "Emily Davis",
      text: "Best salon in town! I always leave feeling beautiful and refreshed.",
    },
    {
      name: "Jessica Miller",
      text: "Highly recommend! The quality of service is exceptional.",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-amber-900">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {reviews.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-amber-200"
            >
              <div className="mb-4 text-amber-500 text-lg">★★★★★</div>
              <p className="text-sm lg:text-base text-stone-700 mb-4 lg:mb-6 italic leading-relaxed">
                "{item.text}"
              </p>
              <p className="font-semibold text-amber-900 text-sm sm:text-base">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
          Ready to Transform Your Look?
        </h2>
        <p className="text-sm sm:text-lg mb-6 lg:mb-8 text-amber-50">
          Book your appointment today and enjoy premium beauty treatments.
        </p>
        <a
          href="/booking"
          className="inline-block bg-white text-amber-900 px-8 lg:px-10 py-3 lg:py-4 rounded-full font-semibold hover:scale-105 transition shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg"
        >
          Schedule Appointment
        </a>
      </div>
    </section>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);
  const [tilt, setTilt] = useState({});

  const handleNext = () => setCurrent((p) => (p + 1) % galleryImages.length);
  const handlePrev = () => setCurrent((p) => (p - 1 + galleryImages.length) % galleryImages.length);
  const handleMouseMove = (idx, x, y) => {
    setTilt((prev) => ({ ...prev, [idx]: { x, y } }));
  };
  const handleMouseLeave = (idx) => {
    setTilt((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));
  };

  useEffect(() => {
    if (!isAutoPlay) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      return;
    }
    autoPlayRef.current = setInterval(handleNext, 3500);
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay]);

  return (
    <div className="bg-white min-h-screen w-full">
      <HeroSection />
      <WhyChooseUsSection />

      <LazySection minHeight="760px">
        <ToolsSection 
          tools={salonTools} 
          tilt={tilt} 
          onMouseMove={handleMouseMove} 
          onMouseLeave={handleMouseLeave} 
        />
      </LazySection>

      <LazySection minHeight="760px">
        <VideoSection />
      </LazySection>

      <LazySection minHeight="760px">
        <GallerySection
          images={galleryImages}
          current={current}
          onNext={handleNext}
          onPrev={handlePrev}
          onDot={setCurrent}
          isAutoPlay={isAutoPlay}
          setIsAutoPlay={setIsAutoPlay}
        />
      </LazySection>

      <LazySection minHeight="700px">
        <MapSection />
      </LazySection>

      <LazySection minHeight="420px">
        <TestimonialsSection />
      </LazySection>

      <LazySection minHeight="280px">
        <CTASection />
      </LazySection>
    </div>
  );
}