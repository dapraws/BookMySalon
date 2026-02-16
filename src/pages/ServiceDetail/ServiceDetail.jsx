import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, DollarSign, CheckCircle, Heart, ArrowLeft, Calendar } from 'lucide-react';

import { servicesData } from '../Services/servicesdata';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">Layanan Tidak Ditemukan</h1>
          <Link to="/services" className="text-amber-700 hover:text-orange-700 hover:underline font-semibold">
            Kembali ke halaman layanan
          </Link>
        </div>
      </div>
    );
  }

  const relatedServices = servicesData
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600">
            <Link to="/" className="hover:text-amber-700 transition">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-amber-700 transition">Services</Link>
            <span>/</span>
            <span className="text-amber-900 font-medium truncate">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Kembali</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl border border-amber-200">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                  {service.category}
                </div>
              </div>
              
              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-amber-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-amber-100 p-2 sm:p-3 rounded-full">
                      <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-stone-600">Harga</p>
                      <p className="text-sm sm:text-lg font-bold text-amber-900">{service.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-amber-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-orange-100 p-2 sm:p-3 rounded-full">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-700" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-stone-600">Durasi</p>
                      <p className="text-sm sm:text-lg font-bold text-amber-900">{service.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-3 sm:mb-4">
                  {service.name}
                </h1>
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-amber-100">
                <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-700" />
                  <span>Yang Termasuk</span>
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-stone-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-6 rounded-xl border border-amber-200">
                <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-amber-700" />
                  <span>Manfaat</span>
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-stone-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sm:gap-4">
                <Link
                  to="/booking"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 sm:py-4 rounded-lg hover:from-amber-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 font-bold text-sm sm:text-lg flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Book Sekarang</span>
                </Link>
                <button className="px-4 sm:px-6 bg-stone-200 text-stone-700 rounded-lg hover:bg-amber-100 hover:text-amber-900 transition-all duration-300 font-semibold">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-amber-100 p-3 sm:p-4 rounded-lg border border-amber-200">
                <p className="text-xs sm:text-sm text-stone-700">
                  Butuh konsultasi? Hubungi kami di{' '}
                  <a href="tel:+6281234567890" className="text-amber-800 font-semibold hover:text-orange-700 hover:underline">
                    +62 812-3456-7890
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 sm:mb-8">
              Layanan Terkait
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {relatedServices.map((relatedService) => (
                <div
                  key={relatedService.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={relatedService.image}
                      alt={relatedService.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">
                      {relatedService.name}
                    </h3>
                    <p className="text-stone-600 mb-3 line-clamp-2 text-xs sm:text-sm">
                      {relatedService.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-base sm:text-lg font-bold text-amber-700">
                        {relatedService.price}
                      </span>
                      <span className="text-xs sm:text-sm text-stone-500">
                        {relatedService.duration}
                      </span>
                    </div>
                    
                    <Link
                      to={`/services/${relatedService.id}`}
                      className="block text-center bg-gradient-to-r from-amber-600 to-orange-700 text-white py-2 rounded-lg hover:from-amber-700 hover:to-orange-800 transition-colors duration-300 text-xs sm:text-sm font-semibold shadow-md"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Siap Mencoba {service.name}?
          </h2>
          <p className="text-base sm:text-xl text-amber-50 mb-6 sm:mb-8">
            Book sekarang dan rasakan pengalaman layanan terbaik kami
          </p>
          <Link
            to="/booking"
            className="inline-block bg-white text-amber-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;