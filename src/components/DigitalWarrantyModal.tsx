import React, { useEffect, useRef, useState } from 'react';
import { QrCode, Download, X, CheckCircle2 } from 'lucide-react';
import { BeforeAfterCase, BEFORE_AFTER_CASES } from '../data/clinicData';
import { renderWarrantyCardToCanvas } from '../utils/canvasGenerators';

interface DigitalWarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCase?: BeforeAfterCase | null;
}

export const DigitalWarrantyModal: React.FC<DigitalWarrantyModalProps> = ({
  isOpen,
  onClose,
  initialCase,
}) => {
  const [holderName, setHolderName] = useState(
    initialCase?.patientProfileFa || 'سرکار خانم / جناب آقای زیباجوی گرامی'
  );
  const [nationalId, setNationalId] = useState('001-994821-VIP');
  const [serviceName, setServiceName] = useState(
    initialCase?.titleFa || 'کاشت موی فوق‌پرتراکم میکروگرافت / ایمپلنت سوئیسی'
  );
  const [brandMaterial, setBrandMaterial] = useState(
    initialCase?.brandUsed || 'Straumann Switzerland / Juvederm France (Original Lot)'
  );
  const [warrantySerial, setWarrantySerial] = useState(
    initialCase?.warrantySerial || 'LM-VIP-2026-99481'
  );
  const [downloaded, setDownloaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (initialCase) {
      setHolderName(initialCase.patientProfileFa);
      setServiceName(initialCase.titleFa);
      setBrandMaterial(initialCase.brandUsed);
      setWarrantySerial(initialCase.warrantySerial);
    }
  }, [initialCase]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderWarrantyCardToCanvas(canvas, {
      patientName: holderName,
      nationalIdOrPassport: nationalId,
      serviceTitle: serviceName,
      materialBrand: brandMaterial,
      serialCode: warrantySerial,
      issueDate: '1405/07/05 • 2026-09-27',
      warrantyDuration: 'ضمانت‌نامه کتبی و دیجیتال مادام‌العمر اصالت و رویش',
      clinicName: 'کلینیک تخصصی زیبایی و دندانپزشکی درخشش‌یار VIP',
    });
  }, [isOpen, holderName, nationalId, serviceName, brandMaterial, warrantySerial]);

  if (!isOpen) return null;

  const handleDownloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Warranty-Card-${warrantySerial}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="کارت ضمانت‌نامه دیجیتال خدمات کلینیک با QR Code"
    >
      <div className="bg-white border-2 border-emerald-500 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-emerald-600" />
              صدور آنی کارت ضمانت‌نامه دیجیتال خدمات کلینیک (با QR Code اصالت)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              تضمین کتبی رویش گرافت‌های کاشت مو، اصالت ایمپلنت سوئیسی و هولوگرام فیلرهای مصرفی کلینیک
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              نام و مشخصات صاحب ضمانت‌نامه:
            </label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              نوع خدمت / عمل انجام‌شده:
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              برند متریال و سریال وزارت بهداشت:
            </label>
            <input
              type="text"
              value={brandMaterial}
              onChange={(e) => setBrandMaterial(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              شماره سریال گارانتی (QR Serial) و کد ملی/پاسپورت:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                dir="ltr"
                value={warrantySerial}
                onChange={(e) => setWarrantySerial(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono text-slate-900"
              />
              <button
                type="button"
                onClick={() => {
                  const randomCase =
                    BEFORE_AFTER_CASES[Math.floor(Math.random() * BEFORE_AFTER_CASES.length)];
                  setWarrantySerial(`LM-VIP-${Math.floor(10000 + Math.random() * 90000)}`);
                  setBrandMaterial(randomCase.brandUsed);
                  setNationalId(`PASS-${Math.floor(100000 + Math.random() * 900000)}`);
                }}
                className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold whitespace-nowrap hover:bg-emerald-200 cursor-pointer"
              >
                تولید کد جدید
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg bg-slate-50 mb-6">
          <canvas ref={canvasRef} className="w-full h-auto block" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleDownloadCard}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 text-sm shadow-lg transition-all cursor-pointer"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                کارت ضمانت‌نامه دیجیتال با QR Code دانلود شد!
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                دانلود کارت ضمانت‌نامه دیجیتال (PNG با کیفیت چاپ)
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
