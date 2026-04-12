import React, { useState, useRef, useEffect } from "react";

// LazySection: render section saat scroll mendekati viewport
export function LazySection({ children, minHeight = "320px", rootMargin = "200px" }) {
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

// LazyImage: responsive WebP + eager/lazy load
export function LazyImage({ src, alt, className = "", wrapperClassName = "", style, eager = false, ...props }) {
  const [isVisible, setIsVisible] = useState(eager);
  const [isLoaded, setIsLoaded] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (eager) return;
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "150px" });
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

// LazyIframe: hanya render iframe saat scroll mendekati viewport
export function LazyIframe({ src, title, wrapperClassName = "", className = "", style, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
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