import React, { useEffect, useRef, useState } from 'react';
import { Download, Sparkles, X, CheckCircle2, Instagram, Phone } from 'lucide-react';
import { CLINIC_SERVICES, ClinicServiceItem } from '../data/clinicData';
import { renderStoryToCanvas } from '../utils/canvasGenerators';

interface StoryMakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ClinicServiceItem | null;
}

export const StoryMakerModal: React.FC<StoryMakerModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [storyMode, setStoryMode] = useState<'flash' | 'installment'>('installment');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || CLINIC_SERVICES[0].id
  );
  const [clinicName, setClinicName] = useState('کلینیک زیبایی و دندانپزشکی درخشش‌یار VIP');
  const [doctorName, setDoctorName] = useState('تحت نظر تیم فوق‌تخصصی پوست، مو، لیزر و دندانپزشکی زیبایی');
  const [clinicPhone, setClinicPhone] = useState('0912-000-0000');
  const [instagramId, setInstagramId] = useState('@LuminaMed.VIP');
  const [downloaded, setDownloaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id);
    }
  }, [initialService]);

  const activeService =
    CLINIC_SERVICES.find((s) => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  const downPaymentToman = Math.round(activeService.priceToman * 0.3);
  const remainingToman = activeService.priceToman - downPaymentToman;
  const monthlyCheckToman = Math.round(remainingToman / 6);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderStoryToCanvas(canvas, {
      mode: storyMode,
      clinicName,
      doctorName,
      phone: clinicPhone,
      instagramHandle: instagramId,
      serviceTitle: activeService.titleFa,
      cashPriceText: `${activeService.priceToman.toLocaleString('fa-IR')} تومان`,
      monthlyInstallmentText: `ماهیانه ${monthlyCheckToman.toLocaleString('fa-IR')} تومان (چک صیادی)`,
      discountPercent: activeService.discountPercent,
      materialBrand: activeService.materialBrand,
    });
  }, [isOpen, storyMode, activeService, clinicName, doctorName, clinicPhone, instagramId, monthlyCheckToman]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `LuminaMed-Story-${storyMode}-${activeService.id}.png`;
    link.href = dataUrl;
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="استوری‌ساز ۱ کلیکی کلینیک زیبایی"
    >
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-5xl w-full p-6 md:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              استوری‌ساز ۱-کلیکی کلینیک زیبایی و پزشکان (HTML5 Canvas HD 1080×1920)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              تولید و دانلود فوری پوستر استوری اینستاگرام در ۲ حالت «جشنواره تخفیف امروز» و «پکیج اقساطی چک صیادی»
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                ۱. انتخاب حالت پوستر استوری:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStoryMode('installment')}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                    storyMode === 'installment'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm">💎 ب) پوستر معرفی پکیج زیبایی / اقساطی</div>
                  <div className="text-xs text-slate-500 mt-1">
                    نمایش قیمت نقدی + مبلغ هر برگ چک صیادی ماهانه + QR
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setStoryMode('flash')}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                    storyMode === 'flash'
                      ? 'bg-rose-50 border-rose-600 text-rose-950 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm">🔥 الف) پوستر جشنواره تخفیف ویژه امروز</div>
                  <div className="text-xs text-slate-500 mt-1">
                    نمایش درصد تخفیف لحظه‌ای + هدیه ۱۰٪ کیف پول زیبایی
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                ۲. انتخاب خدمت یا پکیج تخصصی کلینیک:
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-900 focus:border-emerald-600"
              >
                {CLINIC_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.titleFa} — ({srv.priceToman.toLocaleString('fa-IR')} تومان)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نام کلینیک یا مطب پزشک روی پوستر:
                </label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شماره تلفن نوبت‌دهی کلینیک:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    dir="ltr"
                    value={clinicPhone}
                    onChange={(e) => setClinicPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3.5 py-2.5 text-sm font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  آیدی پیج اینستاگرام کلینیک:
                </label>
                <div className="relative">
                  <Instagram className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    dir="ltr"
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3.5 py-2.5 text-sm font-mono text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  زیرعنوان تخصص پزشک / تیم پزشکی:
                </label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 text-base shadow-lg transition-all cursor-pointer"
              >
                {downloaded ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    پوستر استوری با کیفیت ۱۰۸۰×۱۹۲۰ HD دانلود شد!
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    دانلود فوری پوستر استوری ۱۰۸۰×۱۹۲۰ (PNG HD)
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="text-xs font-bold text-slate-500 mb-2">
              پیش‌نمایش زنده بوم استوری (ابعاد واقعی ۱۰۸۰×۱۹۲۰ پیکسل):
            </div>
            <div className="w-64 sm:w-72 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-xl bg-slate-50">
              <canvas ref={canvasRef} className="w-full h-auto block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
