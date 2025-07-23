"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
        <div className="absolute -bottom-32 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4s"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-50 animation-delay-3s"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping opacity-60 animation-delay-1s"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Main content card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25">
          {/* Logo with glow effect */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Image
              src="/logo.png"
              width={200}
              height={250}
              alt="logo"
              className="relative mx-auto drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all duration-300"
            />
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            AI Mock Interview
            <span className="block text-3xl md:text-4xl mt-2 text-white/90 font-semibold">
              Platform
            </span>
          </h1>

          {/* Subtitle with enhanced styling */}
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Master your interview skills with AI-driven questions, instant feedback, and comprehensive recording capabilities. 
            <span className="text-cyan-300 font-semibold"> Transform preparation into success!</span>
          </p>

          {/* Enhanced CTA button */}
          <Link href="/dashboard" passHref legacyBehavior>
            <a className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 mb-12 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </Link>

          {/* Features section with cards */}
          <div className="border-t border-white/20 pt-8">
            <h2 className="text-2xl font-bold mb-8 text-white">
              Powerful Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🎯",
                  title: "AI-Tailored Questions",
                  desc: "Smart questions adapted to your specific job role and industry"
                },
                // {
                //   icon: "📹",
                //   title: "HD Recording",
                //   desc: "Professional video & audio recording with playback analysis"
                // },
                {
                  icon: "⚡",
                  title: "Instant Feedback",
                  desc: "Real-time AI analysis with actionable improvement suggestions"
                },
                {
                  icon: "📊",
                  title: "Progress Tracking",
                  desc: "Detailed analytics to monitor your interview skills evolution"
                },
                // {
                //   icon: "🔒",
                //   title: "Privacy First",
                //   desc: "Your data stays secure with enterprise-grade protection"
                // },
                {
                  icon: "🚀",
                  title: "Career Ready",
                  desc: "Build confidence for any interview scenario or company"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-white/60 text-sm bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            &copy; {new Date().getFullYear()} AI Mock Interview. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Additional CSS for animations */}
      <style jsx>{`
        .animation-delay-1s {
          animation-delay: 1s;
        }
        .animation-delay-2s {
          animation-delay: 2s;
        }
        .animation-delay-3s {
          animation-delay: 3s;
        }
        .animation-delay-4s {
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}