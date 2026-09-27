import heroClinicImg from '../assets/images/hero_luxury_clinic_1790530702872.jpg';
import serviceHairImg from '../assets/images/service_hair_transplant_1790530715361.jpg';
import serviceDentalImg from '../assets/images/service_dental_veneers_1790530725736.jpg';
import serviceLaserImg from '../assets/images/service_laser_skincare_1790530736195.jpg';

export type LanguageCode = 'fa' | 'en' | 'es' | 'ar' | 'ku' | 'az' | 'tr';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  voiceLang: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'fa', label: 'فارسی', nativeName: 'فارسی (ایران)', dir: 'rtl', voiceLang: 'fa-IR' },
  { code: 'en', label: 'English', nativeName: 'English (Intl)', dir: 'ltr', voiceLang: 'en-US' },
  { code: 'es', label: 'Español', nativeName: 'Español (ES/LATAM)', dir: 'ltr', voiceLang: 'es-ES' },
  { code: 'ar', label: 'العربية', nativeName: 'العربية (الخليج/العراق)', dir: 'rtl', voiceLang: 'ar-SA' },
  { code: 'ku', label: 'کوردی', nativeName: 'کوردی (سۆرانی)', dir: 'rtl', voiceLang: 'ar-IQ' },
  { code: 'az', label: 'Azərbaycanca', nativeName: 'آذربایجانجا (AZ)', dir: 'ltr', voiceLang: 'tr-TR' },
  { code: 'tr', label: 'Türkçe', nativeName: 'Türkçe (TR)', dir: 'ltr', voiceLang: 'tr-TR' },
];

