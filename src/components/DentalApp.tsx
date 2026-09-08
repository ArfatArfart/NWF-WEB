import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// IMAGE URLS (Exact URLs from specification)
// ============================================================================
const HERO_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';

const SECTION2_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';

const SECTION3_IMG1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';

const SECTION3_IMG2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';

const SECTION3_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

export const DENTAL_PRELOAD_URLS = [
  HERO_IMAGE,
  SECTION2_IMAGE,
  SECTION3_IMG1,
  SECTION3_IMG2,
  SECTION3_BG,
];

export function preloadDentalAssets() {
  if (typeof window === 'undefined') return;
  DENTAL_PRELOAD_URLS.forEach((url) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    if (img.decode) {
      img.decode().catch(() => {});
    }
  });
}

// ============================================================================
// DATA CONSTANTS
// ============================================================================
const featureBars = [
  'Advanced Dentistry',
  'High Quality Equipment',
  'Friendly Staff',
];

interface ServiceItem {
  name: string;
  num: string | null;
  active: boolean;
}

const services: ServiceItem[] = [
  { name: 'Dental\nVeneers', num: '01', active: true },
  { name: 'Dental\nCrowns', num: '02', active: false },
  { name: 'Teeth\nWhitening', num: '03', active: false },
  { name: 'Dental\nImplants', num: null, active: false },
];

// ============================================================================
// HOOKS
// ============================================================================

/**
 * useMaskPositions
 * Takes a ref to the section container and a ref to an array of card elements.
 * Uses ResizeObserver on the section container.
 * For each card, computes { x, y, sw, sh } where x/y is the card's top-left offset
 * relative to the section, sw/sh is the section's width/height.
 * Normalizes for any CSS transform scale applied to ancestor elements.
 */
function useMaskPositions(
  sectionRef: React.RefObject<HTMLElement | null>,
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>
) {
  const [positions, setPositions] = useState<
    { x: number; y: number; sw: number; sh: number }[]
  >([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const sw = section.offsetWidth;
      const sh = section.offsetHeight;
      if (sw === 0 || sh === 0) return;

      const sRect = section.getBoundingClientRect();
      const scaleX = sRect.width > 0 && sw > 0 ? sRect.width / sw : 1;
      const scaleY = sRect.height > 0 && sh > 0 ? sRect.height / sh : 1;

      const newPositions = cardRefs.current.map((card) => {
        if (!card) return { x: 0, y: 0, sw, sh };
        const cRect = card.getBoundingClientRect();
        return {
          x: (cRect.left - sRect.left) / scaleX,
          y: (cRect.top - sRect.top) / scaleY,
          sw,
          sh,
        };
      });
      setPositions((prev) => {
        if (
          prev.length === newPositions.length &&
          prev.every(
            (p, i) =>
              Math.abs(p.x - newPositions[i].x) < 0.5 &&
              Math.abs(p.y - newPositions[i].y) < 0.5 &&
              p.sw === newPositions[i].sw &&
              p.sh === newPositions[i].sh
          )
        ) {
          return prev;
        }
        return newPositions;
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(section);
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [sectionRef, cardRefs]);

  return positions;
}

const naturalRatioCache = new Map<string, number>();

/**
 * useImageWidth
 * Loads the image in a new Image() object with module aspect-ratio cache.
 * Calculates: renderWidth = img.naturalWidth * (sectionHeight / img.naturalHeight).
 * Returns how wide the image would be if scaled to fill the section height.
 */
function useImageWidth(imageUrl: string, sectionHeight: number) {
  const [renderWidth, setRenderWidth] = useState<number>(() => {
    const cachedRatio = naturalRatioCache.get(imageUrl);
    return cachedRatio && sectionHeight > 0 ? cachedRatio * sectionHeight : 0;
  });

  useEffect(() => {
    if (!imageUrl) return;

    const cachedRatio = naturalRatioCache.get(imageUrl);
    if (cachedRatio && sectionHeight > 0) {
      setRenderWidth(cachedRatio * sectionHeight);
    }

    const img = new Image();
    img.decoding = 'async';
    img.src = imageUrl;

    const calculate = () => {
      if (img.naturalHeight > 0 && sectionHeight > 0) {
        const ratio = img.naturalWidth / img.naturalHeight;
        naturalRatioCache.set(imageUrl, ratio);
        setRenderWidth(ratio * sectionHeight);
      }
    };

    if (img.complete) {
      calculate();
    } else {
      img.onload = calculate;
    }
  }, [imageUrl, sectionHeight]);

  return renderWidth;
}

/**
 * useIsMobile
 * Checks whether the internal viewport width is below the 768px mobile breakpoint.
 */
function useIsMobile(containerRef: React.RefObject<HTMLElement | null>) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        setIsMobile(containerRef.current.clientWidth < 768);
      } else if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [containerRef]);

  return isMobile;
}

