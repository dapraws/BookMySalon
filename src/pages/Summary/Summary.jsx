import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, MessageSquare, MapPin, Edit, ArrowLeft } from 'lucide-react';
import { servicesData } from '../Services/servicesdata';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Tidak Ada Data Booking</h1>
          <p className="text-stone-600 mb-6">Silakan isi form booking terlebih dahulu</p>
          <Link
            to="/booking"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-700 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-orange-800 transition"
          >
            Kembali ke Booking
          </Link>
        </div>
      </div>
    );
  }

  const selectedService = servicesData.find(s => s.id === parseInt(bookingData.service));

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-amber-100">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
                Booking Berhasil!
              </h1>
              <p className="text-lg text-stone-600 mb-6">
                Terima kasih telah mempercayai kami untuk perawatan kecantikan Anda
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-8 border border-amber-200">
              <h2 className="font-bold text-amber-900 mb-4 text-lg">Detail Appointment</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-stone-600">Nama</p>
                    <p className="font-semibold text-stone-800">{bookingData.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-stone-600">Tanggal & Waktu</p>
                    <p className="font-semibold text-stone-800">
                      {formatDate(bookingData.date)} - {bookingData.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-stone-600">Layanan</p>
                    <p className="font-semibold text-stone-800">{selectedService?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg mb-8 border border-amber-200">
              <p className="text-sm text-stone-700">
                <strong>Konfirmasi telah dikirim ke:</strong><br />
                📧 {bookingData.email}<br />
                📱 {bookingData.phone}
              </p>
            </div>

            <div className="space-y-3">
              <Link
                to="/"
                className="block w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 rounded-full font-semibold hover:from-amber-700 hover:to-orange-800 transition"
              >
                Kembali ke Home
              </Link>
              <Link
                to="/services"
                className="block w-full bg-stone-200 text-stone-700 py-3 rounded-full font-semibold hover:bg-amber-100 hover:text-amber-900 transition"
              >
                Lihat Layanan Lain
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      <section className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Ringkasan Booking
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-amber-50 max-w-2xl mx-auto">
            Periksa kembali detail appointment Anda sebelum konfirmasi
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali ke Form Booking</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-amber-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
                    <User className="h-6 w-6" />
                    <span>Informasi Pribadi</span>
                  </h2>
                  <button
                    onClick={() => navigate(-1)}
                    className="text-amber-700 hover:text-orange-700 flex items-center gap-1 text-sm font-semibold"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                    <User className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-stone-600 mb-1">Nama Lengkap</p>
                      <p className="font-semibold text-stone-800">{bookingData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                    <Mail className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-stone-600 mb-1">Email</p>
                      <p className="font-semibold text-stone-800">{bookingData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                    <Phone className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-stone-600 mb-1">Nomor Telepon</p>
                      <p className="font-semibold text-stone-800">{bookingData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-amber-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    <span>Detail Appointment</span>
                  </h2>
                  <button
                    onClick={() => navigate(-1)}
                    className="text-amber-700 hover:text-orange-700 flex items-center gap-1 text-sm font-semibold"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>

                {selectedService && (
                  <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="flex items-start gap-4">
                      <img
                        src={selectedService.image}
                        alt={selectedService.name}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900 mb-2 text-lg">{selectedService.name}</h3>
                        <p className="text-sm text-stone-600 mb-3">{selectedService.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="font-semibold text-amber-700">{selectedService.price}</span>
                          <span className="text-stone-400">•</span>
                          <span className="text-stone-600 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {selectedService.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-stone-600 mb-1">Tanggal</p>
                      <p className="font-semibold text-stone-800">{formatDate(bookingData.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                    <Clock className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-stone-600 mb-1">Waktu</p>
                      <p className="font-semibold text-stone-800">{bookingData.time} WIB</p>
                    </div>
                  </div>

                  {bookingData.notes && (
                    <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-stone-600 mb-1">Catatan Tambahan</p>
                        <p className="text-stone-800">{bookingData.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-amber-100">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Ringkasan Harga</h3>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-stone-200">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Layanan</span>
                    <span className="font-semibold text-stone-800">{selectedService?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Durasi</span>
                    <span className="text-stone-600">{selectedService?.duration}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-900">Total</span>
                  <span className="text-2xl font-bold text-amber-700">{selectedService?.price}</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Lokasi Salon</span>
                </h3>
                <p className="text-sm text-stone-700 mb-3">
                  Jl. Kecantikan No. 123<br />
                  Jakarta Selatan, 12345<br />
                  Indonesia
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-700 font-semibold hover:text-orange-700 hover:underline"
                >
                  Lihat di Google Maps →
                </a>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-4 rounded-lg hover:from-amber-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Konfirmasi Booking</span>
                  </>
                )}
              </button>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-xs text-stone-700">
                  <strong>Catatan:</strong><br />
                  • Konfirmasi akan dikirim via email & SMS<br />
                  • Datang 10 menit lebih awal<br />
                  • Pembatalan minimal H-1<br />
                  • Hubungi kami jika ada perubahan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Summary; 