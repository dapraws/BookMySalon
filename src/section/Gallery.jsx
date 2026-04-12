import { LazyImage } from "../components/Lazy";
import React, { useState, useEffect, useRef } from "react";

export default function GallerySection({
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