/**
 * useStaggeredReveal
 * Takes count (number of elements) and threshold (IntersectionObserver threshold, default 0.15).
 * Returns { containerRef, getAnimStyle, visible }.
 * containerRef is attached to the section; when it crosses the threshold, visible becomes true (fires once).
 * getAnimStyle(index) returns:
 *   opacity: visible ? 1 : 0
 *   transform: visible ? 'translateY(0)' : 'translateY(24px)'
 *   transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1) [index*120]ms,
 *               transform 0.6s cubic-bezier(0.16,1,0.3,1) [index*120]ms
 */
function useStaggeredReveal(count: number, threshold: number = 0.15) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, count]);

  const getAnimStyle = (index: number): React.CSSProperties => {
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
    };
  };

  return { containerRef, getAnimStyle, visible };
}

// ============================================================================
// MASKED CARD COMPONENT
// Calculates overflow = imageWidth > position.sw ? imageWidth - position.sw : 0,
// then focalOffset = overflow * focalX.
// Applies inline style:
//   backgroundImage: url(bgImage)
//   backgroundSize: auto [position.sh]px
//   backgroundPosition: -[position.x + focalOffset]px -[position.y]px
//   backgroundRepeat: no-repeat
// ============================================================================
interface MaskedCardProps {
  key?: React.Key;
  bgImage: string;
  position?: { x: number; y: number; sw: number; sh: number };
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLElement | null) => void;
  style?: React.CSSProperties;
}

function MaskedCard({
  bgImage,
  position,
  imageWidth,
  focalX,
  className = '',
  children,
  cardRef,
  style = {},
}: MaskedCardProps) {
  const sw = position?.sw ?? 0;
  const sh = position?.sh ?? 0;
  const x = position?.x ?? 0;
  const y = position?.y ?? 0;

  const overflow = position && imageWidth > sw ? imageWidth - sw : 0;
  const focalOffset = overflow * focalX;

  const maskedStyle: React.CSSProperties =
    position && sh > 0
      ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: `auto ${sh}px`,
        backgroundPosition: `-${x + focalOffset}px -${y}px`,
        backgroundRepeat: 'no-repeat',
      }
      : {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: `${focalX * 100}% center`,
        backgroundRepeat: 'no-repeat',
      };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...maskedStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// SPLASH SCREEN
