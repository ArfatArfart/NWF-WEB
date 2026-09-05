import { ArrowUpRight, Mail, Instagram, Youtube, X } from 'lucide-react';
import {
  DrawerType,
  ServiceItem,
  WorkItem,
} from '../types.ts';

// Clean monochrome WhatsApp icon
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

export const SERVICES: ServiceItem[] = [
  {
    id: 'complete-websites',
    title: 'COMPLETE WEBSITES',
    tag: 'FULL-STACK & STATIC',
    description:
      'Turnkey business websites built with modern UI, mobile responsiveness, and high performance.',
  },
  {
    id: 'landing-pages',
    title: 'HIGH-IMPACT LANDING PAGES',
    tag: 'CONVERSION & SPEED',
    description:
      'Single-page experiences designed to showcase your offerings and capture customer interest.',
  },
  {
    id: 'responsive-design',
    title: 'MOBILE & DESKTOP PARITY',
    tag: 'RESPONSIVE UI',
    description:
      'Layouts engineered to look impeccable and fluid on smartphones, tablets, and wide desktop displays.',
  },
  {
    id: 'ui-design',
    title: 'CUSTOM UI & DESIGN',
    tag: 'MINIMAL & BESPOKE',
    description:
      'Tailored visual identity, distinctive typography, and clean layouts that set your business apart.',
  },
];

export const WORK_SAMPLES: WorkItem[] = [
  {
    id: 'work-01',
    category: 'BUSINESS & CORPORATE',
    title: 'ENTERPRISE & BRAND SITES',
    description:
      'Clean, authoritative digital presences for companies, consultants, and service providers.',
  },
  {
    id: 'work-02',
    category: 'PRODUCT & LAUNCH',
    title: 'SHOWCASES & PROMOS',
    description:
      'Visually immersive pages built for product launches, software studios, and creative projects.',
  },
  {
    id: 'work-03',
    category: 'PORTFOLIOS',
    title: 'CREATIVE & AGENCY STUDIOS',
    description:
      'Minimalist, high-contrast layouts crafted to put capabilities and work in the spotlight.',
  },
];

