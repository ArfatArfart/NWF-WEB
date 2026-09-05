import { ArrowUpRight, Check, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { CornerBL, CornerBR, CornerTL, CornerTR } from './Svgs.tsx';
import SkeletonRevealPanel from './SkeletonRevealPanel.tsx';
import {
  ScrollLineCharacters,
  ScrollLineReveal,
  ScrollWordCluster,
  ScrollFeatureChain,
  ScrollEditorialButton,
} from './MotionTypography.tsx';

interface ServicesOverviewProps {
  onContactClick: () => void;
}

export default function ServicesOverview({ onContactClick }: ServicesOverviewProps) {

  return (
    <section
      id="services"
      className="relative z-20 w-full bg-white border-t border-gray-200 overflow-hidden box-border lg:h-[100svh] lg:max-h-[100svh] lg:min-h-0 flex flex-col justify-center"
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle architectural dot grid background */}
      <div className="grid-overlay" />

      {/* Main split composition — strictly contained within 100svh on desktop */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center min-h-0">
        {/* LEFT COLUMN: Concise, premium text explanation (vertically centered on desktop, below image on mobile) */}
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center py-8 sm:py-10 lg:py-4 px-5 sm:px-8 lg:pl-[var(--pad-x)] lg:pr-8 xl:pr-12 relative z-10 min-h-0 h-full">
          {/* Top bracket anchor */}
          <CornerTL
            className="text-black mb-2 sm:mb-3 shrink-0"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />

          {/* Section Eyebrow */}
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <ScrollLineReveal offsetY={8} phase={0}>
              <span
                className="font-orbitron font-bold uppercase tracking-[0.2em] text-gray-500"
                style={{ fontSize: 'var(--micro)' }}
              >
                [ 01 // WEB DESIGN & DEVELOPMENT ]
              </span>
            </ScrollLineReveal>
          </div>

          {/* Main Section Headline */}
          <h2
            id="overview-headline"
            className="font-orbitron font-black uppercase text-black leading-[1.12] sm:leading-[1.08] tracking-[0.04em] sm:tracking-[0.06em] select-none shrink-0 text-xl sm:text-2xl lg:text-[clamp(1.75rem,2.4vw+0.3rem,2.85rem)]"
          >
            <ScrollLineCharacters text="MODERN WEBSITES." linePhase={0} />
            <ScrollLineCharacters
              text="BUILT FOR YOUR BUSINESS."
              linePhase={0.22}
              className="text-gray-400 mt-0.5 sm:mt-0"
            />
          </h2>

          {/* Refined core messaging */}
          <ScrollWordCluster
            text="Beautiful, responsive websites designed to help your business stand out — without the unnecessary price tag. We build fluid, mobile-first experiences and desktop-grade digital platforms tailored to your specific industry."
            className="font-jakarta text-gray-700 leading-relaxed mt-2.5 sm:mt-4 max-w-lg font-normal shrink-0 text-xs sm:text-sm lg:text-[clamp(0.8rem,0.35vw+0.65rem,0.95rem)]"
          />

          {/* Key capability highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-gray-100 max-w-lg shrink-0">
            <ScrollFeatureChain
              index={0}
              icon={<Smartphone className="w-3.5 h-3.5" />}
              title="Mobile Responsive"
              desc="Flawless touch experience on every screen."
            />
            <ScrollFeatureChain
              index={1}
              icon={<Monitor className="w-3.5 h-3.5" />}
              title="Desktop Precision"
              desc="High-density UI and balanced typography."
            />
            <ScrollFeatureChain
              index={2}
              icon={<Sparkles className="w-3.5 h-3.5" />}
              title="Bespoke UI Design"
              desc="Unique visual identity for your business."
            />
            <ScrollFeatureChain
              index={3}
              icon={<Check className="w-3.5 h-3.5" />}
              title="Fair, Honest Pricing"
              desc="Agency caliber craft without inflated rates."
            />
          </div>

          {/* Action trigger */}
          <div className="mt-5 sm:mt-6 shrink-0">
            <ScrollEditorialButton>
              <button
                id="overview-contact-cta-btn"
                type="button"
                onClick={onContactClick}
                className="min-h-[48px] px-6 py-3 flex items-center justify-center gap-2 border border-gray-400 rounded-md uppercase tracking-[0.18em] transition-all hover:bg-black hover:text-white hover:border-black group w-full sm:w-fit cursor-pointer select-none"
                style={{
                  fontSize: 'var(--body)',
                }}
              >
                <span>Discuss Your Website</span>
                <ArrowUpRight
                  strokeWidth={1.5}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0"
                  style={{ width: 'var(--icon)', height: 'var(--icon)' }}
                />
              </button>
            </ScrollEditorialButton>
          </div>

          {/* Bottom bracket anchor */}
          <CornerBL
            className="text-black mt-3 sm:mt-4 shrink-0"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />
        </div>

        {/* RIGHT COLUMN: Full-bleed premium Skeleton interactive showcase (first on mobile, second on desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 relative w-full h-[260px] sm:h-[360px] lg:h-full min-h-0 overflow-hidden flex items-center justify-center bg-white border-b lg:border-b-0 lg:border-l border-gray-200 shrink-0">
          {/* Decorative corner brackets framing the visual canvas */}
          <CornerTL
            className="absolute top-3 sm:top-4 lg:top-5 left-3 sm:left-4 lg:left-5 text-black pointer-events-none z-20"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />
          <CornerTR
            className="absolute top-3 sm:top-4 lg:top-5 right-3 sm:right-4 lg:right-5 text-black pointer-events-none z-20"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />
          <CornerBL
            className="absolute bottom-3 sm:bottom-4 lg:bottom-5 left-3 sm:left-4 lg:left-5 text-black pointer-events-none z-20"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />
          <CornerBR
            className="absolute bottom-3 sm:bottom-4 lg:bottom-5 right-3 sm:right-4 lg:right-5 text-black pointer-events-none z-20"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />

          {/* Dual-Layer Skeleton Cursor-Reveal Panel */}
          <SkeletonRevealPanel />

          {/* Subtle bottom gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />

          {/* Restrained micro badge: Interactive Reveal (clean on desktop and mobile) */}
          <div className="absolute bottom-2.5 sm:bottom-4 lg:bottom-5 right-2.5 sm:right-4 lg:right-5 z-20 select-none pointer-events-auto">
            <div className="flex items-center gap-1.5 bg-black/70 lg:bg-white/90 backdrop-blur-md text-white/90 lg:text-black px-2 py-0.5 lg:px-3.5 lg:py-1.5 rounded-xs border border-white/15 lg:border-gray-200 shadow-xs">
              <span className="font-jakarta uppercase font-semibold text-[7.5px] sm:text-[8.5px] lg:text-[10px] tracking-widest text-gray-300 lg:text-black">
                Interactive Reveal • Desktop
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