// Fixed overlay covering the Dental website viewport only, z-[100], white background.
// Number counter displayed at bottom-left.
// Counter style: text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none, black text.
// Counts from 0 to 100 over exactly 2000ms (20ms per step, 100 steps).
// After reaching 100: wait 200ms, then set exiting=true which triggers opacity-0 with transition-opacity duration-700.
// After 900ms total from reaching 100, call onComplete() which removes splash from DOM.
// ============================================================================
function SplashScreen({
  onComplete,
  active = true,
}: {
  onComplete: () => void;
  active?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const countRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    let animId: number;
    let startTime: number | null = null;
    let exitTimeoutId: ReturnType<typeof setTimeout>;
    let completeTimeoutId: ReturnType<typeof setTimeout>;
    const duration = 2000;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const nextCount = Math.floor(progress * 100);

      if (nextCount !== countRef.current) {
        countRef.current = nextCount;
        setCount(nextCount);
      }

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        exitTimeoutId = setTimeout(() => {
          setExiting(true);
        }, 200);
        completeTimeoutId = setTimeout(() => {
          onComplete();
        }, 900);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(exitTimeoutId);
      clearTimeout(completeTimeoutId);
    };
  }, [onComplete, active]);

  return (
    <div
      className={`absolute inset-0 z-[100] bg-white flex flex-col justify-end items-start pointer-events-auto transition-opacity duration-700 ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <div className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black select-none">
        {count}
      </div>
    </div>
  );
}

// ============================================================================
// NAVBAR
// Container: sticky top-0 left-0 right-0 z-30 w-full, flex items-center justify-between,
// px-4 md:px-6 py-2.5 md:py-3, bg-white/85 backdrop-blur-md border-b border-black/[0.04].
// Strictly contained within the MacBook viewport.
// ============================================================================
function Navbar({
  menuOpen,
  onToggleMenu,
  onOpenAppointment: _onOpenAppointment,
  onEmergencyClick,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onOpenAppointment: () => void;
  onEmergencyClick: () => void;
}) {
  return (
    <nav className="sticky top-0 left-0 right-0 z-30 w-full flex items-center justify-between px-4 md:px-6 py-2 md:py-2.5 bg-white/90 backdrop-blur-md border-b border-black/[0.04] shrink-0">
      {/* Logo (left side) */}
      <div className="flex flex-col select-none">
        <span className="text-lg md:text-xl font-extrabold uppercase tracking-tight leading-none text-black">
          Dental
        </span>
        <span className="text-lg md:text-xl font-extrabold uppercase tracking-tight leading-none text-black -mt-1 md:-mt-1.5">
          Health
        </span>
        <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1 md:mt-1.5 text-black/70">
          quality healthcare
        </span>
      </div>

      {/* Desktop nav (hidden on mobile with hidden md:flex) */}
      <div className="hidden md:flex items-center gap-5">
        <button
          type="button"
          onClick={onToggleMenu}
          className="px-5 py-2 bg-white rounded-full border border-black text-xs font-semibold hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-2xs"
        >
          Menu
        </button>
        <button
          type="button"
          onClick={onEmergencyClick}
          className="text-xs font-semibold text-black hover:opacity-75 transition-opacity cursor-pointer"
        >
          Dental Emergency
        </button>
      </div>

      {/* Mobile hamburger (visible only on mobile with md:hidden) */}
      <button
        type="button"
        onClick={onToggleMenu}
        className="md:hidden w-8 h-8 flex items-center justify-center relative cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`absolute h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
            }`}
        />
        <span
          className={`absolute h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
        />
        <span
          className={`absolute h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
            }`}
        />
      </button>
    </nav>
  );
}

