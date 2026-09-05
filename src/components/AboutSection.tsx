import { ArrowUpRight } from 'lucide-react';
import { CornerTL } from './Svgs.tsx';
import {
  ScrollLineReveal,
  ScrollAboutCard,
  ScrollEditorialButton,
} from './MotionTypography.tsx';

export default function AboutSection() {
  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const focusPoints = [
    { title: 'Modern Website Design', desc: 'Bespoke art-directed layouts designed around your specific brand.' },
    { title: 'Mobile-First Experiences', desc: 'Engineered first for touch screens where your customers actually browse.' },
    { title: 'Responsive Desktop Experiences', desc: 'Balanced whitespace and scalable typography that command large displays.' },
    { title: 'Thoughtful UI / UX', desc: 'Intuitive structure, clear hierarchy, and frictionless conversion paths.' },
    { title: 'Business-Focused Design', desc: 'Shaped directly around your industry, audience, and commercial goals.' },
    { title: 'Practical / Reasonable Pricing', desc: 'Agency-grade craft delivered directly without inflated agency overhead.' },
  ];

  return (
    <section
      id="about"
      className="relative z-20 w-full bg-white text-black border-t border-gray-200 overflow-hidden"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingTop: 'clamp(3.5rem, 6vh, 5.5rem)',
        paddingBottom: 'clamp(3.5rem, 6vh, 5.5rem)',
      }}
    >
      {/* Architectural subtle grid pattern */}
      <div className="grid-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <CornerTL className="text-black w-3.5 h-3.5" />
          <ScrollLineReveal offsetY={6} phase={0}>
            <span
              className="font-orbitron font-bold uppercase tracking-[0.2em] text-gray-500"
              style={{ fontSize: 'var(--micro)' }}
            >
              [ ABOUT US // PHILOSOPHY & CRAFT ]
            </span>
          </ScrollLineReveal>
        </div>

        {/* Section Headline */}
        <div className="border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <ScrollLineReveal offsetY={8} phase={0.05}>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-1">
                DESIGNER & DEVELOPER // ARFAT
              </span>
            </ScrollLineReveal>
            <ScrollLineReveal offsetY={16} phase={0.15}>
              <h2 className="font-orbitron font-black uppercase text-black leading-tight tracking-wide text-2xl sm:text-3xl lg:text-4xl select-none">
                WHO I AM & WHAT I FOCUS ON
              </h2>
            </ScrollLineReveal>
          </div>

          <ScrollLineReveal offsetY={12} phase={0.25}>
            <p className="font-jakarta text-gray-700 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
              I focus on creating modern, highly designed, responsive websites for businesses —
              combining strong visual design with usability and practical pricing.
            </p>
          </ScrollLineReveal>
        </div>

        {/* Focus Pillars Grid: 3 columns on mobile and desktop */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3.5 lg:gap-5 pt-6 sm:pt-8">
          {focusPoints.map((item, idx) => (
            <ScrollAboutCard
              key={item.title}
              number={`0${idx + 1}`}
              title={item.title}
              desc={item.desc}
              index={idx}
            />
          ))}
        </div>

        {/* Bottom Direct Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 mt-8">
          <ScrollLineReveal offsetY={6} phase={0}>
            <p className="font-jakarta text-xs text-gray-500">
              Every project is built directly by Arfat with personal attention to every line of code and
              visual detail.
            </p>
          </ScrollLineReveal>
          <ScrollEditorialButton>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-xs font-orbitron font-bold uppercase tracking-wider text-black hover:opacity-60 transition-opacity cursor-pointer select-none"
            >
              <span>DISCUSS A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </ScrollEditorialButton>
        </div>
      </div>
    </section>
  );
}
