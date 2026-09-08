import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';

// ============================================================================
// SPRING CONFIGURATION
// Physics-tuned for organic momentum, smooth compositor scrub, and zero jitter
// ============================================================================
const DESKTOP_SPRING_CONFIG = {
  stiffness: 95,
  damping: 22,
  mass: 0.22,
  restDelta: 0.001,
};

export const SPRING_CONFIG = DESKTOP_SPRING_CONFIG;

// Fast-settling, high-fidelity spring for mobile touch screens
// Settles in ~2 frames without continuous oscillation or main-thread hitching,
// keeping touch scrolling 100% responsive and micro-stutter-free
const MOBILE_SPRING_CONFIG = {
  stiffness: 300,
  damping: 34,
  mass: 0.05,
  restDelta: 0.005,
};

// Helper hook for smooth scroll progress on any section
export function useSmoothScroll(
  targetRef: React.RefObject<HTMLElement | null>,
  offset: [string, string] = ['start 92%', 'center 45%']
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: offset as any,
  });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  return useSpring(scrollYProgress, isMobile ? MOBILE_SPRING_CONFIG : DESKTOP_SPRING_CONFIG);
}

// ============================================================================
// 1. MAIN HERO — CLEAN ART-DIRECTED TYPOGRAPHIC MOTION
// "SLIDE / FLIP / RECOMPOSE"
// Headline: "MODERN", "RESPONSIVE", "WEBSITES"
// - Line 1 (MODERN): Characters slide into grid from alternating directions
// - Line 2 (RESPONSIVE): Characters shift into alignment through a controlled wave + subtle 3D flip
// - Line 3 (WEBSITES): Letters settle crisply into final baseline from below
// - High visibility at all times (opacity 0.78-0.84 -> 1.0), ZERO blur, perfectly readable
// - Automatic execution on load & responsive scroll trigger (visible on mobile scrolling)
// - Replays automatically when scrolling back up and returning to Hero
// ============================================================================
export interface CharMotionConfig {
  x: number;
  y: number;
  rotate: number;
  rotateY: number;
  scale: number;
  opacity: number;
  delay: number;
  duration: number;
}

// 24 Character Art-Directed Motion Configs:
export const HERO_CHAR_CONFIGS: CharMotionConfig[] = [
  // --------------------------------------------------------------------------
  // 1. MODERN: Alternating directional slide into grid (M, O, D, E, R, N)
  // --------------------------------------------------------------------------
  { x: -32, y: -14, rotate: -5, rotateY: 0, scale: 0.94, opacity: 0.78, delay: 0.00, duration: 0.50 }, // 0: 'M' (from left & slightly up)
  { x: 32, y: 14, rotate: 6, rotateY: 0, scale: 1.04, opacity: 0.80, delay: 0.04, duration: 0.50 }, // 1: 'O' (from right & slightly down)
  { x: -30, y: 14, rotate: -6, rotateY: 0, scale: 0.95, opacity: 0.78, delay: 0.08, duration: 0.50 }, // 2: 'D' (from left & slightly down)
  { x: 30, y: -14, rotate: 5, rotateY: 0, scale: 1.03, opacity: 0.80, delay: 0.12, duration: 0.50 }, // 3: 'E' (from right & slightly up)
  { x: -28, y: -12, rotate: -5, rotateY: 0, scale: 0.96, opacity: 0.78, delay: 0.16, duration: 0.50 }, // 4: 'R' (from left & slightly up)
  { x: 28, y: 12, rotate: 6, rotateY: 0, scale: 1.04, opacity: 0.80, delay: 0.20, duration: 0.50 }, // 5: 'N' (from right & slightly down)

  // --------------------------------------------------------------------------
  // 2. RESPONSIVE: Controlled wave shifting into alignment (R, E, S, P, O, N, S, I, V, E)
  // Alternating vertical wave with subtle horizontal 3D flip (rotateY)
  // --------------------------------------------------------------------------
  { x: -8, y: -24, rotate: 0, rotateY: -14, scale: 0.96, opacity: 0.80, delay: 0.22, duration: 0.52 }, // 6: 'R' (wave up, tilt left)
  { x: 6, y: 22, rotate: 0, rotateY: 14, scale: 1.03, opacity: 0.80, delay: 0.26, duration: 0.52 }, // 7: 'E' (wave down, tilt right)
  { x: -6, y: -22, rotate: 0, rotateY: -14, scale: 0.96, opacity: 0.80, delay: 0.30, duration: 0.52 }, // 8: 'S' (wave up, tilt left)
  { x: 6, y: 20, rotate: 0, rotateY: 12, scale: 1.02, opacity: 0.80, delay: 0.34, duration: 0.52 }, // 9: 'P' (wave down, tilt right)
  { x: -5, y: -20, rotate: 0, rotateY: -12, scale: 0.97, opacity: 0.80, delay: 0.38, duration: 0.52 }, // 10: 'O' (wave up, tilt left)
  { x: 5, y: 18, rotate: 0, rotateY: 12, scale: 1.02, opacity: 0.80, delay: 0.42, duration: 0.52 }, // 11: 'N' (wave down, tilt right)
  { x: -5, y: -18, rotate: 0, rotateY: -10, scale: 0.97, opacity: 0.80, delay: 0.46, duration: 0.52 }, // 12: 'S' (wave up, tilt left)
  { x: 4, y: 16, rotate: 0, rotateY: 10, scale: 1.02, opacity: 0.82, delay: 0.50, duration: 0.52 }, // 13: 'I' (wave down, tilt right)
  { x: -4, y: -16, rotate: 0, rotateY: -10, scale: 0.98, opacity: 0.80, delay: 0.54, duration: 0.52 }, // 14: 'V' (wave up, tilt left)
  { x: 4, y: 14, rotate: 0, rotateY: 8, scale: 1.02, opacity: 0.82, delay: 0.58, duration: 0.52 }, // 15: 'E' (wave down, tilt right)

  // --------------------------------------------------------------------------
  // 3. WEBSITES: Settling crisply into final baseline (W, E, B, S, I, T, E, S)
  // Upward slide into baseline from below with slight scale expansion
  // --------------------------------------------------------------------------
  { x: -6, y: 28, rotate: -3, rotateY: 0, scale: 0.92, opacity: 0.80, delay: 0.60, duration: 0.52 }, // 16: 'W' (settle to baseline)
  { x: 0, y: 26, rotate: 2, rotateY: 0, scale: 0.93, opacity: 0.82, delay: 0.64, duration: 0.52 }, // 17: 'E' (settle to baseline)
  { x: -4, y: 28, rotate: -2, rotateY: 0, scale: 0.92, opacity: 0.80, delay: 0.68, duration: 0.52 }, // 18: 'B' (settle to baseline)
  { x: 0, y: 26, rotate: 2, rotateY: 0, scale: 0.93, opacity: 0.82, delay: 0.72, duration: 0.52 }, // 19: 'S' (settle to baseline)
  { x: -2, y: 28, rotate: -1, rotateY: 0, scale: 0.94, opacity: 0.84, delay: 0.76, duration: 0.52 }, // 20: 'I' (settle to baseline)
  { x: 0, y: 26, rotate: 2, rotateY: 0, scale: 0.93, opacity: 0.82, delay: 0.80, duration: 0.52 }, // 21: 'T' (settle to baseline)
  { x: -2, y: 28, rotate: -1, rotateY: 0, scale: 0.94, opacity: 0.84, delay: 0.84, duration: 0.52 }, // 22: 'E' (settle to baseline)
  { x: 2, y: 26, rotate: 2, rotateY: 0, scale: 0.94, opacity: 0.84, delay: 0.88, duration: 0.52 }, // 23: 'S' (settle to baseline)
];

