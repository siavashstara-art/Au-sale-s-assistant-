import React, { useEffect, useState } from 'react';
import { Calculator, MessageCircle, Volume2, X, ShieldCheck } from 'lucide-react';
import { CLINIC_SERVICES, ClinicServiceItem } from '../data/clinicData';

interface InstallmentCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ClinicServiceItem | null;
  onSpeak: (text: string) => void;
}

export const InstallmentCalculatorModal: React.FC<InstallmentCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialService,
  onSpeak,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || CLINIC_SERVICES[2].id
  );
  const [customAmountToman, setCustomAmountToman] = useState<number | null>(null);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [months, setMonths] = useState<number>(6);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [sayadiStatus, setSayadiStatus] = useState<'white' | 'yellow'>('white');

  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id);
      setCustomAmountToman(null);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const activeService =
    CLINIC_SERVICES.find((s) => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  const totalAmount = customAmountToman !== null ? customAmountToman : activeService.priceToman;
  const downPaymentAmount = Math.round((totalAmount * downPaymentPercent) / 100);
  const remainingBalance = totalAmount - downPaymentAmount;
  const eachSayadiCheckAmount = Math.round(remainingBalance / months);
  const walletGiftAmount = Math.round(totalAmount * 0.1);

  const handleSendWhatsApp = () => {
    const text = `سلام وقت بخیر 🌸
درخواست تشکیل پرونده اقساطی با چک صیادی در «درخشش‌یار VIP (LuminaMed VIP)»:
👤 نام زیباجو: ${patientName || 'مراجع محترم'}
📞 شماره تماس: ${patientPhone || 'ثبت در واتساپ'}
💎 خدمت انتخابی: ${activeService.titleFa}
💰 مبلغ کل پکیج: ${totalAmount.toLocaleString('fa-IR')} تومان
💵 پیش‌پرداخت (${downPaymentPercent}٪): ${downPaymentAmount.toLocaleString('fa-IR')} تومان
🧾 تعداد اقساط: ${months} فقره چک صیادی بنفش
📌 مبلغ هر برگ چک صیادی: ${eachSayadiCheckAmount.toLocaleString('fa-IR')} تومان
🎁 هدیه کیف پول وفاداری: ${walletGiftAmount.toLocaleString('fa-IR')} تومان
لطفاً نوبت مشاوره و پذیرش VIP را هماهنگ بفرمایید.`;

    const url = `https://wa.me/989120000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSpeakSummary = () => {
    const summary = `محاسبه اقساط چک صیادی برای ${activeService.titleFa}. مبلغ کل: ${totalAmount.toLocaleString('fa-IR')} تومان. پیش‌پرداخت ${downPaymentPercent} درصد معادل ${downPaymentAmount.toLocaleString('fa-IR')} تومان. مبلغ هر برگ چک صیادی در ${months} ماه: ${eachSayadiCheckAmount.toLocaleString('fa-IR')} تومان بدون کارمزد پنهان.`;
    onSpeak(summary);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="ماشین‌حساب هوشمند اقساط با چک صیادی"
    >
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-emerald-600" />
              ماشین‌حساب هوشمند محاسبه اقساط (با چک صیادی بنفش - بدون ضامن)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              خدمت دلخواه، درصد پیش‌پرداخت و تعداد اقساط (۳ تا ۱۲ ماه) را انتخاب کنید تا مبلغ دقیق هر برگ چک صیادی محاسبه شود.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakSummary}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              خوانش صوتی اقساط
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                ۱. انتخاب پکیج یا خدمت تخصصی کلینیک:
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  setCustomAmountToman(null);
                }}
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:border-emerald-600 focus:bg-white"
              >
                {CLINIC_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.titleFa} — {srv.priceToman.toLocaleString('fa-IR')} تومان
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                یا وارد کردن مبلغ دلخواه طرح درمان (تومان):
              </label>
              <input
                type="number"
                dir="ltr"
                placeholder={String(activeService.priceToman)}
                value={customAmountToman !== null ? customAmountToman : ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCustomAmountToman(val > 0 ? val : null);
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-mono text-slate-900"
              />
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-emerald-950">
                  ۲. میزان پیش‌پرداخت نقدی:
                </label>
                <span className="text-base font-extrabold text-emerald-700 tabular-nums">
                  {downPaymentPercent}٪ ({downPaymentAmount.toLocaleString('fa-IR')} تومان)
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2.5 bg-emerald-200 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1 font-medium">
                <span>۲۰٪ (حداقل پیش‌پرداخت)</span>
                <span>۳۰٪ (استاندارد کلینیک)</span>
                <span>۶۰٪</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                ۳. تعداد اقساط ماهانه (تعداد برگ چک صیادی):
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[3, 4, 6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      months === m
                        ? 'bg-emerald-600 text-white shadow-md scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    {m} ماهه
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نام و نام خانوادگی زیباجو:
                </label>
                <input
                  type="text"
                  placeholder="مثلاً: سارا محمدی"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  شماره موبایل (جهت ارسال پرونده):
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="0912..."
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono text-slate-900"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">وضعیت استعلام چک صیادی:</span>
              <button
                type="button"
                onClick={() => setSayadiStatus('white')}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer border ${
                  sayadiStatus === 'white'
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                🟢 وضعیت سفید (تأیید آنی بدون ضامن)
              </button>
              <button
                type="button"
                onClick={() => setSayadiStatus('yellow')}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer border ${
                  sayadiStatus === 'yellow'
                    ? 'bg-amber-100 border-amber-500 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                🟡 وضعیت زرد (بررسی در پذیرش)
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-emerald-50 via-white to-amber-50/60 border-2 border-emerald-400 rounded-3xl p-6 shadow-lg">
            <div>
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3 mb-4">
                <span className="text-xs font-extrabold text-emerald-800">
                  💜 پیش‌نمایش برگ چک صیادی بنفش
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  SAYADI-VIP-2026
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">مبلغ کل پکیج:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {totalAmount.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">پیش‌پرداخت ({downPaymentPercent}٪):</span>
                  <span className="font-bold text-emerald-700 tabular-nums">
                    {downPaymentAmount.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">مانده قابل تقسیط:</span>
                  <span className="font-bold text-slate-800 tabular-nums">
                    {remainingBalance.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <div className="my-4 p-4 rounded-2xl bg-white border-2 border-emerald-500 text-center shadow-sm">
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    مبلغ دقیق هر برگ چک صیادی ({months} فقره ماهانه):
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold text-emerald-700 tabular-nums">
                    {eachSayadiCheckAmount.toLocaleString('fa-IR')}{' '}
                    <span className="text-sm font-bold">تومان</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    مزایای پرونده اقساطی درخشش‌یار VIP:
                  </div>
                  <div>✔️ تحویل آنی کارت ضمانت‌نامه دیجیتال با QR Code</div>
                  <div>
                    ✔️ هدیه {walletGiftAmount.toLocaleString('fa-IR')} تومان شارژ کیف پول وفاداری
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-5 text-sm shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              ارسال مستقیم فرم پرونده اقساطی به واتساپ کلینیک
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
