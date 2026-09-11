import React, { useState } from 'react';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  UsersIcon,
  BookOpenIcon,
  TargetIcon,
  BrainCircuitIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  AwardIcon } from
'lucide-react';
interface LandingPageProps {
  onStart: () => void;
}
export function LandingPage({ onStart }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el)
    el.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BrainCircuitIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">EmpReady AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('about')}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">

              About Us
            </button>
          </div>
          <button
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">

            Start Assessment
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                XGBoost + Fuzzy Logic Engine
              </div>
              <h1 className="text-5xl font-black text-gray-900 leading-tight mb-5">
                Employment
                <br />
                Readiness
                <br />
                <span className="text-blue-600">Prediction System</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                A research-backed AI system that evaluates graduate
                employability using academic performance, technical skills, and
                professional development indicators.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onStart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-lg flex items-center gap-2 transition-colors">

                  Start Assessment
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('about')}
                  className="border border-gray-200 text-gray-600 font-semibold px-7 py-3.5 rounded-lg flex items-center gap-2 hover:border-gray-300 hover:text-gray-900 transition-colors">

                  Learn More
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* SVG Illustration */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl"></div>
                <svg
                  viewBox="0 0 400 380"
                  className="relative w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">

                  {/* Background circles */}
                  <circle cx="200" cy="190" r="150" fill="#EFF6FF" />
                  <circle
                    cx="200"
                    cy="190"
                    r="110"
                    fill="#DBEAFE"
                    opacity="0.5" />


                  {/* Desk */}
                  <rect
                    x="80"
                    y="260"
                    width="240"
                    height="12"
                    rx="6"
                    fill="#CBD5E1" />

                  <rect
                    x="100"
                    y="272"
                    width="8"
                    height="50"
                    rx="4"
                    fill="#94A3B8" />

                  <rect
                    x="292"
                    y="272"
                    width="8"
                    height="50"
                    rx="4"
                    fill="#94A3B8" />


                  {/* Laptop */}
                  <rect
                    x="130"
                    y="200"
                    width="140"
                    height="90"
                    rx="8"
                    fill="#1E293B" />

                  <rect
                    x="136"
                    y="206"
                    width="128"
                    height="78"
                    rx="4"
                    fill="#0F172A" />

                  <rect
                    x="140"
                    y="210"
                    width="120"
                    height="70"
                    rx="3"
                    fill="#1D4ED8"
                    opacity="0.9" />

                  {/* Screen content lines */}
                  <rect
                    x="148"
                    y="220"
                    width="60"
                    height="4"
                    rx="2"
                    fill="white"
                    opacity="0.7" />

                  <rect
                    x="148"
                    y="230"
                    width="80"
                    height="3"
                    rx="1.5"
                    fill="white"
                    opacity="0.4" />

                  <rect
                    x="148"
                    y="238"
                    width="70"
                    height="3"
                    rx="1.5"
                    fill="white"
                    opacity="0.4" />

                  <rect
                    x="148"
                    y="248"
                    width="50"
                    height="3"
                    rx="1.5"
                    fill="white"
                    opacity="0.4" />

                  {/* Chart bars on screen */}
                  <rect
                    x="200"
                    y="255"
                    width="10"
                    height="20"
                    rx="2"
                    fill="#60A5FA" />

                  <rect
                    x="214"
                    y="248"
                    width="10"
                    height="27"
                    rx="2"
                    fill="#93C5FD" />

                  <rect
                    x="228"
                    y="240"
                    width="10"
                    height="35"
                    rx="2"
                    fill="#3B82F6" />

                  {/* Laptop base */}
                  <rect
                    x="120"
                    y="290"
                    width="160"
                    height="8"
                    rx="4"
                    fill="#334155" />


                  {/* Person */}
                  {/* Head */}
                  <circle cx="200" cy="155" r="28" fill="#FED7AA" />
                  {/* Hair */}
                  <path
                    d="M172 148 Q175 125 200 122 Q225 125 228 148 Q220 135 200 133 Q180 135 172 148Z"
                    fill="#92400E" />

                  {/* Body */}
                  <rect
                    x="175"
                    y="183"
                    width="50"
                    height="55"
                    rx="10"
                    fill="#2563EB" />

                  {/* Collar */}
                  <path
                    d="M192 183 L200 195 L208 183"
                    fill="white"
                    opacity="0.9" />

                  {/* Arms */}
                  <rect
                    x="148"
                    y="185"
                    width="28"
                    height="14"
                    rx="7"
                    fill="#2563EB" />

                  <rect
                    x="224"
                    y="185"
                    width="28"
                    height="14"
                    rx="7"
                    fill="#2563EB" />

                  {/* Hands */}
                  <circle cx="148" cy="192" r="8" fill="#FED7AA" />
                  <circle cx="252" cy="192" r="8" fill="#FED7AA" />
                  {/* Face features */}
                  <circle cx="192" cy="152" r="3" fill="#92400E" />
                  <circle cx="208" cy="152" r="3" fill="#92400E" />
                  <path
                    d="M193 163 Q200 168 207 163"
                    stroke="#92400E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none" />


                  {/* Floating cards */}
                  {/* Card 1 - top left */}
                  <rect
                    x="30"
                    y="80"
                    width="90"
                    height="55"
                    rx="10"
                    fill="white"
                    filter="url(#shadow)" />

                  <rect
                    x="30"
                    y="80"
                    width="90"
                    height="55"
                    rx="10"
                    stroke="#E2E8F0"
                    strokeWidth="1" />

                  <circle cx="50" cy="100" r="8" fill="#DBEAFE" />
                  <BrainCircuitIcon />
                  <rect
                    x="44"
                    y="96"
                    width="12"
                    height="8"
                    rx="2"
                    fill="#2563EB"
                    opacity="0.6" />

                  <rect
                    x="62"
                    y="97"
                    width="45"
                    height="4"
                    rx="2"
                    fill="#CBD5E1" />

                  <rect
                    x="62"
                    y="105"
                    width="35"
                    height="3"
                    rx="1.5"
                    fill="#E2E8F0" />

                  <rect
                    x="40"
                    y="118"
                    width="65"
                    height="3"
                    rx="1.5"
                    fill="#E2E8F0" />

                  <rect
                    x="40"
                    y="125"
                    width="50"
                    height="3"
                    rx="1.5"
                    fill="#E2E8F0" />


                  {/* Card 2 - top right */}
                  <rect
                    x="280"
                    y="60"
                    width="90"
                    height="55"
                    rx="10"
                    fill="white" />

                  <rect
                    x="280"
                    y="60"
                    width="90"
                    height="55"
                    rx="10"
                    stroke="#E2E8F0"
                    strokeWidth="1" />

                  <circle cx="300" cy="80" r="8" fill="#DCFCE7" />
                  <rect
                    x="294"
                    y="76"
                    width="12"
                    height="8"
                    rx="2"
                    fill="#16A34A"
                    opacity="0.6" />

                  <rect
                    x="312"
                    y="77"
                    width="45"
                    height="4"
                    rx="2"
                    fill="#CBD5E1" />

                  <rect
                    x="312"
                    y="85"
                    width="35"
                    height="3"
                    rx="1.5"
                    fill="#E2E8F0" />

                  <rect
                    x="290"
                    y="98"
                    width="65"
                    height="3"
                    rx="1.5"
                    fill="#E2E8F0" />

                  <rect
                    x="290"
                    y="105"
                    width="50"
                    height="3"
                    rx="1.5"
                    fill="#E2E8F0" />


                  {/* Badge - bottom right */}
                  <rect
                    x="295"
                    y="230"
                    width="85"
                    height="40"
                    rx="8"
                    fill="#2563EB" />

                  <rect
                    x="303"
                    y="238"
                    width="40"
                    height="4"
                    rx="2"
                    fill="white"
                    opacity="0.9" />

                  <rect
                    x="303"
                    y="246"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="white"
                    opacity="0.6" />

                  <rect
                    x="303"
                    y="254"
                    width="45"
                    height="3"
                    rx="1.5"
                    fill="white"
                    opacity="0.6" />


                  <defs>
                    <filter
                      id="shadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%">

                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="4"
                        floodOpacity="0.08" />

                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
            About This System
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-6">
            Employment Readiness Prediction System
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-12">
            A research-based assessment tool developed to evaluate employment
            readiness among ICT graduates and students. It provides an AI-driven
            prediction of employability level based on academic, technical,
            practical, and professional indicators.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                Research Background
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Developed as part of a university research project within the
                Faculty of Computing. The objective is to identify readiness
                patterns and support early detection of students who may require
                skill improvement before entering the job market.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                How It Works
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                The system uses a hybrid machine learning approach:
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>
                    <strong className="text-gray-700">XGBoost</strong> for
                    predictive modeling.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>
                    <strong className="text-gray-700">Fuzzy Logic</strong> for
                    interpretability and recommendation reasoning.
                  </span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 leading-relaxed">
                Responses are classified into:{' '}
                <strong className="text-gray-700">Highly Employable</strong>,{' '}
                <strong className="text-gray-700">Moderately Employable</strong>
                , or <strong className="text-gray-700">At Risk</strong>.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
              Important Note
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              This system is intended for{' '}
              <strong className="text-gray-700">
                academic assessment purposes only
              </strong>
              . The prediction result is not a guarantee of employment and
              should be considered as a readiness indicator.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to find out your employability level?
          </h2>
          <p className="text-blue-100 mb-8">
            Complete the 5-section assessment and receive your personalized
            employment readiness prediction. This system is an assessment tool —
            not a job guarantee.
          </p>
          <button
            onClick={onStart}
            className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2">

            Start Assessment Now
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <BrainCircuitIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">EmpReady AI</span>
          </div>
          <p className="text-xs text-gray-400">
            Employment Readiness Prediction System — Research Project © 2024
          </p>
          <div className="flex gap-5">
            <span className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              Privacy Policy
            </span>
            <span className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              Research Ethics
            </span>
          </div>
        </div>
      </footer>
    </div>);

}