// Hook to handle automatic initial execution and responsive replay on scroll returns
export function useHeroReplayTrigger(): number {
  const [animKey, setAnimKey] = useState(1);

  useEffect(() => {
    let ticking = false;
    let isDeepScrolled = false;
    let isAtTopArmed = false;
    let cachedHeroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const measureHero = () => {
      const heroEl =
        document.getElementById('hero-section-wrapper') ||
        document.getElementById('main-hero');
      if (heroEl && heroEl.offsetHeight > 0) {
        cachedHeroHeight = heroEl.offsetHeight;
      } else if (typeof window !== 'undefined') {
        cachedHeroHeight = window.innerHeight;
      }
    };

    measureHero();

    const checkScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        const heroHeight = cachedHeroHeight;

        // 1. Scrolled deep past Hero (Hero is off-screen):
        if (y > heroHeight * 0.85) {
          if (!isDeepScrolled) {
            isDeepScrolled = true;
          }
        }
        // 2. Scrolling back UP into the Hero:
        else if (isDeepScrolled && y < heroHeight * 0.70) {
          isDeepScrolled = false;
          setAnimKey((k) => k + 1);
        }

        // 3. User reaches near the top:
        if (y <= 12) {
          if (!isAtTopArmed) {
            isAtTopArmed = true;
          }
        }
        // 4. User scrolls down from top (sensitive: 25px):
        else if (isAtTopArmed && y >= 25) {
          isAtTopArmed = false;
          setAnimKey((k) => k + 1);
        }

        ticking = false;
      });
    };

    const handleResize = () => {
      measureHero();
      checkScroll();
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return animKey;
}

interface KineticWordProps {
  word: string;
  startIndex?: number;
  wordIndex?: number;
  totalHeadlineChars?: number;
  className?: string;
  suffix?: React.ReactNode;
}

interface KineticCharProps {
  char: string;
  globalIdx: number;
  config: CharMotionConfig;
  animKey: number;
  key?: React.Key;
}

function KineticChar({
  char,
  config,
  animKey,
}: KineticCharProps) {
  return (
    <motion.span
      key={animKey}
      initial={{
        x: config.x,
        y: config.y,
        rotate: config.rotate,
        rotateY: config.rotateY,
        scale: config.scale,
        opacity: config.opacity,
      }}
      animate={{
        x: 0,
        y: 0,
        rotate: 0,
        rotateY: 0,
        scale: 1.0,
        opacity: 1.0,
      }}
      transition={{
        duration: config.duration,
        ease: [0.16, 1, 0.3, 1],
        delay: config.delay,
      }}
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      {char}
    </motion.span>
  );
}

