'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Sorry, there was an error submitting your booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-pink-100 p-8 text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking request has been received. I'll send you an email confirmation soon.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            I'm so excited to help you learn Japanese! 😊
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors font-semibold"
          >
            Back to Chat
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/free-session" className="text-base sm:text-xl font-semibold text-gray-800 hover:text-pink-500 transition-colors">
            ← Back to Free Session
          </Link>
        </div>
      </header>

      {/* Booking Form */}
      <section className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-pink-100 border-4 border-pink-200">
              <Image
                src="/avatar/IMG_8820.jpg"
                alt="Sakura"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Book Your Free Session 🌸
          </h2>
          <p className="text-gray-600">
            Fill out the form below and I'll get back to you soon!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 sm:p-8">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-900"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-900"
                placeholder="john@example.com"
              />
            </div>

            {/* Preferred Date */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                required
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-900"
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time *
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                required
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-900 bg-white"
              >
                <option value="">Select a time</option>
                <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                <option value="13:00-14:00">1:00 PM - 2:00 PM</option>
                <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-900 resize-none"
                placeholder="Tell me a little about yourself or what you'd like to learn..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg shadow-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Book My Free Session 🌸'}
            </button>

            <p className="text-xs text-center text-gray-500">
              * Required fields. Don't worry, this is completely free and no commitment required.
            </p>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-pink-100 mt-12 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>Have questions? Feel free to reach out anytime 😊</p>
        </div>
      </footer>
    </main>
  );
}

