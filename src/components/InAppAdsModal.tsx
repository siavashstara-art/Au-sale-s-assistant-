import React, { useState } from 'react';
import {
  Megaphone,
  CheckCircle2,
  X,
  Sparkles,
  PlusCircle,
  MessageCircle,
  TrendingUp,
} from 'lucide-react';
import {
  IN_APP_AD_PACKAGES,
  InAppAdPackage,
  SponsoredAdItem,
} from '../data/clinicData';

interface InAppAdsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishAd: (newAd: SponsoredAdItem) => void;
}

export const InAppAdsModal: React.FC<InAppAdsModalProps> = ({
  isOpen,
  onClose,
  onPublishAd,
}) => {
  const [selectedPkg, setSelectedPkg] = useState<InAppAdPackage>(IN_APP_AD_PACKAGES[1]);
  const [category, setCategory] = useState<SponsoredAdItem['category']>('clinic');
  const [advertiserName, setAdvertiserName] = useState('');
  const [cityFa, setCityFa] = useState('تهران / مشهد / شیراز');
  const [offerTitleFa, setOfferTitleFa] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [priceTextFa, setPriceTextFa] = useState('۳۰٪ پیش‌پرداخت + اقساط ۶ ماهه با چک صیادی');
  const [phone, setPhone] = useState('09120000000');
  const [instagram, setInstagram] = useState('@LuminaMed.VIP');
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  if (!isOpen) return null;

  const categoryLabels: Record<SponsoredAdItem['category'], string> = {
    clinic: 'کلینیک زیبایی، کاشت مو و دندانپزشکی',
    salon_facial: 'مرکز لیزر، فیشیال تخصصی و سالن زیبایی',
    tourism: 'پکیج توریسم سلامت (۸ زبانه بین‌المللی)',
    supplier_b2b: 'تامین‌کننده ژل، ایمپلنت و دستگاه‌های زیبایی (B2B)',
  };

  const handleInstantPublish = (e: React.FormEvent) => {
    e.preventDefault();
    const newAd: SponsoredAdItem = {
      id: `sp-user-${Date.now()}`,
      category,
      categoryLabelFa: categoryLabels[category],
      advertiserName: advertiserName.trim() || 'کلینیک تخصصی زیبایی و دندانپزشکی شما',
      cityFa: cityFa.trim() || 'سراسر ایران',
      offerTitleFa:
        offerTitleFa.trim() ||
        'جشنواره ویژه خدمات زیبایی، کاشت مو، لمینت و لیزر با ضمانت‌نامه دیجیتال QR',
      discountPercent,
      priceTextFa: priceTextFa.trim() || 'اقساط ویژه با چک صیادی بدون ضامن',
      installmentBadgeFa: selectedPkg.badgeFa,
      phone: phone.trim() || '09120000000',
      instagram: instagram.trim() || '@Clinic.VIP',
      verifiedBadge: 'آگهی ثبت‌شده جدید VIP',
    };

    onPublishAd(newAd);
    setPublishedSuccess(true);
    setTimeout(() => setPublishedSuccess(false), 4000);
  };

  const handleOrderViaWhatsApp = (pkg: InAppAdPackage) => {
    const msg = `سلام وقت بخیر 🌸
درخواست رزرو «تبلیغات درون‌برنامه‌ای اقتصادی درخشش‌یار VIP (LuminaMed)»:
📢 پکیج انتخابی: ${pkg.tierNameFa}
💰 تعرفه اقتصادی: ${pkg.priceToman.toLocaleString('fa-IR')} تومان (${pkg.dailyEquivalentFa})
🏢 نام مجموعه / کلینیک: ${advertiserName || 'کلینیک زیبایی'}
📍 شهر: ${cityFa}
📞 تلفن هماهنگی: ${phone}`;
    window.open(
      `https://wa.me/989120000000?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
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
              <Megaphone className="w-6 h-6 text-emerald-600" />
              تعرفه‌های اقتصادی تبلیغات درون‌برنامه‌ای (ویژه کلینیک‌ها، پزشکان، مراکز لیزر و فعالین زیبایی)
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              نرخ‌گذاری منصفانه، اقتصادی و پربازده (شروع از روزی ۶۱ تا ۲۹۰ هزار تومان) — بازگشت بیش از ۱۰ برابر هزینه تبلیغ تنها با جذب ۱ زیباجو!
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

        {/* 5 Economical Ad Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {IN_APP_AD_PACKAGES.map((pkg) => {
            const isSelected = selectedPkg.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`rounded-2xl p-5 border-2 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-md'
                    : 'border-slate-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900">
                      {pkg.badgeFa}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {pkg.dailyEquivalentFa}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-extrabold text-slate-900 mb-1">
                    {pkg.tierNameFa}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">{pkg.targetAudienceFa}</p>

                  <div className="bg-white border border-emerald-200 rounded-xl p-3 mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-bold">
                        تعرفه کل ({pkg.durationFa}):
                      </div>
                      <div className="text-lg font-extrabold text-emerald-700 tabular-nums">
                        {pkg.priceToman.toLocaleString('fa-IR')} تومان
                      </div>
                    </div>
                    <div className="text-left font-mono text-xs font-extrabold text-slate-600">
                      ${pkg.priceUSD} USD
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>بازدید تضمینی: {pkg.estimatedViewsFa}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                    {pkg.featuresFa.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderViaWhatsApp(pkg);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  رزرو فوری این جایگاه ({pkg.priceToman.toLocaleString('fa-IR')} ت)
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Instant Ad Studio (Test & Publish Live in App) */}
        <div className="bg-slate-50 border-2 border-emerald-500/40 rounded-3xl p-5 md:p-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                فرم ثبت و پیش‌نمایش آنی تبلیغ شما در ویترین صفحه اصلی برنامه
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                مشخصات کلینیک، سالن، مطب یا شرکت تجهیزات خود را وارد کنید تا همین الان کارت تبلیغ شما در صفحه اصلی برنامه منتشر شود:
              </p>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
              پکیج انتخابی: {selectedPkg.tierNameFa}
            </span>
          </div>

          <form onSubmit={handleInstantPublish} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                دسته‌بندی فعالیت شما:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SponsoredAdItem['category'])}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-bold text-slate-900"
              >
                <option value="clinic">کلینیک زیبایی، کاشت مو و دندانپزشکی</option>
                <option value="salon_facial">مرکز لیزر، فیشیال و سالن زیبایی</option>
                <option value="tourism">پکیج توریسم سلامت (۸ زبانه بین‌المللی)</option>
                <option value="supplier_b2b">تامین‌کننده ژل، ایمپلنت و دستگاه لیزر (B2B)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                نام کلینیک / پزشک / سالن / شرکت:
              </label>
              <input
                type="text"
                required
                placeholder="مثلاً: کلینیک زیبایی و لیزر الماس"
                value={advertiserName}
                onChange={(e) => setAdvertiserName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شهر و محدوده پذیرش:
              </label>
              <input
                type="text"
                value={cityFa}
                onChange={(e) => setCityFa(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                عنوان پیشنهاد ویژه / تخفیف / خدمت تبلیغاتی:
              </label>
              <input
                type="text"
                required
                placeholder="مثلاً: ۳۰٪ تخفیف کاشت مو میکروگرافت و لمینت دندان با اقساط چک صیادی"
                value={offerTitleFa}
                onChange={(e) => setOfferTitleFa(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                درصد تخفیف ویژه ({discountPercent}٪):
              </label>
              <input
                type="number"
                min={5}
                max={70}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شرایط قیمت / اقساط:
              </label>
              <input
                type="text"
                value={priceTextFa}
                onChange={(e) => setPriceTextFa(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شماره واتساپ / تماس نوبت‌دهی:
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                آیدی اینستاگرام:
              </label>
              <input
                type="text"
                dir="ltr"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-mono"
              />
            </div>

            <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                ثبت و نمایش آنی آگهی شما در ویترین تبلیغات درون‌برنامه‌ای
              </button>

              {publishedSuccess && (
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl">
                  ✅ آگهی شما با موفقیت در ویترین تبلیغات درون‌برنامه‌ای صفحه اصلی قرار گرفت!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
