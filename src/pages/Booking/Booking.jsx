import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ChevronRight } from 'lucide-react';
import { servicesData } from '../Services/servicesdata';

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi';
    } else if (!/^[0-9+\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    if (!formData.service) {
      newErrors.service = 'Pilih layanan yang diinginkan';
    }

    if (!formData.date) {
      newErrors.date = 'Pilih tanggal appointment';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Tanggal tidak boleh di masa lalu';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Pilih waktu appointment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate('/summary', { state: { bookingData: formData } });
    } else {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };


  const selectedService = servicesData.find(s => s.id === parseInt(formData.service));

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      <section className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Book Appointment
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-amber-50 max-w-2xl mx-auto">
            Pilih layanan dan waktu yang sesuai untuk Anda
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-amber-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                  <User className="h-6 w-6 sm:h-7 sm:w-7" />
                  <span>Informasi Pribadi</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition ${
                          errors.name ? 'border-red-500' : 'border-amber-200'
                        }`}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition ${
                          errors.email ? 'border-red-500' : 'border-amber-200'
                        }`}
                        placeholder="nama@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-2">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition ${
                          errors.phone ? 'border-red-500' : 'border-amber-200'
                        }`}
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7" />
                  <span>Pilih Layanan & Waktu</span>
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-stone-700 mb-2">
                      Layanan <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition ${
                        errors.service ? 'border-red-500' : 'border-amber-200'
                      }`}
                    >
                      <option value="">Pilih layanan...</option>
                      {servicesData.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-500">{errors.service}</p>
                    )}
                    
                    {selectedService && (
                      <div className="mt-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                        <div className="flex items-start gap-4">
                          <img
                            src={selectedService.image}
                            alt={selectedService.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-amber-900 mb-1">{selectedService.name}</h3>
                            <p className="text-sm text-stone-600 mb-2">{selectedService.description}</p>
                            <div className="flex gap-4 text-sm">
                              <span className="font-semibold text-amber-700">{selectedService.price}</span>
                              <span className="text-stone-500">•</span>
                              <span className="text-stone-600">{selectedService.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    
                    <div>
                      <label htmlFor="date" className="block text-sm font-semibold text-stone-700 mb-2">
                        Tanggal <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 pointer-events-none" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={getMinDate()}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition ${
                            errors.date ? 'border-red-500' : 'border-amber-200'
                          }`}
                        />
                      </div>
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                      )}
                    </div>

\                    <div>
                      <label htmlFor="time" className="block text-sm font-semibold text-stone-700 mb-2">
                        Waktu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5 pointer-events-none" />
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition ${
                            errors.time ? 'border-red-500' : 'border-amber-200'
                          }`}
                        >
                          <option value="">Pilih waktu...</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.time && (
                        <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-stone-700 mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-stone-400 h-5 w-5" />
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                    placeholder="Tambahkan informasi khusus atau permintaan..."
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white py-4 rounded-lg hover:from-amber-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-[1.02] font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan ke Ringkasan</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-stone-700">
                  <strong>Perlu bantuan?</strong> Hubungi kami di{' '}
                  <a
                    href="tel:+6281234567890"
                    className="text-amber-800 font-semibold hover:text-orange-700 hover:underline"
                  >
                    +62 812-3456-7890
                  </a>{' '}
                  atau{' '}
                  <a
                    href="mailto:info@beautysalon.com"
                    className="text-amber-800 font-semibold hover:text-orange-700 hover:underline"
                  >
                    info@beautysalon.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
            Informasi Penting
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <div className="text-3xl mb-3">📅</div>
              <h4 className="font-bold text-amber-900 mb-2">Konfirmasi Booking</h4>
              <p className="text-sm text-stone-600">
                Anda akan menerima konfirmasi via email dan SMS dalam 24 jam
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="font-bold text-amber-900 mb-2">Datang Tepat Waktu</h4>
              <p className="text-sm text-stone-600">
                Mohon datang 10 menit sebelum jadwal untuk proses check-in
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="font-bold text-amber-900 mb-2">Pembatalan</h4>
              <p className="text-sm text-stone-600">
                Pembatalan dapat dilakukan minimal 24 jam sebelum jadwal
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking; 