interface DrawersProps {
  activeDrawer: DrawerType;
  onClose: () => void;
  onSubmitContact?: (name: string, email: string, message: string) => void;
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export default function Drawers({
  activeDrawer,
  onClose,
  onSelectServiceForContact,
}: DrawersProps) {
  if (!activeDrawer) return null;

  const getDrawerHeaderInfo = () => {
    switch (activeDrawer) {
      case 'services':
        return { title: 'Services', subtitle: 'What We Build' };
      case 'work':
        return { title: 'Work', subtitle: 'Selected Projects' };
      case 'about':
        return { title: 'About Us', subtitle: 'Our Approach' };
      case 'contact':
        return { title: 'Contact', subtitle: 'Direct Channels' };
      default:
        return { title: '', subtitle: null };
    }
  };

  const { title, subtitle } = getDrawerHeaderInfo();

  const scrollToContact = () => {
    onClose();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const directChannels = [
    {
      name: 'Email / Direct Query',
      value: 'arfatdar7889@gmail.com',
      href: 'mailto:arfatdar7889@gmail.com',
      icon: Mail,
      isExternal: false,
    },
    {
      name: 'WhatsApp',
      value: 'Direct Message',
      href: 'https://whatsapp.com/dl/',
      icon: WhatsAppIcon,
      isExternal: true,
    },
    {
      name: 'Instagram',
      value: '@nexuswebforge',
      href: 'https://www.instagram.com/nexuswebforge?igsi=bmp3eGViaTB1cWVo',
      icon: Instagram,
      isExternal: true,
    },
    {
      name: 'YouTube',
      value: '@doubtverse',
      href: 'https://youtube.com/@doubtverse?si=wlqw8keVqmrJLMM7',
      icon: Youtube,
      isExternal: true,
    },
  ];

  return (
    <div id="drawer-container" className="fixed inset-0 z-40">
      {/* Dimmed backdrop */}
      <div
        id="drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Right-side drawer */}
      <aside
        id={`drawer-panel-${activeDrawer}`}
        className="fixed top-0 right-0 h-full w-full bg-white z-50 flex flex-col justify-between border-l border-gray-200 overflow-y-auto shadow-2xl transition-transform duration-300 ease-out"
        style={{
          maxWidth: 'var(--drawer-max)',
          padding: 'var(--drawer-pad)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex flex-col flex-1">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-100">
            <div>
              <h2
                id="drawer-title"
                className="font-orbitron font-bold uppercase text-black tracking-[0.08em]"
                style={{ fontSize: 'var(--body)' }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  id="drawer-subtitle"
                  className="font-jakarta text-gray-500 uppercase tracking-widest mt-1"
                  style={{ fontSize: 'var(--micro)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
            <button
              id="drawer-close-btn"
              type="button"
              onClick={onClose}
              className="text-black hover:opacity-50 transition-opacity p-1 cursor-pointer bg-transparent border-none focus:outline-none"
              aria-label="Close drawer"
            >
              <X strokeWidth={1.5} style={{ width: 'var(--icon)', height: 'var(--icon)' }} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="py-6 flex-1 flex flex-col">
            {/* 1. SERVICES */}
            {activeDrawer === 'services' && (
              <div id="services-list" className="flex flex-col divide-y divide-gray-100">
                {SERVICES.map((item) => (
                  <div
                    key={item.id}
                    id={`service-card-${item.id}`}
                    className="py-4 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-jakarta uppercase text-gray-500 tracking-wider font-semibold"
                        style={{ fontSize: 'var(--micro)' }}
                      >
                        {item.tag}
                      </span>
                      <button
                        id={`inquire-service-${item.id}`}
                        type="button"
                        onClick={() => {
                          if (onSelectServiceForContact) {
                            onSelectServiceForContact(item.title);
                          } else {
                            scrollToContact();
                          }
                        }}
                        className="text-xs uppercase font-semibold text-black hover:opacity-50 flex items-center gap-1 cursor-pointer"
                      >
                        Inquire
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                    <h3
                      className="font-orbitron font-bold text-black uppercase tracking-wide"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-jakarta text-gray-600 leading-relaxed text-xs sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 2. WORK */}
            {activeDrawer === 'work' && (
              <div id="work-list" className="flex flex-col divide-y divide-gray-100">
                {WORK_SAMPLES.map((item) => (
                  <div
                    key={item.id}
                    id={`work-item-${item.id}`}
                    className="py-5 flex flex-col"
                  >
                    <span
                      className="font-jakarta text-gray-500 font-semibold uppercase tracking-widest mb-1"
                      style={{ fontSize: 'var(--micro)' }}
                    >
                      {item.category}
                    </span>
                    <h3
                      className="font-orbitron font-bold text-black uppercase tracking-wider mb-2"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-jakarta text-gray-600 leading-relaxed"
                      style={{ fontSize: 'var(--body)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 3. ABOUT US */}
            {activeDrawer === 'about' && (
              <div id="about-content" className="flex flex-col gap-5 text-gray-700">
                <div className="border-l-2 border-black pl-3 py-1">
                  <h3 className="font-orbitron font-bold text-black uppercase tracking-wider text-sm">
                    ENGINEERED FOR MODERN BUSINESS
                  </h3>
                  <p className="font-jakarta text-xs text-gray-500 uppercase tracking-widest mt-1">
                    Design & Precision
                  </p>
                </div>
                <p className="font-jakarta leading-relaxed text-sm">
                  We specialize in crafting modern, bespoke web pages and full websites for businesses.
                  Every build is engineered from the ground up to ensure seamless mobile fluidity and
                  desktop fidelity.
                </p>
                <div className="bg-gray-50 p-4 border border-gray-100 flex flex-col gap-2">
                  <div className="font-semibold uppercase text-xs tracking-wider text-black">
                    Core Focus:
                  </div>
                  <ul className="text-xs space-y-1.5 text-gray-600 list-disc list-inside">
                    <li>Clean, high-contrast visual architecture</li>
                    <li>Mobile-friendly touch responsiveness</li>
                    <li>Desktop-engineered density and typography</li>
                    <li>Fast loading and lightweight code</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 4. CONTACT (Direct Contact Channels) */}
            {activeDrawer === 'contact' && (
              <div id="contact-content" className="flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <p className="font-jakarta text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Direct communication with Arfat for new website projects, responsive redesigns,
                    and practical pricing consultations.
                  </p>

                  <div className="space-y-2.5">
                    {directChannels.map((ch) => {
                      const Icon = ch.icon;
                      return (
                        <a
                          key={ch.name}
                          href={ch.href}
                          target={ch.isExternal ? '_blank' : undefined}
                          rel={ch.isExternal ? 'noopener noreferrer' : undefined}
                          className="p-3 rounded-lg border border-gray-200 bg-gray-50/70 hover:border-black transition-colors flex items-center justify-between gap-3 group select-none"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-md bg-white border border-gray-200 text-black flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block font-bold">
                                {ch.name}
                              </span>
                              <span className="font-jakarta text-xs text-gray-900 font-semibold truncate block">
                                {ch.value}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="w-full bg-black text-white hover:bg-gray-800 transition-colors uppercase font-orbitron font-bold tracking-wider py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer select-none text-xs"
                  >
                    <span>Go to Contact Section</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10.5px] font-jakarta text-gray-500 text-center">
                    Direct collaboration • No agency middle-layers
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer
          id="drawer-brand-footer"
          className="font-jakarta uppercase text-gray-400 text-center tracking-widest pt-5 border-t border-gray-100 select-none"
          style={{ fontSize: 'var(--micro)' }}
        >
          NWF © 2026 — MODERN WEB DESIGN
        </footer>
      </aside>
    </div>
  );
}