export function ScrollKineticWord({
  word,
  startIndex,
  wordIndex = 0,
  className = '',
  suffix,
}: KineticWordProps) {
  const shouldReduceMotion = useReducedMotion();
  const animKey = useHeroReplayTrigger();

  // Derive starting index if not explicitly provided
  const baseOffset =
    startIndex !== undefined
      ? startIndex
      : wordIndex === 0
        ? 0
        : wordIndex === 1
          ? 6
          : 16;

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {word}
        {suffix}
      </div>
    );
  }

  const chars = word.split('');

  return (
    <div
      className={`relative inline-flex items-center flex-wrap ${className}`}
      style={{ perspective: 1000 }}
    >
      {chars.map((char, localIdx) => {
        const globalIdx = baseOffset + localIdx;
        const config =
          HERO_CHAR_CONFIGS[globalIdx] ||
          HERO_CHAR_CONFIGS[globalIdx % HERO_CHAR_CONFIGS.length];

        return (
          <KineticChar
            key={localIdx}
            char={char}
            globalIdx={globalIdx}
            config={config}
            animKey={animKey}
          />
        );
      })}
      {suffix && (
        <motion.span
          key={animKey}
          initial={{ x: 0, y: 24, scale: 0.9, opacity: 0.8 }}
          animate={{ x: 0, y: 0, scale: 1.0, opacity: 1.0 }}
          transition={{
            duration: 0.48,
            ease: [0.18, 1, 0.32, 1],
            delay: 0.92,
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            willChange: 'transform, opacity',
          }}
        >
          {suffix}
        </motion.span>
      )}
    </div>
  );
}

// ============================================================================
// 2. HERO TAGLINE: Layered Editorial Reveal
// "MOBILE & DESKTOP." / "BUILT FOR BUSINESS."
// Primary line: y: 26px -> 0, x: -8px -> 0, opacity: 0.76 -> 1.0
// Secondary line: y: 36px -> 0, x: 8px -> 0, opacity: 0.72 -> 1.0
// ============================================================================
export function ScrollHeroTagline({
  line1,
  line2,
  className = '',
}: {
  line1: string;
  line2: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const smoothY = useSpring(scrollY, isMobile ? MOBILE_SPRING_CONFIG : DESKTOP_SPRING_CONFIG);

  const settleProgress = useTransform(smoothY, [0, 220], [0, 1]);

  const y1 = useTransform(settleProgress, [0, 0.75], [26, 0]);
  const x1 = useTransform(settleProgress, [0, 0.75], [-8, 0]);
  const opacity1 = useTransform(settleProgress, [0, 0.65], [0.76, 1.0]);

  const y2 = useTransform(settleProgress, [0.15, 0.95], [36, 0]);
  const x2 = useTransform(settleProgress, [0.15, 0.95], [8, 0]);
  const opacity2 = useTransform(settleProgress, [0.15, 0.85], [0.72, 1.0]);

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        <div>{line1}</div>
        <div>{line2}</div>
      </div>
    );
  }

  return (
    <div className={className} style={{ perspective: 600 }}>
      <motion.div
        style={{
          display: 'block',
          y: y1,
          x: x1,
          opacity: opacity1,
          willChange: 'transform, opacity',
        }}
      >
        {line1}
      </motion.div>
      <motion.div
        style={{
          display: 'block',
          y: y2,
          x: x2,
          opacity: opacity2,
          willChange: 'transform, opacity',
        }}
      >
        {line2}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 3. TECHNICAL STRIP: Character-by-Character Scanning Reveal
// Center text: "MODERN / RESPONSIVE / DIGITAL" animates letter-by-letter!
// Left: "01 // OVERVIEW" (x: -22px -> 0)
// Right: "2026" (x: 22px -> 0)
// ============================================================================
interface StripCharProps {
  ch: string;
  idx: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function StripChar({ ch, idx, total, progress }: StripCharProps) {
  const cStart = Math.min(0.65, (idx / total) * 0.7);
  const cEnd = Math.min(1.0, cStart + 0.35);

  const charY = useTransform(progress, [cStart, cEnd], [12, 0]);
  const charX = useTransform(progress, [cStart, cEnd], [((idx % 3) - 1) * 3, 0]);
  const charOpacity = useTransform(progress, [cStart, cEnd], [0.75, 1.0]);
  const charScale = useTransform(progress, [cStart, cEnd], [0.92, 1.0]);

  return (
    <motion.span
      style={{
        display: 'inline-block',
        y: charY,
        x: charX,
        opacity: charOpacity,
        scale: charScale,
        whiteSpace: ch === ' ' ? 'pre' : 'normal',
        willChange: 'transform, opacity',
      }}
    >
      {ch}
    </motion.span>
  );
}

export function ScrollTechnicalStrip({
  leftContent,
  centerText = 'MODERN / RESPONSIVE / DIGITAL',
  centerContent,
  rightContent,
  className = '',
}: {
  leftContent: React.ReactNode;
  centerText?: string;
  centerContent?: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 98%', 'start 60%']);

  const leftX = useTransform(progress, [0, 1], [-22, 0]);
  const leftOpacity = useTransform(progress, [0, 0.8], [0.74, 1.0]);

  const rightX = useTransform(progress, [0, 1], [22, 0]);
  const rightOpacity = useTransform(progress, [0, 0.8], [0.74, 1.0]);

  const dot1Opacity = useTransform(progress, [0, 0.4], [0.6, 1]);
  const dot1Scale = useTransform(progress, [0, 0.4], [0.8, 1]);
  const dot2Opacity = useTransform(progress, [0.4, 0.8], [0.6, 1]);
  const dot2Scale = useTransform(progress, [0.4, 0.8], [0.8, 1]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        <div className="flex items-center gap-1.5">{leftContent}</div>
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-black/40" />
          <span className="font-orbitron text-[9px] font-bold tracking-[0.25em] text-black uppercase">
            {centerText}
          </span>
          <span className="w-1 h-1 rounded-full bg-black/40" />
        </div>
        <div className="flex items-center gap-1.5">{rightContent}</div>
      </div>
    );
  }

  const chars = centerText.split('');

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          x: leftX,
          opacity: leftOpacity,
          willChange: 'transform, opacity',
        }}
      >
        {leftContent}
      </motion.div>

      <div className="flex items-center gap-2 select-none">
        <motion.span
          style={{
            opacity: dot1Opacity,
            scale: dot1Scale,
          }}
          className="w-1 h-1 rounded-full bg-black/40"
        />

        <div className="font-orbitron text-[9px] font-bold tracking-[0.25em] text-black uppercase inline-flex items-center flex-wrap">
          {chars.map((ch, idx) => (
            <StripChar
              key={idx}
              ch={ch}
              idx={idx}
              total={chars.length}
              progress={progress}
            />
          ))}
        </div>

        <motion.span
          style={{
            opacity: dot2Opacity,
            scale: dot2Scale,
          }}
          className="w-1 h-1 rounded-full bg-black/40"
        />
      </div>

      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          x: rightX,
          opacity: rightOpacity,
          willChange: 'transform, opacity',
        }}
      >
        {rightContent}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 4. LINE + CHARACTER CHOREOGRAPHY: For Image + Text Headline