// ============================================================================
// MOBILE MENU OVERLAY
// Strictly contained INSIDE #dental-app-root with absolute positioning and overflow hidden.
// Only renders when isOpen is true, guaranteeing NO offscreen white panel can exist.
// ============================================================================
function MobileMenuOverlay({
  isOpen,
  onClose,
  onSelectNav,
  onEmergencyClick,
  onOpenAppointment,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectNav: (link: string) => void;
  onEmergencyClick: () => void;
  onOpenAppointment: () => void;
}) {
  if (!isOpen) return null;

  const navLinks = ['Home', 'Services', 'About', 'Gallery', 'Contact'];

  return (
    <div className="absolute inset-0 z-40 overflow-hidden pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Panel */}
      <div className="absolute top-0 right-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-between p-6 z-10">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-black text-sm cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col justify-center gap-2">
          {navLinks.map((link, i) => (
            <button
              key={link}
              type="button"
              onClick={() => {
                onSelectNav(link);
                onClose();
              }}
              style={{
                transitionDelay: `${80 + i * 40}ms`,
              }}
              className="text-left text-2xl md:text-3xl font-bold text-black hover:text-neutral-500 transition-colors cursor-pointer py-1"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-neutral-200">
          <div
            onClick={() => {
              onEmergencyClick();
              onClose();
            }}
            className="text-xs font-semibold text-red-600 mb-3 cursor-pointer hover:underline flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse inline-block" />
            24/7 Dental Emergency
          </div>
          <button
            type="button"
            onClick={() => {
              onOpenAppointment();
              onClose();
            }}
            className="w-full px-5 py-3 bg-black rounded-full text-white text-xs font-bold hover:bg-neutral-800 transition-colors duration-200 cursor-pointer text-center shadow-xs"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 1 - HERO
// Container: <section>, w-full overflow-hidden flex flex-col,
// pt-2 md:pt-3 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2
// Sized to fill 100% of the MacBook display height minus the sticky navbar.
// Uses HERO_IMAGE as shared background via MaskedCard technique.
// focalX values: Section 1 mobile=0.7, desktop=0.8.
// ============================================================================
function Section1Hero({
  isMobile,
  onConsultationClick,
}: {
  isMobile: boolean;
  onConsultationClick: () => void;
}) {
  const section1Ref = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const s1Reveal = useStaggeredReveal(4, 0.1);

  const positions = useMaskPositions(section1Ref, cardRefs);
  const sectionHeight = section1Ref.current?.offsetHeight || 560;
  const imageWidth = useImageWidth(HERO_IMAGE, sectionHeight);

  const focalX = isMobile ? 0.7 : 0.8;

  return (
    <section
      id="section-hero"
      ref={(el) => {
        section1Ref.current = el;
        s1Reveal.containerRef.current = el;
      }}
      className="w-full min-h-[500px] md:min-h-[540px] overflow-hidden flex flex-col pt-2 md:pt-3 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2 relative shrink-0"
      style={{ height: 'calc(100% - 46px)' }}
    >
      {/* 3 Feature Bars (mapped from featureBars array) */}
      {featureBars.map((text, i) => (
        <MaskedCard
          key={text}
          cardRef={(el) => {
            cardRefs.current[i] = el;
          }}
          bgImage={HERO_IMAGE}
          position={positions[i]}
          imageWidth={imageWidth}
          focalX={focalX}
          style={s1Reveal.getAnimStyle(i)}
          className="w-full h-11 md:h-14 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xs"
        >
          <span className="flex items-center justify-center h-full text-black text-base md:text-2xl font-bold text-center relative z-10 px-4">
            {text}
          </span>
        </MaskedCard>
      ))}

      {/* Main Hero Card (4th card, index 3) */}
      <MaskedCard
        cardRef={(el) => {
          cardRefs.current[3] = el;
        }}
        bgImage={HERO_IMAGE}
        position={positions[3]}
        imageWidth={imageWidth}
        focalX={focalX}
        style={s1Reveal.getAnimStyle(3)}
        className="w-full flex-1 min-h-[260px] rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xs"
      >
        {/* Top-left text */}
        <div className="absolute top-4 left-4 md:top-6 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[200px] md:max-w-[300px] z-10">
          We wish to provide professional dental services
          <br />
          that match the current technologies
        </div>

        {/* Bottom-left block */}
        <div className="absolute bottom-4 left-3 md:bottom-6 md:left-5 z-10">
          <span className="block text-black text-xs md:text-sm font-semibold mb-1">
            Trusted Dentist in West New York
          </span>
          <h1 className="text-black text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.82] tracking-tight">
            Dental
            <br />
            Care
          </h1>
        </div>

        {/* Bottom-right text */}
        <button
          type="button"
          onClick={onConsultationClick}
          className="absolute bottom-4 right-4 md:bottom-7 md:right-7 text-white text-xs md:text-sm font-semibold z-10 hover:underline cursor-pointer"
        >
          Free Consultation
        </button>
      </MaskedCard>
    </section>
  );
}

// ============================================================================
// SECTION 2 - SMILE GALLERY
// Container: <section>, w-full overflow-hidden flex flex-col,
// pt-2 md:pt-3 px-3 md:px-5 pb-2 gap-1.5 md:gap-2
// Sized to fill 100% of the MacBook display height.
// Uses SECTION2_IMAGE as shared background via MaskedCard technique.
// focalX values: Section 2 mobile=0.65, desktop=0.8.
// ============================================================================
function Section2SmileGallery({
  isMobile,
  servicesList,
  onToggleService,
  onCallUsClick,
}: {
  isMobile: boolean;
  servicesList: ServiceItem[];
  onToggleService: (idx: number) => void;
  onCallUsClick: () => void;
}) {
  const section2Ref = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const s2Reveal = useStaggeredReveal(4, 0.1);

  const positions = useMaskPositions(section2Ref, cardRefs);
  const sectionHeight = section2Ref.current?.offsetHeight || 560;
  const imageWidth = useImageWidth(SECTION2_IMAGE, sectionHeight);

  const focalX = isMobile ? 0.65 : 0.8;

  return (
    <section
      id="section-gallery"
      ref={(el) => {
        section2Ref.current = el;
        s2Reveal.containerRef.current = el;
      }}
      className="w-full min-h-[500px] md:min-h-[540px] overflow-hidden flex flex-col pt-2 md:pt-3 px-3 md:px-5 pb-2 gap-1.5 md:gap-2 relative shrink-0"
      style={{ minHeight: '100%' }}
    >
      {/* Grid container */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
        {/* Card 0 - Top Left ("Smile Gallery") */}
        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[0] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[0]}
          imageWidth={imageWidth}
          focalX={focalX}
          style={s2Reveal.getAnimStyle(0)}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[140px] md:min-h-0 shadow-2xs"
        >
          <h2 className="absolute top-4 left-5 md:top-5 md:left-6 text-white md:text-black text-xl md:text-2xl font-bold z-10">
            Smile Gallery
          </h2>
          <p className="absolute bottom-4 left-5 md:bottom-5 md:left-6 text-white md:text-black text-xs md:text-sm font-semibold z-10">
            Our cosmetic dental work
          </p>
        </MaskedCard>

        {/* Card 1 - Top Right (spans 2 rows on desktop) */}
        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[1] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[1]}
          imageWidth={imageWidth}
          focalX={focalX}
          style={s2Reveal.getAnimStyle(1)}
          className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[180px] md:min-h-0 shadow-2xs"
        >
          <div className="absolute bottom-16 left-5 md:bottom-18 md:left-6 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10">
            If you want a gorgeous smile,
            <br />
            call us to ask about a smile makeover.
          </div>
          <button
            type="button"
            onClick={onCallUsClick}
            className="absolute bottom-4 right-4 md:bottom-5 md:right-5 px-5 py-2.5 md:px-7 md:py-3.5 bg-white rounded-full text-black text-sm md:text-lg font-bold z-10 hover:scale-105 transition-transform cursor-pointer shadow-md"
          >
            Call Us
          </button>
        </MaskedCard>

        {/* Card 2 - Bottom Left ("Smile makeover") */}
        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[2] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[2]}
          imageWidth={imageWidth}
          focalX={focalX}
          style={s2Reveal.getAnimStyle(2)}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[140px] md:min-h-0 shadow-2xs"
        >
          <div className="absolute top-4 left-5 md:top-5 md:left-6 text-white md:text-black text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.9] z-10">
            Smile
            <br />
            makeover
          </div>
        </MaskedCard>

        {/* Card 3 - Bottom Full Width (Services) */}
        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[3] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[3]}
          imageWidth={imageWidth}
          focalX={focalX}
          style={s2Reveal.getAnimStyle(3)}
          className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0 shadow-2xs"
        >
          <div className="absolute inset-0 z-10 flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 p-2 md:p-2.5">
            {servicesList.map((svc, idx) => (
              <div
                key={svc.name}
                onClick={() => onToggleService(idx)}
                className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 ${svc.active
                    ? 'bg-white/90 backdrop-blur-md shadow-xs'
                    : 'bg-white/20 backdrop-blur-xl hover:bg-white/30'
                  }`}
              >
                <h3
                  className={`text-lg md:text-2xl font-bold leading-[1.05] whitespace-pre-line ${svc.active ? 'text-black' : 'text-white'
                    }`}
                >
                  {svc.name}
                </h3>
                {svc.num && (
                  <div
                    className={`self-end w-7 h-7 md:w-9 md:h-9 rounded-full border flex items-center justify-center text-xs font-semibold ${svc.active
                        ? 'border-black text-black'
                        : 'border-white text-white'
                      }`}
                  >
                    {svc.num}
                  </div>
                )}
              </div>
            ))}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3 - IMPLANT DENTISTRY
// Container: <section>, w-full overflow-hidden flex flex-col,
// pt-2 md:pt-3 px-3 md:px-5 pb-6 md:pb-8 gap-1.5 md:gap-2
// Sized to fill 100% of the MacBook display height.
// Attach s3Reveal.containerRef to this section.
// Does NOT use MaskedCard technique. Uses regular <img> tags and solid backgrounds.
// ============================================================================
function Section3ImplantDentistry({
  onBookOnlineClick,
  onOpenProcess,
  onOpenCaring,
}: {
  onBookOnlineClick: () => void;
  onOpenProcess: () => void;
  onOpenCaring: () => void;
}) {
  const s3Reveal = useStaggeredReveal(4, 0.1);

  return (
    <section
      id="section-implants"
      ref={s3Reveal.containerRef}
      className="w-full min-h-[500px] md:min-h-[540px] overflow-hidden flex flex-col pt-2 md:pt-3 px-3 md:px-5 pb-6 md:pb-8 gap-1.5 md:gap-2 relative shrink-0"
      style={{ minHeight: '100%' }}
    >
      {/* Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
        {/* LEFT COLUMN: flex flex-col gap-1.5 md:gap-2 */}
        <div className="flex flex-col gap-1.5 md:gap-2">
          {/* 1. Heading Card */}
          <div
            style={s3Reveal.getAnimStyle(0)}
            className="rounded-xl md:rounded-2xl bg-stone-50 p-4 md:p-6 flex flex-col justify-between flex-[1.1] min-h-[150px] md:min-h-0 border border-stone-200/50 shadow-2xs"
          >
            <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[0.95] text-black">
              Implant
              <br />
              Dentistry
            </h2>
            <p className="text-xs md:text-sm font-semibold text-black/80">
              Restore Missing Teeth
            </p>
          </div>

          {/* 2. Two Image Cards (side by side) */}
          <div
            style={s3Reveal.getAnimStyle(1)}
            className="flex gap-1.5 md:gap-2 flex-1 min-h-[120px] md:min-h-0"
          >
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden border border-stone-200/50 shadow-2xs">
              <img
                src={SECTION3_IMG1}
                alt="Dental implant procedure"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden border border-stone-200/50 shadow-2xs">
              <img
                src={SECTION3_IMG2}
                alt="Dental restoration"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 3. Consultation Card */}
          <div
            style={s3Reveal.getAnimStyle(2)}
            className="rounded-xl md:rounded-2xl bg-zinc-200 p-4 md:p-6 flex items-end justify-between flex-[0.9] min-h-[140px] md:min-h-0 border border-zinc-300/60 shadow-2xs"
          >
            <div>
              <p className="text-xs md:text-sm font-semibold text-black/70 mb-1.5 md:mb-2">
                Consultation
              </p>
              <h3 className="text-lg md:text-2xl font-bold text-black leading-tight">
                Dental
                <br />
                Restoration
                <br />
                Services
              </h3>
            </div>
            <button
              type="button"
              onClick={onBookOnlineClick}
              className="px-5 py-2.5 md:px-7 md:py-3.5 bg-white hover:bg-black hover:text-white rounded-full text-black text-sm md:text-base font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Book Online
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Single tall image card */}
        <div
          style={s3Reveal.getAnimStyle(3)}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[340px] md:min-h-0 border border-stone-200/50 shadow-2xs"
        >
          <img
            src={SECTION3_BG}
            alt="Smiling patient"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />

          {/* Overlay container */}
          <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex gap-1.5 md:gap-2">
            {/* Overlay Card 1 (white, left) */}
            <div
              onClick={onOpenProcess}
              className="flex-1 bg-white hover:bg-stone-50 rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col justify-between h-32 md:h-44 cursor-pointer transition-transform hover:scale-[1.02] shadow-md"
            >
              <h4 className="text-base md:text-xl font-bold text-black leading-tight">
                The Process
                <br />
                of Installing
                <br />
                Implants
              </h4>
              <div className="self-end w-8 h-8 md:w-10 md:h-10 rounded-full border border-black flex items-center justify-center text-black">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="rotate-[-45deg]"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Overlay Card 2 (glass, right) */}
            <div
              onClick={onOpenCaring}
              className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col justify-between h-32 md:h-44 cursor-pointer transition-transform hover:scale-[1.02] shadow-md border border-white/20"
            >
              <h4 className="text-base md:text-xl font-bold text-white leading-tight">
                Caring
                <br />
                for Dental
                <br />
                Implants
              </h4>
              <div className="self-end w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center text-white">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="rotate-[-45deg] text-white"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// IN-MACBOOK INTERACTIVE MODALS (CONTAINED STRICTLY INSIDE MACBOOK VIEWPORT)
// ============================================================================
function DentalEmergencyModal({
  onClose,
  onBook,
}: {
  onClose: () => void;
  onBook: () => void;
}) {
  const [calling, setCalling] = useState(false);

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="bg-red-600 text-white p-4 md:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="font-bold text-xs md:text-sm uppercase tracking-wider">
              24/7 Dental Emergency Hotline
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-red-700 font-bold">
              Immediate Urgent Response
            </p>
            <p className="text-2xl font-black text-red-600 mt-1">(201) 555-CARE</p>
            <p className="text-[11px] text-red-600/80 mt-1">
              Board-certified emergency dentist on call 24 hours daily
            </p>
          </div>

          <div className="text-xs text-stone-600 space-y-1">
            <p className="font-bold text-black">Immediate assistance for:</p>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Severe unmanageable toothache or nerve pain</li>
              <li>Knocked-out or fractured adult tooth</li>
              <li>Abscess, acute facial swelling, or infection</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setCalling(true);
                setTimeout(() => setCalling(false), 2500);
              }}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {calling ? 'Connecting Hotline...' : 'Call Hotline (201) 555-CARE'}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook();
              }}
              className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-black rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Book Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DentalAppointmentModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="bg-black text-white p-4 md:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />
            <span className="font-bold text-xs md:text-sm uppercase tracking-wider">
              Schedule Your Dental Visit
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-black">Appointment Requested!</h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
              Thank you, <span className="font-bold text-black">{patientName || 'valued patient'}</span>. Your appointment request has been received. Our reception team will confirm your slot shortly.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-black text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-black mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Jessica Miller"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-black mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="(201) 555-0182"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-black mb-1">
                Care Needed
              </label>
              <select className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs text-black focus:outline-none focus:border-black bg-white">
                <option>Comprehensive Dental Examination & Cleaning</option>
                <option>Dental Veneers & Smile Makeover</option>
                <option>Dental Crowns & Restorations</option>
                <option>Teeth Whitening Aesthetics</option>
                <option>Implant Dentistry Consultation</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Confirm Appointment Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function DentalProcessModal({
  onClose,
  onBook,
}: {
  onClose: () => void;
  onBook: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="bg-black text-white p-4 md:p-5 flex items-center justify-between">
          <span className="font-bold text-xs md:text-sm uppercase tracking-wider">
            The Process of Installing Implants
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h5 className="font-bold text-xs text-black">3D CBCT Digital Scan & Assessment</h5>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  High-resolution imaging to evaluate bone structure and plan custom implant placement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h5 className="font-bold text-xs text-black">Precision Titanium Post Placement</h5>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Biocompatible titanium post is positioned to integrate seamlessly with the natural jawbone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h5 className="font-bold text-xs text-black">Custom Zirconia Crown Restoration</h5>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  A lifelike ceramic crown is crafted and fixed for natural aesthetics and durable chewing function.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook();
              }}
              className="flex-1 py-3 bg-black hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Book Implant Consultation
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-black rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DentalCaringModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="bg-black text-white p-4 md:p-5 flex items-center justify-between">
          <span className="font-bold text-xs md:text-sm uppercase tracking-wider">
            Caring for Dental Implants
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-3.5">
          <p className="text-xs text-stone-600 leading-relaxed">
            With regular maintenance and proper hygiene, dental implants can last for decades or a lifetime.
          </p>

          <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-teal-600 font-bold">✓</span>
              <span className="text-stone-700">Brush twice daily with a low-abrasive paste</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-600 font-bold">✓</span>
              <span className="text-stone-700">Floss daily using specialized implant floss or water flosser</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-teal-600 font-bold">✓</span>
              <span className="text-stone-700">Schedule preventive cleanings every 6 months</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-black hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN DENTAL APPLICATION (STRICT INTERNAL VIEWPORT)
// The Dental website itself is wrapped in its own internal application container:
// <div className="bg-white">
// containing:
// 1. {showSplash && <SplashScreen />}
// 2. <Navbar />
// 3. Section 1
// 4. Section 2
// 5. Section 3
// Strictly constrained to width: 100%, height: 100%, overflow-y: auto, overflow-x: hidden.
// ZERO elements with position: fixed, preventing any coordinate breakout into the outer website.
// ============================================================
export default function DentalApp({
  active = true,
}: {
  active?: boolean;
  key?: React.Key;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesList, setServicesList] = useState(services);
  const [activeModal, setActiveModal] = useState<
    'appointment' | 'emergency' | 'process' | 'caring' | null
  >(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile(scrollContainerRef);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (menuOpen) {
      el.style.overflow = 'hidden';
    } else {
      el.style.overflow = 'auto';
    }
  }, [menuOpen]);

  const handleToggleService = (index: number) => {
    setServicesList((prev) =>
      prev.map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );
  };

  const handleSelectNav = (link: string) => {
    if (!scrollContainerRef.current) return;
    if (link === 'Home') {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === 'Services' || link === 'Gallery') {
      const el = scrollContainerRef.current.querySelector('#section-gallery');
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'About') {
      const el = scrollContainerRef.current.querySelector('#section-implants');
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    } else if (link === 'Contact') {
      setActiveModal('appointment');
    }
  };

  return (
    <div
      id="dental-app-root"
      ref={scrollContainerRef}
      className="bg-white relative w-full h-full overflow-y-auto overflow-x-hidden selection:bg-black selection:text-white scroll-smooth"
      style={{
        fontFamily: "'Open Sauce One', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* 1. Splash Screen */}
      {showSplash && (
        <SplashScreen
          active={active}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* 2. Sticky Navbar */}
      <Navbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onOpenAppointment={() => setActiveModal('appointment')}
        onEmergencyClick={() => setActiveModal('emergency')}
      />

      {/* Mobile menu overlay */}
      <MobileMenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectNav={handleSelectNav}
        onEmergencyClick={() => setActiveModal('emergency')}
        onOpenAppointment={() => setActiveModal('appointment')}
      />

      {/* 3. Section 1 - Hero */}
      <Section1Hero
        isMobile={isMobile}
        onConsultationClick={() => setActiveModal('appointment')}
      />

      {/* 4. Section 2 - Smile Gallery */}
      <Section2SmileGallery
        isMobile={isMobile}
        servicesList={servicesList}
        onToggleService={handleToggleService}
        onCallUsClick={() => setActiveModal('appointment')}
      />

      {/* 5. Section 3 - Implant Dentistry */}
      <Section3ImplantDentistry
        onBookOnlineClick={() => setActiveModal('appointment')}
        onOpenProcess={() => setActiveModal('process')}
        onOpenCaring={() => setActiveModal('caring')}
      />

      {/* In-screen Modals (Isolated strictly inside the MacBook display viewport) */}
      {activeModal === 'emergency' && (
        <DentalEmergencyModal
          onClose={() => setActiveModal(null)}
          onBook={() => setActiveModal('appointment')}
        />
      )}

      {activeModal === 'appointment' && (
        <DentalAppointmentModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'process' && (
        <DentalProcessModal
          onClose={() => setActiveModal(null)}
          onBook={() => setActiveModal('appointment')}
        />
      )}

      {activeModal === 'caring' && (
        <DentalCaringModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
