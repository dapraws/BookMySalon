import React, { useState, useEffect, useRef } from "react";
import { LazyImage } from "../components/Lazy";

export default function VideoSection() {
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
    <section ref={sectionRef} className="py-12 lg:py-20 bg-gradient-to-br from-stone-900 to-amber-950">
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
            <div className="absolute inset-0 cursor-pointer group" onClick={() => setPlaying(true)}>
              <LazyImage
                src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
                alt="Salon Video Thumbnail"
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-amber-600 hover:bg-amber-500 transition rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 duration-300">
                  <svg className="w-7 h-7 lg:w-9 lg:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
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