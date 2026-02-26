import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { servicesData, categories } from "./servicesdata";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = servicesData.filter(service => {
    const matchCategory =
      selectedCategory === "All" || service.category === selectedCategory;

    const matchSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      <section className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Layanan Kami
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-amber-50 max-w-2xl mx-auto">
            Temukan berbagai layanan kecantikan profesional untuk kebutuhan Anda
          </p>
        </div>
      </section>

      <section className="sticky top-0 z-40 bg-white shadow-md py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-center">

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Cari layanan..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600 flex-shrink-0" />
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium whitespace-nowrap transition text-sm sm:text-base
                    ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md"
                        : "bg-stone-200 text-stone-700 hover:bg-amber-100 hover:text-amber-900"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {filteredServices.length === 0 ? (
            <div className="text-center py-12 sm:py-20 text-stone-600 text-lg sm:text-xl">
              Tidak ada layanan ditemukan
            </div>
          ) : (
            <>
              <p className="text-sm sm:text-base text-stone-600 mb-4 sm:mb-6">
                Menampilkan {filteredServices.length} layanan
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredServices.map(service => (
                  <div
                    key={service.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-amber-100"
                  >
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden rounded-t-xl">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                      />
                      <span className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                        {service.category}
                      </span>
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-amber-900">
                        {service.name}
                      </h3>
                      <p className="text-sm sm:text-base text-stone-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-xs sm:text-sm text-stone-500">Harga</p>
                          <p className="text-lg sm:text-2xl font-bold text-amber-700">
                            {service.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-stone-500">Durasi</p>
                          <p className="text-sm sm:text-base font-semibold text-stone-700">{service.duration}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/services/${service.id}`}
                          className="flex-1 text-center bg-gradient-to-r from-amber-600 to-orange-700 text-white py-2 sm:py-2.5 rounded-lg hover:from-amber-700 hover:to-orange-800 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition"
                        >
                          Lihat Detail
                        </Link>
                        <Link
                          to="/booking"
                          className="px-3 sm:px-4 bg-stone-200 text-stone-700 rounded-lg hover:bg-amber-100 hover:text-amber-900 font-semibold text-sm sm:text-base transition flex items-center justify-center"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 px-4">
          Tertarik dengan Layanan Kami?
        </h2>
        <p className="text-base sm:text-xl mb-6 sm:mb-8 text-amber-50 px-4">
          Hubungi kami sekarang untuk konsultasi gratis
        </p>
        <Link
          to="/booking"
          className="inline-block bg-white text-amber-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:scale-105 transition shadow-lg hover:shadow-xl"
        >
          Booking Sekarang
        </Link>
      </section>
    </div>
  );
};

export default Services;