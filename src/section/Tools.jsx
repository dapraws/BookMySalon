import React, { useRef } from "react"; // <- pastikan useRef diimport
import { LazyIframe } from "../components/Lazy"; // pastikan path sesuai

export default function ToolsSection({ tools, tilt, onMouseMove, onMouseLeave }) {
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