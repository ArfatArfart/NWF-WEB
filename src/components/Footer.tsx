import { ArrowUp, Instagram, Youtube } from 'lucide-react';
import { ScrollFooterCalm } from './MotionTypography.tsx';

// Recognizable, clean monochrome WhatsApp icon matching Lucide line/glyph metrics
function WhatsAppIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 10.32c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
    </svg>
  );
}

// Verified social platform links with provided targets
const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/nexuswebforge?igsi=bmp3eGViaTB1cWVo',
    icon: Instagram,
  },
  {
    name: 'WhatsApp',
    href: 'https://whatsapp.com/dl/',
    icon: WhatsAppIcon,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@doubtverse?si=wlqw8keVqmrJLMM7',
    icon: Youtube,
  },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="main-footer"
      className="relative z-20 w-full bg-[#090A0E] text-white border-t border-white/10 overflow-hidden"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingTop: 'clamp(2.5rem, 5vh, 4.5rem)',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* 1. DEDICATED MOBILE FOOTER (md:hidden)                    */}
        {/* ========================================================= */}
        <div className="md:hidden space-y-6">
          {/* Mobile Identity */}
          <ScrollFooterCalm delayFraction={0}>
            <div className="space-y-2 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-black text-2xl tracking-wider text-white">
                  NWF
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-gray-300 border-l border-white/20 pl-3">
                  Arfat
                </span>
              </div>
              <p className="font-jakarta text-xs text-gray-400 leading-relaxed">
                Modern website design and responsive development tailored specifically around your
                business.
              </p>
            </div>
          </ScrollFooterCalm>

          {/* Mobile Links Grid: 2 Columns */}
          <ScrollFooterCalm delayFraction={0.15}>
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10">
              {/* Column 1: Navigation */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                  NAVIGATION
                </span>
                <ul className="space-y-1 font-orbitron">
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollTo('services')}
                      className="w-full text-left min-h-[40px] flex items-center text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Services
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollTo('work')}
                      className="w-full text-left min-h-[40px] flex items-center text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Work
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollTo('about')}
                      className="w-full text-left min-h-[40px] flex items-center text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollTo('contact')}
                      className="w-full text-left min-h-[40px] flex items-center text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Connect & Social */}
              <div className="space-y-4">
                {/* Connect */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    CONNECT
                  </span>
                  <div className="font-jakarta text-xs text-gray-400">
                    <span className="text-gray-500 block text-[10px] uppercase font-mono">Email:</span>
                    <a
                      href="mailto:arfatdar7889@gmail.com"
                      className="text-[11px] text-gray-300 hover:text-white transition-colors break-all leading-tight mt-0.5 block"
                    >
                      arfatdar7889@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    SOCIAL
                  </span>
                  <ul className="space-y-1 font-jakarta">
                    {SOCIAL_LINKS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2.5 min-h-[38px] py-1 text-xs text-gray-300 hover:text-white active:text-white transition-colors"
                          >
                            <Icon className="w-4 h-4 text-gray-400 group-hover:text-white group-active:text-white transition-colors shrink-0" />
                            <span>{item.name}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollFooterCalm>

          {/* Mobile Bottom Bar: Copyright */}
          <ScrollFooterCalm delayFraction={0.25}>
            <div className="pt-1 text-center text-[10.5px] font-mono text-gray-500 select-none">
              © 2026 NWF • Arfat — All rights reserved.
            </div>
          </ScrollFooterCalm>
        </div>

        {/* ========================================================= */}
        {/* 2. DESKTOP FOOTER (hidden md:block)                       */}
        {/* ========================================================= */}
        <div className="hidden md:block space-y-8">
          <div className="flex flex-row items-start justify-between gap-8 pb-8 border-b border-white/10">
            {/* Identity */}
            <ScrollFooterCalm delayFraction={0}>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-orbitron font-black text-2xl tracking-wider text-white">
                    NWF
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-300 border-l border-white/20 pl-3">
                    Arfat
                  </span>
                </div>
                <p className="font-jakarta text-xs text-gray-400 max-w-sm leading-relaxed">
                  Modern website design and responsive development tailored specifically around your
                  business.
                </p>
              </div>
            </ScrollFooterCalm>

            {/* Navigation, Social & Connect Links */}
            <div className="flex flex-wrap gap-10 lg:gap-14 text-xs font-orbitron">
              {/* Navigation */}
              <ScrollFooterCalm delayFraction={0.15}>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    NAVIGATION
                  </span>
                  <ul className="space-y-2 font-orbitron">
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollTo('services')}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Services
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollTo('work')}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Work
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollTo('about')}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        About Us
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollTo('contact')}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>
              </ScrollFooterCalm>

              {/* Social Media Links */}
              <ScrollFooterCalm delayFraction={0.22}>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    SOCIAL
                  </span>
                  <ul className="space-y-2 font-jakarta">
                    {SOCIAL_LINKS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
                          >
                            <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                            <span>{item.name}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollFooterCalm>

              {/* Connect (Email) */}
              <ScrollFooterCalm delayFraction={0.30}>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    CONNECT
                  </span>
                  <div className="font-jakarta text-xs text-gray-400 space-y-1.5">
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-mono">Email:</span>
                      <a
                        href="mailto:arfatdar7889@gmail.com"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        arfatdar7889@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollFooterCalm>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <ScrollFooterCalm delayFraction={0.35}>
            <div className="flex flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
              <div>
                © 2026 NWF • Arfat — All rights reserved.
              </div>

              <button
                type="button"
                onClick={() => scrollTo('hero-section-wrapper')}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollFooterCalm>
        </div>
      </div>
    </footer>
  );
}