export interface TranslationStrings {
  brandPersian: string;
  brandEnglish: string;
  ecosystemSubtitle: string;
  heroHookBadge: string;
  heroTitle: string;
  heroDesc: string;
  domesticModeBtn: string;
  tourismModeBtn: string;
  calcModalBtn: string;
  storyModalBtn: string;
  aiModalBtn: string;
  a11yBtn: string;
  pwaInstallBtn: string;
  vipPlansBtn: string;
  affiliateBtn: string;
  githubBtn: string;
  flashDealLabel: string;
  departmentsTitle: string;
  allDepartments: string;
  cashPriceLabel: string;
  monthlyCheckLabel: string;
  tourismPackageLabel: string;
  addToCartBtn: string;
  calcInstallmentBtn: string;
  readAloudBtn: string;
  beforeAfterTitle: string;
  warrantyCardTitle: string;
  quickQuizTitle: string;
  critiqueSectionTitle: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  fa: {
    brandPersian: 'درخشش‌یار VIP (کلینیک‌یار)',
    brandEnglish: 'LuminaMed VIP Clinic',
    ecosystemSubtitle: 'اکوسیستم آفرینش | شهر جدید نیومتاورسیتی جهان | توان استیج FBNM',
    heroHookBadge: 'اولین سامانه دوستدار تمرکز (ADHD) و دسترس‌پذیر ویژه توان‌جویان با ضمانت‌نامه دیجیتال QR',
    heroTitle: 'زیبایی درخشان شما، با اقساط راحت چک صیادی و پکیج‌های VIP توریسم سلامت',
    heroDesc: 'تجربه‌ای شاد، شفاف و بدون استرس از کاشت مو میکروگرافت، دندانپزشکی زیبایی سوئیسی، لیزر الکساندرایت ۲۰۲۶ و جراحی زیبایی؛ همراه با مشاور هوشمند و کارت ضمانت‌نامه کتبی.',
    domesticModeBtn: 'بیماران داخل ایران (تومان + اقساط چک صیادی)',
    tourismModeBtn: 'توریسم سلامت (USD / AED / EUR + هتل ۵ ستاره)',
    calcModalBtn: 'ماشین‌حساب اقساط چک صیادی',
    storyModalBtn: 'استوری‌ساز ۱-کلیکی کلینیک',
    aiModalBtn: 'مشاور هوشمند زیبایی (AI)',
    a11yBtn: 'دسترس‌پذیری و تمرکز ADHD',
    pwaInstallBtn: 'نصب آنی اپلیکیشن (PWA)',
    vipPlansBtn: 'اشتراک VIP کلینیک‌ها',
    affiliateBtn: 'باشگاه ویزیتورها (۲۵٪ پورسانت)',
    githubBtn: 'پوش مستقیم گیت‌هاب و APK',
    flashDealLabel: 'جشنواره تخفیف لحظه‌ای امروز:',
    departmentsTitle: '۷ دپارتمان تخصصی و ۱۰ پکیج طلایی کلینیک',
    allDepartments: 'همه دپارتمان‌ها (۱۰ خدمت)',
    cashPriceLabel: 'سرمایه‌گذاری نقدی:',
    monthlyCheckLabel: 'قسط ماهانه (چک صیادی):',
    tourismPackageLabel: 'پکیج کامل VIP توریسم سلامت:',
    addToCartBtn: 'افزودن به نوبت VIP',
    calcInstallmentBtn: 'محاسبه چک صیادی',
    readAloudBtn: 'خوانش صوتی',
    beforeAfterTitle: 'ویترین قبل و بعد + صدور کارت ضمانت‌نامه دیجیتال با QR Code',
    warrantyCardTitle: 'صدور آنی کارت ضمانت‌نامه دیجیتال کلینیک',
    quickQuizTitle: 'مسیر ۳۰ ثانیه‌ای انتخاب بدون استرس (ویژه تمرکز سریع ADHD)',
    critiqueSectionTitle: 'نقد تخصصی UX و نوآوری‌های خلاقانه اجراشده در «درخشش‌یار VIP»',
  },
  en: {
    brandPersian: 'LuminaMed VIP',
    brandEnglish: 'DarakhshYar Smart Clinic Hub',
    ecosystemSubtitle: 'Creation Ecosystem | New Metaversity World City | Tavan Stage FBNM',
    heroHookBadge: 'ADHD-Friendly & WCAG Accessible Medical Aesthetics & Health Tourism Platform',
    heroTitle: 'Radiant Beauty & Smile Design — Flexible Installments & All-Inclusive VIP Health Tourism',
    heroDesc: 'A joyful, transparent, stress-free journey for Micrograft Hair Transplant, Swiss Dental Implants & Veneers, 2026 Alexandrite Laser, and Cosmetic Surgery with Digital QR Warranty.',
    domesticModeBtn: 'Iran Domestic Patients (Toman + Sayadi Check Plan)',
    tourismModeBtn: 'Intl Medical Tourism (USD / AED / EUR + 5★ Hotel)',
    calcModalBtn: 'Installment Calculator',
    storyModalBtn: '1-Click HD Story Maker',
    aiModalBtn: 'AI Beauty Consultant',
    a11yBtn: 'Accessibility & ADHD Hub',
    pwaInstallBtn: 'Install App (iOS & Android)',
    vipPlansBtn: 'Clinic VIP Plans',
    affiliateBtn: 'Affiliate & White-Label (25%)',
    githubBtn: 'Direct GitHub Push & APK',
    flashDealLabel: 'Live Clinic Flash Deals Today:',
    departmentsTitle: '7 Specialized Departments & 10 Signature Packages',
    allDepartments: 'All Departments (10 Packages)',
    cashPriceLabel: 'Cash Price:',
    monthlyCheckLabel: 'Monthly Installment:',
    tourismPackageLabel: 'All-Inclusive VIP Tourism Package:',
    addToCartBtn: 'Book VIP Slot',
    calcInstallmentBtn: 'Calculate Plan',
    readAloudBtn: 'Listen Aloud',
    beforeAfterTitle: 'Before & After Showcase + Digital QR Warranty Generator',
    warrantyCardTitle: 'Instant Digital QR Warranty Certificate',
    quickQuizTitle: '30-Second Stress-Free Treatment Finder (ADHD-Friendly)',
    critiqueSectionTitle: 'Expert UX Critique & Creative Innovations in LuminaMed VIP',
  },
  es: {
    brandPersian: 'LuminaMed VIP',
    brandEnglish: 'Clínica Estética y Turismo Médico',
    ecosystemSubtitle: 'Ecosistema de Creación | Nueva Ciudad Metaversity | Tavan Stage FBNM',
    heroHookBadge: 'Plataforma Accesible (WCAG) y Adaptada para TDAH con Garantía Digital QR',
    heroTitle: 'Tu Belleza Radiante con Cuotas Flexibles y Paquetes VIP de Turismo Médico',
    heroDesc: 'Experiencia alegre, clara y sin estrés en Injerto Capilar Micrograft, Implantes Suizos, Láser Alexandrita 2026 y Cirugía Estética con hotel 5 estrellas.',
    domesticModeBtn: 'Pacientes Locales (Toman + Cuotas)',
    tourismModeBtn: 'Turismo Médico VIP (USD / EUR + Hotel 5★)',
    calcModalBtn: 'Calculadora de Cuotas',
    storyModalBtn: 'Creador de Stories HD',
    aiModalBtn: 'Consultor IA de Belleza',
    a11yBtn: 'Accesibilidad y Modo TDAH',
    pwaInstallBtn: 'Instalar App (PWA)',
    vipPlansBtn: 'Planes VIP Clínicas',
    affiliateBtn: 'Afiliados White-Label (25%)',
    githubBtn: 'GitHub Push y APK',
    flashDealLabel: 'Ofertas Relámpago de Hoy:',
    departmentsTitle: '7 Departamentos Especializados y 10 Paquetes VIP',
    allDepartments: 'Todos los Departamentos (10)',
    cashPriceLabel: 'Precio al Contado:',
    monthlyCheckLabel: 'Cuota Mensual:',
    tourismPackageLabel: 'Paquete VIP Todo Incluido:',
    addToCartBtn: 'Reservar Cita VIP',
    calcInstallmentBtn: 'Calcular Cuotas',
    readAloudBtn: 'Escuchar Audio',
    beforeAfterTitle: 'Galería Antes y Después + Certificado Digital QR',
    warrantyCardTitle: 'Generador de Garantía Digital QR',
    quickQuizTitle: 'Buscador Rápido en 30 Segundos (Modo Enfoque TDAH)',
    critiqueSectionTitle: 'Crítica Experta UX e Innovaciones Creativas',
  },
  ar: {
    brandPersian: 'لوميناميد VIP (درخشش‌يار)',
    brandEnglish: 'LuminaMed VIP Medical Tourism',
    ecosystemSubtitle: 'منظومة الإبداع | مدينة نيوميتافيرسيتي العالمية | منصة توان FBNM',
    heroHookBadge: 'أول منصة تجميل ذكية مهيأة لذوي الهمم واضطراب فرط الحركة وتشتت الانتباه (ADHD)',
    heroTitle: 'إشراقة جمالك وابتسامتك بأقساط مريحة وباقات السياحة العلاجية الملكية VIP',
    heroDesc: 'زراعة الشعر بتقنية الميكروغرافت، ابتسامة هوليوود وزراعة الأسنان السويسرية، ليزر ألكسندرايت ٢٠٢٦ وجراحات التجميل مع إقامة فندقية ٥ نجوم ومترجم خاص.',
    domesticModeBtn: 'مرضى الداخل (تومان + أقساط شيك صيادي)',
    tourismModeBtn: 'السياحة العلاجية الدولية (USD / AED + فندق ٥ نجوم)',
    calcModalBtn: 'حاسبة الأقساط الذكية',
    storyModalBtn: 'صانع ستوري انستغرام HD',
    aiModalBtn: 'المستشار الذكي للجمال (AI)',
    a11yBtn: 'إمكانية الوصول وتركيز ADHD',
    pwaInstallBtn: 'تثبيت التطبيق الفوري (PWA)',
    vipPlansBtn: 'اشتراكات العيادات VIP',
    affiliateBtn: 'نادي المسوقين (عمولة ٢٥٪)',
    githubBtn: 'رفع مباشر GitHub و APK',
    flashDealLabel: 'عروض العيادة الفورية اليوم:',
    departmentsTitle: '٧ أقسام تخصصية و ١٠ باقات علاجية وتجميلية مضمونة',
    allDepartments: 'جميع الأقسام (١٠ خدمات)',
    cashPriceLabel: 'السعر النقدي:',
    monthlyCheckLabel: 'القسط الشهري:',
    tourismPackageLabel: 'باقة السياحة العلاجية الشاملة VIP:',
    addToCartBtn: 'حجز موعد VIP',
    calcInstallmentBtn: 'حساب الأقساط',
    readAloudBtn: 'قراءة صوتية',
    beforeAfterTitle: 'معرض قبل وبعد + إصدار بطاقة الضمان الرقمية QR',
    warrantyCardTitle: 'إصدار شهادة الضمان الرقمية الفورية',
    quickQuizTitle: 'اختيار الخدمة في ٣٠ ثانية بدون توتر (مخصص لـ ADHD)',
    critiqueSectionTitle: 'النقد الإبداعي والابتكارات المنفذة في المنصة',
  },
  ku: {
    brandPersian: 'درەوشانەوەیار VIP (کلینیک‌یار)',
    brandEnglish: 'LuminaMed VIP Clinic',
    ecosystemSubtitle: 'ئیکۆسیستەمی ئافراندن | شاری نوێی نیۆمێتاڤێرسیتی جیهان | تەوان ستەیج FBNM',
    heroHookBadge: 'یەکەمین سیستەمی جوانکاری گونجاو بۆ خاوەن پێداویستی تایبەت و تەرکیزی ADHD',
    heroTitle: 'جوانی و زەردەخەنەی درەوشاوەت بە قیستی ئاسان و پاکێجی گەشتیاری تەندروستی VIP',
    heroDesc: 'چاندنی قژ و برۆ بە مایکرۆگرافت، ئیمپلانت و هۆڵیوود سمایلی سویسری، لەیزەری ئەلێکساندرایت ٢٠٢٦ لەگەڵ هۆتێلی ٥ ئەستێرە و وەرگێڕی تایبەت.',
    domesticModeBtn: 'نەخۆشانی ناوخۆ (تۆمان + قیستی چەکی سەیادی)',
    tourismModeBtn: 'گەشتیاری تەندروستی (USD / AED + هۆتێلی ٥ ئەستێرە)',
    calcModalBtn: 'ژمێرەری زیرەکی قیستەکان',
    storyModalBtn: 'دروستکەری ستۆری کلینیک',
    aiModalBtn: 'ڕاوێژکاری زیرەکی جوانکاری (AI)',
    a11yBtn: 'دەستڕاگەیشتن و مۆدی ADHD',
    pwaInstallBtn: 'دامەزراندنی ئەپ (PWA)',
    vipPlansBtn: 'بەشداری VIP کلینیکەکان',
    affiliateBtn: 'هاوبەشی فرۆشتن (٢٥٪ پاداشت)',
    githubBtn: 'ناردن بۆ GitHub و APK',
    flashDealLabel: 'داشکاندنی خێرای ئەمڕۆی کلینیک:',
    departmentsTitle: '٧ بەشی پسپۆڕی و ١٠ پاکێجی زێڕینی کلینیک',
    allDepartments: 'هەموو بەشەکان (١٠ خزمەتگوزاری)',
    cashPriceLabel: 'نرخی نەقدی:',
    monthlyCheckLabel: 'قیستی مانگانە:',
    tourismPackageLabel: 'پاکێجی تەواوی گەشتیاری VIP:',
    addToCartBtn: 'تۆمارکردنی نۆرەی VIP',
    calcInstallmentBtn: 'ئەژمارکردنی قیست',
    readAloudBtn: 'خوێندنەوەی دەنگی',
    beforeAfterTitle: 'پێش و پاش نەشتەرگەری + کارتی گەرەنتی دیجیتاڵی QR',
    warrantyCardTitle: 'دەرکردنی کارتی گەرەنتی دیجیتاڵی کلینیک',
    quickQuizTitle: 'هەڵبژاردنی خزمەتگوزاری لە ٣٠ چرکەدا (تایبەت بە ADHD)',
    critiqueSectionTitle: 'ڕەخنەی پسپۆڕانە و داهێنانە نوێیەکانی بەرنامەکە',
  },
  az: {
    brandPersian: 'ParlaqYar VIP (LuminaMed)',
    brandEnglish: 'LuminaMed VIP Estetik & Sağlamlıq Turizmi',
    ecosystemSubtitle: 'Yaradılış Ekosistemi | Yeni Metaversity Dünya Şəhəri | Tavan Stage FBNM',
    heroHookBadge: 'Əlilliyi olan şəxslər və DEHB (ADHD) diqqət rejimi üçün uyğunlaşdırılmış ilk estetik platforma',
    heroTitle: 'Parlaq Gözəlliyiniz və Gülüşünüz — Rahat Hissəli Ödəniş və VIP Tibbi Turizm Paketləri',
    heroDesc: 'Mikroqraft saç əkimi, İsveçrə diş implantları və vinirləri, 2026 Aleksandrit lazer və estetik cərrahiyyə — 5 ulduzlu otel, VIP transfer və rəqəmsal QR zəmanət kartı ilə.',
    domesticModeBtn: 'Daxili Pasiyentlər (Toman + Çeklə Hissəli Ödəniş)',
    tourismModeBtn: 'Beynəlxalq Tibbi Turizm (USD / AZN / EUR + 5★ Otel)',
    calcModalBtn: 'Hissəli Ödəniş Kalkulyatoru',
    storyModalBtn: '1-Kliklə HD Story Yaradıcı',
    aiModalBtn: 'Süni İntellekt (AI) Məsləhətçi',
    a11yBtn: 'Əlçatanlıq və ADHD Rejimi',
    pwaInstallBtn: 'Tətbiqi Quraşdır (PWA)',
    vipPlansBtn: 'Klinikalar üçün VIP Paketlər',
    affiliateBtn: 'Satış Tərəfdaşlığı (25% Komissiya)',
    githubBtn: 'Birbaşa GitHub Push & APK',
    flashDealLabel: 'Bugünkü İldırım Endirimləri:',
    departmentsTitle: '7 İxtisaslaşmış Şöbə və 10 Qızıl Estetik Paket',
    allDepartments: 'Bütün Şöbələr (10 Xidmət)',
    cashPriceLabel: 'Nağd Qiymət:',
    monthlyCheckLabel: 'Aylıq Ödəniş:',
    tourismPackageLabel: 'Hər Şey Daxil VIP Turizm Paketi:',
    addToCartBtn: 'VIP Növbə Seç',
    calcInstallmentBtn: 'Hissəli Hesabla',
    readAloudBtn: 'Səsli Oxu',
    beforeAfterTitle: 'Əvvəl və Sonra Qalereyası + Rəqəmsal QR Zəmanət Kartı',
    warrantyCardTitle: 'Rəqəmsal QR Zəmanət Sertifikatı Yarat',
    quickQuizTitle: '30 Saniyədə Stresssiz Seçim (ADHD Diqqət Köməkçisi)',
    critiqueSectionTitle: 'Peşəkar UX Tənqidi və Yaradıcı Yeniliklər',
  },
  tr: {
    brandPersian: 'IşıltıYar VIP (LuminaMed)',
    brandEnglish: 'LuminaMed VIP Estetik & Sağlık Turizmi',
    ecosystemSubtitle: 'Yaratılış Ekosistemi | Yeni Metaversity Dünya Şehri | Tavan Stage FBNM',
    heroHookBadge: 'Engelli Erişilebilirliği (WCAG) ve DEHB (ADHD) Odak Moduna Sahip İlk Estetik Platformu',
    heroTitle: 'Işıltılı Güzelliğiniz İçin Esnek Taksitler ve 5★ Otelli VIP Sağlık Turizmi Paketleri',
    heroDesc: 'Mikrograft Saç Ekimi, İsviçre İmplant & Gülüş Tasarımı, 2026 Alexandrite Lazer ve Estetik Cerrahide dijital QR garanti kartı ile şeffaf, neşeli ve stressiz deneyim.',
    domesticModeBtn: 'Yurt İçi Hastalar (Toman + Senet/Çek Taksit)',
    tourismModeBtn: 'VIP Sağlık Turizmi (USD / EUR / AED + 5★ Otel)',
    calcModalBtn: 'Akıllı Taksit Hesaplayıcı',
    storyModalBtn: '1-Tıkla Instagram Story Üretici',
    aiModalBtn: 'AI Güzellik Danışmanı',
    a11yBtn: 'Erişilebilirlik & DEHB Modu',
    pwaInstallBtn: 'Uygulamayı Yükle (PWA)',
    vipPlansBtn: 'Klinik VIP Abonelikleri',
    affiliateBtn: 'White-Label & %25 Komisyon Kulübü',
    githubBtn: 'GitHub Push & APK/AAB',
    flashDealLabel: 'Bugünün Canlı Klinik Fırsatları:',
    departmentsTitle: '7 Uzman Departman ve 10 Garantili VIP Paket',
    allDepartments: 'Tüm Departmanlar (10 Hizmet)',
    cashPriceLabel: 'Peşin Fiyat:',
    monthlyCheckLabel: 'Aylık Taksit:',
    tourismPackageLabel: 'Her Şey Dahil VIP Turizm Paketi:',
    addToCartBtn: 'VIP Randevu Ekle',
    calcInstallmentBtn: 'Taksit Hesapla',
    readAloudBtn: 'Sesli Dinle',
    beforeAfterTitle: 'Öncesi & Sonrası Galerisi + Dijital QR Garanti Kartı',
    warrantyCardTitle: 'Dijital QR Garanti Kartı Oluşturucu',
    quickQuizTitle: '30 Saniyede Stressiz Tedavi Bulucu (DEHB Dostu)',
    critiqueSectionTitle: 'Uzman UX Eleştirisi ve Yaratıcı İnovasyonlar',
  },
};

