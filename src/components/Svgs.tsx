import React from 'react';

interface SvgProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export function CornerTL({ className = '', style, id }: SvgProps) {
  return (
    <svg
      id={id}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      style={style}
    >
      <path d="M0 11.5V0.5H11.5" />
    </svg>
  );
}

export function CornerTR({ className = '', style, id }: SvgProps) {
  return (
    <svg
      id={id}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      style={style}
    >
      <path d="M0.5 0.5H11.5V11.5" />
    </svg>
  );
}

export function CornerBL({ className = '', style, id }: SvgProps) {
  return (
    <svg
      id={id}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      style={style}
    >
      <path d="M0 0.5V11.5H11.5" />
    </svg>
  );
}

export function CornerBR({ className = '', style, id }: SvgProps) {
  return (
    <svg
      id={id}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      style={style}
    >
      <path d="M0.5 11.5H11.5V0.5" />
    </svg>
  );
}

export function Checkerboard({ className = '', style, id }: SvgProps) {
  // 4 rows of 3.8 x 3.8 black squares; even rows shifted by 2.25
  return (
    <svg
      id={id}
      viewBox="0 0 36 18"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Row 0 */}
      <rect x="0" y="0.5" width="3.8" height="3.8" />
      <rect x="4.5" y="0.5" width="3.8" height="3.8" />
      <rect x="9" y="0.5" width="3.8" height="3.8" />
      <rect x="13.5" y="0.5" width="3.8" height="3.8" />
      <rect x="18" y="0.5" width="3.8" height="3.8" />
      <rect x="22.5" y="0.5" width="3.8" height="3.8" />
      <rect x="27" y="0.5" width="3.8" height="3.8" />
      <rect x="31.5" y="0.5" width="3.8" height="3.8" />

      {/* Row 1 (even row index 1 / shifted by 2.25) */}
      <rect x="2.25" y="5" width="3.8" height="3.8" />
      <rect x="6.75" y="5" width="3.8" height="3.8" />
      <rect x="11.25" y="5" width="3.8" height="3.8" />
      <rect x="15.75" y="5" width="3.8" height="3.8" />
      <rect x="20.25" y="5" width="3.8" height="3.8" />
      <rect x="24.75" y="5" width="3.8" height="3.8" />
      <rect x="29.25" y="5" width="3.8" height="3.8" />
      <rect x="33.75" y="5" width="3.8" height="3.8" />

      {/* Row 2 */}
      <rect x="0" y="9.5" width="3.8" height="3.8" />
      <rect x="4.5" y="9.5" width="3.8" height="3.8" />
      <rect x="9" y="9.5" width="3.8" height="3.8" />
      <rect x="13.5" y="9.5" width="3.8" height="3.8" />
      <rect x="18" y="9.5" width="3.8" height="3.8" />
      <rect x="22.5" y="9.5" width="3.8" height="3.8" />
      <rect x="27" y="9.5" width="3.8" height="3.8" />
      <rect x="31.5" y="9.5" width="3.8" height="3.8" />

      {/* Row 3 (shifted by 2.25) */}
      <rect x="2.25" y="14" width="3.8" height="3.8" />
      <rect x="6.75" y="14" width="3.8" height="3.8" />
      <rect x="11.25" y="14" width="3.8" height="3.8" />
      <rect x="15.75" y="14" width="3.8" height="3.8" />
      <rect x="20.25" y="14" width="3.8" height="3.8" />
      <rect x="24.75" y="14" width="3.8" height="3.8" />
      <rect x="29.25" y="14" width="3.8" height="3.8" />
      <rect x="33.75" y="14" width="3.8" height="3.8" />
    </svg>
  );
}

export function WireframeGlobe({ className = '', style, id }: SvgProps) {
  // viewBox 0 0 64 64, stroke 1.2: outer circle r=28, equator line, 2 horizontal ellipses, meridian line, 2 vertical ellipses
  return (
    <svg
      id={id}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" />
      <line x1="4" y1="32" x2="60" y2="32" />
      <ellipse cx="32" cy="32" rx="28" ry="12" />
      <ellipse cx="32" cy="32" rx="28" ry="21" />
      <line x1="32" y1="4" x2="32" y2="60" />
      <ellipse cx="32" cy="32" rx="12" ry="28" />
      <ellipse cx="32" cy="32" rx="21" ry="28" />
    </svg>
  );
}