// "MODERN WEBSITES." (Line 1) / "BUILT FOR YOUR BUSINESS." (Line 2)
// Each line has its own mask, characters inside visibly animate in 3D stagger!
// translateY: 34–42px, rotateY: ±16deg, scale: 0.91 -> 1.0, opacity: 0.75 -> 1.0
// ============================================================================
interface LineCharProps {
  ch: string;
  idx: number;
  total: number;
  linePhase: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function LineChar({ ch, idx, total, linePhase, progress }: LineCharProps) {
  const cStart = Math.min(0.65, linePhase + (idx / total) * 0.45);
  const cEnd = Math.min(1.0, cStart + 0.38);

  const y = useTransform(progress, [cStart, cEnd], [34 + (idx % 2) * 6, 0]);
  const rotateY = useTransform(progress, [cStart, cEnd], [((idx % 4) - 1.5) * 16, 0]);
  const rotateX = useTransform(progress, [cStart, cEnd], [-14, 0]);
  const scale = useTransform(progress, [cStart, cEnd], [0.91, 1.0]);
  const filter = useTransform(progress, [cStart, cEnd], ['blur(2.5px)', 'blur(0px)']);
  const opacity = useTransform(progress, [cStart, cEnd], [0.75, 1.0]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <motion.span
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        y,
        rotateY,
        rotateX,
        scale,
        filter: isMobile ? undefined : filter,
        opacity,
        whiteSpace: ch === ' ' ? 'pre' : 'normal',
        willChange: isMobile ? 'transform, opacity' : 'transform, opacity, filter',
      }}
    >
      {ch}
    </motion.span>
  );
}

