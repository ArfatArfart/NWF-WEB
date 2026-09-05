import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DrawerType } from '../types.ts';

interface HeaderProps {
  onOpenDrawer?: (type: DrawerType) => void;
  onCloseDrawers?: () => void;
}

export default function Header({
  onOpenDrawer,
  onCloseDrawers,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onCloseDrawers) onCloseDrawers();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className="relative z-30 flex justify-between items-center w-full"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingTop: 'var(--header-pt)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      {/* Logo (left) */}
      <button
        id="header-logo-btn"
        onClick={() => scrollToSection('hero-section-wrapper')}
        type="button"
        className="font-orbitron font-black uppercase flex items-start cursor-pointer hover:opacity-80 transition-opacity letter-spacing-logo select-none bg-transparent border-none p-0 focus:outline-none"
        style={{ fontSize: 'var(--logo)' }}
        aria-label="NWF Home"
      >
        <span>NWF</span>
      </button>

      {/* Desktop Nav (hidden on mobile) */}
      <nav
        id="header-nav"
        className="hidden md:flex items-center uppercase font-medium letter-spacing-nav"
        style={{
          fontSize: 'var(--nav)',
          gap: 'var(--gap-nav)',
        }}
      >
        <button
          id="nav-services-btn"
          type="button"
          onClick={() => scrollToSection('services')}
          className="hover:opacity-50 transition-opacity cursor-pointer bg-transparent border-none p-0 focus:outline-none text-black"
        >
          Services
        </button>

        <button
          id="nav-work-btn"
          type="button"
          onClick={() => scrollToSection('work')}
          className="hover:opacity-50 transition-opacity cursor-pointer bg-transparent border-none p-0 focus:outline-none text-black"
        >
          Work
        </button>

        <button
          id="nav-about-btn"
          type="button"
          onClick={() => scrollToSection('about')}
          className="hover:opacity-50 transition-opacity cursor-pointer bg-transparent border-none p-0 focus:outline-none text-black"
        >
          About Us
        </button>

        <div className="h-4 w-[1px] bg-gray-300 select-none" aria-hidden="true" />

        <button
          id="nav-contact-btn"
          type="button"
          onClick={() => scrollToSection('contact')}
          className="hover:opacity-50 transition-opacity cursor-pointer bg-transparent border-none p-0 focus:outline-none text-black"
        >
          Contact
        </button>
      </nav>

      {/* Mobile Hamburger / Close Button */}
      <div className="md:hidden flex items-center">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`min-w-[44px] min-h-[44px] p-2.5 rounded-md border transition-all cursor-pointer flex items-center justify-center select-none ${mobileMenuOpen
              ? 'bg-black text-white border-black ring-2 ring-black/20'
              : 'border-gray-300 text-black hover:bg-black hover:text-white'
            }`}
          aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-menu"
            className="md:hidden absolute top-full left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-gray-200 shadow-2xl py-4 px-[var(--pad-x)] flex flex-col gap-1 animate-fadeIn"
          >
            {/* Top Bar with Clear Close Button */}
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-gray-100">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                [ NAVIGATION ]
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-black hover:bg-black hover:text-white text-xs font-mono font-semibold transition-colors cursor-pointer select-none"
                aria-label="Close menu"
              >
                <span>CLOSE</span>
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="text-left min-h-[48px] py-3 font-orbitron font-bold uppercase tracking-wider text-sm text-black hover:text-gray-500 transition-colors border-b border-gray-100 flex items-center justify-between cursor-pointer"
            >
              <span>Services</span>
              <span className="text-xs text-gray-400 font-mono">01</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('work')}
              className="text-left min-h-[48px] py-3 font-orbitron font-bold uppercase tracking-wider text-sm text-black hover:text-gray-500 transition-colors border-b border-gray-100 flex items-center justify-between cursor-pointer"
            >
              <span>Work</span>
              <span className="text-xs text-gray-400 font-mono">02</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-left min-h-[48px] py-3 font-orbitron font-bold uppercase tracking-wider text-sm text-black hover:text-gray-500 transition-colors border-b border-gray-100 flex items-center justify-between cursor-pointer"
            >
              <span>About Us</span>
              <span className="text-xs text-gray-400 font-mono">03</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="text-left min-h-[48px] py-3 font-orbitron font-bold uppercase tracking-wider text-sm text-black hover:text-gray-500 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Contact</span>
              <span className="text-xs text-gray-400 font-mono">04</span>
            </button>
          </div>
        </>
      )}
    </header>
  );
}