export interface ClinicServiceItem {
  id: string;
  deptId: string;
  deptNameFa: string;
  deptNameEn: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  adhdSummaryFa: [string, string, string];
  adhdSummaryEn: [string, string, string];
  priceToman: number;
  priceUSD: number;
  discountPercent: number;
  materialBrand: string;
  recoveryTimeFa: string;
  recoveryTimeEn: string;
  warrantyDurationFa: string;
  warrantyDurationEn: string;
  imageUrl: string;
  fallbackImage: string;
  goalCategory: 'hair' | 'smile' | 'face' | 'laser' | 'surgery' | 'tourism';
}

export const DEPARTMENTS = [
  { id: 'all', nameFa: 'همه دپارتمان‌ها (۱۰ پکیج)', nameEn: 'All 7 Departments (10)' },
  { id: 'hair', nameFa: '۱. کاشت مو و ابرو میکروگرافت', nameEn: '1. Hair & Eyebrow Transplant' },
  { id: 'dental', nameFa: '۲. دندانپزشکی زیبایی و ایمپلنت', nameEn: '2. Cosmetic Dentistry & Implants' },
  { id: 'injectables', nameFa: '۳. تزریق ژل، فیلر، بوتاکس و نخ', nameEn: '3. Fillers, Botox & Thread Lift' },
  { id: 'laser', nameFa: '۴. لیزر الکساندرایت ۲۰۲۶ و هایفو', nameEn: '4. Alexandrite Laser & HIFU' },
  { id: 'surgery', nameFa: '۵. جراحی زیبایی (بلفارو و رینوپلاستی)', nameEn: '5. Cosmetic Surgery' },
  { id: 'facial', nameFa: '۶. فیشیال VIP و مزوتراپی پوست', nameEn: '6. VIP Facial & Mesotherapy' },
  { id: 'tourism', nameFa: '۷. پکیج‌های توریسم سلامت بین‌المللی', nameEn: '7. Medical Tourism VIP Packages' },
];