export function ScrollLineCharacters({
  text,
  linePhase = 0,
  className = '',
}: {
  text: string;
  linePhase?: number; // 0 for Line 1, 0.22 for Line 2
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 94%', 'start 58%']);

  if (shouldReduceMotion) {
    return <div className={className}>{text}</div>;
  }

  const chars = text.split('');

  return (
    <div
      ref={ref}
      style={{ overflow: 'hidden', display: 'block', paddingBottom: '3px' }}
      className={className}
    >
      <div className="inline-flex flex-wrap" style={{ perspective: 800 }}>
        {chars.map((ch, idx) => (
          <LineChar
            key={idx}
            ch={ch}
            idx={idx}
            total={chars.length}
            linePhase={linePhase}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 5. WORD CLUSTER REVEAL: Kinetic word-group movement for paragraphs
// Clusters of 2–3 words moving 18px -> 0, unblurring from 2px -> 0, opacity 0.72 -> 1.0
// ============================================================================
interface ClusterItemProps {
  cluster: string;
  idx: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function ClusterItem({ cluster, idx, progress }: ClusterItemProps) {
  const clusterStart = Math.min(0.55, idx * 0.07);
  const clusterEnd = Math.min(1.0, clusterStart + 0.45);

  const y = useTransform(progress, [clusterStart, clusterEnd], [18, 0]);
  const filter = useTransform(progress, [clusterStart, clusterEnd], ['blur(2px)', 'blur(0px)']);
  const opacity = useTransform(progress, [clusterStart, clusterEnd], [0.72, 1.0]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <motion.span
      style={{
        display: 'inline-block',
        marginRight: '0.28em',
        y,
        filter: isMobile ? undefined : filter,
        opacity,
        willChange: isMobile ? 'transform, opacity' : 'transform, opacity, filter',
      }}
    >
      {cluster}
    </motion.span>
  );
}

export function ScrollWordCluster({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useSmoothScroll(ref, ['start 92%', 'start 60%']);

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(' ');
  const clusters: string[] = [];
  for (let i = 0; i < words.length; i += 3) {
    clusters.push(words.slice(i, i + 3).join(' '));
  }

  return (
    <p ref={ref} className={className}>
      {clusters.map((cluster, idx) => (
        <ClusterItem
          key={idx}
          cluster={cluster}
          idx={idx}
          progress={progress}
        />
      ))}
    </p>
  );
}

// ============================================================================
// 6. FEATURE CHAIN: Staggered sequence for capability cards
// Icon (scale 0.86 -> 1.0, rotate: -12deg -> 0) -> Title (y: 16px -> 0) -> Desc (y: 18px -> 0)
// ============================================================================
export function ScrollFeatureChain({
  icon,
  title,
  desc,
  index = 0,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 94%', 'start 65%']);

  const itemStart = Math.min(0.42, index * 0.09);
  const itemEnd = Math.min(1.0, itemStart + 0.52);

  const iconScale = useTransform(progress, [itemStart, itemEnd], [0.86, 1.0]);
  const iconRotate = useTransform(progress, [itemStart, itemEnd], [-12, 0]);
  const titleY = useTransform(progress, [itemStart + 0.04, itemEnd], [16, 0]);
  const descY = useTransform(progress, [itemStart + 0.08, itemEnd], [18, 0]);
  const opacity = useTransform(progress, [itemStart, itemEnd], [0.72, 1.0]);

  if (shouldReduceMotion) {
    return (
      <div className="flex items-start gap-2.5">
        <div className="p-1.5 rounded-xs bg-gray-100 text-black mt-0.5 shrink-0">
          {icon}
        </div>
        <div>
          <span className="font-orbitron font-bold text-xs uppercase tracking-wider text-black block">
            {title}
          </span>
          <span className="font-jakarta text-xs text-gray-500 mt-0.5 block leading-normal">
            {desc}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex items-start gap-2.5">
      <motion.div
        style={{
          scale: iconScale,
          rotate: iconRotate,
          opacity,
          willChange: 'transform, opacity',
        }}
        className="p-1.5 rounded-xs bg-gray-100 text-black mt-0.5 shrink-0"
      >
        {icon}
      </motion.div>
      <div>
        <motion.span
          style={{
            display: 'block',
            y: titleY,
            opacity,
            willChange: 'transform, opacity',
          }}
          className="font-orbitron font-bold text-xs uppercase tracking-wider text-black"
        >
          {title}
        </motion.span>
        <motion.span
          style={{
            display: 'block',
            y: descY,
            opacity,
            willChange: 'transform, opacity',
          }}
          className="font-jakarta text-xs text-gray-500 mt-0.5 leading-normal"
        >
          {desc}
        </motion.span>
      </div>
    </div>
  );
}

// ============================================================================
// 7. EDITORIAL BUTTON: Directional entrance
// Horizontal displacement (x: -16px -> 0), scale (0.94 -> 1.0), opacity 0.75 -> 1.0
// ============================================================================
export function ScrollEditorialButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 95%', 'start 70%']);

  const x = useTransform(progress, [0, 1], [-16, 0]);
  const scale = useTransform(progress, [0, 1], [0.94, 1.0]);
  const opacity = useTransform(progress, [0, 0.8], [0.75, 1.0]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          display: 'inline-block',
          width: '100%',
          x,
          scale,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 8. THREE-PHONE SHOWCASE HEADING: Noticeable Word-Stagger Kinetic Reveal
// "Modern Websites Tailored For Every Business"
// Split into words, each word: y: 32px -> 0, scale: 0.92 -> 1.0, rotateX: -16deg -> 0,
// filter: blur(2.5px) -> blur(0), opacity: 0.75 -> 1.0 (NEVER INVISIBLE!)
// ============================================================================
interface PhoneWordProps {
  w: string;
  wIdx: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function PhoneWord({ w, wIdx, total, progress }: PhoneWordProps) {
  const wStart = Math.min(0.55, (wIdx / total) * 0.55);
  const wEnd = Math.min(1.0, wStart + 0.42);

  const wordY = useTransform(progress, [wStart, wEnd], [32, 0]);
  const wordRotateX = useTransform(progress, [wStart, wEnd], [-16, 0]);
  const wordScale = useTransform(progress, [wStart, wEnd], [0.92, 1.0]);
  const wordFilter = useTransform(progress, [wStart, wEnd], ['blur(2.5px)', 'blur(0px)']);
  const wordOpacity = useTransform(progress, [wStart, wEnd], [0.76, 1.0]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <motion.span
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        y: wordY,
        rotateX: wordRotateX,
        scale: wordScale,
        filter: isMobile ? undefined : wordFilter,
        opacity: wordOpacity,
        willChange: isMobile ? 'transform, opacity' : 'transform, filter, opacity',
      }}
    >
      {w}
    </motion.span>
  );
}

export function ScrollPhoneHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 94%', 'center 42%']);

  const eyebrowY = useTransform(progress, [0, 0.55], [18, 0]);
  const eyebrowOpacity = useTransform(progress, [0, 0.5], [0.76, 1.0]);
  const eyebrowTracking = useTransform(progress, [0, 0.6], ['0.32em', '0.25em']);

  const words = title.split(' ');

  const subtitleY = useTransform(progress, [0.2, 0.9], [20, 0]);
  const subtitleOpacity = useTransform(progress, [0.2, 0.8], [0.72, 1.0]);

  if (shouldReduceMotion) {
    return (
      <div className="w-full pt-7 sm:pt-12 pb-2 sm:pb-4 px-4 sm:px-6 text-center select-none">
        <span className="font-orbitron font-bold uppercase tracking-[0.25em] text-[#F1E5C6] block text-[9.5px] sm:text-xs">
          {eyebrow}
        </span>
        <h3 className="font-manrope font-light text-white tracking-[-1.5px] mt-1 sm:mt-2 text-lg sm:text-3xl">
          {title}
        </h3>
        <p className="font-manrope text-white/70 text-[11px] sm:text-sm mt-0.5 sm:mt-1 max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="w-full pt-7 sm:pt-12 pb-2 sm:pb-4 px-4 sm:px-6 text-center select-none"
    >
      <motion.span
        style={{
          display: 'block',
          y: eyebrowY,
          opacity: eyebrowOpacity,
          letterSpacing: eyebrowTracking,
          willChange: 'transform, opacity',
        }}
        className="font-orbitron font-bold uppercase text-[#F1E5C6] text-[9.5px] sm:text-xs"
      >
        {eyebrow}
      </motion.span>

      <h3
        className="font-manrope font-light text-white tracking-[-1.5px] mt-1 sm:mt-2 text-lg sm:text-3xl inline-flex flex-wrap justify-center gap-x-2"
        style={{ perspective: 800 }}
      >
        {words.map((w, wIdx) => (
          <PhoneWord
            key={wIdx}
            w={w}
            wIdx={wIdx}
            total={words.length}
            progress={progress}
          />
        ))}
      </h3>

      <motion.p
        style={{
          y: subtitleY,
          opacity: subtitleOpacity,
          willChange: 'transform, opacity',
        }}
        className="font-manrope text-white/70 text-[11px] sm:text-sm mt-0.5 sm:mt-1 max-w-lg mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

// ============================================================================
// 9. MACBOOK SPLIT REVEAL: Opposing split displacement for outer controls & text
// Left info: x: -28px -> 0, rotateY: -15deg -> 0
// Right controls: x: 28px -> 0, rotateY: 15deg -> 0
// ============================================================================
export function ScrollSplitReveal({
  children,
  direction = 'left',
  phase = 0,
  className = '',
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  phase?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 95%', 'center 48%']);

  const start = Math.min(0.4, phase * 0.12);
  const end = Math.min(1.0, start + 0.6);

  const initialX = direction === 'left' ? -28 : 28;
  const initialRotateY = direction === 'left' ? -15 : 15;

  const x = useTransform(progress, [start, end], [initialX, 0]);
  const rotateY = useTransform(progress, [start, end], [initialRotateY, 0]);
  const opacity = useTransform(progress, [start, end], [0.74, 1.0]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ perspective: 800 }}>
      <motion.div
        style={{
          display: 'block',
          transformStyle: 'preserve-3d',
          x,
          rotateY,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 9B. MACBOOK SECTION HEADING: Word/Character-level masked reveal
// "Complete Dental Healthcare Platform"
// ============================================================================
interface MacBookWordProps {
  word: string;
  idx: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function MacBookWord({ word, idx, total, progress }: MacBookWordProps) {
  const start = Math.min(0.55, (idx / total) * 0.5);
  const end = Math.min(1.0, start + 0.45);

  const y = useTransform(progress, [start, end], [34, 0]);
  const rotateX = useTransform(progress, [start, end], [-14, 0]);
  const filter = useTransform(progress, [start, end], ['blur(2.5px)', 'blur(0px)']);
  const opacity = useTransform(progress, [start, end], [0.75, 1.0]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <motion.span
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        y,
        rotateX,
        filter: isMobile ? undefined : filter,
        opacity,
        willChange: isMobile ? 'transform, opacity' : 'transform, filter, opacity',
      }}
    >
      {word}
    </motion.span>
  );
}

export function ScrollMacBookHeading({
  text = 'Complete Dental Healthcare Platform',
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 94%', 'center 48%']);

  if (shouldReduceMotion) {
    return <h3 className={className}>{text}</h3>;
  }

  const words = text.split(' ');

  return (
    <div
      ref={ref}
      style={{ overflow: 'hidden', display: 'block', paddingBottom: '3px' }}
      className={className}
    >
      <h3
        className="font-manrope font-light text-white tracking-[-1.5px] mt-1.5 sm:mt-2 text-xl sm:text-4xl inline-flex flex-wrap justify-center gap-x-2"
        style={{ perspective: 800 }}
      >
        {words.map((w, idx) => (
          <MacBookWord
            key={idx}
            word={w}
            idx={idx}
            total={words.length}
            progress={progress}
          />
        ))}
      </h3>
    </div>
  );
}

// ============================================================================
// 9C. MACBOOK SECTION SUPPORTING COPY: Blur -> Sharp + translateY
// ============================================================================
export function ScrollMacBookCopy({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useSmoothScroll(ref, ['start 94%', 'center 50%']);

  const y = useTransform(progress, [0.15, 0.85], [18, 0]);
  const filter = useTransform(progress, [0.15, 0.85], ['blur(2.5px)', 'blur(0px)']);
  const opacity = useTransform(progress, [0.15, 0.85], [0.74, 1.0]);

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <motion.p
      ref={ref}
      style={{
        y,
        filter: isMobile ? undefined : filter,
        opacity,
        willChange: isMobile ? 'transform, opacity' : 'transform, filter, opacity',
      }}
      className={className}
    >
      {text}
    </motion.p>
  );
}

// ============================================================================
// 10. ABOUT GRID CHOREOGRAPHY: Noticeable sequential card activation
// Box 1 -> Box 2 -> Box 3 -> Box 4 -> Box 5 -> Box 6
// ============================================================================
export function ScrollGridItem({
  children,
  index = 0,
  className = '',
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 96%', 'start 62%']);

  const start = Math.min(0.48, index * 0.08);
  const end = Math.min(1.0, start + 0.48);

  const y = useTransform(progress, [start, end], [24, 0]);
  const scale = useTransform(progress, [start, end], [0.93, 1.0]);
  const opacity = useTransform(progress, [start, end], [0.74, 1.0]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          y,
          scale,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 10B. ABOUT SECTION DEDICATED CARD: Micro-animation for Icon, Title, and Desc
// - Box 1 -> Box 2 -> Box 3 -> Box 4 -> Box 5 -> Box 6
// - ICON: small scale + rotation into place
// - TITLE: word/character stagger
// - DESCRIPTION: slightly delayed reveal
// ============================================================================
export function ScrollAboutCard({
  number,
  title,
  desc,
  index = 0,
}: {
  number: string;
  title: string;
  desc: string;
  index: number;
  key?: React.Key;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 96%', 'start 62%']);

  const start = Math.min(0.46, index * 0.08);
  const end = Math.min(1.0, start + 0.48);

  // Card container lift
  const cardY = useTransform(progress, [start, end], [26, 0]);
  const cardScale = useTransform(progress, [start, end], [0.93, 1.0]);
  const cardOpacity = useTransform(progress, [start, end], [0.76, 1.0]);

  // Icon / number scale + rotation into place
  const iconScale = useTransform(progress, [start, end], [0.82, 1.0]);
  const iconRotate = useTransform(progress, [start, end], [-14, 0]);

  // Title translation
  const titleY = useTransform(progress, [start + 0.04, end], [16, 0]);
  const titleOpacity = useTransform(progress, [start + 0.04, end], [0.78, 1.0]);

  // Description delay
  const descY = useTransform(progress, [start + 0.08, end], [14, 0]);
  const descFilter = useTransform(progress, [start + 0.08, end], ['blur(2px)', 'blur(0px)']);
  const descOpacity = useTransform(progress, [start + 0.08, end], [0.72, 1.0]);

  if (shouldReduceMotion) {
    return (
      <div className="p-2.5 sm:p-3.5 lg:p-5 rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-black/20 transition-all flex flex-col justify-between select-none h-full">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] sm:text-xs font-bold text-gray-400">{number}</span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black" />
          </div>
          <h3 className="font-orbitron font-bold text-[10px] sm:text-xs lg:text-sm text-black tracking-tight leading-snug">
            {title}
          </h3>
          <p className="font-jakarta text-[8.5px] sm:text-[11px] lg:text-xs text-gray-600 leading-snug sm:leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="h-full">
      <motion.div
        style={{
          y: cardY,
          scale: cardScale,
          opacity: cardOpacity,
          willChange: 'transform, opacity',
        }}
        className="p-2.5 sm:p-3.5 lg:p-5 rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-black/20 transition-all flex flex-col justify-between select-none h-full"
      >
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between mb-1">
            <motion.span
              style={{
                display: 'inline-block',
                scale: iconScale,
                rotate: iconRotate,
              }}
              className="font-mono text-[9px] sm:text-xs font-bold text-gray-400"
            >
              {number}
            </motion.span>
            <motion.span
              style={{
                scale: iconScale,
              }}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black"
            />
          </div>

          <motion.h3
            style={{
              display: 'block',
              y: titleY,
              opacity: titleOpacity,
              willChange: 'transform, opacity',
            }}
            className="font-orbitron font-bold text-[10px] sm:text-xs lg:text-sm text-black tracking-tight leading-snug"
          >
            {title}
          </motion.h3>

          <motion.p
            style={{
              display: 'block',
              y: descY,
              filter: descFilter,
              opacity: descOpacity,
              willChange: 'transform, opacity, filter',
            }}
            className="font-jakarta text-[8.5px] sm:text-[11px] lg:text-xs text-gray-600 leading-snug sm:leading-relaxed"
          >
            {desc}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 11. CONTACT SECTION: Strong Typographic Reveal
// "LET’S DISCUSS YOUR WEBSITE."
// Split into words: y: 38px -> 0, rotateX: -16deg -> 0, scale: 0.91 -> 1.0,
// filter: blur(3px) -> blur(0), opacity: 0.75 -> 1.0 (NEVER INVISIBLE!)
// ============================================================================
interface ContactWordProps {
  word: string;
  wIdx: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function ContactWord({ word, wIdx, total, progress }: ContactWordProps) {
  const wStart = Math.min(0.6, (wIdx / total) * 0.6);
  const wEnd = Math.min(1.0, wStart + 0.38);

  const y = useTransform(progress, [wStart, wEnd], [38, 0]);
  const rotateX = useTransform(progress, [wStart, wEnd], [-16, 0]);
  const scale = useTransform(progress, [wStart, wEnd], [0.91, 1.0]);
  const filter = useTransform(progress, [wStart, wEnd], ['blur(3px)', 'blur(0px)']);
  const opacity = useTransform(progress, [wStart, wEnd], [0.75, 1.0]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <motion.span
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        y,
        rotateX,
        scale,
        filter: isMobile ? undefined : filter,
        opacity,
        willChange: isMobile ? 'transform, opacity' : 'transform, filter, opacity',
      }}
    >
      {word}
    </motion.span>
  );
}

export function ScrollContactHeading({
  text,
  children,
  className = '',
}: {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 94%', 'center 52%']);

  const resolvedText =
    text ||
    (typeof children === 'string'
      ? children
      : React.isValidElement(children) && typeof (children.props as any)?.children === 'string'
        ? (children.props as any).children
        : 'LET’S DISCUSS YOUR WEBSITE.');

  if (shouldReduceMotion) {
    return <div className={className}>{children || <h2>{resolvedText}</h2>}</div>;
  }

  const words = String(resolvedText).trim().split(/\s+/);

  return (
    <div
      ref={ref}
      style={{ overflow: 'hidden', paddingBottom: '3px' }}
      className="inline-flex flex-wrap gap-x-2"
    >
      <h2
        className={`${className} inline-flex flex-wrap gap-x-2`}
        style={{ perspective: 800 }}
      >
        {words.map((word, wIdx) => (
          <ContactWord
            key={wIdx}
            word={word}
            wIdx={wIdx}
            total={words.length}
            progress={progress}
          />
        ))}
      </h2>
    </div>
  );
}

// ============================================================================
// 12. GENERAL LINE REVEAL: Masked vertical settling with tracking compression
// ============================================================================
export function ScrollLineReveal({
  children,
  className = '',
  offsetY = 24,
  trackingCompress = true,
  phase = 0,
}: {
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
  trackingCompress?: boolean;
  phase?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 92%', 'start 58%']);

  const start = Math.min(0.45, phase * 0.15);
  const end = Math.min(1.0, start + 0.55);

  const y = useTransform(progress, [start, end], [offsetY, 0]);
  const opacity = useTransform(progress, [start, end], [0.74, 1.0]);
  const letterSpacing = useTransform(
    progress,
    [start, end],
    trackingCompress ? ['0.08em', '0.04em'] : ['0em', '0em']
  );

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      style={{ overflow: 'hidden', display: 'block', paddingBottom: '2px' }}
    >
      <motion.div
        style={{
          display: 'block',
          y,
          opacity,
          letterSpacing,
          willChange: 'transform, opacity',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 13. FOOTER CALM: Restrained, minimal settling for footer columns
// ============================================================================
export function ScrollFooterCalm({
  children,
  delayFraction = 0,
  className = '',
}: {
  children: React.ReactNode;
  delayFraction?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSmoothScroll(ref, ['start 98%', 'start 75%']);

  const start = Math.min(0.4, delayFraction * 0.15);
  const end = Math.min(1.0, start + 0.6);

  const y = useTransform(progress, [start, end], [14, 0]);
  const opacity = useTransform(progress, [start, end], [0.78, 1.0]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          display: 'block',
          y,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
