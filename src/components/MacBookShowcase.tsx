import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import DentalApp, { preloadDentalAssets } from './DentalApp.tsx';
import {
  ScrollSplitReveal,
  ScrollLineReveal,
  ScrollMacBookHeading,
  ScrollMacBookCopy,
} from './MotionTypography.tsx';

export default function MacBookShowcase({
  onNotification: _onNotification,
}: {
  onNotification?: (msg: string) => void;
}) {
  const [scale, setScale] = useState(() => {
    if (typeof window !== 'undefined') {
      const availableWidth = window.innerWidth;
      const baseWidth = 1040;
      if (availableWidth < baseWidth) {
        const newScale = Math.min(1, (availableWidth - 24) / baseWidth);
        return Math.max(0.26, newScale);
      }
    }
    return 1;
  });
  const [aluminumColor, setAluminumColor] = useState<'space-black' | 'silver'>(
    'space-black'
  );
  const [resetKey, setResetKey] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll scrub configuration: triggers as MacBook section approaches viewport,
  // reaches full assembly right as user reaches showcase, reverses smoothly on scroll up.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 86%', 'center 46%'],
  });

  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 1024;
  const [isApproaching, setIsApproaching] = useState(false);

  // Viewport-aware preloading of Dental assets
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    let preloaded = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsApproaching(true);
          if (!preloaded) {
            preloaded = true;
            preloadDentalAssets();
          }
        }
      },
      { rootMargin: '600px 0px 600px 0px', threshold: 0.01 }
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobileViewport ? 180 : 90,
    damping: isMobileViewport ? 30 : 24,
    mass: isMobileViewport ? 0.08 : 0.2,
    restDelta: isMobileViewport ? 0.003 : 0.001,
  });

  // Physical Placement Motion:
  // Starts lower, slightly smaller, subtly angled, slightly transparent
  // Rises gently, straightens to neutral, scales to 1, opacity resolves to 1
  const macbookY = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 0 : 68, 0]);
  const macbookScale = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 1 : 0.95, 1]);
  const macbookRotate = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 0 : -2.2, 0]);
  const macbookOpacity = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 1 : 0.80, 1]);

  // Responsive scaling to fit narrower viewports while maintaining exact MacBook proportions
  useEffect(() => {
    const handleResize = () => {
      const availableWidth = containerRef.current
        ? containerRef.current.clientWidth
        : window.innerWidth;
      const baseWidth = 1040; // Base width of the MacBook Pro mockup
      if (availableWidth < baseWidth) {
        // Leave comfortable 16px side padding
        const newScale = Math.min(1, (availableWidth - 24) / baseWidth);
        setScale(Math.max(0.26, newScale));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  const handleCopyLink = () => {
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2400);
  };

  const isSpaceBlack = aluminumColor === 'space-black';

  return (
    <section
      ref={sectionRef}
      id="macbook-showcase-section"
      className="relative z-20 w-full overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg, #3C332C 0%, #24201C 160px, #161514 340px, #0F0E0E 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* 1. Seamless studio transition atmosphere blending from the upper section */}
      <div
        className="absolute top-0 left-0 right-0 h-[260px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(90, 76, 65, 0.45) 0%, rgba(55, 45, 38, 0.2) 55%, transparent 85%)',
        }}
      />

      {/* 2. Precision Digital Design Canvas Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)',
        }}
      />

      {/* 3. Soft warm radial studio glow centered behind the MacBook display */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(235, 215, 190, 0.06) 0%, rgba(90, 76, 65, 0.03) 45%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* 4. Floor shadow horizon providing physical grounding */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[220px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(0, 0, 0, 0.95) 0%, rgba(15, 14, 13, 0.7) 60%, transparent 100%)',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 w-full pt-12 sm:pt-16 pb-4 sm:pb-6 px-4 sm:px-6 text-center">
        <ScrollSplitReveal direction="left" phase={0}>
          <span className="font-orbitron font-bold uppercase tracking-[0.25em] text-[#A7F3D0] block text-[10px] sm:text-xs">
            [ BESPOKE DESKTOP ARCHITECTURE // LIVE INTERACTIVE MOCKUP ]
          </span>
        </ScrollSplitReveal>

        <ScrollMacBookHeading text="Complete Dental Healthcare Platform" />

        <ScrollMacBookCopy
          text='Rendered live within a photorealistic MacBook Pro 16" display. Scroll, click services, and interact directly inside the screen.'
          className="font-manrope text-white/70 text-xs sm:text-sm mt-1 sm:mt-2 max-w-xl mx-auto"
        />

        {/* Interactive Device Controls Bar */}
        <ScrollSplitReveal direction="right" phase={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            {/* Finish Selector */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setAluminumColor('space-black')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${isSpaceBlack
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                Space Black
              </button>
              <button
                type="button"
                onClick={() => setAluminumColor('silver')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${!isSpaceBlack
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                Anodized Silver
              </button>
            </div>

            {/* Reset Splash / Reload Screen */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-teal-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span>Replay Splash Counter</span>
            </button>

            {/* Screen Spec Tag */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] text-white/50 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              16:10 RETINA VIEWPORT
            </span>
          </div>
        </ScrollSplitReveal>
      </div>

      {/* MacBook Container with Dynamic Scaling */}
      <div
        ref={containerRef}
        className="relative z-10 w-full flex flex-col items-center justify-center pt-4 pb-16 sm:pb-20 px-2 sm:px-4 overflow-hidden"
      >
        <div
          style={{
            width: Math.round(1040 * scale),
            height: Math.round(690 * scale),
          }}
          className="relative overflow-visible shrink-0"
        >
          {/* Unscaled Inner Wrapper with CSS scale transform anchored to top-left */}
          <div
            style={{
              width: 1040,
              height: 690,
              transform: `scale(${scale}) translateZ(0)`,
              transformOrigin: 'top left',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            className="flex flex-col items-center select-auto"
          >
            <motion.div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                y: macbookY,
                scale: macbookScale,
                rotate: macbookRotate,
                opacity: macbookOpacity,
                transformOrigin: 'center bottom',
                willChange: 'transform, opacity',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            >
              {/* ============================================================= */}
              {/* 1. TOP DISPLAY LID / SCREEN ASSEMBLY (16:10 REALISTIC CHASSIS) */}
              {/* ============================================================= */}
            <div
              className="relative rounded-[18px] p-[8px] shadow-2xl transition-colors duration-500 flex flex-col shrink-0"
              style={{
                width: 980,
                height: 624,
                background: isSpaceBlack
                  ? 'linear-gradient(160deg, #2b2e35 0%, #1a1c21 35%, #121316 100%)'
                  : 'linear-gradient(160deg, #eaedf2 0%, #caced6 35%, #a8aeb8 100%)',
                boxShadow: isSpaceBlack
                  ? '0 0 0 1px rgba(255,255,255,0.14) inset, 0 32px 75px -12px rgba(0,0,0,0.92)'
                  : '0 0 0 1px rgba(255,255,255,0.7) inset, 0 32px 75px -12px rgba(0,0,0,0.6)',
              }}
            >
              {/* Outer Rim Specular Highlight Line */}
              <div
                className="absolute inset-[1px] rounded-[17px] pointer-events-none"
                style={{
                  border: isSpaceBlack
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(255,255,255,0.85)',
                }}
              />

              {/* Obsidian Rubber Gasket / Thin Screen Bezel */}
              <div className="relative w-full h-full bg-[#07080a] rounded-[12px] p-[6px] overflow-hidden flex flex-col shadow-inner">
                {/* Top Bezel Notch / Camera Housing */}
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-2 pointer-events-none">
                  <div className="w-[136px] h-[16px] bg-[#07080a] rounded-b-[7px] flex items-center justify-center gap-2 px-3 border-b border-x border-white/[0.05]">
                    {/* Camera Lens with anti-reflective optical glass */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0b0e14] border border-[#1b212e] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#1e3c62]" />
                    </div>
                    {/* Camera Status Indicator (idle) */}
                    <div className="w-1 h-1 rounded-full bg-black/40" />
                    {/* TrueTone / Ambient Light Sensor */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#080a0e]" />
                  </div>
                </div>

                {/* Subtle Glass Reflection Layer */}
                <div
                  className="absolute inset-0 z-30 pointer-events-none rounded-[10px] overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(118deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.012) 28%, transparent 56%)',
                  }}
                />

                {/* ========================================================= */}
                {/* SCREEN VIEWPORT CONTAINER (Browser Chrome + Dental Web)   */}
                {/* Strictly contained inside the 952x596px display area.     */}
                {/* ========================================================= */}
                <div
                  id="macbook-screen-viewport"
                  className="relative w-full h-full rounded-[9px] overflow-hidden bg-white text-black flex flex-col shadow-sm"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* BROWSER WINDOW CHROME / HEADER (Safari Desktop) */}
                  <div
                    className={`relative z-20 w-full h-[38px] flex items-center justify-between px-3 shrink-0 border-b select-none transition-colors duration-300 ${isSpaceBlack
                        ? 'bg-[#1a1c21] border-white/[0.08] text-neutral-300'
                        : 'bg-[#f0f2f5] border-black/[0.08] text-neutral-700'
                      }`}
                  >
                    {/* Left: macOS Window Traffic Lights */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/70 inline-block shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                          title="Close"
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/70 inline-block shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                          title="Minimize"
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/70 inline-block shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                          title="Expand"
                        />
                      </div>

                      {/* Navigation Chevrons */}
                      <div className="hidden sm:flex items-center gap-1 ml-1 opacity-60">
                        <button
                          type="button"
                          disabled
                          className="w-5 h-5 flex items-center justify-center rounded opacity-40 cursor-not-allowed text-xs"
                          aria-label="Previous page"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M6.5 8L3.5 5L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          disabled
                          className="w-5 h-5 flex items-center justify-center rounded opacity-40 cursor-not-allowed text-xs"
                          aria-label="Next page"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-xs"
                          title="Reload Dental Website"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M8.5 5A3.5 3.5 0 1 1 5 1.5M5 1.5V3M5 1.5H3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>

                      {/* Active Browser Tab */}
                      <div
                        className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-t-md text-[11px] font-medium transition-colors ${isSpaceBlack
                            ? 'bg-[#121316] text-white border-t border-x border-white/[0.08]'
                            : 'bg-white text-neutral-800 border-t border-x border-black/[0.08] shadow-sm'
                          }`}
                      >
                        <div className="w-3.5 h-3.5 rounded-[3px] bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M3.6 9h16.8" />
                            <path d="M3.6 15h16.8" />
                            <path d="M12 3a14 14 0 0 1 0 18" />
                            <path d="M12 3a14 14 0 0 0 0 18" />
                          </svg>
                        </div>
                        <span className="truncate max-w-[160px]">Dental Health - Quality Healthcare</span>
                      </div>
                    </div>

                    {/* Center: Address Bar (Omnibox) */}
                    <div
                      className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono max-w-[340px] w-full mx-2 transition-all ${isSpaceBlack
                          ? 'bg-black/40 border border-white/[0.07] text-neutral-300'
                          : 'bg-white border border-black/[0.08] text-neutral-700 shadow-sm'
                        }`}
                    >
                      {copiedUrl ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[10px]">
                          ✓ Link Copied to Clipboard
                        </span>
                      ) : (
                        <>
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-emerald-400 shrink-0">
                            <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M4 5V3.5C4 2.39543 4.89543 1.5 6 1.5C7.10457 1.5 8 2.39543 8 3.5V5" stroke="currentColor" strokeWidth="1.2" />
                          </svg>
                          <span className="truncate">
                            <span className="opacity-50">https://</span>
                            <span className="font-semibold text-teal-400">dentalhealth.care</span>
                            <span className="opacity-40">/new-york</span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Right: Browser Actions */}
                    <div className="flex items-center gap-2 opacity-60">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10 hover:opacity-100 transition-opacity cursor-pointer text-xs"
                        title="Share / Copy Link"
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1V7M6 1L3.5 3.5M6 1L8.5 3.5M2 5.5V10.5H10V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10 hover:opacity-100 transition-opacity cursor-pointer text-xs"
                        title="Reload Session"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* WEBPAGE VIEWPORT CONTAINER (STRICT 100% INTERNAL BOUNDARY) */}
                  <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-white text-black">
                    <DentalApp key={resetKey} active={isApproaching} />
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* 2. LAPTOP HINGE & BOTTOM BASE DECK (REALISTIC HARDWARE)       */}
            {/* ============================================================= */}
            <div className="relative w-full flex flex-col items-center">
              {/* Recessed Central Hinge Mechanism */}
              <div className="relative flex items-center justify-center z-10 w-full">
                {/* Left Cooling Air Intake Vents */}
                <div
                  className="h-[5px] w-[160px] bg-[#08090b] mr-2 rounded-t-sm opacity-80"
                  style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)' }}
                />

                {/* Central Hinge Clutch Barrel */}
                <div
                  className="h-[8px] rounded-t-sm"
                  style={{
                    width: 270,
                    background: 'linear-gradient(180deg, #131417 0%, #070809 100%)',
                    boxShadow:
                      'inset 0 2px 3px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                />

                {/* Right Cooling Air Intake Vents */}
                <div
                  className="h-[5px] w-[160px] bg-[#08090b] ml-2 rounded-t-sm opacity-80"
                  style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)' }}
                />
              </div>

              {/* Aluminum Bottom Chassis Deck (Extended Forward with Depth) */}
              <div
                className="relative rounded-b-[18px] transition-colors duration-500 overflow-hidden flex flex-col items-center"
                style={{
                  width: 1020,
                  height: 32,
                  background: isSpaceBlack
                    ? 'linear-gradient(180deg, #2a2d34 0%, #1c1e23 45%, #121316 100%)'
                    : 'linear-gradient(180deg, #dbe0e7 0%, #bdc1cb 45%, #9ea3ae 100%)',
                  boxShadow: isSpaceBlack
                    ? '0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 3px rgba(0,0,0,0.6) inset, 0 12px 30px rgba(0,0,0,0.6)'
                    : '0 1px 0 rgba(255,255,255,0.85) inset, 0 -1px 3px rgba(0,0,0,0.25) inset, 0 12px 30px rgba(0,0,0,0.25)',
                }}
              >
                {/* Keyboard Well Top Groove Hint */}
                <div
                  className="w-[720px] h-[1.5px] rounded-b-sm opacity-35 mt-[1px]"
                  style={{
                    background: isSpaceBlack ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.2)',
                  }}
                />

                {/* Front Lip: Precision Center Thumb Scoop for Display Opening */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[88px] h-[5px] rounded-b-[5px]"
                  style={{
                    background: isSpaceBlack
                      ? 'linear-gradient(180deg, #121316 0%, #08090b 100%)'
                      : 'linear-gradient(180deg, #828791 0%, #666b74 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
                  }}
                />

                {/* Subtle Trackpad Outline on Base Deck */}
                <div
                  className="w-[240px] h-[18px] rounded-t-[6px] border-t border-x mt-1 opacity-20"
                  style={{
                    borderColor: isSpaceBlack ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)',
                  }}
                />

                {/* Continuous Front Chamfer Specular Edge Highlight Line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-[18px]"
                  style={{
                    background: isSpaceBlack
                      ? 'linear-gradient(90deg, transparent 2%, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 85%, transparent 98%)'
                      : 'linear-gradient(90deg, transparent 2%, rgba(255,255,255,0.6) 15%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.6) 85%, transparent 98%)',
                  }}
                />
              </div>

              {/* Silicone Feet Pads (peeking slightly underneath base) */}
              <div className="w-[940px] flex justify-between px-8 -mt-[2px] pointer-events-none z-0">
                <div className="w-12 h-1 rounded-full bg-[#050608] shadow-sm opacity-90" />
                <div className="w-12 h-1 rounded-full bg-[#050608] shadow-sm opacity-90" />
              </div>

              {/* Multi-Tiered Grounding Drop Shadows */}
              {/* 1. Razor-sharp contact shadow directly beneath chassis */}
              <div
                className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[980px] h-[12px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 80%)',
                  filter: 'blur(4px)',
                }}
              />
              {/* 2. Mid-range ambient occlusion shadow */}
              <div
                className="absolute top-[34px] left-1/2 -translate-x-1/2 w-[900px] h-[32px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 55%, transparent 75%)',
                  filter: 'blur(14px)',
                }}
              />
              {/* 3. Expansive diffused soft floor shadow */}
              <div
                className="absolute top-[38px] left-1/2 -translate-x-1/2 w-[840px] h-[58px] rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 85%)',
                  filter: 'blur(28px)',
                }}
              />
            </div>
            </motion.div>
          </div>
        </div>

        {/* Caption beneath MacBook */}
        <div className="mt-8 text-center">
          <ScrollLineReveal offsetY={6} phase={0}>
            <span className="font-manrope text-xs text-white/40 tracking-widest uppercase">
              Click anywhere on the dental interface inside the laptop screen to test navigation, services & consultations
            </span>
          </ScrollLineReveal>
        </div>
      </div>
    </section>
  );
}
