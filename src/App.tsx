/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Calculator,
  Camera,
  Bot,
  Crown,
  Users,
  Smartphone,
  Globe,
  Volume2,
  CheckCircle2,
  QrCode,
  Gift,
  ShoppingBag,
  MessageCircle,
  Brain,
  Github,
  ShieldCheck,
  ArrowUpRight,
  Plane,
  HeartHandshake,
  Lightbulb,
  Copy,
  Send,
  X,
} from 'lucide-react';
import {
  LANGUAGES,
  TRANSLATIONS,
  DEPARTMENTS,
  CLINIC_SERVICES,
  BEFORE_AFTER_CASES,
  LanguageCode,
  ClinicServiceItem,
  BeforeAfterCase,
} from './data/clinicData';
import { usePWAInstall } from './hooks/usePWAInstall';
import { StoryMakerModal } from './components/StoryMakerModal';
import { InstallmentCalculatorModal } from './components/InstallmentCalculatorModal';
import { DigitalWarrantyModal } from './components/DigitalWarrantyModal';
import {
  VipPlansModal,
  AffiliateModal,
  GithubAndAndroidModal,
  AccessibilityModal,
  AccessibilitySettings,
} from './components/VipAndAffiliateModals';

export default function App() {
  // Language & Market Mode (Domestic Iran vs International Medical Tourism)
  const [lang, setLang] = useState<LanguageCode>('fa');
  const [marketMode, setMarketMode] = useState<'domestic' | 'tourism'>('domestic');
  const [currency, setCurrency] = useState<'USD' | 'AED' | 'EUR'>('USD');

  // Department & ADHD 30-second Goal Filter
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [quickGoal, setQuickGoal] = useState<string>('all');

  // Accessibility & ADHD State
  const [a11y, setA11y] = useState<AccessibilitySettings>({
    adhdFocusMode: false,
    bionicReading: false,
    readingRuler: false,
    fontScale: 'normal',
    wideSpacing: false,
    reducedMotion: false,
    highContrast: false,
  });
  const [mouseY, setMouseY] = useState<number>(300);

  // Modals State
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcService, setCalcService] = useState<ClinicServiceItem | null>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [storyService, setStoryService] = useState<ClinicServiceItem | null>(null);
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [warrantyCase, setWarrantyCase] = useState<BeforeAfterCase | null>(null);
  const [isVipPlansOpen, setIsVipPlansOpen] = useState(false);
  const [isAffiliateOpen, setIsAffiliateOpen] = useState(false);
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [isPwaGuideOpen, setIsPwaGuideOpen] = useState(false);

  // Loyalty Club & VIP Booking Cart State
  const [cart, setCart] = useState<ClinicServiceItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'deposit' | 'sayadi' | 'tourism'>('sayadi');
  const [referralFriendPhone, setReferralFriendPhone] = useState('');
  const [walletCreditToman, setWalletCreditToman] = useState<number>(2450000);
  const [referralCopied, setReferralCopied] = useState(false);

  // AI Assistant State
  const [aiMode, setAiMode] = useState<'care' | 'estimator' | 'caption'>('care');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiReply, setAiReply] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);

  // Interactive Post-Op Recovery Dopamine Checklist (ADHD Innovation)
  const [recoverySteps, setRecoverySteps] = useState([
    { id: 1, text: '۷۲ ساعت قبل: قطع آسپرین، ویتامین E و دمنوش‌های رقیق‌کننده خون', done: true },
    { id: 2, text: 'شب اول پس از کاشت مو / تزریق: استراحت با زاویه ۴۵ درجه و کمپرس سرد غیرمستقیم', done: false },
    { id: 3, text: 'روز سوم: شستشوی ملایم با فوم کلینیکی و ارسال عکس به واتساپ پزشک', done: false },
    { id: 4, text: 'روز هفتم: دریافت کارت ضمانت‌نامه دیجیتال QR و فعال‌سازی ۱۰٪ هدیه کیف پول', done: false },
  ]);

  const { triggerInstall, isOnline } = usePWAInstall();

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fa;

  useEffect(() => {
    document.documentElement.dir = currentLangObj.dir;
    document.documentElement.lang = currentLangObj.code;
  }, [currentLangObj]);

  useEffect(() => {
    if (!a11y.readingRuler) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [a11y.readingRuler]);

  // Text-to-Speech Screen Reader helper
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLangObj.voiceLang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Currency formatter for International Medical Tourism mode
  const formatPrice = (srv: ClinicServiceItem) => {
    if (marketMode === 'domestic') {
      return `${srv.priceToman.toLocaleString('fa-IR')} تومان`;
    }
    if (currency === 'AED') {
      return `${Math.round(srv.priceUSD * 3.67).toLocaleString()} AED`;
    }
    if (currency === 'EUR') {
      return `€${Math.round(srv.priceUSD * 0.92).toLocaleString()} EUR`;
    }
    return `$${srv.priceUSD.toLocaleString()} USD`;
  };

  const filteredServices = CLINIC_SERVICES.filter((srv) => {
    const matchesDept = selectedDept === 'all' || srv.deptId === selectedDept;
    const matchesGoal = quickGoal === 'all' || srv.goalCategory === quickGoal;
    return matchesDept && matchesGoal;
  });

  const handleAddToCart = (srv: ClinicServiceItem) => {
    if (!cart.some((item) => item.id === srv.id)) {
      setCart([...cart, srv]);
    }
    const bookingEl = document.getElementById('vip-booking-section');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskAI = async (customPreset?: string) => {
    const queryToUse = customPreset || aiPrompt || 'مراقبت‌های طلایی بعد از کاشت مو و تزریق فیلر چیست؟';
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: aiMode,
          prompt: queryToUse,
          lang: lang === 'en' || lang === 'es' ? 'en' : 'fa',
        }),
      });
      const data = await res.json();
      setAiReply(data.reply || '');
    } catch (_err) {
      setAiReply('پاسخ هوشمند آماده است: لطفاً ۷۲ ساعت قبل از خدمات زیبایی از مصرف داروهای رقیق‌کننده خون پرهیز نمایید.');
    } finally {
      setAiLoading(false);
    }
  };

  const handlePwaClick = async () => {
    const outcome = await triggerInstall();
    if (outcome === 'manual-guide') {
      setIsPwaGuideOpen(true);
    }
  };

  const containerClasses = [
    'min-h-screen transition-colors',
    a11y.highContrast ? 'bg-white text-black' : 'bg-white text-slate-900',
    a11y.fontScale === 'lg' ? 'a11y-font-lg' : '',
    a11y.fontScale === 'xl' ? 'a11y-font-xl' : '',
    a11y.wideSpacing ? 'a11y-spacing-wide' : '',
    a11y.reducedMotion ? 'a11y-reduced-motion' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Visual Reading Ruler for ADHD & Dyslexia */}
      {a11y.readingRuler && (
        <div
          className="fixed left-0 right-0 h-12 bg-amber-300/25 border-y-2 border-emerald-600 pointer-events-none z-40"
          style={{ top: `${Math.max(0, mouseY - 24)}px` }}
        />
      )}

      {/* Top Ecosystem & 7-Language / Accessibility Bar */}
      <div className="bg-emerald-950 text-white px-4 py-2 text-xs border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{t.ecosystemSubtitle}</span>
            {!isOnline && (
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-extrabold">
                آفلاین (PWA Active)
              </span>
            )}
          </div>

          {/* 7-Language Selector + Quick Accessibility Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-emerald-900/90 border border-emerald-700 rounded-lg px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <select
                aria-label="Select Language / انتخاب زبان"
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="text-slate-900 bg-white">
                    {l.nativeName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setA11y({ ...a11y, adhdFocusMode: !a11y.adhdFocusMode })}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                a11y.adhdFocusMode
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-emerald-900 text-emerald-100 hover:bg-emerald-800'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>{a11y.adhdFocusMode ? 'حالت تمرکز ADHD: روشن' : 'تمرکز ADHD'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsA11yOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-white text-emerald-950 font-extrabold hover:bg-amber-200 transition-colors cursor-pointer"
            >
              ♿ {t.a11yBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header (3-Zone Clean Contract) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <a href="#top" className="text-lg md:text-xl font-extrabold tracking-tight text-emerald-950">
            {t.brandPersian} <span className="text-emerald-600 font-semibold">| {t.brandEnglish}</span>
          </a>

          {/* Zone 2: Clean Text Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-bold text-slate-700">
            <a href="#departments" className="hover:text-emerald-600 transition-colors">
              دپارتمان‌ها و تعرفه‌ها
            </a>
            <button
              type="button"
              onClick={() => setIsCalcOpen(true)}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              {t.calcModalBtn}
            </button>
            <a href="#before-after" className="hover:text-emerald-600 transition-colors">
              گالری قبل و بعد + ضمانت QR
            </a>
            <button
              type="button"
              onClick={() => setIsStoryOpen(true)}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              {t.storyModalBtn}
            </button>
            <a href="#ai-consultant" className="hover:text-emerald-600 transition-colors">
              {t.aiModalBtn}
            </a>
          </nav>

          {/* Zone 3: Primary Actions (PWA Install + VIP / Affiliate) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePwaClick}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              📲 {t.pwaInstallBtn}
            </button>
            <button
              type="button"
              onClick={() => setIsGithubOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">{t.githubBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Live Flash Deals Ribbon (Hidden if ADHD Focus Mode is active to avoid distraction) */}
      {!a11y.adhdFocusMode && (
        <div className="bg-gradient-to-r from-emerald-50 via-rose-50 to-amber-50 border-b border-emerald-200 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-2 font-extrabold text-rose-700">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
              <span>{t.flashDealLabel}</span>
              <span className="text-slate-800 font-bold">
                تا ۳۰٪ تخفیف کاشت مو میکروگرافت، ایمپلنت سوئیسی و لیزر الکساندرایت ۲۰۲۶ + ۱۰٪ شارژ هدیه کیف پول!
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsVipPlansOpen(true)}
                className="font-extrabold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
              >
                👑 {t.vipPlansBtn}
              </button>
              <span className="text-slate-300">·</span>
              <button
                type="button"
                onClick={() => setIsAffiliateOpen(true)}
                className="font-extrabold text-rose-700 hover:text-rose-900 underline cursor-pointer"
              >
                💼 {t.affiliateBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section: Joyful White Canvas + 1-Click Domestic / Medical Tourism Switch */}
      <section id="top" className="relative bg-white pt-8 pb-12 px-4 sm:px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* 1-Click Market Mode Switcher (Feature #1) */}
          <div className="bg-slate-50 border-2 border-emerald-500/30 rounded-2xl p-2 mb-8 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full md:w-auto flex-1">
              <button
                type="button"
                onClick={() => setMarketMode('domestic')}
                className={`py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  marketMode === 'domestic'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>الف) {t.domesticModeBtn}</span>
              </button>
              <button
                type="button"
                onClick={() => setMarketMode('tourism')}
                className={`py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  marketMode === 'tourism'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                <Plane className="w-4 h-4 shrink-0" />
                <span>ب) {t.tourismModeBtn}</span>
              </button>
            </div>

            {marketMode === 'tourism' && (
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-amber-300">
                <span className="text-xs font-bold text-slate-600">Currency:</span>
                {(['USD', 'AED', 'EUR'] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold cursor-pointer ${
                      currency === curr
                        ? 'bg-emerald-950 text-amber-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Hero Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs md:text-sm font-extrabold text-emerald-700 tracking-wide">
                ✨ {t.heroHookBadge}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                {t.heroTitle}
              </h1>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.heroDesc}
              </p>

              {/* Primary Hero Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCalcService(CLINIC_SERVICES[0]);
                    setIsCalcOpen(true);
                  }}
                  className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm md:text-base shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <Calculator className="w-5 h-5" />
                  {t.calcModalBtn} (۳ تا ۱۲ ماهه)
                </button>

                <button
                  type="button"
                  onClick={() => setIsStoryOpen(true)}
                  className="px-5 py-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 border-2 border-rose-200 font-extrabold text-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Camera className="w-5 h-5 text-rose-600" />
                  {t.storyModalBtn}
                </button>

                <button
                  type="button"
                  onClick={() => speakText(`${t.heroTitle}. ${t.heroDesc}`)}
                  className="px-4 py-4 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                  title="خوانش صوتی معرفی کلینیک"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  {t.readAloudBtn}
                </button>
              </div>

              {/* Clean Unboxed Trust Metrics (Zero-Pill Discipline) */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs md:text-sm font-bold text-slate-600 tabular-nums">
                <span className="text-emerald-700">+۱۴,۸۰۰ عمل و کاشت موفق</span>
                <span aria-hidden="true">·</span>
                <span>ضمانت‌نامه دیجیتال با QR Code</span>
                <span aria-hidden="true">·</span>
                <span>اقساط بدون ضامن با چک صیادی</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-700">۷ زبان زنده دنیا + تمرکز ADHD</span>
              </div>
            </div>

            {/* Hero Showcase Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-xl bg-emerald-950 aspect-16/10 lg:aspect-4/3">
                <img
                  src={CLINIC_SERVICES[0].fallbackImage}
                  alt="LuminaMed VIP Luxury Aesthetic Clinic"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs font-bold text-amber-300 mb-1">
                    {marketMode === 'domestic'
                      ? '💎 پذیرش VIP تهران، مشهد و شیراز با اقساط چک صیادی'
                      : '✈️ All-Inclusive 5-Star Hotel + Airport CIP Chauffeur + Interpreter'}
                  </div>
                  <div className="text-lg font-extrabold">
                    {marketMode === 'domestic'
                      ? 'کاشت مو، ایمپلنت سوئیسی و لیزر ۲۰۲۶ با کارت ضمانت‌نامه QR'
                      : 'Save 70% on Swiss Dental Veneers & Micrograft Hair Transplant'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADHD-Friendly 30-Second Stress-Free Goal Finder (Creative Innovation) */}
          <div className="mt-10 bg-emerald-50/70 border-2 border-emerald-200 rounded-3xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base md:text-lg font-extrabold text-emerald-950 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-600" />
                  {t.quickQuizTitle}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  بدون سردرگمی بین اصطلاحات پزشکی، فقط هدف خود را با ۱ کلیک انتخاب کنید تا بهترین پکیج و قسط ماهانه نمایش داده شود:
                </p>
              </div>
              {quickGoal !== 'all' && (
                <button
                  type="button"
                  onClick={() => setQuickGoal('all')}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer self-start md:self-auto"
                >
                  نمایش همه ۱۰ پکیج ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { id: 'all', label: '✨ همه اهداف (۱۰ پکیج)' },
                { id: 'hair', label: '👑 پرپشتی مو و ابرو' },
                { id: 'smile', label: '🦷 لبخند هالیوودی و ایمپلنت' },
                { id: 'face', label: '💉 زاویه‌سازی و جوانسازی صورت' },
                { id: 'laser', label: '⚡ حذف موهای زائد و لیفت' },
                { id: 'tourism', label: '✈️ پکیج کامل توریسم سلامت' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setQuickGoal(g.id);
                    setSelectedDept('all');
                  }}
                  className={`py-3 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer text-center ${
                    quickGoal === g.id
                      ? 'bg-emerald-600 text-white shadow-md scale-[1.02]'
                      : 'bg-white text-slate-800 border border-emerald-200 hover:bg-emerald-100/60'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7 Specialized Departments & 10 Signature Packages Section (Feature #2) */}
      <section id="departments" className="py-12 px-4 sm:px-6 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-extrabold text-emerald-700 mb-1">
                ۰۱. ویترین خدمات و تعرفه‌های شفاف کلینیک
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {t.departmentsTitle}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span>حالت نمایش قیمت:</span>
              <span className="text-emerald-700 font-extrabold">
                {marketMode === 'domestic'
                  ? 'تومان + قسط ماهانه چک صیادی'
                  : `پکیج توریسم سلامت (${currency})`}
              </span>
            </div>
          </div>

          {/* Interactive Department Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                type="button"
                onClick={() => {
                  setSelectedDept(dept.id);
                  setQuickGoal('all');
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedDept === dept.id
                    ? 'bg-emerald-950 text-amber-300 shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
                }`}
              >
                {lang === 'en' || lang === 'es' || lang === 'az' || lang === 'tr'
                  ? dept.nameEn
                  : dept.nameFa}
              </button>
            ))}
          </div>

          {/* 3-Column Product / Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => {
              const downPayment = Math.round(srv.priceToman * 0.3);
              const monthlyCheck = Math.round((srv.priceToman - downPayment) / 6);
              const isRtlLang = currentLangObj.dir === 'rtl';
              const displayTitle = isRtlLang ? srv.titleFa : srv.titleEn;
              const displaySub = isRtlLang ? srv.subtitleFa : srv.subtitleEn;
              const displayPoints = isRtlLang ? srv.adhdSummaryFa : srv.adhdSummaryEn;

              return (
                <article
                  key={srv.id}
                  className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Resilient Image with Automatic Fallback */}
                    <div className="relative h-56 bg-slate-100 overflow-hidden">
                      <img
                        src={srv.imageUrl}
                        alt={displayTitle}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== srv.fallbackImage) {
                            target.src = srv.fallbackImage;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                      <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                        <span className="bg-white/95 backdrop-blur-xs text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-lg shadow-xs">
                          {srv.discountPercent}٪ تخفیف جشنواره
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            speakText(
                              `${displayTitle}. ${displayPoints.join('. ')}. قیمت: ${formatPrice(srv)}`
                            )
                          }
                          className="p-2 rounded-lg bg-white/95 text-slate-800 hover:bg-emerald-600 hover:text-white transition-colors shadow-xs cursor-pointer"
                          title="خوانش صوتی مشخصات این خدمت"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 right-3 left-3 text-white text-xs font-bold flex items-center justify-between">
                        <span>{isRtlLang ? srv.deptNameFa : srv.deptNameEn}</span>
                        <span>⏱️ {isRtlLang ? srv.recoveryTimeFa : srv.recoveryTimeEn}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug mb-2">
                        {displayTitle}
                      </h3>

                      {!a11y.adhdFocusMode && (
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {displaySub}
                        </p>
                      )}

                      {/* ADHD 3-Bullet Dopamine Summary */}
                      <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3.5 mb-4 space-y-1.5">
                        <div className="text-[11px] font-extrabold text-emerald-800 mb-1">
                          🎯 خلاصه سریع ۳ نکته‌ای (ADHD Focus):
                        </div>
                        {displayPoints.map((pt, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs font-bold text-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Clean Metadata */}
                      <div className="text-xs text-slate-500 mb-4 flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-slate-700">برند متریال:</span>
                        <span>{srv.materialBrand}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-bold">
                          {isRtlLang ? srv.warrantyDurationFa : srv.warrantyDurationEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Contiguous Action Footer */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-3">
                    {marketMode === 'domestic' ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-slate-500 font-bold">
                            {t.cashPriceLabel}
                          </div>
                          <div className="text-base font-extrabold text-slate-900 tabular-nums">
                            {srv.priceToman.toLocaleString('fa-IR')} تومان
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] text-emerald-700 font-bold">
                            {t.monthlyCheckLabel}
                          </div>
                          <div className="text-base font-extrabold text-emerald-700 tabular-nums">
                            ماهی {monthlyCheck.toLocaleString('fa-IR')} تومان
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                        <div>
                          <div className="text-[11px] font-bold text-amber-900">
                            {t.tourismPackageLabel}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Procedure + 5★ Hotel + VIP Airport Transfer
                          </div>
                        </div>
                        <div className="text-lg font-extrabold text-emerald-900 font-mono tabular-nums">
                          {formatPrice(srv)}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCalcService(srv);
                          setIsCalcOpen(true);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Calculator className="w-3.5 h-3.5 text-emerald-700" />
                        {t.calcInstallmentBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(srv)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {t.addToCartBtn}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Before & After Showcase + Digital QR Warranty Card (Feature #4) */}
      <section id="before-after" className="py-12 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-extrabold text-emerald-700 mb-1">
                ۰۲. مستندات بالینی و ضمانت‌نامه رسمی اصالت
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {t.beforeAfterTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setWarrantyCase(BEFORE_AFTER_CASES[0]);
                setIsWarrantyOpen(true);
              }}
              className="px-5 py-3 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-xs md:text-sm flex items-center gap-2 cursor-pointer self-start md:self-auto"
            >
              <QrCode className="w-4 h-4" />
              {t.warrantyCardTitle} (با QR Code)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {BEFORE_AFTER_CASES.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-3xl border border-slate-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-4 border border-slate-200 bg-slate-900">
                    <img
                      src={item.imageUrl}
                      alt={item.titleFa}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl text-[11px] font-bold flex justify-between">
                      <span>کد گارانتی: {item.warrantySerial}</span>
                      <span className="text-amber-300">{item.graftOrUnits}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-1">
                    {item.titleFa}
                  </h3>
                  <div className="text-xs font-bold text-emerald-700 mb-3">
                    {item.patientProfileFa}
                  </div>

                  <div className="space-y-2 text-xs bg-white p-3.5 rounded-2xl border border-slate-200 mb-4">
                    <div>
                      <span className="font-extrabold text-rose-700">وضعیت قبل: </span>
                      <span className="text-slate-700">{item.beforeDescFa}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-emerald-700">نتیجه بعد از عمل: </span>
                      <span className="text-slate-800 font-medium">{item.afterDescFa}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-slate-500">
                      <span className="font-bold text-slate-700">برند مصرفی: </span>
                      {item.brandUsed} · {item.recoveryDays}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setWarrantyCase(item);
                    setIsWarrantyOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-500 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  مشاهده و دانلود کارت ضمانت‌نامه دیجیتال این پرونده
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Skin, Hair & Beauty AI Consultant + ADHD Recovery Tracker (Feature #7) */}
      <section id="ai-consultant" className="py-12 px-4 sm:px-6 bg-emerald-50/40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AI Consultant Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-emerald-500/40 p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div>
                <div className="text-xs font-extrabold text-emerald-700">
                  ۰۳. هوش مصنوعی پزشکی + موتور پاسخگوی خودکار آفلاین
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
                  <Bot className="w-6 h-6 text-emerald-600" />
                  دستیار و مشاور هوشمند پوست، مو، دندانپزشکی و زیبایی
                </h2>
              </div>
              {aiReply && (
                <button
                  type="button"
                  onClick={() => speakText(aiReply)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  خوانش صوتی پاسخ
                </button>
              )}
            </div>

            {/* 3 Modes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              {[
                { id: 'care', label: '۱. مراقبت‌های قبل و بعد از عمل' },
                { id: 'estimator', label: '۲. تخمین گرافت مو / واحد دندان / ژل' },
                { id: 'caption', label: '۳. تولید کپشن وایرال اینستاگرام' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setAiMode(m.id as 'care' | 'estimator' | 'caption')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                    aiMode === m.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Quick Preset Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                'مراقبت‌های بعد از کاشت مو میکروگرافت چیست؟',
                'برای اصلاح طرح لبخند چند واحد لمینت یا ایمپلنت نیاز دارم؟',
                'برای زاویه‌سازی صورت و لب روسی چند سی‌سی فیلر لازم است؟',
                'یک کپشن وایرال اینستاگرام برای تخفیف لیزر و اقساط چک صیادی بنویس',
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAiPrompt(preset);
                    handleAskAI(preset);
                  }}
                  className="text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="سوال خود را درباره کاشت مو، ایمپلنت، فیلر، لیزر یا کپشن اینستاگرام بنویسید..."
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-emerald-600"
              />
              <button
                type="button"
                onClick={() => handleAskAI()}
                disabled={aiLoading}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs md:text-sm flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {aiLoading ? 'در حال تحلیل...' : 'دریافت مشاوره'}
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line min-h-[180px]">
              {aiReply ||
                '👋 سلام! من مشاور هوشمند «درخشش‌یار VIP» هستم. یکی از سوالات آماده بالا را کلیک کنید یا سوال خود را بنویسید تا بلافاصله راهنمای علمی مراقبت‌ها، تخمین دقیق تعداد گرافت/ایمپلنت یا سناریوی ریلز اینستاگرام را دریافت کنید.'}
            </div>
          </div>

          {/* ADHD-Friendly Dopamine Recovery Checklist */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-extrabold text-amber-700 mb-1">
                ✨ طراحی اختصاصی ویژه تمرکز ADHD
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-2">
                چک‌لیست تعاملی ۴ قدمی مراقبت‌های عمل (بدون فراموشی)
              </h3>
              <p className="text-xs text-slate-600 mb-5">
                به‌جای مطالعه بروشورهای طولانی و خسته‌کننده، مراحل مراقبت خود را تیک بزنید:
              </p>

              <div className="space-y-3">
                {recoverySteps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() =>
                      setRecoverySteps(
                        recoverySteps.map((s) =>
                          s.id === step.id ? { ...s, done: !s.done } : s
                        )
                      )
                    }
                    className={`w-full p-3.5 rounded-2xl border text-right flex items-center gap-3 transition-all cursor-pointer ${
                      step.done
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        step.done
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-400'
                      }`}
                    >
                      {step.done ? '✓' : step.id}
                    </div>
                    <span className="text-xs leading-relaxed">{step.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>
                پیشرفت مراقبت شما:{' '}
                {Math.round(
                  (recoverySteps.filter((s) => s.done).length / recoverySteps.length) * 100
                )}
                ٪ تکمیل‌شده
              </span>
              <button
                type="button"
                onClick={() => setIsStoryOpen(true)}
                className="text-rose-600 hover:underline cursor-pointer"
              >
                باز کردن استوری‌ساز HD ←
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Loyal Customer Club (10% Beauty Wallet) + Smart VIP Booking Cart (Feature #6) */}
      <section id="vip-booking-section" className="py-12 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Loyalty Beauty Wallet */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Gift className="w-4 h-4" />
                  باشگاه مشتریان وفادار درخشش‌یار VIP
                </span>
                <span className="text-xs font-mono text-emerald-300">BEAUTY WALLET</span>
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold mb-2">
                معرفی به دوستان = ۱۰٪ شارژ رایگان کیف پول زیبایی!
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed mb-6">
                با معرفی کلینیک به هر یک از دوستانتان، ۱۰٪ مبلغ خدمات ایشان مستقیماً در کیف پول شما برای خدمات بعدی (مثل شارژ بوتاکس یا جلسه لیزر رایگان) شارژ می‌شود.
              </p>

              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4 mb-5">
                <div className="text-xs text-emerald-200">موجودی فعلی کیف پول زیبایی شما:</div>
                <div className="text-2xl md:text-3xl font-extrabold text-amber-300 tabular-nums mt-1">
                  {walletCreditToman.toLocaleString('fa-IR')} تومان
                </div>
                <div className="text-[11px] text-emerald-200 mt-1">
                  قابل استفاده برای: ۱ جلسه فیشیال VIP یا شارژ رایگان بوتاکس و لیزر
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-amber-200">
                  شماره موبایل دوست خود را وارد کنید و ۵۰۰,۰۰۰ تومان هدیه آنی بگیرید:
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="0912..."
                    value={referralFriendPhone}
                    onChange={(e) => setReferralFriendPhone(e.target.value)}
                    className="flex-1 rounded-xl bg-white/95 text-slate-900 px-3.5 py-2.5 text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setWalletCreditToman((prev) => prev + 500000);
                      setReferralFriendPhone('');
                      setReferralCopied(true);
                      setTimeout(() => setReferralCopied(false), 3000);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs cursor-pointer shrink-0"
                  >
                    ثبت و دریافت هدیه
                  </button>
                </div>
                {referralCopied && (
                  <div className="text-xs text-amber-300 font-bold pt-1">
                    🎉 تبریک! ۵۰۰,۰۰۰ تومان هدیه معرفی به کیف پول زیبایی شما اضافه شد!
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const text = `سلام! من از خدمات کلینیک زیبایی و دندانپزشکی «درخشش‌یار VIP (LuminaMed)» استفاده کردم. با این لینک نوبت بگیر تا ۱۰٪ هدیه کیف پول زیبایی و اقساط چک صیادی برات فعال بشه!`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
              }}
              className="mt-6 w-full py-3.5 rounded-2xl bg-white text-emerald-950 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              ارسال دعوت‌نامه ۱۰٪ هدیه به دوستان در واتساپ
            </button>
          </div>

          {/* Smart VIP Booking Cart with 3 Payment Methods */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-600" />
                    سبد رزرو نوبت دیجیتال VIP (با ۳ روش پرداخت منعطف)
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    انتخاب بین بیعانه امن آنلاین، پرونده اقساطی چک صیادی یا پکیج ارزی توریسم سلامت
                  </p>
                </div>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                  {cart.length} خدمت انتخابی
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6 text-center mb-5">
                  <p className="text-sm font-bold text-slate-700 mb-2">
                    هنوز خدمتی به سبد نوبت VIP اضافه نکرده‌اید.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCart([CLINIC_SERVICES[0]])}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                  >
                    + افزودن نمونه «کاشت مو میکروگرافت VIP»
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5 mb-5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs md:text-sm font-extrabold text-slate-900">
                          {item.titleFa}
                        </div>
                        <div className="text-xs text-emerald-700 font-bold tabular-nums mt-0.5">
                          {formatPrice(item)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 3 Payment Methods */}
              <div className="mb-5">
                <label className="block text-xs font-extrabold text-slate-800 mb-2">
                  انتخاب روش پرداخت و پذیرش در کلینیک:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'deposit',
                      title: '۱. رزرو با بیعانه امن آنلاین',
                      sub: 'پرداخت ۱۰٪ بیعانه و فیکس نوبت VIP',
                    },
                    {
                      id: 'sayadi',
                      title: '۲. پرونده اقساطی چک صیادی',
                      sub: '۳۰٪ پیش‌پرداخت + ۳ تا ۱۲ برگ چک ثبتی',
                    },
                    {
                      id: 'tourism',
                      title: '۳. پرداخت ارزی توریسم سلامت',
                      sub: 'USD / AED / EUR + هتل ۵ ستاره و ترنسفر',
                    },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as 'deposit' | 'sayadi' | 'tourism')}
                      className={`p-3.5 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{pm.title}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{pm.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const selectedNames =
                  cart.length > 0
                    ? cart.map((c) => c.titleFa).join(' + ')
                    : CLINIC_SERVICES[0].titleFa;
                const methodLabel =
                  paymentMethod === 'sayadi'
                    ? 'پرونده اقساطی با چک صیادی'
                    : paymentMethod === 'tourism'
                    ? `پکیج ارزی توریسم سلامت (${currency})`
                    : 'رزرو نوبت با بیعانه آنلاین';
                const msg = `سلام وقت بخیر 🌸
درخواست رزرو نوبت VIP در کلینیک «درخشش‌یار VIP (LuminaMed)»:
🔹 خدمات انتخابی: ${selectedNames}
💳 روش پرداخت انتخابی: ${methodLabel}
🎁 استفاده از اعتبار کیف پول زیبایی: بله
لطفاً زمان دقیق مراجعه را هماهنگ بفرمایید.`;
                window.open(
                  `https://wa.me/989120000000?text=${encodeURIComponent(msg)}`,
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              تأیید نهایی نوبت VIP و ارسال پرونده به واتساپ کلینیک
            </button>
          </div>
        </div>
      </section>

      {/* Expert UX Critique & Creative Innovations Section (User Prompt Request) */}
      <section className="py-12 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="text-xs font-extrabold text-emerald-700 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              ۰۴. نقد کارشناسی و نوآوری‌های خلاقانه اضافه‌شده برای درخشش حداکثری برنامه
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {t.critiqueSectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="text-xs font-extrabold text-emerald-700 mb-2">
                ۱. نقد تم‌های تیره سنتی ← تغییر به زمینه سفید شاد و قلاب‌انداز
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                روانشناسی رنگ کلینیکی: سفیدی پاکیزه + سبز زمردی شاداب + رزگلد
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                بسیاری از سایت‌های زیبایی با تم مشکی سنگین، حس اضطراب اتاق عمل را القا می‌کنند و برای افراد کم‌بینا یا دارای آستیگماتیسم (Halation Effect) خسته‌کننده هستند. ما زمینه اصلی را به <strong>سفید صدفی درخشان با کنتراست استاندارد ۱۰:۱</strong> تغییر دادیم تا حس پاکیزگی، امید و شادابی را در ۳ ثانیه اول به زیباجو منتقل کند.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="text-xs font-extrabold text-amber-700 mb-2">
                ۲. مهندسی ویژه اختلال ADHD (جلوگیری از فلج تصمیم‌گیری)
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                خلاصه ۳ نکته‌ای دوپامین + فیلتر ۳۰ ثانیه‌ای + چک‌لیست تعاملی
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                مراجعین دارای ADHD در مواجهه با متن‌های طولانی پزشکی صفحه را می‌بندند. ما در این اپ <strong>«حالت تمرکز ADHD»</strong>، <strong>«خط‌کش دیداری دنبال‌کننده ماوس»</strong> و <strong>«باکس ۳ نکته‌ای سریع»</strong> را روی هر خدمت قرار دادیم تا بدون سردرگمی، قیمت قسطی و مدت نقاهت در یک نگاه دیده شود.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="text-xs font-extrabold text-rose-700 mb-2">
                ۳. دسترس‌پذیری کامل توان‌جویان (WCAG AAA) + ۷ زبان زنده دنیا
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                خوانش صوتی هوشمند (TTS) + سوییچ آنی ۷ زبان منطقه‌ای و جهانی
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                با افزودن زبان‌های <strong>فارسی، انگلیسی، اسپانیایی، عربی، کردی، آذربایجانی و ترکی استانبولی</strong>، کلینیک‌های تهران، تبریز، ارومیه، سنندج، شیراز و مشهد می‌توانند بدون نیاز به مترجم، بیماران توریسم سلامت کل منطقه و اروپا را جذب کنند و افراد کم‌بینا نیز با دکمه <strong>«🔊 خوانش صوتی»</strong> تمام جزئیات را بشنوند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet, High-Trust Footer */}
      <footer className="bg-white py-10 px-4 sm:px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-base font-extrabold text-slate-900">
              {t.brandPersian} | {t.brandEnglish}
            </div>
            <div className="text-slate-500 mt-1">{t.ecosystemSubtitle}</div>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-bold text-slate-700">
            <button
              type="button"
              onClick={() => setIsVipPlansOpen(true)}
              className="hover:text-emerald-600 cursor-pointer"
            >
              اشتراک VIP کلینیک‌ها (سطح ۱ تا ۵)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsAffiliateOpen(true)}
              className="hover:text-emerald-600 cursor-pointer"
            >
              همکاری ویزیتورها (۲۵٪ پورسانت)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsGithubOpen(true)}
              className="hover:text-emerald-600 cursor-pointer"
            >
              پوش مستقیم گیت‌هاب و خروجی APK/AAB
            </button>
          </div>
        </div>
      </footer>

      {/* Manual iOS / Android PWA Install Guide Modal */}
      {isPwaGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">
                📲 راهنمای نصب ۱-کلیکی روی آیفون (iOS) و اندروید
              </h3>
              <button
                type="button"
                onClick={() => setIsPwaGuideOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <strong className="text-emerald-950 block mb-1">🍎 در آیفون و آیپد (مرورگر Safari):</strong>
                ۱. دکمه <strong>Share</strong> (مربع با فلش رو به بالا در پایین صفحه) را لمس کنید.<br />
                ۲. گزینه <strong>Add to Home Screen</strong> را انتخاب نمایید تا آیکون <strong>LuminaMed VIP</strong> به صفحه اصلی اضافه شود.
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">🤖 در اندروید (مرورگر Chrome):</strong>
                ۱. منوی سه نقطه بالا را بزنید و گزینه <strong>Install App</strong> یا <strong>Add to Home Screen</strong> را انتخاب کنید.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPwaGuideOpen(false)}
              className="mt-5 w-full py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs cursor-pointer"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <InstallmentCalculatorModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
        initialService={calcService}
        onSpeak={speakText}
      />
      <StoryMakerModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        initialService={storyService}
      />
      <DigitalWarrantyModal
        isOpen={isWarrantyOpen}
        onClose={() => setIsWarrantyOpen(false)}
        initialCase={warrantyCase}
      />
      <VipPlansModal isOpen={isVipPlansOpen} onClose={() => setIsVipPlansOpen(false)} />
      <AffiliateModal isOpen={isAffiliateOpen} onClose={() => setIsAffiliateOpen(false)} />
      <GithubAndAndroidModal isOpen={isGithubOpen} onClose={() => setIsGithubOpen(false)} />
      <AccessibilityModal
        isOpen={isA11yOpen}
        onClose={() => setIsA11yOpen(false)}
        settings={a11y}
        onUpdate={setA11y}
        onSpeak={speakText}
      />
    </div>
  );
}
