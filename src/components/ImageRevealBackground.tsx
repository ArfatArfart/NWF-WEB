import { useEffect, useRef, useState } from 'react';

// New Hero character assets: Queen (Decorated) and Queen Plain (Simple)
export const BG_IMAGE_1 = `${import.meta.env.BASE_URL}assets/hero-queen.png`;
export const BG_IMAGE_2 = `${import.meta.env.BASE_URL}assets/hero-queen-plain.png`;

export default function ImageRevealBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const [cellSize, setCellSize] = useState<number>(44);

  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const gridOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isInsideRef = useRef<boolean>(false);
  const hoverOpacityRef = useRef<number>(0);
  const hasInitializedMouse = useRef(false);

  useEffect(() => {
    // Preload both images in memory immediately
    const img1 = new Image();
    img1.src = BG_IMAGE_1;
    const img2 = new Image();
    img2.src = BG_IMAGE_2;

    const updateCellSize = () => {
      const size = Math.round(Math.min(64, Math.max(36, window.innerWidth * 0.028)));
      setCellSize(size);
    };
    updateCellSize();

    // Window resize handler
    window.addEventListener('resize', updateCellSize);

    const updatePointerPos = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInside = (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );

      isInsideRef.current = isInside;

      if (isInside) {
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        mouseRef.current.x = x;
        mouseRef.current.y = y;

        if (!hasInitializedMouse.current) {
          smoothRef.current.x = x;
          smoothRef.current.y = y;
          hasInitializedMouse.current = true;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        updatePointerPos(e.clientX, e.clientY);
      }
    };

    const handleMouseLeaveWindow = () => {
      isInsideRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const t = e.touches[0];
        updatePointerPos(t.clientX, t.clientY);
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          if (
            t.clientX >= rect.left &&
            t.clientX <= rect.right &&
            t.clientY >= rect.top &&
            t.clientY <= rect.bottom
          ) {
            smoothRef.current.x = t.clientX - rect.left;
            smoothRef.current.y = t.clientY - rect.top;
            isInsideRef.current = true;
          }
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isInsideRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    let animationFrameId: number;
    let isIntersecting = true;

    const renderLoop = () => {
      if (!isIntersecting) return;

      // Smoothly interpolate hover opacity (fades in on enter, fades out naturally on leave)
      const targetHover = isInsideRef.current ? 1 : 0;
      hoverOpacityRef.current += (targetHover - hoverOpacityRef.current) * 0.12;

      // Ease smoothRef toward mouse with factor 0.1
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;

      const winW = containerRef.current?.offsetWidth || window.innerWidth || 1920;
      const winH = containerRef.current?.offsetHeight || window.innerHeight || 1080;

      // Responsive spotlight radius (wider ratio on mobile for fingertip reveal)
      const isMobile = winW < 1024;
      const radius = Math.round(
        Math.min(380, Math.max(130, winW * (isMobile ? 0.32 : 0.16)))
      );

      if (revealRef.current) {
        if (hoverOpacityRef.current > 0.005) {
          revealRef.current.style.opacity = hoverOpacityRef.current.toFixed(3);

          const cx = Math.round(smoothRef.current.x);
          const cy = Math.round(smoothRef.current.y);

          // Hardware-accelerated GPU radial-gradient mask (exact same stops as baseline canvas)
          const mask = `radial-gradient(circle ${radius}px at ${cx}px ${cy}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.10) 92%, transparent 100%)`;
          revealRef.current.style.maskImage = mask;
          revealRef.current.style.webkitMaskImage = mask;
        } else {
          revealRef.current.style.opacity = '0';
        }
      }

      // Parallax grid:
      const normX = (smoothRef.current.x / winW) - 0.5;
      const normY = (smoothRef.current.y / winH) - 0.5;

      const targetOffsetX = normX * 16;
      const targetOffsetY = normY * 16;

      gridOffsetRef.current.x += (targetOffsetX - gridOffsetRef.current.x) * 0.06;
      gridOffsetRef.current.y += (targetOffsetY - gridOffsetRef.current.y) * 0.06;

      if (patternRef.current) {
        patternRef.current.setAttribute('x', gridOffsetRef.current.x.toFixed(2));
        patternRef.current.setAttribute('y', gridOffsetRef.current.y.toFixed(2));
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // IntersectionObserver: Pause rAF loop when scrolled down past Hero section
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(renderLoop);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('resize', updateCellSize);
    };
  }, []);

  return (
    <div
      id="interactive-image-reveal-bg"
      ref={containerRef}
      className="block absolute inset-0 pointer-events-auto touch-pan-y z-0 overflow-hidden select-none cursor-default"
      aria-hidden="true"
    >
      {/* Layer 1: Base layer BG_IMAGE_1 (Queen) full bleed inside hero */}
      <div
        id="bg-base-layer"
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      >
        <img
          src={BG_IMAGE_1}
          alt="Hero Queen"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Layer 2: Reveal layer BG_IMAGE_2 (Plain) full bleed, clipped by canvas mask */}
      <div
        id="bg-reveal-layer"
        ref={revealRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 will-change-[mask-image,opacity]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <img
          src={BG_IMAGE_2}
          alt="Hero Queen Plain Reveal"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Layer 3: Subtle SVG grid overlay at opacity 0.10, stroke #64748b, strokeWidth 0.6 */}
      <svg
        id="bg-parallax-grid"
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ opacity: 0.1 }}
      >
        <defs>
          <pattern
            id="reveal-parallax-pattern"
            ref={patternRef}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#reveal-parallax-pattern)" />
      </svg>
    </div>
  );
}
