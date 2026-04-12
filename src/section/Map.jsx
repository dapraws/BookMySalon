import { LazyIframe } from "../components/Lazy";
import React, { useState, useEffect, useRef } from "react";

export default function MapSection() {
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