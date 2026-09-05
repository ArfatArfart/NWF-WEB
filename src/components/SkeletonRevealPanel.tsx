import { useEffect, useRef, useState } from 'react';

export const SKELETON_IMAGE_DECORATED = '/assets/skeleton1.png.png';
export const SKELETON_IMAGE_PLAIN = '/assets/skeleton2.png.png';

export default function SkeletonRevealPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const smoothRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverOpacityRef = useRef<number>(0);
  const isInsideRef = useRef<boolean>(false);
  const hasInitializedMouse = useRef(false);

  useEffect(() => {
    // Detect fine pointer capability (mouse, trackpad, stylus on desktop or tablet/iPad)
    const hasFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    const scale = 0.5 * dpr;
    const offscreenCanvas = document.createElement('canvas');
    const ctx = offscreenCanvas.getContext('2d');

    const resizeCanvas = () => {
      const w = containerRef.current?.offsetWidth || 800;
      const h = containerRef.current?.offsetHeight || 600;
      offscreenCanvas.width = Math.max(100, Math.round(w * scale));
      offscreenCanvas.height = Math.max(100, Math.round(h * scale));
    };
    resizeCanvas();

    const updatePointerPos = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      mouseRef.current.x = x;
      mouseRef.current.y = y;

      if (!hasInitializedMouse.current) {
        smoothRef.current.x = x;
        smoothRef.current.y = y;
        hasInitializedMouse.current = true;
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen' || hasFinePointer) {
        isInsideRef.current = true;
        setIsHovered(true);
        updatePointerPos(e.clientX, e.clientY);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen' || hasFinePointer) {
        if (!isInsideRef.current) {
          isInsideRef.current = true;
          setIsHovered(true);
        }
        updatePointerPos(e.clientX, e.clientY);
      }
    };

    const handlePointerLeave = () => {
      isInsideRef.current = false;
      setIsHovered(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isInsideRef.current = false;
      setIsHovered(false);
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('pointerenter', handlePointerEnter);
      containerEl.addEventListener('pointermove', handlePointerMove, { passive: true });
      containerEl.addEventListener('pointerleave', handlePointerLeave);
      containerEl.addEventListener('pointercancel', handlePointerLeave);
      containerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      containerEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      containerEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const renderLoop = () => {
      // Smoothly interpolate hover opacity (fades in on enter, fades out naturally on leave)
      const targetHover = isInsideRef.current ? 1 : 0;
      hoverOpacityRef.current += (targetHover - hoverOpacityRef.current) * 0.12;

      // Ease smoothRef toward mouse with factor 0.1 (exact same as Main Hero)
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;

      const winW = containerRef.current?.offsetWidth || 800;

      // Soft circular spotlight radius (responsive to container width)
      const radius = Math.round(
        Math.min(240, Math.max(90, winW * 0.20))
      );

      if (ctx && revealRef.current) {
        if (hoverOpacityRef.current > 0.005) {
          revealRef.current.style.opacity = hoverOpacityRef.current.toFixed(3);

          const cx = smoothRef.current.x * scale;
          const cy = smoothRef.current.y * scale;
          const r = radius * scale;

          ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

          // Soft radial gradient circle on offscreen canvas at smoothed cursor (exact Hero gradient stops)
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          grad.addColorStop(0, 'rgba(255,255,255,1)');
          grad.addColorStop(0.4, 'rgba(255,255,255,1)');
          grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
          grad.addColorStop(0.78, 'rgba(255,255,255,0.35)');
          grad.addColorStop(0.9, 'rgba(255,255,255,0.1)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');

          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

          const dataUrl = offscreenCanvas.toDataURL('image/png');

          revealRef.current.style.maskImage = `url(${dataUrl})`;
          revealRef.current.style.webkitMaskImage = `url(${dataUrl})`;
          revealRef.current.style.maskSize = '100% 100%';
          revealRef.current.style.webkitMaskSize = '100% 100%';
          revealRef.current.style.maskRepeat = 'no-repeat';
          revealRef.current.style.webkitMaskRepeat = 'no-repeat';
        } else {
          revealRef.current.style.opacity = '0';
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (containerEl) {
        containerEl.removeEventListener('pointerenter', handlePointerEnter);
        containerEl.removeEventListener('pointermove', handlePointerMove);
        containerEl.removeEventListener('pointerleave', handlePointerLeave);
        containerEl.removeEventListener('pointercancel', handlePointerLeave);
        containerEl.removeEventListener('touchstart', handleTouchStart);
        containerEl.removeEventListener('touchend', handleTouchEnd);
        containerEl.removeEventListener('touchcancel', handleTouchEnd);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="skeleton-reveal-container"
      className="absolute inset-0 w-full h-full overflow-hidden bg-transparent select-none cursor-default touch-pan-y"
    >
      {/* Layer 1: Base layer — DECORATED SKELETON (Always 100% visible, centered, rock solid) */}
      <div
        id="skeleton-base-layer"
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: isHovered ? 'scale(1.015)' : 'scale(1)',
        }}
      >
        <img
          src={SKELETON_IMAGE_DECORATED}
          alt="Decorated Skeleton"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Layer 2: Reveal layer — PLAIN / NORMAL SKELETON (masked by cursor spotlight, perfectly registered) */}
      <div
        id="skeleton-reveal-layer"
        ref={revealRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 will-change-[mask-image,opacity] transition-transform duration-700 ease-out"
        style={{
          opacity: 0,
          transform: isHovered ? 'scale(1.015)' : 'scale(1)',
        }}
        aria-hidden="true"
      >
        <img
          src={SKELETON_IMAGE_PLAIN}
          alt="Plain Skeleton Reveal"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}