export const CLINIC_SERVICES: ClinicServiceItem[] = [
  {
    id: 'hair-micrograft',
    deptId: 'hair',
    deptNameFa: 'دپارتمان کاشت مو و ابرو',
    deptNameEn: 'Hair & Eyebrow Department',
    titleFa: 'کاشت موی فوق‌پرتراکم میکروگرافت و SUT (خط رویش نچرال)',
    titleEn: 'Ultra-Dense Micrograft & SUT Hair Transplant',
    subtitleFa: 'برداشت با دستگاه اسکنر لیزری بدون جراحی و بخیه + ۱ جلسه PRP و مزوتراپی رایگان و ضمانت‌نامه کتبی رویش مادام‌العمر',
    subtitleEn: 'Non-surgical laser scanner extraction + Free PRP session & Lifetime Digital QR Growth Warranty',
    adhdSummaryFa: [
      'تراکم تا ۵,۵۰۰ گرافت در ۱ روز بدون درد و اسکار',
      'اقساط ۶ تا ۱۰ ماهه با چک صیادی (۳۰٪ پیش‌پرداخت)',
      'ضمانت‌نامه کتبی رویش ۹۸٪ با QR Code رسمی',
    ],
    adhdSummaryEn: [
      'Up to 5,500 grafts in 1 session with zero scar',
      '30% down payment + 6–10 monthly installments',
      '98% graft survival guaranteed via QR Certificate',
    ],
    priceToman: 24500000,
    priceUSD: 980,
    discountPercent: 20,
    materialBrand: 'Micro-Sapphire Blade 2026 + Swiss PRP Kit',
    recoveryTimeFa: '۳ روز استراحت سبک (بدون پانسمان سنگین)',
    recoveryTimeEn: '3 Days Light Recovery',
    warrantyDurationFa: 'ضمانت‌نامه کتبی مادام‌العمر رویش',
    warrantyDurationEn: 'Lifetime Growth Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: serviceHairImg,
    goalCategory: 'hair',
  },
  {
    id: 'eyebrow-natural',
    deptId: 'hair',
    deptNameFa: 'دپارتمان کاشت مو و ابرو',
    deptNameEn: 'Hair & Eyebrow Department',
    titleFa: 'کاشت ابروی تخصصی VIP با خواب کاملاً طبیعی (زاویه ۳ درجه)',
    titleEn: 'VIP Natural-Angle Eyebrow Transplant (3° Precision)',
    subtitleFa: 'طراحی خط ابرو متناسب با جام چهره با ظریف‌ترین گرافت‌های تک‌تاری بدون مسواکی شدن',
    subtitleEn: 'Bespoke Golden-Ratio eyebrow design using single-hair micro-follicles',
    adhdSummaryFa: [
      'خواب کاملاً طبیعی بدون سیخ‌سیخ شدن موها',
      'انجام در ۴ ساعت با بی‌حسی دیجیتال بدون درد',
      'قابلیت تقسیط در ۴ فقره چک صیادی بنفش',
    ],
    adhdSummaryEn: [
      'Natural flat hair growth angle (zero bristling)',
      'Completed in 4 hours under painless anesthesia',
      'Flexible 4-month installment plan available',
    ],
    priceToman: 16800000,
    priceUSD: 750,
    discountPercent: 18,
    materialBrand: 'Implanter Pen 0.6mm Ultra-Fine',
    recoveryTimeFa: '۲ روز نقاهت بسیار سبک',
    recoveryTimeEn: '2 Days Minimal Downtime',
    warrantyDurationFa: 'ضمانت‌نامه دائمی تراکم و خواب ابرو',
    warrantyDurationEn: 'Lifetime Density Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: serviceHairImg,
    goalCategory: 'hair',
  },
  {
    id: 'dental-swiss-implant',
    deptId: 'dental',
    deptNameFa: 'دپارتمان دندانپزشکی زیبایی',
    deptNameEn: 'Cosmetic Dentistry Department',
    titleFa: 'پکیج ۸ واحد ایمپلنت دیجیتال سوئیسی و کره‌ای (جراحی فوری بدون درد)',
    titleEn: '8-Unit Digital Swiss & Korean Dental Implant Package',
    subtitleFa: 'کاشت ایمپلنت با گاید جراحی سه‌بعدی بدون برش لثه به همراه روکش زیرکونیا تمام‌سرامیک',
    subtitleEn: '3D guided flapless implant surgery + Full-ceramic Zirconia crowns included',
    adhdSummaryFa: [
      'بدون برش لثه و خونریزی با اسکنر ۳ بعدی داخل دهانی',
      'اقساط ویژه تا ۱۲ ماه با چک صیادی بدون ضامن',
      'کارت اصالت بین‌المللی ایمپلنت Straumann / Osstem',
    ],
    adhdSummaryEn: [
      'Flapless 3D digital scan surgery with zero pain',
      'Up to 12 monthly installments via Sayadi checks',
      'Official Straumann Swiss / Osstem Authenticity Card',
    ],
    priceToman: 88000000,
    priceUSD: 2450,
    discountPercent: 15,
    materialBrand: 'Straumann (Swiss) / Osstem (Korea) Grade 5 Titanium',
    recoveryTimeFa: '۲۴ ساعت (بازگشت فوری به فعالیت روزانه)',
    recoveryTimeEn: '24 Hours Immediate Recovery',
    warrantyDurationFa: '۲۰ سال ضمانت کتبی پایه ایمپلنت',
    warrantyDurationEn: '20-Year Implant Fixture Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: serviceDentalImg,
    goalCategory: 'smile',
  },
  {
    id: 'dental-laminate-smile',
    deptId: 'dental',
    deptNameFa: 'دپارتمان دندانپزشکی زیبایی',
    deptNameEn: 'Cosmetic Dentistry Department',
    titleFa: 'طرح لبخند ۱۶ واحد لمینت سرامیکی IPS e.max یا کامپوزیت ونیر سوئیسی',
    titleEn: '16-Unit IPS e.max Ceramic Veneers Hollywood Smile Package',
    subtitleFa: 'طراحی دیجیتال لبخند (DSD) قبل از شروع کار با ظرافت لنز چشمی بدون تراش مینای دندان',
    subtitleEn: 'Digital Smile Design (DSD) preview + Ultra-thin contact-lens veneers',
    adhdSummaryFa: [
      'مشاهده نتیجه لبخند در مانیتور قبل از لمس دندان',
      'رنگ طبیعی با ترنسلوسنسی بالا (ضد تغییر رنگ با قهوه)',
      'امکان پرداخت در ۸ قسط ماهانه با چک صیادی',
    ],
    adhdSummaryEn: [
      'Preview your new smile in 3D before treatment starts',
      'Stain-resistant natural translucency',
      '8-month installment plan available',
    ],
    priceToman: 72000000,
    priceUSD: 1950,
    discountPercent: 22,
    materialBrand: 'Ivoclar Vivadent IPS e.max (Switzerland/Liechtenstein)',
    recoveryTimeFa: 'بدون نقاهت (تحویل لبخند در ۲ جلسه)',
    recoveryTimeEn: 'Zero Downtime (2 Visits)',
    warrantyDurationFa: '۱۰ سال ضمانت کتبی عدم شکستگی و تغییر رنگ',
    warrantyDurationEn: '10-Year Ceramic Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: serviceDentalImg,
    goalCategory: 'smile',
  },
  {
    id: 'filler-botox-modeling',
    deptId: 'injectables',
    deptNameFa: 'دپارتمان ژل، فیلر و بوتاکس',
    deptNameEn: 'Injectables & Facial Modeling',
    titleFa: 'پکیج کامل مادلینگ و زاویه‌سازی صورت (۶ سی‌سی فیلر اصل + بوتاکس فول‌فیس)',
    titleEn: 'Full-Face Contouring Package (6cc Premium Filler + Full Botox)',
    subtitleFa: 'کانتورینگ خط فک، چانه، سیب گونه و فیلر لب روسی با آنباکسینگ ژل هولوگرام‌دار در حضور زیباجو',
    subtitleEn: 'Jawline, chin, cheekbone & lip sculpting — unboxed in front of you with hologram verification',
    adhdSummaryFa: [
      'آنباکسینگ پلمپ ژل و اسکن بارکد اصالت جلوی چشم شما',
      'فرم‌دهی کاملاً نچرال در ۴۵ دقیقه بدون کبودی (با کانولا)',
      'شامل ۶ سی‌سی فیلر + بوتاکس کامل پیشانی و دور چشم',
    ],
    adhdSummaryEn: [
      'Sealed syringe unboxed in front of the patient',
      'Bruise-free blunt cannula technique in 45 mins',
      'Includes 6cc Hyaluronic Filler + Full-Face Botox',
    ],
    priceToman: 18900000,
    priceUSD: 620,
    discountPercent: 25,
    materialBrand: 'Juvederm Ultra / Neuramis Gold + Dysport/Masport',
    recoveryTimeFa: 'بدون نقاهت (مشاهده نتیجه در لحظه)',
    recoveryTimeEn: 'Immediate Result (Zero Downtime)',
    warrantyDurationFa: 'تضمین اصالت هولوگرام وزارت بهداشت',
    warrantyDurationEn: '100% FDA/CE Authenticity Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: heroClinicImg,
    goalCategory: 'face',
  },
  {
    id: 'laser-alexandrite-2026',
    deptId: 'laser',
    deptNameFa: 'دپارتمان لیزر و جوانسازی',
    deptNameEn: 'Laser & HIFU Rejuvenation',
    titleFa: 'پکیج ۶ جلسه‌ای لیزر فول‌بادی دستگاه الکساندرایت ۲۰۲۶ + ۱ جلسه هایفوتراپی ۷ بعدی',
    titleEn: '6-Session Full-Body 2026 Alexandrite Laser + 7D HIFU Lift',
    subtitleFa: 'مجهز به سیستم کولینگ نیتروژن منفی ۲۰ درجه کاملاً بدون درد با سری شخصی استریل',
    subtitleEn: 'Equipped with -20°C cryo-cooling (100% painless) + 7D non-surgical HIFU face lift',
    adhdSummaryFa: [
      'سری اختصاصی استریل و شات نامحدود واقعی در هر جلسه',
      'تضمین قیمت ثابت تا پایان هر ۶ جلسه + ۱ جلسه هایفو هدیه',
      'کاهش ۸۵٪ موهای زائد از جلسه سوم',
    ],
    adhdSummaryEn: [
      'Dedicated personal sterile tip + unlimited shots',
      'Locked price for all 6 sessions + Bonus 7D HIFU',
      '85% hair reduction visible by session 3',
    ],
    priceToman: 9800000,
    priceUSD: 390,
    discountPercent: 30,
    materialBrand: 'Candela GentleMax Pro Plus 2026 + Ultherapy 7D',
    recoveryTimeFa: 'بدون هیچ‌گونه التهاب یا نقاهت',
    recoveryTimeEn: 'Zero Redness or Downtime',
    warrantyDurationFa: 'تضمین کتبی جواب‌دهی و ثبات تعرفه',
    warrantyDurationEn: 'Written Efficacy & Price-Lock Guarantee',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: serviceLaserImg,
    goalCategory: 'laser',
  },
  {
    id: 'surgery-blepharo-rhino',
    deptId: 'surgery',
    deptNameFa: 'دپارتمان جراحی زیبایی',
    deptNameEn: 'Cosmetic Surgery Department',
    titleFa: 'بلفاروپلاستی لیزری پلک بالا و پایین (رفع افتادگی پلک بدون جای بخیه)',
    titleEn: 'Laser Upper & Lower Blepharoplasty (Eyelid Rejuvenation)',
    subtitleFa: 'جوانسازی ۱۰ ساله نگاه در ۱ ساعت با بخیه‌های جذبی میکروسکوپی توسط فوق‌تخصص جراحی پلاستیک و چشم',
    subtitleEn: '10-year eye rejuvenation in 60 minutes using invisible microscopic sutures',
    adhdSummaryFa: [
      'انجام با بی‌حسی موضعی بدون نیاز به بیهوشی عمومی',
      'برش لیزری دقیق در چین طبیعی پلک (بدون رد اسکار)',
      'اقساط ۶ ماهه با چک صیادی ثبتی',
    ],
    adhdSummaryEn: [
      'Local anesthesia in 60 mins (no general anesthesia needed)',
      'Hidden incision inside natural eyelid crease',
      '6-month installment plan available',
    ],
    priceToman: 21500000,
    priceUSD: 890,
    discountPercent: 15,
    materialBrand: 'RF Laser Surgical Scalpel + Ethicon 7-0 Micro-Suture',
    recoveryTimeFa: '۴ تا ۵ روز نقاهت سبک',
    recoveryTimeEn: '4–5 Days Light Recovery',
    warrantyDurationFa: 'ضمانت تقارن و عدم بازگشت افتادگی',
    warrantyDurationEn: 'Symmetry & Longevity Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: heroClinicImg,
    goalCategory: 'surgery',
  },
  {
    id: 'surgery-rhinoplasty-vip',
    deptId: 'surgery',
    deptNameFa: 'دپارتمان جراحی زیبایی',
    deptNameEn: 'Cosmetic Surgery Department',
    titleFa: 'رینوپلاستی (جراحی زیبایی بینی) به روش پیزوسرجری بدون تامپون و کبودی',
    titleEn: 'Ultrasonic Piezo Rhinoplasty (Tampon-Free Nose Surgery)',
    subtitleFa: 'طراحی سه‌بعدی فرم بینی (طبیعی، نیمه‌فانتزی) قبل از عمل با حفظ کامل تنفس و حداقل ورم',
    subtitleEn: '3D pre-op nose simulation + Ultrasonic bone sculpting with zero nasal packing',
    adhdSummaryFa: [
      'استفاده از امواج اولتراسونیک پیزو به جای چکش جراحی سنتی',
      'تنفس راحت از روز اول (استفاده از اسپلینت سیلیکونی به جای تامپون)',
      'شرایط اقساط ویژه تا ۱۰ ماه با چک صیادی',
    ],
    adhdSummaryEn: [
      'Ultrasonic Piezo technology (minimal bruising)',
      'Breathe comfortably from Day 1 (no painful packing)',
      '10-month Sayadi check installment plan',
    ],
    priceToman: 54000000,
    priceUSD: 1750,
    discountPercent: 12,
    materialBrand: 'Acteon Piezotome Surgery System (France)',
    recoveryTimeFa: '۷ روز (برداشتن اسپلینت در روز هفتم)',
    recoveryTimeEn: '7 Days Cast Removal',
    warrantyDurationFa: 'ضمانت‌نامه کتبی تنفس و فرم جراحی',
    warrantyDurationEn: 'Breathing & Aesthetic Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: heroClinicImg,
    goalCategory: 'surgery',
  },
  {
    id: 'facial-meso-glass-skin',
    deptId: 'facial',
    deptNameFa: 'دپارتمان فیشیال و پاکسازی پوست',
    deptNameEn: 'VIP Facial & Skin Therapy',
    titleFa: 'پکیج رویال فیشیال ۱۲ مرحله‌ای + مزوژل جوانساز جالپرو / پروفایلو (پوست شیشه‌ای)',
    titleEn: '12-Step Royal Glass-Skin Facial + Profhilo/Jalupro Bio-Remodeling',
    subtitleFa: 'آبرسانی عمقی، هیدرودرمی، اسیدتراپی ملایم و تزریق مزوژل کلاژن‌ساز ایتالیایی برای درخشش فوری پوست',
    subtitleEn: 'Deep hydro-dermabrasion + Italian bio-remodeling hyaluronic booster for instant glow',
    adhdSummaryFa: [
      'رفع فوری کدری، منافذ باز و خطوط ریز در ۱ جلسه ۹۰ دقیقه‌ای',
      'استفاده از مزوژل اصل ایتالیایی با بارکد قابل استعلام',
      'مناسب برای قبل از مراسم، عروسی و جلسات مهم',
    ],
    adhdSummaryEn: [
      'Instant glass-skin glow in a relaxing 90-min session',
      'Authentic Italian Profhilo / Jalupro booster',
      'Zero downtime — ideal before special events',
    ],
    priceToman: 8400000,
    priceUSD: 340,
    discountPercent: 25,
    materialBrand: 'Profhilo / Jalupro Super Hydro (Italy) + Thalac France',
    recoveryTimeFa: 'بدون نقاهت (درخشش فوری پوست)',
    recoveryTimeEn: 'Zero Downtime (Instant Radiance)',
    warrantyDurationFa: 'ضمانت اصالت کوکتل مزوژل ایتالیا',
    warrantyDurationEn: 'Italian Bio-Gel Authenticity Certificate',
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f8d3710427f?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: serviceLaserImg,
    goalCategory: 'face',
  },
  {
    id: 'tourism-royal-bundle',
    deptId: 'tourism',
    deptNameFa: 'دپارتمان توریسم سلامت بین‌المللی',
    deptNameEn: 'International Medical Tourism VIP',
    titleFa: 'پکیج سلطنتی توریسم سلامت: کاشت مو میکروگرافت + طرح لبخند لمینت + ۵ شب هتل ۵ ستاره',
    titleEn: 'Royal Medical Tourism All-Inclusive: Hair Transplant + Veneers + 5★ Hotel Stay',
    subtitleFa: 'ویژه مراجعین عمان، امارات، عراق، ترکیه، آذربایجان و اروپا؛ شامل ترنسفر تشریفاتی فرودگاهی (CIP)، مترجم اختصاصی و سیم‌کارت',
    subtitleEn: 'Tailored for international guests: Procedure + 5 Nights 5-Star Hotel + Airport CIP Limo + Personal Interpreter',
    adhdSummaryFa: [
      'صرفه‌جویی ۷۰ درصدی نسبت به قیمت کلینیک‌های دبی، استانبول و اروپا',
      'ترنسفر فرودگاهی VIP + ۵ شب اقامت هتل ۵ ستاره + مترجم به ۷ زبان',
      'صدور گواهی پزشکی بین‌المللی پرواز و کارت ضمانت‌نامه دیجیتال QR',
    ],
    adhdSummaryEn: [
      'Save up to 70% compared to clinics in Dubai, Europe & UK',
      'Includes 5-Star Hotel, Airport CIP Transfer & 7-Language Interpreter',
      'Fit-to-Fly Medical Certificate & International QR Warranty',
    ],
    priceToman: 96000000,
    priceUSD: 2690,
    discountPercent: 20,
    materialBrand: 'Swiss IPS e.max + Micro-Sapphire Hair Suite + 5★ Hospitality',
    recoveryTimeFa: 'برنامه‌ریزی کامل ۵ روزه درمانی و تفریحی',
    recoveryTimeEn: 'Complete 5-Day Guided VIP Itinerary',
    warrantyDurationFa: 'ضمانت‌نامه بین‌المللی دوزبانه با QR Code',
    warrantyDurationEn: 'International Bilingual QR Warranty',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: heroClinicImg,
    goalCategory: 'tourism',
  },
];

