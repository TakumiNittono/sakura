'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FreeSessionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-base sm:text-xl font-semibold text-gray-800">JAPANESE TEACHER SAKURA</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-pink-100 border-4 border-pink-200">
              <Image
                src="/avatar/IMG_8820.jpg"
                alt="Sakura"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
            Free 1-on-1 Session 🌸
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Let's learn Japanese together, step by step, very gently.
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
            What You'll Get
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">😊</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Very Relaxed Atmosphere</h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  No pressure at all. We'll go at your own pace, very gently.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">🌸</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Personalized Learning</h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  One-on-one session tailored just for you. I'll help you step by step.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">💝</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">100% Free</h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  This session is completely free. No hidden costs, no pressure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/free-session/booking"
            className="inline-block px-8 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Book Your Free Session Now →
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            It only takes a minute to book. No commitment required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-pink-100 mt-12 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>Questions? Feel free to reach out anytime 😊</p>
        </div>
      </footer>
    </main>
  );
}

