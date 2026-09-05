import { useCallback, useEffect, useState } from 'react';
import Drawers from './components/Drawers.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ImageRevealBackground from './components/ImageRevealBackground.tsx';
import ServicesOverview from './components/ServicesOverview.tsx';
import ThreePhoneShowcase from './components/ThreePhoneShowcase.tsx';
import MacBookShowcase from './components/MacBookShowcase.tsx';
import AboutSection from './components/AboutSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';
import Toast from './components/Toast.tsx';
import { ScrollTechnicalStrip } from './components/MotionTypography.tsx';
import { DrawerType, ToastMessage } from './types.ts';

export default function App() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Handle ESC key to close any active drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDrawer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = useCallback((text: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const handleOpenDrawer = (type: DrawerType) => {
    setActiveDrawer(type);
  };

  const handleCloseDrawers = () => {
    setActiveDrawer(null);
  };

  const handleSubmitContact = (name: string) => {
    showToast(
      name
        ? `Thank you, ${name}! Your inquiry has been received.`
        : `Thank you! Your inquiry has been received.`
    );
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    handleOpenDrawer('contact');
    showToast(`Inquiring about: ${serviceTitle}`);
  };

  return (
    <div
      id="nwf-root"
      className="w-full bg-white text-black font-jakarta relative selection:bg-black selection:text-white"
    >
      {/* 1. EXISTING MAIN HERO SECTION (Full viewport screen with Header, Character Background, and Hero content) */}
      <section
        id="hero-section-wrapper"
        className="relative w-full min-h-[100svh] min-h-screen flex flex-col justify-between overflow-hidden"
      >
        {/* Desktop interactive dual-layer image reveal effect with mouse spotlight mask */}
        <ImageRevealBackground />

        {/* Main UI header (z-30) */}
        <Header
          onOpenDrawer={handleOpenDrawer}
          onCloseDrawers={handleCloseDrawers}
        />

        {/* Main hero composition (flex-1, z-10) with unobstructed center for character */}
        <Hero
          onContactClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* Subtle Designed Transition Separator (Hero to Services Overview) */}
      <div
        id="hero-services-transition"
        className="block relative z-20 w-full bg-white border-y border-gray-200 py-2.5 px-4 sm:px-6 select-none overflow-hidden"
      >
        <ScrollTechnicalStrip
          className="flex items-center justify-between max-w-md sm:max-w-lg lg:max-w-xl mx-auto"
          leftContent={
            <>
              <span className="w-1.5 h-1.5 border-t border-l border-black inline-block" />
              <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                [ 01 // OVERVIEW ]
              </span>
            </>
          }
          centerText="MODERN / RESPONSIVE / DIGITAL"
          rightContent={
            <>
              <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                2026
              </span>
              <span className="w-1.5 h-1.5 border-b border-r border-black inline-block" />
            </>
          }
        />
      </div>

      {/* 2. EXISTING IMAGE + TEXT SECTION (ServicesOverview) */}
      <ServicesOverview
        onContactClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. EXISTING THREE-PHONE SHOWCASE SECTION (Mobile app showcase displaying 3 iPhone mockups) */}
      <ThreePhoneShowcase />

      {/* 4. EXISTING MACBOOK SHOWCASE SECTION (Displays the complete Dental Healthcare website inside a realistic MacBook) */}
      <MacBookShowcase />

      {/* 5. ABOUT US SECTION (Introducing Arfat with authentic, concise focus points) */}
      <AboutSection />

      {/* 7. CONTACT SECTION (Light, compact, restrained direct inquiry area) */}
      <ContactSection />

      {/* 8. REFINED FOOTER (Restrained visual conclusion with natural name presentation & essential links) */}
      <Footer />

      {/* Side drawers retained for optional deep-dive drawers */}
      <Drawers
        activeDrawer={activeDrawer}
        onClose={handleCloseDrawers}
        onSubmitContact={handleSubmitContact}
        onSelectServiceForContact={handleSelectServiceForContact}
      />

      {/* Global toast notification stack */}
      <Toast toasts={toasts} />
    </div>
  );
}