export interface BeforeAfterCase {
  id: string;
  titleFa: string;
  titleEn: string;
  patientProfileFa: string;
  patientProfileEn: string;
  brandUsed: string;
  recoveryDays: string;
  doctorNameFa: string;
  graftOrUnits: string;
  beforeDescFa: string;
  afterDescFa: string;
  imageUrl: string;
  fallbackImage: string;
  warrantySerial: string;
}

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-hair-1',
    titleFa: 'کاشت موی میکروگرافت فوق‌پرتراکم (۵,۱۰۰ گرافت زنده)',
    titleEn: '5,100-Graft Ultra-Dense Micrograft Hair Restoration',
    patientProfileFa: 'آقای ۳۴ ساله (مراجعه‌کننده از مسقط عمان - پکیج توریسم سلامت)',
    patientProfileEn: 'Male, 34 yrs (Medical Tourism Guest from Muscat, Oman)',
    brandUsed: 'Micro-Sapphire 0.7mm + Swiss Regenera PRP',
    recoveryDays: '۳ روز نقاهت اولیه | نتیجه نهایی ماه هشتم',
    doctorNameFa: 'تیم فوق‌تخصصی کاشت مو درخشش‌یار VIP',
    graftOrUnits: '۵,۱۰۰ گرافت (۱۳,۲۰۰ تار مو)',
    beforeDescFa: 'الگوی طاسی درجه ۵ نوروود در ناحیه جلوی سر و شقیقه‌ها',
    afterDescFa: 'پوشش ۱۰۰٪ با خط رویش کاملاً طبیعی و تراکم ۷۵ گرافت در هر سانتی‌متر مربع',
    imageUrl: serviceHairImg,
    fallbackImage: serviceHairImg,
    warrantySerial: 'LM-HAIR-90842',
  },
  {
    id: 'case-dental-2',
    titleFa: 'اصلاح طرح لبخند با ۱۶ واحد لمینت سرامیکی IPS e.max سوئیس',
    titleEn: '16-Unit Swiss IPS e.max Ceramic Veneers Smile Makeover',
    patientProfileFa: 'خانم ۲۹ ساله (پرداخت اقساطی ۸ ماهه با چک صیادی)',
    patientProfileEn: 'Female, 29 yrs (8-Month Sayadi Check Installment Plan)',
    brandUsed: 'Ivoclar Vivadent IPS e.max Press (Shade BL2 Natural)',
    recoveryDays: 'بدون نقاهت | تحویل در ۲ جلسه طی ۵ روز',
    doctorNameFa: 'دپارتمان دندانپزشکی دیجیتال درخشش‌یار VIP',
    graftOrUnits: '۱۶ واحد لمینت بدون تراش (No-Prep)',
    beforeDescFa: 'فاصله بین دندانی (دیاستم)، بدرنگی قدیمی و عدم تقارن خط لبخند',
    afterDescFa: 'لبخند هالیوودی نچرال با لبه شیشه‌ای طبیعی و تطابق کامل با آناتومی لب',
    imageUrl: serviceDentalImg,
    fallbackImage: serviceDentalImg,
    warrantySerial: 'LM-DENT-77419',
  },
  {
    id: 'case-facial-3',
    titleFa: 'مادلینگ فول‌فیس، فیلر خط فک و جوانسازی هایفوتراپی ۷ بعدی',
    titleEn: 'Full-Face Contouring (5cc Juvederm) + 7D HIFU Tightening',
    patientProfileFa: 'خانم ۳۸ ساله (مراجعه‌کننده از باکو / استانبول)',
    patientProfileEn: 'Female, 38 yrs (International Guest)',
    brandUsed: 'Juvederm Voluma & Volux (France) + Ultherapy 7D',
    recoveryDays: 'مشاهده نتیجه در لحظه بدون کبودی',
    doctorNameFa: 'متخصص پوست، مو و زیبایی درخشش‌یار VIP',
    graftOrUnits: '۵ سی‌سی فیلر هیالورونیک + ۱ جلسه کامل هایفو',
    beforeDescFa: 'افتادگی خفیف زاویه فک، خط خنده عمیق و کاهش حجم سیب گونه',
    afterDescFa: 'لیفت V-Shape زاویه فک، رفع کامل خط لبخند و شادابی طبیعی چهره',
    imageUrl: serviceLaserImg,
    fallbackImage: serviceLaserImg,
    warrantySerial: 'LM-FACE-66310',
  },
];

