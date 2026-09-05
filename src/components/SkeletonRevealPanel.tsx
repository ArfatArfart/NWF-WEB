import { useEffect, useRef, useState } from 'react';

export const SKELETON_IMAGE_DECORATED = `${import.meta.env.BASE_URL}assets/skeleton1.png.png`;
export const SKELETON_IMAGE_PLAIN = `${import.meta.env.BASE_URL}assets/skeleton2.png.png`;

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
    let animationFrameId: number | null = null;
    let isIntersecting = false;
    let isRunning = false;

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

    const wakeLoop = () => {
      if (!isRunning && isIntersecting) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    // Pointer events (Desktop mouse, trackpad, pen/stylus)
    const handlePointerDown = (e: PointerEvent) => {
      isInsideRef.current = true;
      setIsHovered(true);
      updatePointerPos(e.clientX, e.clientY);
      wakeLoop();
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        isInsideRef.current = true;
        setIsHovered(true);
        updatePointerPos(e.clientX, e.clientY);
        wakeLoop();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        if (!isInsideRef.current) {
          isInsideRef.current = true;
          setIsHovered(true);
        }
        updatePointerPos(e.clientX, e.clientY);
        wakeLoop();
      }
    };

    const handlePointerLeave = () => {
      isInsideRef.current = false;
      setIsHovered(false);
      wakeLoop();
    };

    // Touch events (Mobile phones and touch tablets)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        isInsideRef.current = true;
        setIsHovered(true);
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        wakeLoop();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        if (!isInsideRef.current) {
          isInsideRef.current = true;
          setIsHovered(true);
        }
        updatePointerPos(e.touches[0].clientX, e.touches[0].clientY);
        wakeLoop();
      }
    };

    const handleTouchEnd = () => {
      isInsideRef.current = false;
      setIsHovered(false);
      wakeLoop();
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('pointerdown', handlePointerDown, { passive: true });
      containerEl.addEventListener('pointerenter', handlePointerEnter);
      containerEl.addEventListener('pointermove', handlePointerMove, { passive: true });
      containerEl.addEventListener('pointerleave', handlePointerLeave);
      containerEl.addEventListener('pointercancel', handlePointerLeave);
      containerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      containerEl.addEventListener('touchmove', handleTouchMove, { passive: true });
      containerEl.addEventListener('touchend', handleTouchEnd, { passive: true });
      containerEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    const renderLoop = () => {
      if (!isIntersecting) {
        isRunning = false;
        return;
      }

      // Smoothly interpolate hover opacity (fades in on enter/touch, fades out naturally on leave)
      const targetHover = isInsideRef.current ? 1 : 0;
      hoverOpacityRef.current += (targetHover - hoverOpacityRef.current) * 0.12;

      // Ease smoothRef toward mouse/touch position
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.14;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.14;

      const winW = containerRef.current?.offsetWidth || 800;

      // Soft circular spotlight radius (responsive to container width and touch screen)
      const isSmall = winW < 640;
      const radius = Math.round(
        Math.min(240, Math.max(90, winW * (isSmall ? 0.28 : 0.20)))
      );

      if (revealRef.current) {
        if (hoverOpacityRef.current > 0.005) {
          revealRef.current.style.opacity = hoverOpacityRef.current.toFixed(3);

          const cx = Math.round(smoothRef.current.x);
          const cy = Math.round(smoothRef.current.y);

          // Hardware-accelerated GPU radial-gradient mask (eliminates expensive canvas toDataURL on every frame)
          const mask = `radial-gradient(circle ${radius}px at ${cx}px ${cy}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0.1) 90%, transparent 100%)`;
          revealRef.current.style.maskImage = mask;
          revealRef.current.style.webkitMaskImage = mask;
        } else {
          revealRef.current.style.opacity = '0';
          // Idle check: if completely faded out and not touching, stop animation loop to conserve battery/CPU
          if (!isInsideRef.current) {
            isRunning = false;
            return;
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // IntersectionObserver pauses the loop when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          wakeLoop();
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          isRunning = false;
        }
      },
      { threshold: 0.05 }
    );

    if (containerEl) {
      observer.observe(containerEl);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      if (containerEl) {
        containerEl.removeEventListener('pointerdown', handlePointerDown);
        containerEl.removeEventListener('pointerenter', handlePointerEnter);
        containerEl.removeEventListener('pointermove', handlePointerMove);
        containerEl.removeEventListener('pointerleave', handlePointerLeave);
        containerEl.removeEventListener('pointercancel', handlePointerLeave);
        containerEl.removeEventListener('touchstart', handleTouchStart);
        containerEl.removeEventListener('touchmove', handleTouchMove);
        containerEl.removeEventListener('touchend', handleTouchEnd);
        containerEl.removeEventListener('touchcancel', handleTouchEnd);
      }
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
