import React, { useState } from 'react';
import {
  Crown,
  Users,
  Copy,
  CheckCircle2,
  X,
  Github,
  Smartphone,
  Eye,
  Brain,
  Volume2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { VIP_PLANS } from '../data/clinicData';

interface VipPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipPlansModal: React.FC<VipPlansModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOrderPlan = (planTitle: string, price: number) => {
    const msg = `سلام وقت بخیر 🌸
درخواست فعال‌سازی «${planTitle}» در سامانه درخشش‌یار VIP (LuminaMed VIP) به مبلغ ${price.toLocaleString('fa-IR')} تومان جهت کلینیک زیبایی / مطب دندانپزشکی.`;
    window.open(`https://wa.me/989120000000?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-6xl w-full p-6 md:p-8 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-500" />
              اشتراک VIP کلینیک‌های زیبایی، کاشت مو و دندانپزشکی (سطوح VIP 1 تا VIP 5)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              فعالسازی فوری سامانه هوشمند با نام، لوگو، شماره واتساپ و خروجی اپلیکیشن اختصاصی کلینیک شما
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIP_PLANS.map((plan) => (
            <div
              key={plan.level}
              className={`rounded-2xl p-5 border-2 flex flex-col justify-between transition-all ${
                plan.level === 3 || plan.level === 5
                  ? 'border-emerald-500 bg-gradient-to-b from-emerald-50/70 to-white shadow-lg'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700 mb-2">
                  <span>{plan.badgeFa}</span>
                  <span className="font-mono">VIP {plan.level}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  {plan.titleFa}
                </h3>
                <div className="text-2xl font-extrabold text-emerald-700 tabular-nums my-3">
                  {plan.priceToman.toLocaleString('fa-IR')}{' '}
                  <span className="text-xs font-bold text-slate-500">تومان / {plan.durationFa}</span>
                </div>
                <div className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 mb-4">
                  💰 پورسانت ویزیتور / بازاریاب (۲۵٪):{' '}
                  {plan.commissionToman.toLocaleString('fa-IR')} تومان
                </div>
                <ul className="space-y-2 text-xs text-slate-700 mb-5">
                  {plan.featuresFa.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleOrderPlan(plan.titleFa, plan.priceToman)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                سفارش و فعال‌سازی آنی {plan.durationFa}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({ isOpen, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(4);
  const [salesPerMonth, setSalesPerMonth] = useState<number>(4);
  const [marketerName, setMarketerName] = useState('');
  const [marketerPhone, setMarketerPhone] = useState('');
  const [generatedCode, setGeneratedCode] = useState('VIP-REP-8842');
  const [copiedScript, setCopiedScript] = useState(false);

  if (!isOpen) return null;

  const activePlan = VIP_PLANS.find((p) => p.level === selectedLevel) || VIP_PLANS[3];
  const monthlyIncomeToman = activePlan.commissionToman * salesPerMonth;

  const negotiationScript = `سلام جناب دکتر / مدیریت محترم کلینیک زیبایی 🌸
ما سامانه جامع هوشمند «درخشش‌یار VIP (LuminaMed VIP)» را ویژه کلینیک شما آماده کرده‌ایم که با لوگوی اختصاصی خودتان روی گوشی مراجعین (آیفون و اندروید) نصب می‌شود:
۱. ماشین‌حساب هوشمند اقساط با چک صیادی دارد که فروش پکیج‌های کاشت مو، ایمپلنت و لمینت شما را تا ۲ برابر افزایش می‌دهد.
۲. دکمه ۱-کلیکی «توریسم سلامت (USD / AED / EUR)» به ۷ زبان زنده دنیا (عربی، انگلیسی، ترکی، کردی، اسپانیایی و...) برای جذب بیماران دلاری از عمان، عراق و امارات دارد.
۳. استوری‌ساز ۱-کلیکی تخفیف روزانه + صدور کارت ضمانت‌نامه دیجیتال با QR Code برای اصالت ژل و ایمپلنت دارد.
با کد نمایندگی بنده (${generatedCode}) می‌توانید همین امروز نسخه اختصاصی کلینیک خودتان را با تخفیف ویژه فعال کنید!`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(negotiationScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-5xl w-full p-6 md:p-8 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-600" />
              باشگاه ویزیتورهای پورسانتی (۲۵٪ پورسانت نقدی) و سفارش اختصاصی White-Label
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              فروش نسخه اختصاصی با نام و لوگوی هر کلینیک زیبایی یا مطب دندانپزشکی با تسویه آنی ۲۵٪ پورسانت
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <h3 className="text-base font-extrabold text-emerald-950 mb-3">
                📊 ماشین‌حساب درآمد ماهانه بازاریاب (۲۵٪ پورسانت):
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    انتخاب سطح اشتراک پیشنهادی به کلینیک:
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-900"
                  >
                    {VIP_PLANS.map((p) => (
                      <option key={p.level} value={p.level}>
                        {p.titleFa} — پورسانت شما: {p.commissionToman.toLocaleString('fa-IR')} تومان
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                    <span>تعداد کلینیک / مطب جذب‌شده در ماه:</span>
                    <span className="text-emerald-700 font-extrabold">{salesPerMonth} کلینیک در ماه</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={salesPerMonth}
                    onChange={(e) => setSalesPerMonth(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-emerald-500 text-center">
                  <div className="text-xs font-bold text-slate-500">
                    درآمد خالص ماهانه شما (۲۵٪ پورسانت نقدی):
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold text-emerald-700 tabular-nums mt-1">
                    {monthlyIncomeToman.toLocaleString('fa-IR')} تومان
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                🪪 صدور آنی کد نمایندگی فروش و سفارش White-Label:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی بازاریاب / مدیر"
                  value={marketerName}
                  onChange={(e) => setMarketerName(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm"
                />
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="0912..."
                  value={marketerPhone}
                  onChange={(e) => setMarketerPhone(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-mono"
                />
              </div>
              <div className="flex items-center justify-between bg-white border border-emerald-300 rounded-xl p-3">
                <span className="text-xs font-bold text-slate-600">کد اختصاصی نمایندگی شما:</span>
                <span className="font-mono font-extrabold text-base text-emerald-700">
                  {generatedCode}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setGeneratedCode(`VIP-REP-${Math.floor(1000 + Math.random() * 9000)}`)
                  }
                  className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold cursor-pointer"
                >
                  ساخت کد جدید
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
              <h3 className="text-sm font-extrabold text-amber-950 mb-2">
                🗣️ متن آماده مذاکره حضوری و تلفنی با مدیران کلینیک‌های زیبایی و دندانپزشکان:
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-amber-200">
                {negotiationScript}
              </p>
              <button
                type="button"
                onClick={handleCopyScript}
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs transition-colors cursor-pointer"
              >
                {copiedScript ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    متن مذاکره کپی شد! آماده ارسال در واتساپ یا ارائه حضوری
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    کپی ۱-کلیکی متن مذاکره حرفه‌ای با مدیر کلینیک
                  </>
                )}
              </button>
            </div>

            <div className="bg-emerald-950 text-white rounded-2xl p-5">
              <h4 className="text-sm font-extrabold text-amber-300 mb-1">
                ✨ سفارش اختصاصی White-Label (با نام و لوگوی کلینیک شما)
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed mb-3">
                تحویل ۲۴ ساعته وب‌اپلیکیشن PWA + خروجی اندروید APK/AAB با دامنه اختصاصی، رنگ‌بندی دلخواه و لیست خدمات کلینیک یا مطب شما.
              </p>
              <button
                type="button"
                onClick={() => {
                  const msg = `سلام، درخواست ثبت کد نمایندگی (${generatedCode}) / سفارش نسخه اختصاصی White-Label کلینیک زیبایی را دارم. نام: ${marketerName || '-'} تلفن: ${marketerPhone || '-'}`;
                  window.open(`https://wa.me/989120000000?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs cursor-pointer"
              >
                ثبت نهایی نمایندگی / سفارش White-Label در واتساپ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GithubAndAndroidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubAndAndroidModal: React.FC<GithubAndAndroidModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('luminamed-vip-clinic');
  const [token, setToken] = useState('');
  const [branch, setBranch] = useState('main');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    repoUrl?: string;
    actionsUrl?: string;
  } | null>(null);
  const [copiedRepoName, setCopiedRepoName] = useState(false);

  if (!isOpen) return null;

  const handleDirectPush = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/github/direct-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, owner, repo, branch }),
      });
      const data = await response.json();
      setResult(data);
    } catch (_err) {
      setResult({
        ok: false,
        message: 'خطا در برقراری ارتباط با سرور پوش گیت‌هاب.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Github className="w-6 h-6 text-slate-900" />
              موتور پوش مستقیم ۱-کلیکی گیت‌هاب + بیلد خودکار اندروید (APK و AAB)
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              پروژه کامل <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">/android</code> (با Gradle 8.5 و پکیج <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">com.clinicyar.vip</code>) و ورک‌فلو بدون پوشه <code className="font-mono">.github</code> در ریشه آماده است.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Repo Name Banner */}
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-emerald-900">
              🌟 نام خارجی پیشنهادی برای ساخت ریپازیتوری (Repository Name):
            </div>
            <div className="text-lg font-mono font-extrabold text-emerald-700 mt-0.5">
              luminamed-vip-clinic
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText('luminamed-vip-clinic');
              setCopiedRepoName(true);
              setTimeout(() => setCopiedRepoName(false), 2500);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Copy className="w-4 h-4" />
            {copiedRepoName ? 'کپی شد!' : 'کپی نام ریپازیتوری'}
          </button>
        </div>

        <form onSubmit={handleDirectPush} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                نام کاربری گیت‌هاب (GitHub Owner):
              </label>
              <input
                type="text"
                dir="ltr"
                required
                placeholder="e.g. siavashhamiri"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                نام ریپازیتوری (Repository Name):
              </label>
              <input
                type="text"
                dir="ltr"
                required
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                توکن دسترسی گیت‌هاب (Personal Access Token - با دسترسی repo و workflow):
              </label>
              <input
                type="password"
                dir="ltr"
                required
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شاخه (Branch):
              </label>
              <input
                type="text"
                dir="ltr"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
          >
            <Smartphone className="w-5 h-5 text-emerald-400" />
            {loading
              ? 'در حال ارسال سورس کامل و فعال‌سازی GitHub Actions...'
              : 'پوش مستقیم ۱-کلیکی به گیت‌هاب و استارت ساخت خودکار APK و AAB'}
          </button>
        </form>

        {result && (
          <div
            className={`mt-4 p-4 rounded-2xl border text-xs font-bold ${
              result.ok
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <p>{result.message}</p>
            {result.ok && result.actionsUrl && (
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={result.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white"
                >
                  مشاهده مخزن گیت‌هاب <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={result.actionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white"
                >
                  دانلود APK و AAB از تب Actions <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export interface AccessibilitySettings {
  adhdFocusMode: boolean;
  bionicReading: boolean;
  readingRuler: boolean;
  fontScale: 'normal' | 'lg' | 'xl';
  wideSpacing: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdate: (newSettings: AccessibilitySettings) => void;
  onSpeak: (text: string) => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdate,
  onSpeak,
}) => {
  if (!isOpen) return null;

  const toggle = (key: keyof AccessibilitySettings) => {
    onUpdate({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="پنل دسترس‌پذیری معلولان و تمرکز ADHD"
    >
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Brain className="w-6 h-6 text-emerald-600" />
              مرکز دسترس‌پذیری توان‌جویان (WCAG AAA) و تمرکز ویژه ADHD
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              شخصی‌سازی محیط بصری، خوانایی فونت، خط‌کش تمرکز دیداری و خوانش صوتی برای تجربه‌ای آرام و بدون خستگی ذهنی
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Font Scale */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs font-extrabold text-slate-800 mb-2">
              🔎 اندازه و درشتی فونت‌ها (ویژه کم‌بینایان و خوانایی آسان):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: '۱۰۰٪ استاندارد' },
                { id: 'lg', label: '۱۱۲٪ درشت و خوانا' },
                { id: 'xl', label: '۱۲۵٪ فوق‌درشت' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onUpdate({
                      ...settings,
                      fontScale: item.id as AccessibilitySettings['fontScale'],
                    })
                  }
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    settings.fontScale === item.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle switches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toggle('adhdFocusMode')}
              className={`p-4 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                settings.adhdFocusMode
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-extrabold text-sm flex items-center justify-between">
                <span>🎯 حالت تمرکز عمیق ADHD</span>
                <span>{settings.adhdFocusMode ? 'فعال ✅' : 'غیرفعال'}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                حذف المان‌های شلوغ و نمایش خلاصه ۳ نکته‌ای دوپامین روی کارت‌ها
              </p>
            </button>

            <button
              type="button"
              onClick={() => toggle('readingRuler')}
              className={`p-4 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                settings.readingRuler
                  ? 'bg-amber-50 border-amber-500 text-amber-950'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-extrabold text-sm flex items-center justify-between">
                <span>📏 خط‌کش تمرکز دیداری</span>
                <span>{settings.readingRuler ? 'فعال ✅' : 'غیرفعال'}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                نوار راهنمای افقی دنبال‌کننده ماوس برای جلوگیری از پرش چشم در مطالعه
              </p>
            </button>

            <button
              type="button"
              onClick={() => toggle('wideSpacing')}
              className={`p-4 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                settings.wideSpacing
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-extrabold text-sm flex items-center justify-between">
                <span>↔️ فاصله باز کلمات و خطوط</span>
                <span>{settings.wideSpacing ? 'فعال ✅' : 'غیرفعال'}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                افزایش فاصله حروف و خطوط ویژه خوانش بدون خستگی (Dyslexia Friendly)
              </p>
            </button>

            <button
              type="button"
              onClick={() => toggle('reducedMotion')}
              className={`p-4 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                settings.reducedMotion
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-extrabold text-sm flex items-center justify-between">
                <span>🛑 توقف کامل انیمیشن‌ها</span>
                <span>{settings.reducedMotion ? 'فعال ✅' : 'غیرفعال'}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                حذف حرکات تصویر برای افراد دارای حساسیت وستیبولار و حواس‌پرتی
              </p>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
              <Eye className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>موتور خوانش صوتی هوشمند (ویژه نابینایان و کم‌بینایان) روی تمام کارت‌ها فعال است.</span>
            </div>
            <button
              type="button"
              onClick={() =>
                onSpeak(
                  'به سامانه هوشمند درخشش‌یار وی آی پی خوش آمدید. حالت دسترس‌پذیری ویژه توان‌جویان و تمرکز ای دی اچ دی فعال است.'
                )
              }
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              تست خوانش صوتی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