export interface VipSubscriptionPlan {
  level: number;
  titleFa: string;
  durationFa: string;
  priceToman: number;
  commissionToman: number;
  badgeFa: string;
  featuresFa: string[];
}

export const VIP_PLANS: VipSubscriptionPlan[] = [
  {
    level: 1,
    titleFa: 'سطح VIP 1 — اشتراک ۱ ماهه استارتر مطب و کلینیک',
    durationFa: '۱ ماهه',
    priceToman: 4800000,
    commissionToman: 1200000,
    badgeFa: 'مناسب تست و شروع سریع',
    featuresFa: [
      'ماشین‌حساب هوشمند اقساط چک صیادی با ارسال به واتساپ مطب',
      'استوری‌ساز ۱-کلیکی تخفیف‌های روزانه اینستاگرام (HD)',
      'صدور کارت ضمانت‌نامه دیجیتال با QR Code اختصاصی',
    ],
  },
  {
    level: 2,
    titleFa: 'سطح VIP 2 — اشتراک ۳ ماهه رشد فروش کلینیک',
    durationFa: '۳ ماهه',
    priceToman: 11600000,
    commissionToman: 2900000,
    badgeFa: 'پرفروش برای مطب‌های زیبایی',
    featuresFa: [
      'تمامی امکانات VIP 1 + باشگاه مشتریان وفادار (کیف پول ۱۰٪ هدیه)',
      'دستیار و مشاور هوشمند زیبایی و تولیدکننده کپشن وایرال',
      'پشتیبانی از ۷ زبان زنده دنیا و دسترس‌پذیری کامل ADHD',
    ],
  },
  {
    level: 3,
    titleFa: 'سطح VIP 3 — اشتراک ۶ ماهه کلینیک‌های زیبایی و دندانپزشکی',
    durationFa: '۶ ماهه',
    priceToman: 19800000,
    commissionToman: 4950000,
    badgeFa: 'محبوب‌ترین انتخاب مدیران کلینیک',
    featuresFa: [
      'فعال‌سازی کامل سوییچ ۱-کلیکی توریسم سلامت (USD / AED / EUR)',
      'نصب ۱-کلیکی PWA روی آیفون و اندروید با نام و لوگوی کلینیک',
      'گالری قبل و بعد تعاملی + سیستم نوبت‌دهی بیعانه و چک صیادی',
    ],
  },
  {
    level: 4,
    titleFa: 'سطح VIP 4 — اشتراک ۱ ساله جامع + خروجی اندروید APK/AAB',
    durationFa: '۱ ساله (۱۲ ماه)',
    priceToman: 34000000,
    commissionToman: 8500000,
    badgeFa: 'پکیج کامل کلینیک‌های بالای شهر',
    featuresFa: [
      'نسخه اختصاصی White-Label با دامنه، لوگو و شماره واتساپ کلینیک شما',
      'خروجی کامل APK و AAB جهت انتشار در گوگل‌پلی، کافه‌بازار و مایکت',
      'پشتیبانی VIP اختصاصی + آموزش پرسنل پذیرش و ادمین اینستاگرام',
    ],
  },
  {
    level: 5,
    titleFa: 'سطح VIP 5 — اشتراک ۲ ساله رویال هلدینگ و توریسم سلامت بین‌الملل',
    durationFa: '۲ ساله (۲۴ ماه)',
    priceToman: 56000000,
    commissionToman: 14000000,
    badgeFa: 'حداکثر سود و پرستیژ بین‌المللی',
    featuresFa: [
      'پوشش کامل شعب کلینیک در داخل و خارج از کشور (۷ زبان کامل)',
      'سورس‌کد کامل اندروید + پوش اتوماتیک گیت‌هاب و آپدیت رایگان ۲ ساله',
      'مشاوره اختصاصی جذب بیماران دلاری از عمان، عراق، امارات، ترکیه و اروپا',
    ],
  },
];
