import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Instagram, Youtube } from 'lucide-react';
import { CornerTL } from './Svgs.tsx';
import {
  ScrollLineReveal,
  ScrollContactHeading,
} from './MotionTypography.tsx';

// Clean, recognizable monochrome WhatsApp icon matching Lucide glyph metrics
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
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

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('arfatdar7889@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactChannels = [
    {
      id: 'email',
      tag: '[ 01 // EMAIL ]',
      title: 'Email / Direct Query',
      value: 'arfatdar7889@gmail.com',
      desc: 'Send project details, questions, or request a quote directly.',
      href: 'mailto:arfatdar7889@gmail.com',
      icon: Mail,
      isExternal: false,
      allowCopy: true,
    },
    {
      id: 'whatsapp',
      tag: '[ 02 // WHATSAPP ]',
      title: 'WhatsApp',
      value: 'Direct Chat',
      desc: 'Instant messaging for quick consultations and questions.',
      href: 'https://whatsapp.com/dl/',
      icon: WhatsAppIcon,
      isExternal: true,
      allowCopy: false,
    },
    {
      id: 'instagram',
      tag: '[ 03 // INSTAGRAM ]',
      title: 'Instagram',
      value: '@nexuswebforge',
      desc: 'Follow for UI previews, interactive experiments, and DMs.',
      href: 'https://www.instagram.com/nexuswebforge?igsi=bmp3eGViaTB1cWVo',
      icon: Instagram,
      isExternal: true,
      allowCopy: false,
    },
    {
      id: 'youtube',
      tag: '[ 04 // YOUTUBE ]',
      title: 'YouTube',
      value: '@doubtverse',
      desc: 'Modern web development walk-throughs and design breakdowns.',
      href: 'https://youtube.com/@doubtverse?si=wlqw8keVqmrJLMM7',
      icon: Youtube,
      isExternal: true,
      allowCopy: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-20 w-full bg-white text-black border-t border-gray-200 overflow-hidden py-10 sm:py-14 lg:py-20"
      style={{
        paddingInline: 'var(--pad-x)',
      }}
    >
      {/* Architectural subtle grid pattern */}
      <div className="grid-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Eyebrow */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <CornerTL className="text-black w-3.5 h-3.5" />
          <ScrollLineReveal offsetY={6} phase={0}>
            <span
              className="font-orbitron font-bold uppercase tracking-[0.2em] text-gray-500"
              style={{ fontSize: 'var(--micro)' }}
            >
              [ CONTACT // CONNECT DIRECTLY ]
            </span>
          </ScrollLineReveal>
        </div>

        {/* Section Headline */}
        <div className="border-b border-gray-200 pb-5 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <ScrollLineReveal offsetY={8} phase={0.05}>
              <span className="font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest block mb-1">
                DIRECT INQUIRIES // ARFAT
              </span>
            </ScrollLineReveal>
            <ScrollContactHeading>
              <h2 className="font-orbitron font-black uppercase text-black leading-tight tracking-wide text-xl sm:text-3xl lg:text-4xl select-none">
                LET’S DISCUSS YOUR WEBSITE.
              </h2>
            </ScrollContactHeading>
          </div>

          <ScrollLineReveal offsetY={12} phase={0.25}>
            <p className="font-jakarta text-gray-600 text-xs sm:text-sm max-w-md leading-relaxed">
              Have a business that needs a modern, responsive website? Get in touch directly to
              discuss your project scope, timeline, and practical pricing.
            </p>
          </ScrollLineReveal>
        </div>

        {/* ========================================================= */}
        {/* DIRECT CONTACT CHANNELS (Editorial Grid)                 */}
        {/* ========================================================= */}
        <div className="pt-8 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-gray-50/70 space-y-4">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block font-bold">
                  DIRECT COLLABORATION
                </span>
                <span className="font-orbitron font-bold text-xl sm:text-2xl text-black block mt-1">
                  Arfat
                </span>
                <span className="text-xs text-gray-600 font-jakarta block mt-0.5">
                  Modern Website Design & Development
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 text-xs text-gray-600 font-jakarta leading-relaxed space-y-2">
                <p>
                  Every website is designed and coded directly by Arfat with careful attention to
                  mobile fluidity, visual clarity, and clean execution.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-700 font-semibold">
                    Open for new website projects
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-gray-500 font-jakarta px-1 leading-relaxed">
              Choose your preferred channel on the right. Direct communication without agency markups
              or account managers.
            </p>
          </div>

          {/* Right Column: 4 Minimal Direct Contact Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {contactChannels.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="group relative p-5 rounded-xl border border-gray-200 bg-white hover:border-black transition-all duration-200 flex flex-col justify-between gap-4 shadow-2xs hover:shadow-xs select-none"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-black flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block font-bold">
                          {item.tag}
                        </span>
                        <h3 className="font-orbitron font-bold text-xs sm:text-sm text-black tracking-wide mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-md border border-gray-200 text-gray-400 group-hover:text-black group-hover:border-black flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs sm:text-[13px] font-semibold text-gray-900 group-hover:text-black break-all">
                        {item.value}
                      </span>
                      {item.allowCopy && (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy email address"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-gray-200 bg-gray-50 text-[10px] font-mono text-gray-600 hover:text-black hover:border-black transition-colors cursor-pointer shrink-0"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <p className="font-jakarta text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
