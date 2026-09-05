import {
  Checkerboard,
  CornerBL,
  CornerBR,
  CornerTL,
  CornerTR,
  WireframeGlobe,
} from './Svgs.tsx';
import { ScrollKineticWord, ScrollHeroTagline } from './MotionTypography.tsx';

interface HeroProps {
  onContactClick?: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <main
      id="main-hero"
      className="relative z-10 flex-1 flex flex-col lg:flex-row justify-between items-stretch w-full"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingBottom: 'var(--main-py)',
      }}
    >
      {/* Desktop & Mobile Main Composition */}
      <div className="w-full flex-1 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        {/* Left Block (vertically centered, constrained width so center character remains completely unobstructed) */}
        <div
          id="hero-left-block"
          className="flex flex-col justify-center h-full max-w-md lg:max-w-[420px] xl:max-w-[450px] pt-6 sm:pt-8 lg:pt-0"
        >
          {/* 1. Small top-left L-corner bracket */}
          <CornerTL
            id="headline-bracket-tl"
            className="text-black mb-4"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />

          {/* 2. Headline: 3 words, Orbitron font-black uppercase leading-[1.05] letter-spacing-headline */}
          <h1
            id="hero-main-headline"
            className="font-orbitron font-black uppercase leading-[1.05] letter-spacing-headline select-none"
            style={{
              fontSize: 'var(--headline)',
            }}
          >
            <div>
              <ScrollKineticWord word="MODERN" startIndex={0} />
            </div>
            <div>
              <ScrollKineticWord word="RESPONSIVE" startIndex={6} />
            </div>
            <div className="flex items-center flex-wrap gap-x-3">
              <ScrollKineticWord
                word="WEBSITES"
                startIndex={16}
                suffix={
                  <Checkerboard
                    id="inline-checkerboard-svg"
                    className="inline-block align-baseline text-black shrink-0 ml-3"
                    style={{
                      width: 'var(--checker-w)',
                      height: 'var(--checker-h)',
                      transform: 'translateY(2px)',
                    }}
                  />
                }
              />
            </div>
          </h1>

          {/* 3. Bottom-left L-corner bracket */}
          <CornerBL
            id="headline-bracket-bl"
            className="text-black mt-4"
            style={{ width: 'var(--corner)', height: 'var(--corner)' }}
          />
        </div>

        {/* Right lower feature block (self-end, bottom-aligned on desktop) */}
        <div
          id="hero-feature-block"
          className="self-end relative bg-transparent"
          style={{
            minWidth: 'var(--feature-min)',
            padding: 'var(--feature-pad)',
          }}
        >
          {/* Four corner bracket SVGs at absolute corners */}
          <CornerTL
            id="feature-bracket-tl"
            className="absolute top-0 left-0 text-black pointer-events-none"
            style={{ width: 'var(--feature-corner, var(--corner))', height: 'var(--feature-corner, var(--corner))' }}
          />
          <CornerTR
            id="feature-bracket-tr"
            className="absolute top-0 right-0 text-black pointer-events-none"
            style={{ width: 'var(--feature-corner, var(--corner))', height: 'var(--feature-corner, var(--corner))' }}
          />
          <CornerBL
            id="feature-bracket-bl"
            className="absolute bottom-0 left-0 text-black pointer-events-none"
            style={{ width: 'var(--feature-corner, var(--corner))', height: 'var(--feature-corner, var(--corner))' }}
          />
          <CornerBR
            id="feature-bracket-br"
            className="absolute bottom-0 right-0 text-black pointer-events-none"
            style={{ width: 'var(--feature-corner, var(--corner))', height: 'var(--feature-corner, var(--corner))' }}
          />

          {/* Centered wireframe globe & business tagline */}
          <div className="flex flex-col items-center text-center">
            <WireframeGlobe
              id="feature-globe-svg"
              className="text-black mb-1 sm:mb-2 lg:mb-6 shrink-0"
              style={{
                width: 'var(--feature-globe, var(--globe))',
                height: 'var(--feature-globe, var(--globe))',
              }}
            />

            <div
              id="feature-tagline"
              className="font-semibold uppercase letter-spacing-tagline text-black"
              style={{
                fontSize: 'var(--feature-text, var(--body))',
                lineHeight: 1.35,
              }}
            >
              <ScrollHeroTagline
                line1="MOBILE & DESKTOP."
                line2="BUILT FOR BUSINESS."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
