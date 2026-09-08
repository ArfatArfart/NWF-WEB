import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import {
  Dumbbell,
  Zap,
  Flame,
  ShieldCheck,
  Pill,
  Clock,
  MapPin,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Star,
  UploadCloud,
  CheckCircle2,
  Phone,
  Search,
  Heart,
  Check,
  PhoneCall,
  QrCode,
  Truck,
  Calendar,
  Minus,
  Plus,
} from 'lucide-react';
import { ScrollPhoneHeading, ScrollLineReveal } from './MotionTypography.tsx';

// Typewriter hook for character-by-character animated display (viewport-triggered)
function useTypewriter(
  text: string,
  delay: number = 0,
  speed: number = 24,
  enabled: boolean = true
) {
  const [displayedText, setDisplayedText] = useState('');
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!enabled || hasStarted.current) return;
    hasStarted.current = true;

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    timeoutId = setTimeout(() => {
      let currentIndex = 0;
      intervalId = setInterval(() => {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed, enabled]);

  return displayedText;
}

function TypewriterText({
  text,
  delay = 0,
  speed = 24,
  className = '',
  style = {},
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = spanRef.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px 250px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  const currentText = useTypewriter(
    text,
    delay,
    speed,
    shouldReduceMotion ? true : isVisible
  );

  return (
    <span ref={spanRef} className={className} style={style}>
      {shouldReduceMotion ? text : currentText}
    </span>
  );
}

// ============================================================================
// PHONE 1 — GYM / FITNESS WEBSITE: "APEX // ATHLETIC LAB"
// Energetic, high-contrast, electric volt (#D4FF00), dark obsidian, bold typography
// ============================================================================
function GymMobileWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'programs' | 'recovery'>('programs');
  const [activeModal, setActiveModal] = useState<
    'vip-pass' | 'program-detail' | 'status-info' | 'coaching-sheet' | null
  >(null);
  const [selectedProgram, setSelectedProgram] = useState<{
    title: string;
    coach: string;
    time: string;
    calories: string;
    desc: string;
    discipline: string;
  } | null>(null);
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const [vipClaimed, setVipClaimed] = useState(false);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => {
      setToastNotice(null);
    }, 2500);
  };

  const handleOpenProgram = (prog: {
    title: string;
    coach: string;
    time: string;
    calories: string;
    desc: string;
    discipline: string;
  }) => {
    setSelectedProgram(prog);
    setActiveModal('program-detail');
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none bg-[#090A0E] text-white font-manrope"
      style={{ backgroundColor: '#090A0E' }}
    >
      {/* Background athletic photography with dark tactical overlay */}
      <div className="absolute top-0 left-0 right-0 h-[440px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85"
          alt="Gym athlete training"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090A0E]/60 via-[#090A0E]/20 to-[#090A0E]" />
        {/* Neon volt ambient glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#D4FF00]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* In-Phone Toast Notification Banner */}
      {toastNotice && (
        <div className="absolute top-[88px] left-4 right-4 z-[90] flex items-center gap-2 bg-[#D4FF00] text-black px-3.5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-black/60 animate-fadeIn">
          <Check className="w-4 h-4 stroke-[3] shrink-0" />
          <span className="truncate">{toastNotice}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between pointer-events-auto"
        style={{ paddingTop: 46, paddingLeft: 18, paddingRight: 18 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black font-extrabold text-sm tracking-tighter shadow-sm">
            AX
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-extrabold text-[15px] tracking-wider text-white leading-none">
              APEX<span className="text-[#D4FF00]">//</span>LAB
            </span>
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-medium">
              ELITE ATHLETICS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveModal('status-info')}
            className="px-2 py-0.5 rounded-full bg-white/10 border border-[#D4FF00]/40 text-[#D4FF00] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 hover:bg-[#D4FF00]/20 transition-colors cursor-pointer"
            title="View Live Facility Capacity"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            24/7 OPEN
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Open gym menu"
          >
            <Menu className="w-4 h-4 text-[#D4FF00]" />
          </button>
        </div>
      </header>

      {/* Hero Headline & Key Metrics */}
      <div
        className="absolute z-20"
        style={{ top: 124, left: 18, right: 18 }}
      >
        <button
          type="button"
          onClick={() => setActiveModal('vip-pass')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-2.5 hover:border-[#D4FF00]/50 transition-colors cursor-pointer text-left"
        >
          <Flame className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span className="text-[11px] font-semibold tracking-wide text-white/90 uppercase">
            SUMMER CONDITIONING CAMP • VIEW PASS
          </span>
        </button>

        <h1
          className="font-orbitron font-black text-white leading-[1.05] tracking-tight uppercase"
          style={{ fontSize: 32 }}
        >
          <TypewriterText text="FORGE YOUR ELITE FORM" delay={150} speed={22} />
        </h1>

        <p className="text-[13px] text-white/70 font-normal leading-relaxed mt-2 max-w-[310px]">
          Olympic lifting bays, anaerobic conditioning suites, and cryogenic recovery protocols.
        </p>

        {/* Tactical Key Metrics Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => showToast('12,000 sq ft Olympic floor & turf')}
            className="bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-[#D4FF00]/40 rounded-xl p-2 text-center transition-colors cursor-pointer"
          >
            <span className="block font-orbitron font-bold text-base text-[#D4FF00] leading-none">
              12K
            </span>
            <span className="text-[9px] text-white/60 uppercase tracking-wider mt-1 block">
              SQ FT FACILITY
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('programs');
              showToast('38 weekly coaching labs active');
            }}
            className="bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-xl p-2 text-center transition-colors cursor-pointer"
          >
            <span className="block font-orbitron font-bold text-base text-white leading-none">
              38+
            </span>
            <span className="text-[9px] text-white/60 uppercase tracking-wider mt-1 block">
              WEEKLY LABS
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('recovery');
              showToast('Cryo Suite cooled to -110°C');
            }}
            className="bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-[#D4FF00]/40 rounded-xl p-2 text-center transition-colors cursor-pointer"
          >
            <span className="block font-orbitron font-bold text-base text-[#D4FF00] leading-none">
              -110°
            </span>
            <span className="text-[9px] text-white/60 uppercase tracking-wider mt-1 block">
              CRYO SUITE
            </span>
          </button>
        </div>
      </div>

      {/* Program Tabs & Highlights (Bottom Half of Phone) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 bg-[#101218] border-t border-white/10 rounded-t-[32px] flex flex-col justify-between"
        style={{
          height: 380,
          paddingTop: 20,
          paddingBottom: 24,
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        <div>
          {/* Program Toggle Bar */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#D4FF00]" />
              CHOOSE DISCIPLINE
            </span>
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('programs')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${activeTab === 'programs'
                  ? 'bg-[#D4FF00] text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                TRAINING
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('recovery')}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${activeTab === 'recovery'
                  ? 'bg-[#D4FF00] text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                RECOVERY
              </button>
            </div>
          </div>

          {/* Dynamic Cards according to selected tab */}
          {activeTab === 'programs' ? (
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() =>
                  handleOpenProgram({
                    title: 'Hybrid Strength & Hyrox',
                    coach: 'Marcus Kane (Head Strength Lead)',
                    time: 'Daily 6:00 AM • 50 min',
                    calories: '~620 kcal burn',
                    desc: 'High-cadence sleds, Olympic barbells, kettlebells and SkiErgs designed for functional power.',
                    discipline: 'TRAINING',
                  })
                }
                className="w-full text-left p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-[#D4FF00]/50 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] shrink-0">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Hybrid Strength & Hyrox</h4>
                    <p className="text-[11px] text-white/50">Daily 6:00 AM • 50 min high-cadence</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#D4FF00] bg-[#D4FF00]/10 px-2 py-1 rounded-md">
                  HOT
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleOpenProgram({
                    title: 'Metabolic Conditioning',
                    coach: 'Elena Rostova (Conditioning Lead)',
                    time: 'Daily 7:15 AM & 5:30 PM • 45 min',
                    calories: '~580 kcal burn',
                    desc: 'Heart-rate zone intervals, assault bikes, prowler pushes, and explosive plyometrics.',
                    discipline: 'TRAINING',
                  })
                }
                className="w-full text-left p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-[#D4FF00]/50 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0">
                    <Flame className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Metabolic Conditioning</h4>
                    <p className="text-[11px] text-white/50">Heart-rate zone intervals & sleds</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() =>
                  handleOpenProgram({
                    title: 'Subzero Cryo Chamber',
                    coach: 'Dr. Thorne (Performance Medicine)',
                    time: 'Walk-ins every 15 min • 3.5 min session',
                    calories: 'Rapid Lymphatic Flush',
                    desc: 'Full-body subzero exposure (-110°C) triggering anti-inflammatory response and accelerated tissue repair.',
                    discipline: 'RECOVERY',
                  })
                }
                className="w-full text-left p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Subzero Cryo Chamber</h4>
                    <p className="text-[11px] text-white/50">Full body inflammation flushing</p>
                  </div>
                </div>
                <span className="text-xs text-white/70 font-semibold">-110°C</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleOpenProgram({
                    title: 'Infrared Sauna & Plunge',
                    coach: 'Recovery Protocols Team',
                    time: 'Open all day • 45 min cycle',
                    calories: 'Contrast Vasodilation',
                    desc: 'Full-spectrum infrared heat followed by 4°C cold plunge tubs and magnesium mineral soak.',
                    discipline: 'RECOVERY',
                  })
                }
                className="w-full text-left p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-amber-400/50 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Infrared Sauna & Plunge</h4>
                    <p className="text-[11px] text-white/50">Contrast therapy & magnesium soak</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            </div>
          )}
        </div>

        {/* Strong CTA Bottom Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setActiveModal('vip-pass')}
            className="w-full flex items-center justify-between px-5 rounded-xl bg-[#D4FF00] hover:bg-[#e0ff33] text-black font-bold transition-transform active:scale-[0.98] cursor-pointer shadow-lg shadow-[#D4FF00]/20"
            style={{ height: 50 }}
          >
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-extrabold uppercase tracking-wide leading-tight">
                {vipClaimed ? '✓ VIP PASS ACTIVATED' : 'CLAIM 3-DAY VIP PASS'}
              </span>
              <span className="text-[10px] font-medium text-black/70">
                {vipClaimed ? 'Tap to view digital barcode' : 'Zero commitment • Full facility access'}
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* IN-PHONE MODAL 1: VIP Pass Sheet */}
      {activeModal === 'vip-pass' && (
        <div className="absolute inset-0 z-[100] bg-[#090A0E]/95 backdrop-blur-md flex flex-col justify-between p-5 animate-fadeIn">
          <div className="flex items-center justify-between pt-8 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#D4FF00] text-black font-extrabold flex items-center justify-center text-xs">
                AX
              </div>
              <span className="font-orbitron font-bold text-white text-sm">3-DAY VIP PASS</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gradient-to-b from-[#181C24] to-[#101218] border border-[#D4FF00]/40 rounded-2xl p-4 text-center my-auto space-y-3 shadow-xl">
            <div className="inline-flex items-center gap-1 bg-[#D4FF00]/15 text-[#D4FF00] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-[#D4FF00]/30">
              ALL-ACCESS GUEST PASS
            </div>
            <h3 className="font-orbitron font-black text-2xl text-white">APEX LAB VIP</h3>
            <p className="text-xs text-white/70">
              Valid for 72 consecutive hours. Unlimited Olympic bay access, turf, and 2x Cryo chamber passes.
            </p>

            <div className="p-3 bg-black/60 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-1.5 font-mono text-[11px] text-[#D4FF00]">
              <QrCode className="w-16 h-16 text-white" />
              <span className="tracking-widest font-bold">#APX-9082-GUEST</span>
              <span className="text-[9px] text-white/50 font-sans">Present to front desk upon arrival</span>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                setVipClaimed(true);
                showToast('VIP Pass Saved to Device Wallet!');
                setActiveModal(null);
              }}
              className="w-full h-11 bg-[#D4FF00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#e0ff33] transition-colors cursor-pointer shadow-md"
            >
              SAVE TO APPLE WALLET
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 bg-white/10 text-white font-semibold text-xs rounded-xl hover:bg-white/15 transition-colors cursor-pointer"
            >
              CLOSE PASS
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 2: Program Detail & Reservation */}
      {activeModal === 'program-detail' && selectedProgram && (
        <div className="absolute inset-0 z-[100] bg-[#090A0E]/95 backdrop-blur-md flex flex-col justify-between p-5 animate-fadeIn">
          <div className="flex items-center justify-between pt-8 border-b border-white/10 pb-3">
            <span className="font-orbitron font-bold text-xs text-[#D4FF00] tracking-wider uppercase">
              {selectedProgram.discipline} // WORKOUT LAB
            </span>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15">
              <h3 className="font-orbitron font-extrabold text-xl text-white">
                {selectedProgram.title}
              </h3>
              <p className="text-xs text-[#D4FF00] font-semibold mt-1">
                Lead: {selectedProgram.coach}
              </p>
              <p className="text-xs text-white/70 mt-3 leading-relaxed">
                {selectedProgram.desc}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
                <div className="bg-black/40 p-2 rounded-lg">
                  <span className="text-[10px] text-white/50 block">SCHEDULE</span>
                  <span className="font-bold text-white">{selectedProgram.time}</span>
                </div>
                <div className="bg-black/40 p-2 rounded-lg">
                  <span className="text-[10px] text-white/50 block">METRIC</span>
                  <span className="font-bold text-[#D4FF00]">{selectedProgram.calories}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                showToast(`Reserved Spot: ${selectedProgram.title}!`);
                setActiveModal(null);
              }}
              className="w-full h-11 bg-[#D4FF00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#e0ff33] transition-colors cursor-pointer"
            >
              RESERVE TODAY'S SPOT
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 bg-white/10 text-white font-semibold text-xs rounded-xl"
            >
              BACK
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 3: Facility 24/7 Capacity Status */}
      {activeModal === 'status-info' && (
        <div className="absolute inset-0 z-[100] bg-[#090A0E]/95 backdrop-blur-md flex flex-col justify-between p-5 animate-fadeIn">
          <div className="flex items-center justify-between pt-8 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
              <span className="font-orbitron font-bold text-sm text-white">LIVE FACILITY METRICS</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-3">
            <div className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70">Main Floor Capacity</span>
                <span className="font-bold text-[#D4FF00]">38% (Low Traffic)</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[38%] h-full bg-[#D4FF00] rounded-full" />
              </div>
            </div>

            <div className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xl space-y-1 text-xs">
              <span className="text-[10px] text-white/50 uppercase tracking-wider block">RECOVERY LABS</span>
              <div className="flex justify-between">
                <span>Subzero Cryo Chamber</span>
                <span className="text-cyan-400 font-bold">Ready (0 min wait)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/10">
                <span>Infrared Sauna Suite</span>
                <span className="text-amber-400 font-bold">2 slots open</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="w-full h-10 bg-[#D4FF00] text-black font-extrabold text-xs uppercase rounded-xl"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* In-Phone Mobile Navigation Menu Modal */}
      {menuOpen && (
        <div className="absolute inset-0 z-[100] bg-[#090A0E] flex flex-col justify-between p-6 animate-fadeIn">
          <div className="flex items-center justify-between pt-8 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#D4FF00] text-black font-extrabold flex items-center justify-center text-xs">
                AX
              </div>
              <span className="font-orbitron font-bold text-white text-sm">APEX LAB</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 py-4">
            {[
              { label: 'TRAINING PROGRAMS', action: () => { setActiveTab('programs'); setMenuOpen(false); } },
              { label: 'RECOVERY LABS', action: () => { setActiveTab('recovery'); setMenuOpen(false); } },
              { label: 'SUMMER VIP PASS', action: () => { setMenuOpen(false); setActiveModal('vip-pass'); } },
              { label: 'LIVE STATUS', action: () => { setMenuOpen(false); setActiveModal('status-info'); } },
              { label: 'COACHING SESSIONS', action: () => { setMenuOpen(false); showToast('Consultation coach assigned: Marcus'); } },
            ].map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="text-left font-orbitron font-bold text-lg text-white hover:text-[#D4FF00] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-xs text-white/30 font-mono">0{i + 1}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3 pb-4">
            <div className="text-[11px] text-white/50 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4FF00]" />
              742 Broadway District • Downtown
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                showToast('Private coaching consultation initiated!');
              }}
              className="w-full h-11 bg-[#D4FF00] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#e0ff33] transition-colors cursor-pointer"
            >
              BOOK PRIVATE COACHING
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PHONE 2 — MEDICAL SHOP / PHARMACY: "LUMEN RX & APOTHECARY"
// Trustworthy, clinical clean, professional, sage teal (#0F766E), pure white
// ============================================================================
function PharmacyMobileWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeModal, setActiveModal] = useState<
    'transfer-rx' | 'track-courier' | 'refill' | 'call' | 'service-detail' | null
  >(null);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    desc: string;
    price: string;
    time: string;
  } | null>(null);
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const [rxUploaded, setRxUploaded] = useState(false);
  const [selectedRefillMed, setSelectedRefillMed] = useState('Amoxicillin 500mg');

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => {
      setToastNotice(null);
    }, 2500);
  };

  const allServicesList = [
    {
      title: 'Comprehensive Blood Labs',
      desc: 'Walk-ins accepted • Next-day verified clinical results',
      price: '$45',
      time: '15 min walk-in',
    },
    {
      title: 'Pharmacist Tele-Consult',
      desc: '15 min secure direct consultation with Dr. Sarah Lin',
      price: 'FREE',
      time: 'Instant or booked',
    },
    {
      title: 'Flu & Covid Immunization',
      desc: 'Administered by certified clinical pharmacist on staff',
      price: '$0 copay',
      time: '10 min walk-in',
    },
    {
      title: 'Comprehensive Allergy Panel',
      desc: 'Screening for 48 environmental & airborne allergens',
      price: '$65',
      time: '20 min lab',
    },
    {
      title: 'Lipid & Cardiac Health Check',
      desc: 'Fingerstick cholesterol profile with instant reading',
      price: '$30',
      time: '10 min walk-in',
    },
  ];

  const filteredServices = allServicesList.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedServices = showAllServices ? filteredServices : filteredServices.slice(0, 2);

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none bg-[#F7FAF9] text-[#132220] font-manrope flex flex-col justify-between"
      style={{ backgroundColor: '#F7FAF9' }}
    >
      {/* In-Phone Toast Notification Banner */}
      {toastNotice && (
        <div className="absolute top-[88px] left-4 right-4 z-[90] flex items-center gap-2 bg-[#0F766E] text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-black/20 animate-fadeIn">
          <Check className="w-4 h-4 stroke-[3] text-[#5EEAD4] shrink-0" />
          <span className="truncate">{toastNotice}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header
        className="w-full z-30 bg-white border-b border-[#E2EBE8] px-[18px] pb-3"
        style={{ paddingTop: 46 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F766E] flex items-center justify-center text-white shadow-sm">
              <Pill className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-[#0F766E]">LUMEN RX</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E6F4F1] text-[#0F766E] font-semibold">
                  LICENSED
                </span>
              </div>
              <span className="text-[10px] text-[#64748B] font-medium">PHARMACY & WELLNESS</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveModal('call')}
              className="w-8 h-8 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center hover:bg-[#DCFCE7] transition-colors cursor-pointer"
              title="Call Clinical Pharmacist"
              aria-label="Call pharmacist"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#334155] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors cursor-pointer"
              aria-label="Open pharmacy menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Operating status bar */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] bg-[#F0FDFA] border border-[#CCFBF1] rounded-lg px-2.5 py-1 text-[#0F766E]">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
            <span>Open Today: 8:00 AM – 10:00 PM</span>
          </div>
          <span className="text-[10px] font-semibold text-[#0D9488]">15m RX Dispensing</span>
        </div>
      </header>

      {/* Main Content Area (Scrollable within phone viewport) */}
      <div
        className="flex-1 overflow-y-auto px-[18px] py-3.5 space-y-3.5"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Search Input for medications */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicine, vitamins, or care services..."
            className="w-full h-10 pl-9 pr-8 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F766E] shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Hero Clinical Banner with High-Quality Medical Photography */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white p-4 shadow-sm">
          {/* Subtle medical background image */}
          <img
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
            alt="Pharmacy medication care"
            loading="eager"
            decoding="async"
            className="absolute right-0 top-0 bottom-0 w-36 object-cover opacity-25 mix-blend-overlay pointer-events-none"
          />
          <div className="relative z-10 max-w-[230px]">
            <div className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-semibold mb-2">
              <ShieldCheck className="w-3 h-3 text-[#5EEAD4]" />
              CERTIFIED PHARMACEUTICALS
            </div>
            <h2 className="font-bold text-[19px] leading-snug tracking-tight">
              <TypewriterText text="Precision Medicine. Delivered In 2 Hours." delay={200} speed={20} />
            </h2>
            <p className="text-[11px] text-teal-100/90 mt-1 leading-relaxed">
              Fast refill transfers, insured generic equivalents, and verified clinical guidance.
            </p>
          </div>
        </div>

        {/* Quick Prescription Actions (2-column cards) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setActiveModal('transfer-rx')}
            className="text-left bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-col justify-between hover:border-[#0F766E]/60 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-2">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-[#0F172A] leading-tight">Transfer RX</h3>
              <p className="text-[10px] text-[#64748B] mt-0.5">
                {rxUploaded ? '✓ Script Verified' : 'Digital prescription transfer'}
              </p>
            </div>
            <div className="mt-2 text-[10px] font-bold text-[#0F766E] flex items-center gap-0.5">
              <span>{rxUploaded ? 'View Transfer' : 'Instant transfer'}</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('track-courier')}
            className="text-left bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-2xs flex flex-col justify-between hover:border-[#0F766E]/60 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-[#0F172A] leading-tight">Fast Courier</h3>
              <p className="text-[10px] text-[#64748B] mt-0.5">Free on orders over $25</p>
            </div>
            <div className="mt-2 text-[10px] font-bold text-[#0F766E] flex items-center gap-0.5">
              <span>Track delivery</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* Featured Medical & Wellness Highlights */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-2xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-[#0F172A]">CLINICAL HEALTH SERVICES</span>
            <button
              type="button"
              onClick={() => setShowAllServices(!showAllServices)}
              className="text-[10px] text-[#0F766E] font-semibold hover:underline cursor-pointer"
            >
              {showAllServices ? 'SHOW LESS' : `VIEW ALL (${allServicesList.length})`}
            </button>
          </div>

          <div className="space-y-2">
            {displayedServices.map((service) => (
              <button
                key={service.title}
                type="button"
                onClick={() => {
                  setSelectedService(service);
                  setActiveModal('service-detail');
                }}
                className="w-full text-left flex items-center justify-between py-1.5 border-b border-[#F1F5F9] hover:bg-slate-50/80 px-1 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <div>
                    <h4 className="text-[12px] font-semibold text-[#1E293B]">{service.title}</h4>
                    <p className="text-[10px] text-[#64748B]">{service.desc}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0F766E] shrink-0 ml-2">
                  {service.price}
                </span>
              </button>
            ))}
          </div>

          {/* Location & Trust Footer within screen */}
          <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#0F766E]" />
              520 Wellness Way, Suite 100
            </span>
            <span className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              4.9 (1.2k)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-[#E2E8F0] p-3 px-[18px]">
        <button
          type="button"
          onClick={() => setActiveModal('refill')}
          className="w-full h-11 rounded-xl bg-[#0F766E] hover:bg-[#0D655E] text-white font-bold text-xs tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Pill className="w-4 h-4" />
          <span>ORDER OR REFILL PRESCRIPTION</span>
        </button>
      </div>

      {/* IN-PHONE MODAL 1: Pharmacist Call Simulation */}
      {activeModal === 'call' && (
        <div className="absolute inset-0 z-[100] bg-[#0F172A]/95 backdrop-blur-md flex flex-col justify-between p-6 animate-fadeIn text-white">
          <div className="flex items-center justify-between pt-8 border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-widest text-[#5EEAD4] font-bold">
              SECURE PHARMACY TELE-DESK
            </span>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-[#0F766E] mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#0F766E]/40 border-2 border-[#5EEAD4]">
              <PhoneCall className="w-9 h-9 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Dr. Sarah Lin, PharmD</h3>
              <p className="text-xs text-[#5EEAD4] mt-0.5">Lead Clinical Pharmacist • On Duty</p>
              <p className="text-[11px] text-white/60 mt-1">Connecting line (1-800-LUMEN-RX)...</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>00:14 • Audio High Definition</span>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                showToast('Call ended with pharmacist');
                setActiveModal(null);
              }}
              className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
            >
              END CALL
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 2: Transfer Prescription Photo */}
      {activeModal === 'transfer-rx' && (
        <div className="absolute inset-0 z-[100] bg-white flex flex-col justify-between p-5 animate-fadeIn text-[#0F172A]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#0F766E] text-white flex items-center justify-center">
                <UploadCloud className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-[#0F766E]">TRANSFER PRESCRIPTION</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-4">
            <div className="p-4 bg-slate-50 border-2 border-dashed border-[#0F766E]/40 rounded-2xl text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#0F766E] mx-auto flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-[#0F172A]">
                {rxUploaded ? 'Prescription Document Verified' : 'Select Digital Prescription Record'}
              </h4>
              <p className="text-[11px] text-slate-500 max-w-[240px] mx-auto">
                {rxUploaded
                  ? 'Rx #940182-C • CVS to Lumen Rx transfer staged.'
                  : 'Select electronic Rx file or import from your patient health portal.'}
              </p>

              <button
                type="button"
                onClick={() => {
                  setRxUploaded(true);
                  showToast('Prescription record verified & attached!');
                }}
                className="mt-2 px-4 py-2 bg-[#0F766E] text-white text-[11px] font-bold rounded-lg hover:bg-[#0D655E] cursor-pointer"
              >
                {rxUploaded ? '✓ Re-verify Record' : 'Attach Digital Rx Record'}
              </button>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                showToast('Prescription sent to pharmacy team for verification');
                setActiveModal(null);
              }}
              className="w-full h-11 bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0D655E] transition-colors cursor-pointer"
            >
              SUBMIT TRANSFER REQUEST
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 3: Fast Courier Tracker */}
      {activeModal === 'track-courier' && (
        <div className="absolute inset-0 z-[100] bg-white flex flex-col justify-between p-5 animate-fadeIn text-[#0F172A]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#0F766E]" />
              <span className="font-bold text-sm text-[#0F766E]">LIVE COURIER STATUS</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-3">
            <div className="p-3.5 bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F766E]">Order #LMN-8921</span>
                <span className="text-[10px] bg-[#10B981] text-white px-2 py-0.5 rounded-full font-bold">
                  ON THE WAY
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">Estimated Arrival: 24 Mins</p>
              <p className="text-[11px] text-slate-600">
                Courier: Carlos M. • Electric Cargo Bike #14
              </p>
            </div>

            {/* Delivery Timeline Steps */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-semibold block">Prescription Verified & Dispensed</span>
                  <span className="text-[10px] text-slate-500">8:42 AM by Dr. Lin</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-[10px] font-bold animate-pulse">
                  •
                </div>
                <div>
                  <span className="font-bold text-[#0F766E] block">Out for Delivery</span>
                  <span className="text-[10px] text-slate-500">En route on 5th Ave (0.8 miles away)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 opacity-40">
                <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px]">
                  3
                </div>
                <div>
                  <span className="font-semibold block">Handover with Signature</span>
                  <span className="text-[10px] text-slate-500">Contactless handoff</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="w-full h-10 bg-[#0F766E] text-white font-bold text-xs uppercase rounded-xl"
          >
            CLOSE TRACKER
          </button>
        </div>
      )}

      {/* IN-PHONE MODAL 4: Instant Refill Modal */}
      {activeModal === 'refill' && (
        <div className="absolute inset-0 z-[100] bg-white flex flex-col justify-between p-5 animate-fadeIn text-[#0F172A]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#0F766E]" />
              <span className="font-bold text-sm text-[#0F766E]">FAST RX REFILL</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-3">
            <p className="text-xs text-slate-600">Select active medication to refill:</p>
            {[
              { name: 'Amoxicillin 500mg', rx: 'RX-940291', copay: '$8.00', pills: '30 capsules' },
              { name: 'Atorvastatin 20mg', rx: 'RX-882310', copay: '$5.50', pills: '90 tablets' },
              { name: 'Vitamin D3 5000 IU', rx: 'RX-102941', copay: '$12.00', pills: '60 softgels' },
            ].map((med) => (
              <button
                key={med.name}
                type="button"
                onClick={() => setSelectedRefillMed(med.name)}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${selectedRefillMed === med.name
                  ? 'border-[#0F766E] bg-[#F0FDFA] shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-900">{med.name}</span>
                  <span className="font-bold text-xs text-[#0F766E]">{med.copay}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>{med.rx}</span>
                  <span>{med.pills}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                showToast(`Refill Confirmed: ${selectedRefillMed}! Ready in 15 min.`);
                setActiveModal(null);
              }}
              className="w-full h-11 bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0D655E] transition-colors cursor-pointer"
            >
              CONFIRM FAST REFILL
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 5: Service Detail */}
      {activeModal === 'service-detail' && selectedService && (
        <div className="absolute inset-0 z-[100] bg-white flex flex-col justify-between p-5 animate-fadeIn text-[#0F172A]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E2E8F0] pb-3">
            <span className="font-bold text-xs text-[#0F766E] tracking-wider uppercase">
              CLINICAL HEALTH SERVICE
            </span>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-3">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h3 className="font-bold text-base text-slate-900">{selectedService.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedService.desc}</p>
              <div className="flex justify-between pt-3 border-t border-slate-200 text-xs">
                <span>Estimated Time:</span>
                <span className="font-bold text-slate-800">{selectedService.time}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Service Fee:</span>
                <span className="font-bold text-[#0F766E]">{selectedService.price}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                showToast(`Booked Appointment for ${selectedService.title}!`);
                setActiveModal(null);
              }}
              className="w-full h-11 bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0D655E] transition-colors cursor-pointer"
            >
              BOOK WALK-IN / APPOINTMENT
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
            >
              BACK
            </button>
          </div>
        </div>
      )}

      {/* In-Phone Menu Modal */}
      {menuOpen && (
        <div className="absolute inset-0 z-[100] bg-white flex flex-col justify-between p-6 animate-fadeIn text-[#0F172A]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E2E8F0] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#0F766E] text-white flex items-center justify-center">
                <Pill className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-[#0F766E]">LUMEN PHARMACY</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 py-4 text-sm font-semibold">
            {[
              { label: 'Refill Prescription', action: () => { setMenuOpen(false); setActiveModal('refill'); } },
              { label: 'Transfer From Other Pharmacy', action: () => { setMenuOpen(false); setActiveModal('transfer-rx'); } },
              { label: 'Track Live Delivery', action: () => { setMenuOpen(false); setActiveModal('track-courier'); } },
              { label: 'Telehealth & Blood Tests', action: () => { setMenuOpen(false); setShowAllServices(true); } },
              { label: 'Call On-Duty Pharmacist', action: () => { setMenuOpen(false); setActiveModal('call'); } },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="text-left py-1 text-[#1E293B] hover:text-[#0F766E] flex items-center justify-between border-b border-slate-100 cursor-pointer"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="p-3 bg-[#F0FDFA] rounded-xl text-center space-y-1">
            <p className="text-xs font-bold text-[#0F766E]">Need Emergency Medication Advice?</p>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setActiveModal('call');
              }}
              className="text-[11px] text-[#0D9488] font-bold underline cursor-pointer"
            >
              24/7 Clinical Hotline: Tap to Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PHONE 3 — RETAIL / BUSINESS SHOP: "ATELIER KAIROS // LIFESTYLE BOUTIQUE"
// Polished luxury boutique, editorial warm alabaster (#FBF9F5), timeless craftsmanship
// ============================================================================
function RetailMobileWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([1]);
  const [activeCategory, setActiveCategory] = useState<string>("AUTUMN '26");
  const [activeModal, setActiveModal] = useState<
    'bag' | 'product-detail' | 'store-locator' | 'checkout' | null
  >(null);
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const [cart, setCart] = useState<
    { id: number; title: string; price: number; material: string; img: string; qty: number }[]
  >([
    {
      id: 1,
      title: 'Kyoto Ribbed Vessel',
      price: 115,
      material: 'Stoneware',
      img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=500&q=80',
      qty: 1,
    },
    {
      id: 2,
      title: 'Raw Flax Kimono Robe',
      price: 245,
      material: 'Textile',
      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80',
      qty: 1,
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    title: string;
    price: number;
    category: string;
    material: string;
    stock: string;
    desc: string;
    img: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => {
      setToastNotice(null);
    }, 2500);
  };

  const toggleLike = (id: number, title: string) => {
    setLikedItems((prev) => {
      const isLiked = prev.includes(id);
      if (isLiked) {
        showToast(`Removed from saved objects`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved ${title} to wishlist`);
        return [...prev, id];
      }
    });
  };

  const allProducts = [
    {
      id: 1,
      title: 'Kyoto Ribbed Vessel',
      price: 115,
      category: 'CERAMICS',
      material: 'STONEWARE',
      stock: 'In Stock',
      stockColor: 'text-[#059669]',
      desc: 'Wheel-thrown in Kyoto using iron-rich Shigaraki clay. Unglazed exterior with smooth satin interior.',
      img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 2,
      title: 'Raw Flax Kimono Robe',
      price: 245,
      category: 'RAW LINEN',
      material: 'TEXTILE',
      stock: 'Low Stock',
      stockColor: 'text-[#D97706]',
      desc: 'Woven from 100% Normandy flax. Naturally garment-washed for an effortless drape and softened hand feel.',
      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 3,
      title: 'Saddle Leather Catchall',
      price: 130,
      category: 'LEATHER OBJECTS',
      material: 'LEATHER',
      stock: 'In Stock',
      stockColor: 'text-[#059669]',
      desc: 'Hand-burnished vegetable-tanned Tuscan leather molded into a clean desktop tray with solid brass rivets.',
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      title: 'Hinoki Cypress Candle',
      price: 68,
      category: 'HOME SCENTS',
      material: 'BOTANICAL',
      stock: 'In Stock',
      stockColor: 'text-[#059669]',
      desc: 'Smoked cedar, wild vetiver, and sacred Japanese Hinoki wood poured in mouth-blown tinted glass.',
      img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=500&q=80',
    },
  ];

  const filteredProducts =
    activeCategory === "AUTUMN '26"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product: typeof allProducts[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          material: product.material,
          img: product.img,
          qty: 1,
        },
      ];
    });
    showToast(`Added ${product.title} to bag`);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none bg-[#F9F7F3] text-[#1D1917] font-manrope flex flex-col justify-between"
      style={{ backgroundColor: '#F9F7F3' }}
    >
      {/* In-Phone Toast Notification Banner */}
      {toastNotice && (
        <div className="absolute top-[88px] left-4 right-4 z-[90] flex items-center gap-2 bg-[#1D1917] text-[#F9F7F3] px-3.5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-black/30 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate">{toastNotice}</span>
        </div>
      )}

      {/* Editorial Boutique Header */}
      <header
        className="w-full z-30 bg-[#F9F7F3]/90 backdrop-blur-md border-b border-[#E7E2D9] px-[18px] pb-2.5"
        style={{ paddingTop: 46 }}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer text-[#1D1917]"
            aria-label="Open boutique menu"
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>

          <div className="text-center">
            <span className="font-serif tracking-[0.22em] text-[15px] font-medium text-[#1D1917] block">
              ATELIER KAIROS
            </span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#8C827A] block">
              PARIS • NEW YORK
            </span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveModal('bag')}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors text-[#1D1917] cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#1D1917] text-white text-[8px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Minimal Category Scroller */}
        <div className="flex items-center gap-4 overflow-x-auto pt-2 text-[11px] text-[#78716C] font-medium no-scrollbar">
          {["AUTUMN '26", 'CERAMICS', 'RAW LINEN', 'LEATHER OBJECTS', 'HOME SCENTS'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 pb-0.5 transition-colors cursor-pointer ${activeCategory === cat
                ? 'text-[#1D1917] font-semibold border-b border-[#1D1917]'
                : 'hover:text-black'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Retail Showcase Scroll View */}
      <div
        className="flex-1 overflow-y-auto px-[18px] py-3.5 space-y-4"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Editorial Hero Visual with Campaign Tag */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-[#E7E2D9]">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85"
            alt="Atelier luxury collection"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#F9F7F3]/80 font-medium">
              LIMITED EDITION // EDITION 04
            </span>
            <h3 className="font-serif text-[18px] leading-tight mt-0.5 font-normal tracking-wide">
              <TypewriterText text="Timeless Form. Mindful Craft." delay={200} speed={22} />
            </h3>
            <p className="text-[11px] text-white/80 mt-0.5">
              Hand-finished stoneware, washed linen & vegetable-tanned accessories.
            </p>
          </div>
        </div>

        {/* Featured Products Grid (2 columns) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-serif text-xs tracking-wider uppercase text-[#1D1917] font-medium">
              CURATED OBJECTS ({filteredProducts.length})
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory("AUTUMN '26")}
              className="text-[10px] text-[#78716C] uppercase tracking-wider font-semibold hover:text-black cursor-pointer"
            >
              VIEW ALL ({allProducts.length})
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl p-2 border border-[#E7E2D9] shadow-2xs group flex flex-col justify-between hover:border-[#1D1917]/40 transition-colors"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#F3EFEA] mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(prod);
                      setActiveModal('product-detail');
                    }}
                    className="w-full h-full text-left block cursor-pointer"
                  >
                    <img
                      src={prod.img}
                      alt={prod.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleLike(prod.id, prod.title)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#1D1917] cursor-pointer"
                    aria-label="Save product"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${likedItems.includes(prod.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-stone-600'
                        }`}
                    />
                  </button>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] block">
                    {prod.material}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(prod);
                      setActiveModal('product-detail');
                    }}
                    className="font-serif text-[12px] text-[#1D1917] truncate block text-left hover:underline cursor-pointer"
                  >
                    {prod.title}
                  </button>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-stone-100">
                    <span className="text-[11px] font-semibold text-[#1D1917]">${prod.price}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(prod)}
                      className="text-[9px] text-[#1D1917] font-bold underline hover:text-[#8C827A] cursor-pointer"
                    >
                      + ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagship Store Information Card (Interactive) */}
        <button
          type="button"
          onClick={() => setActiveModal('store-locator')}
          className="w-full text-left bg-[#EFECE6] p-3 rounded-xl border border-[#E2DDD3] text-[11px] space-y-1 hover:bg-[#eae6de] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between font-semibold text-[#1D1917]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8C827A]" />
              SoHo Flagship Store
            </span>
            <span className="text-[10px] text-[#059669]">Open Today • View Map</span>
          </div>
          <p className="text-[#78716C] text-[10px]">
            428 Broome Street, New York • 11:00 AM – 7:30 PM
          </p>
        </button>
      </div>

      {/* Luxury Bottom Action Button */}
      <div className="p-3 px-[18px] bg-[#F9F7F3] border-t border-[#E7E2D9]">
        <button
          type="button"
          onClick={() => {
            setActiveCategory("AUTUMN '26");
            showToast('Showing Edition 04 Autumn Arrivals');
          }}
          className="w-full h-11 rounded-full bg-[#1D1917] text-[#F9F7F3] hover:bg-black font-medium text-xs tracking-[0.15em] uppercase shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E7E2D9]" />
          <span>EXPLORE NEW ARRIVALS</span>
        </button>
      </div>

      {/* IN-PHONE MODAL 1: Shopping Bag Drawer */}
      {activeModal === 'bag' && (
        <div className="absolute inset-0 z-[100] bg-[#F9F7F3] flex flex-col justify-between p-5 animate-fadeIn text-[#1D1917]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E7E2D9] pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#1D1917]" />
              <span className="font-serif text-sm font-semibold tracking-wider">
                YOUR BAG ({cartItemCount})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs">
                Your shopping bag is empty.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#E7E2D9]"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-serif font-semibold truncate text-[#1D1917]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#8C827A]">{item.material}</span>
                    <div className="font-semibold mt-0.5">${item.price}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs bg-stone-100 rounded-lg px-2 py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setCart((prev) =>
                          prev
                            .map((p) => (p.id === item.id ? { ...p, qty: p.qty - 1 } : p))
                            .filter((p) => p.qty > 0)
                        );
                      }}
                      className="w-4 h-4 flex items-center justify-center font-bold text-stone-600 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCart((prev) =>
                          prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
                        );
                      }}
                      className="w-4 h-4 flex items-center justify-center font-bold text-stone-600 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-[#E7E2D9] space-y-2 pb-4">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-stone-600">Subtotal:</span>
              <span className="font-bold text-[#1D1917]">${cartTotal}</span>
            </div>
            <p className="text-[10px] text-stone-500">
              Complimentary carbon-neutral express shipping included.
            </p>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => setActiveModal('checkout')}
              className="w-full h-11 rounded-full bg-[#1D1917] text-white font-medium text-xs tracking-wider uppercase hover:bg-black transition-colors disabled:opacity-50 cursor-pointer"
            >
              PROCEED TO CHECKOUT (${cartTotal})
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 2: Product Detail */}
      {activeModal === 'product-detail' && selectedProduct && (
        <div className="absolute inset-0 z-[100] bg-[#F9F7F3] flex flex-col justify-between p-5 animate-fadeIn text-[#1D1917]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E7E2D9] pb-3">
            <span className="text-[10px] uppercase tracking-widest text-[#8C827A] font-bold">
              {selectedProduct.category}
            </span>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#1D1917]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#E7E2D9]">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif text-base font-semibold">{selectedProduct.title}</h3>
                <span className="font-serif text-base font-bold">${selectedProduct.price}</span>
              </div>
              <span className="text-[10px] text-[#059669] font-medium block mt-0.5">
                {selectedProduct.stock} • Hand-numbered
              </span>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">{selectedProduct.desc}</p>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                addToCart(selectedProduct);
                setActiveModal('bag');
              }}
              className="w-full h-11 rounded-full bg-[#1D1917] text-white font-medium text-xs tracking-wider uppercase hover:bg-black transition-colors cursor-pointer"
            >
              ADD TO SHOPPING BAG (${selectedProduct.price})
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 rounded-full bg-stone-200/60 text-stone-700 font-semibold text-xs"
            >
              CONTINUE BROWSING
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 3: Store Locator */}
      {activeModal === 'store-locator' && (
        <div className="absolute inset-0 z-[100] bg-[#F9F7F3] flex flex-col justify-between p-5 animate-fadeIn text-[#1D1917]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E7E2D9] pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1D1917]" />
              <span className="font-serif text-sm font-semibold tracking-wider">
                SOHO ATELIER
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#1D1917]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-[#E7E2D9] space-y-2">
              <h4 className="font-serif font-bold text-sm">428 Broome Street, New York, NY 10013</h4>
              <p className="text-stone-600 leading-relaxed">
                Between Wooster and West Broadway in historic SoHo. Custom tailoring appointments & ceramic collection viewings.
              </p>
              <div className="pt-2 border-t border-stone-100 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Monday – Saturday</span>
                  <span className="font-semibold">11:00 AM – 7:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Sunday</span>
                  <span className="font-semibold">12:00 PM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                showToast('Private appointment requested! Concierge will text confirmation.');
                setActiveModal(null);
              }}
              className="w-full h-11 rounded-full bg-[#1D1917] text-white font-medium text-xs tracking-wider uppercase hover:bg-black transition-colors cursor-pointer"
            >
              BOOK PRIVATE APPOINTMENT
            </button>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full h-9 rounded-full bg-stone-200/60 text-stone-700 font-semibold text-xs"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* IN-PHONE MODAL 4: Checkout */}
      {activeModal === 'checkout' && (
        <div className="absolute inset-0 z-[100] bg-[#F9F7F3] flex flex-col justify-between p-5 animate-fadeIn text-[#1D1917]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E7E2D9] pb-3">
            <span className="font-serif text-sm font-semibold tracking-wider">
              FAST SECURE CHECKOUT
            </span>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#1D1917]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-auto space-y-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-[#E7E2D9] space-y-2">
              <div className="flex justify-between font-bold">
                <span>Order Total:</span>
                <span>${cartTotal}</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Delivery to: 742 Evergreen Terrace • Standard 2-Day Air
              </p>
              <div className="p-2 bg-stone-50 rounded-lg flex items-center justify-between text-[11px]">
                <span className="font-mono">Apple Pay / Visa •••• 4242</span>
                <span className="text-emerald-600 font-bold">Verified</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <button
              type="button"
              onClick={() => {
                setCart([]);
                showToast('Order placed successfully! Confirmation sent.');
                setActiveModal(null);
              }}
              className="w-full h-11 rounded-full bg-[#1D1917] text-white font-medium text-xs tracking-wider uppercase hover:bg-black transition-colors cursor-pointer"
            >
              PAY ${cartTotal} WITH APPLE PAY
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('bag')}
              className="w-full h-9 rounded-full bg-stone-200/60 text-stone-700 font-semibold text-xs"
            >
              BACK TO BAG
            </button>
          </div>
        </div>
      )}

      {/* In-Phone Boutique Menu Modal */}
      {menuOpen && (
        <div className="absolute inset-0 z-[100] bg-[#F9F7F3] flex flex-col justify-between p-6 animate-fadeIn text-[#1D1917]">
          <div className="flex items-center justify-between pt-8 border-b border-[#E7E2D9] pb-4">
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.2em] text-sm font-semibold">
                ATELIER KAIROS
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8C827A]">
                BOUTIQUE & OBJECTS
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-3.5 py-4 font-serif text-xl tracking-wide">
            {[
              { label: 'NEW IN STORE', action: () => { setMenuOpen(false); setActiveCategory("AUTUMN '26"); } },
              { label: 'CERAMICS & VESSELS', action: () => { setMenuOpen(false); setActiveCategory('CERAMICS'); } },
              { label: 'GARMENTS & LINEN', action: () => { setMenuOpen(false); setActiveCategory('RAW LINEN'); } },
              { label: 'LEATHER GOODS', action: () => { setMenuOpen(false); setActiveCategory('LEATHER OBJECTS'); } },
              { label: 'SHOPPING BAG', action: () => { setMenuOpen(false); setActiveModal('bag'); } },
              { label: 'STORE LOCATOR', action: () => { setMenuOpen(false); setActiveModal('store-locator'); } },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="text-left py-1 text-[#1D1917] hover:text-[#8C827A] flex items-center justify-between border-b border-stone-200/50 cursor-pointer"
              >
                <span className="text-base">{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </div>

          <div className="text-center space-y-2 pt-2 border-t border-[#E7E2D9]">
            <p className="text-[10px] text-[#78716C] tracking-widest uppercase">
              COMPLIMENTARY SHIPPING WORLDWIDE OVER $200
            </p>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setActiveModal('store-locator');
              }}
              className="w-full h-10 rounded-full bg-[#1D1917] text-white text-[11px] font-semibold tracking-wider uppercase cursor-pointer"
            >
              VISIT SOHO ATELIER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const IPHONE_PRELOAD_URLS = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85',
];

function preloadPhoneAssets() {
  if (typeof window === 'undefined') return;
  IPHONE_PRELOAD_URLS.forEach((url) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    if (img.decode) {
      img.decode().catch(() => {});
    }
  });
}

// ============================================================================
// IPHONE FRAME WRAPPER
// Exact 375x812 artboard inside black rounded frame (borderRadius 50, borderWidth 2, borderColor #2a2a2a),
// dynamic island notch (126x36, black, borderRadius 18),
// home indicator bar (134x5, white 30% opacity),
// soft shadow: shadowColor: #000, offset: {0, 12}, opacity: 0.3, radius: 24.
// ============================================================================
function IPhoneFrame({
  children,
  delayMs: _delayMs,
  scale = 1,
}: {
  children: React.ReactNode;
  delayMs?: number;
  scale?: number;
}) {
  return (
    <div
      className="relative shrink-0 overflow-visible flex items-start justify-center"
      style={{
        width: 375 * scale,
        height: 812 * scale,
      }}
    >
      <div
        className="relative overflow-hidden shrink-0 select-auto"
        style={{
          width: 375,
          height: 812,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: '#2a2a2a',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#000000',
          ...(scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: 'top left' } : {}),
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/* Screen artboard (375x812 rounded inner frame) - Unified Texture Stacking Context */}
        <div
          className="w-full h-full rounded-[48px] overflow-hidden relative z-10"
          style={{
            backgroundColor: '#000000',
            isolation: 'isolate',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          {children}
        </div>

        {/* Physical Dynamic Island Notch (Hardware Layer Above Screen & Overlays) */}
        <div
          className="absolute top-[11px] left-1/2 -translate-x-1/2 z-50 bg-black flex items-center justify-between px-3.5 pointer-events-none"
          style={{
            width: 126,
            height: 36,
            borderRadius: 18,
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#121212] ml-auto border border-[#222]" />
        </div>

        {/* Home Indicator Bar (134x5, white 30% opacity) */}
        <div
          className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{
            width: 134,
            height: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
}

export default function ThreePhoneShowcase() {
  // ───────────────────────────────────────────────────────────────
  // RESPONSIVE GROUP SCALING — identical pattern to MacBookShowcase
  // ───────────────────────────────────────────────────────────────
  // The three phones side-by-side form one composition at a known
  // "base width". On viewports narrower than that base, compute a
  // single scale factor and apply it to the ENTIRE group — exactly
  // the same way the MacBook scales its 1040px-wide chassis.
  //
  // Phone: 375 × 812   Gap between phones: ~44px
  // Base group width:  375*3 + 44*2 = 1213
  // Base group height: 812
  // ───────────────────────────────────────────────────────────────

  const BASE_GROUP_W = 1213; // 3 phones + 2 gaps
  const BASE_GROUP_H = 812;
  const PHONE_GAP = 44;

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll scrub configuration: triggers as section approaches viewport,
  // reaches full assembly right as user reaches showcase, reverses smoothly on scroll up.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 86%', 'center 46%'],
  });

  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 1024;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobileViewport ? 180 : 90,
    damping: isMobileViewport ? 30 : 24,
    mass: isMobileViewport ? 0.08 : 0.2,
    restDelta: isMobileViewport ? 0.003 : 0.001,
  });

  // Intelligent preloading of phone assets when approaching viewport
  React.useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    let preloaded = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !preloaded) {
          preloaded = true;
          preloadPhoneAssets();
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px 500px 0px', threshold: 0.01 }
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  // Staggered Multi-Directional Entrance Trajectories:
  // PHONE 1: Enters from LEFT side (progress [0.0, 0.72])
  const phone1X = useTransform(smoothProgress, [0.0, 0.72], [shouldReduceMotion ? 0 : -140, 0]);
  const phone1Y = useTransform(smoothProgress, [0.0, 0.72], [shouldReduceMotion ? 0 : 26, 0]);
  const phone1Rotate = useTransform(smoothProgress, [0.0, 0.72], [shouldReduceMotion ? 0 : -5.5, 0]);
  const phone1Scale = useTransform(smoothProgress, [0.0, 0.72], [shouldReduceMotion ? 1 : 0.92, 1]);
  const phone1Opacity = useTransform(smoothProgress, [0.0, 0.72], [shouldReduceMotion ? 1 : 0.75, 1]);

  // PHONE 2: Enters from ABOVE / CENTER with subtle vertical drop (progress [0.12, 0.86])
  const phone2Y = useTransform(smoothProgress, [0.12, 0.86], [shouldReduceMotion ? 0 : -95, 0]);
  const phone2Scale = useTransform(smoothProgress, [0.12, 0.86], [shouldReduceMotion ? 1 : 0.94, 1]);
  const phone2Opacity = useTransform(smoothProgress, [0.12, 0.86], [shouldReduceMotion ? 1 : 0.78, 1]);

  // PHONE 3: Enters from RIGHT side (progress [0.24, 1.0])
  const phone3X = useTransform(smoothProgress, [0.24, 1.0], [shouldReduceMotion ? 0 : 140, 0]);
  const phone3Y = useTransform(smoothProgress, [0.24, 1.0], [shouldReduceMotion ? 0 : 26, 0]);
  const phone3Rotate = useTransform(smoothProgress, [0.24, 1.0], [shouldReduceMotion ? 0 : 5.5, 0]);
  const phone3Scale = useTransform(smoothProgress, [0.24, 1.0], [shouldReduceMotion ? 1 : 0.92, 1]);
  const phone3Opacity = useTransform(smoothProgress, [0.24, 1.0], [shouldReduceMotion ? 1 : 0.75, 1]);

  const [groupScale, setGroupScale] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const availableWidth = window.innerWidth;
      if (availableWidth < BASE_GROUP_W) {
        const newScale = Math.min(1, (availableWidth - 24) / BASE_GROUP_W);
        return Math.max(0.22, newScale);
      }
    }
    return 1;
  });

  React.useEffect(() => {
    const handleResize = () => {
      const availableWidth = containerRef.current
        ? containerRef.current.clientWidth
        : window.innerWidth;
      if (availableWidth < BASE_GROUP_W) {
        // Leave 24px total side padding, same as MacBook
        const newScale = Math.min(1, (availableWidth - 24) / BASE_GROUP_W);
        setGroupScale(Math.max(0.22, newScale));
      } else {
        setGroupScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-20 w-full overflow-hidden"
      style={{ backgroundColor: '#5A4C41', marginBottom: '-1px' }}
    >
      {/* Header bar / Title for showcase */}
      <ScrollPhoneHeading
        eyebrow="[ BESPOKE CLIENT CONCEPTS // MOBILE-FIRST ARCHITECTURE ]"
        title="Modern Websites Tailored For Every Business"
        subtitle="Explore three custom mobile architectures: High-Performance Fitness, Clinical Pharmacy & Apothecary, and Curated Retail Boutique."
      />

      {/* ═══════════════════════════════════════════════════════════════
          THREE-PHONE GROUP — MacBook-style responsive scale container
          Outer div: sets the LAYOUT SPACE to (baseW * scale) × (baseH * scale)
          Inner div: fixed at baseW × baseH, with transform: scale(groupScale)
          This keeps all 3 phones side-by-side at every viewport width.
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        className="relative z-10 w-full flex flex-col items-center justify-center py-6 sm:py-10 px-2 sm:px-4 overflow-hidden"
      >
        {/* Layout-space wrapper — occupies exactly the scaled dimensions */}
        <div
          style={{
            width: Math.round(BASE_GROUP_W * groupScale),
            height: Math.round(BASE_GROUP_H * groupScale),
          }}
          className="relative overflow-visible shrink-0"
        >
          {/* Fixed-size inner composition — scaled via CSS transform */}
          <div
            style={{
              width: BASE_GROUP_W,
              height: BASE_GROUP_H,
              transform: `scale(${groupScale}) translateZ(0)`,
              transformOrigin: 'top left',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            className="flex flex-row items-start justify-center"
          >
            {/* Phone 1: Gym / Fitness Website (Enters from LEFT) */}
            <motion.div
              style={{
                width: 375,
                height: 812,
                flexShrink: 0,
                x: phone1X,
                y: phone1Y,
                rotate: phone1Rotate,
                scale: phone1Scale,
                opacity: phone1Opacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              <IPhoneFrame scale={1}>
                <GymMobileWebsite />
              </IPhoneFrame>
            </motion.div>

            {/* Gap */}
            <div style={{ width: PHONE_GAP, flexShrink: 0 }} />

            {/* Phone 2: Medical Shop / Pharmacy Website (Drops from TOP / CENTER) */}
            <motion.div
              style={{
                width: 375,
                height: 812,
                flexShrink: 0,
                y: phone2Y,
                scale: phone2Scale,
                opacity: phone2Opacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              <IPhoneFrame scale={1}>
                <PharmacyMobileWebsite />
              </IPhoneFrame>
            </motion.div>

            {/* Gap */}
            <div style={{ width: PHONE_GAP, flexShrink: 0 }} />

            {/* Phone 3: Retail / Business Shop Website (Enters from RIGHT) */}
            <motion.div
              style={{
                width: 375,
                height: 812,
                flexShrink: 0,
                x: phone3X,
                y: phone3Y,
                rotate: phone3Rotate,
                scale: phone3Scale,
                opacity: phone3Opacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              <IPhoneFrame scale={1}>
                <RetailMobileWebsite />
              </IPhoneFrame>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle indicator caption */}
      <div className="pb-8 sm:pb-10 text-center select-none px-4">
        <ScrollLineReveal offsetY={6} phase={0}>
          <span className="font-manrope text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">
            Tap menu or category controls on any phone frame to test interactive navigation
          </span>
        </ScrollLineReveal>
      </div>
    </section>
  );
}
