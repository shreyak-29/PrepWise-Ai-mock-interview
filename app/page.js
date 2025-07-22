import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg flex flex-col items-center">
        <Image src="/logo.svg" width={120} height={80} alt="logo" className="mb-4" />
        <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">AI Mock Interview Platform</h1>
        <p className="text-gray-600 text-center mb-6">
          Practice your interview skills with AI-driven questions, instant feedback, and video/audio recording. Get ready for your next big opportunity!
        </p>
        <Link href="/dashboard">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition mb-6">
            Get Started
          </button>
        </Link>
        <div className="w-full border-t pt-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-700 text-center">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>AI-generated interview questions tailored to your job role</li>
            <li>Video & audio answer recording</li>
            <li>Instant AI feedback and improvement tips</li>
            <li>Track your progress over time</li>
            <li>Simple, privacy-first experience</li>
          </ul>
        </div>
      </div>
      <footer className="mt-10 text-gray-400 text-sm">&copy; {new Date().getFullYear()} AI Mock Interview. All rights reserved.</footer>
    </main>
  );
}
