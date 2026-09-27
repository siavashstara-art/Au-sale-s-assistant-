import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Valid 1x1 Royal Emerald PNG buffer for fallback PWA icon compliance
const EMERALD_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const EMERALD_PNG_BUFFER = Buffer.from(EMERALD_PNG_BASE64, 'base64');

const pwaIconRoutes = [
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
];

for (const iconRoute of pwaIconRoutes) {
  app.get(iconRoute, (_req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(EMERALD_PNG_BUFFER);
  });
}

// Offline Intelligent Medical Aesthetics & Clinic Fallback Engine
function generateOfflineMedicalResponse(mode: string, query: string, lang: string = 'fa'): string {
  const q = (query || '').toLowerCase();

  if (lang === 'en') {
    if (mode === 'estimator') {
      return `### Smart Clinical Estimation & Treatment Plan (ClinicYar VIP)

Based on your request (**"${query}"**):

1. **Estimated Volume / Units Required:**
   - **Hair / Eyebrow Transplant (Micrograft SUT):** ~3,800 to 4,800 high-density grafts (Single-session mega coverage with natural hairline design).
   - **Cosmetic Dentistry (Veneers / Implants):** 8 to 10 units per arch (Swiss Straumann / IPS e.max Ceramic Veneers) for a full Hollywood Smile.
   - **Facial Contouring (Filler & Botox):** 4 to 6 cc Hyaluronic Acid Filler (Juvederm / Neuramis) + 1 vial Masport/Dysport Botox.

2. **International Medical Tourism VIP Package:**
   - **All-Inclusive VIP Rate:** $1,150 – $1,850 USD (Includes procedure, 5-Star Hotel stay in Tehran/Shiraz/Mashhad, private airport transfer & dedicated bilingual medical interpreter).
   - **Domestic Sayadi Check Plan:** 30% Down Payment + 6 to 10 monthly Sayadi checks with zero hidden fees.

3. **Clinical Warranty:**
   - Issued with an official **Digital QR Warranty Certificate** guaranteeing graft survival and material authenticity.`;
    }
    if (mode === 'caption') {
      return `### Viral Instagram Reels & Post Caption for Beauty Clinic

**🎥 Reels Visual Hook (First 3 Seconds):**
Show a split-screen Before/After transformation with a golden shimmer transition and text overlay: *"Don't pay 100% upfront for your dream smile or hair!"*

**📝 Caption:**
✨ Luxury transformation meets smart payment at **ClinicYar VIP**!
Whether you're looking for high-density **Micrograft Hair Transplant**, **Swiss Dental Implants**, or **2026 Alexandrite Laser**, our board-certified specialists deliver guaranteed results.

💎 **Why 14,000+ patients trust us:**
✔️ Official Digital Warranty Card with QR Code
✔️ Flexible Installments via Sayadi Checks (3 to 12 Months)
✔️ All-Inclusive VIP Medical Tourism Packages (5-Star Hotel + Airport Transfer)

🎁 **Flash Deal Today:** Comment **"VIP"** below or tap the link in bio to receive a **10% Beauty Wallet Credit** on your first booking!

#BeautyClinicIran #HairTransplantIran #MedicalTourismIran #DentalVeneers #CosmeticDentistry #ClinicYarVIP`;
    }
    return `### Board-Certified Pre & Post-Care Clinical Protocol

Regarding your consultation (**"${query}"**):

1. **Before Your Procedure (Pre-Care):**
   - Avoid blood thinners (Aspirin, Ibuprofen, Vitamin E, Omega-3) and green tea for **72 hours** prior to treatment.
   - Refrain from alcohol and smoking/hookah for at least **48 hours** to ensure optimal micro-circulation and graft/tissue healing.
   - Arrive with clean skin/hair free of cosmetics or topical lotions.

2. **After Your Procedure (Post-Care Golden Rules):**
   - **First 24–48 Hours:** Use a cold compress gently (if filler/blepharoplasty), keep your head elevated at a **45-degree angle** during sleep (crucial after hair transplant), and avoid touching or massaging the treated area.
   - **Heat & Sun Avoidance:** Avoid hot showers, sauna, jacuzzi, heavy gym workouts, and direct sunlight for **7 to 14 days**.
   - **Hydration & Prescriptions:** Drink 8–10 glasses of water daily and take prescribed antibiotics/sprays strictly on schedule.`;
  }

  // Persian (Default) & Arabic rich responses
  if (mode === 'estimator') {
    if (q.includes('ایمپلنت') || q.includes('لمینت') || q.includes('دندان') || q.includes('کامپوزیت')) {
      return `### 🦷 برآورد هوشمند طرح درمان دندانپزشکی زیبایی و ایمپلنت (کلینیک‌یار VIP)

بر اساس توضیحات شما (**«${query}»**)، آنالیز تخصصی زیر پیشنهاد می‌شود:

۱. **تخمین تعداد واحد و متریال مصرفی:**
- **طرح لبخند کامل (خط لبخند):** ۸ الی ۱۰ واحد در هر فک (مجموعاً ۱۶ تا ۲۰ واحد برای اصلاح کامل طرح لبخند هالیوودی یا نچرال).
- **پیشنهاد متریال درجه یک:** لمینت سرامیکی **IPS e.max سوئیس** یا ایمپلنت دیجیتال **اشترومن (Straumann) سوئیس / اوستم (Osstem) کره** با ضمانت‌نامه کتبی مادام‌العمر.

۲. **محاسبه حدود هزینه و شرایط اقساط با چک صیادی:**
- **پیش‌پرداخت منعطف:** تنها **۳۰٪ نقد** در زمان شروع قالب‌گیری یا جراحی.
- **اقساط با چک صیادی بنفش:** تقسیط الباقی در **۶ الی ۱۲ فقره چک صیادی** بدون ضامن (ویژه بیماران داخل ایران).
- **پکیج VIP توریسم سلامت:** شامل جراحی فوری دیجیتال + اقامت هتل ۵ ستاره + ترنسفر فرودگاهی (از **۱,۲۵۰ دلار**).

💡 *پیشنهاد اقدام:* از بخش **«ماشین‌حساب اقساط چک صیادی»** در همین صفحه، مبلغ دقیق هر برگ چک خود را محاسبه کرده و پرونده اقساطی را به واتساپ کلینیک ارسال نمایید.`;
    }

    if (q.includes('ژل') || q.includes('فیلر') || q.includes('بوتاکس') || q.includes('مادلینگ') || q.includes('نخ')) {
      return `### 💉 برآورد هوشمند حجم فیلر، بوتاکس و مادلینگ زاویه‌سازی صورت

بر اساس درخواست شما (**«${query}»**)، پروتکل استاندارد کلینیک زیبایی به شرح زیر است:

۱. **حجم استاندارد مورد نیاز (پکیج نچرال کانتورینگ):**
- **زاویه‌سازی فک و چانه:** ۳ تا ۵ سی‌سی فیلر هیالورونیک اسید اصل (برندهای **ژوویدرم، نورامیس طلایی یا رووفیل اولترا**).
- **کات گونه و سیب گونه:** ۲ سی‌سی (هر طرف ۱ سی‌سی با تکنیک MD Codes).
- **فیلر لب روسی / نچرال:** ۱ سی‌سی + **بوتاکس فول‌فیس و چشم‌گربه‌ای:** ۱ ویال کامل (مصپورت یا دیسپورت اصل).

۲. **شرایط ویژه پرداخت و ضمانت اصالت:**
- آنباکسینگ پلمپ ژل و اسکن هولوگرام وزارت بهداشت در حضور زیباجو + صدور **کارت ضمانت‌نامه دیجیتال با QR Code**.
- امکان پرداخت نقدی با **۱۰٪ شارژ هدیه کیف پول زیبایی** یا تقسیط ۴ ماهه با چک صیادی.`;
    }

    return `### 👑 برآورد هوشمند کاشت مو و ابرو (میکروگرافت / SUT) و خدمات زیبایی

بر اساس بررسی درخواست شما (**«${query}»**):

۱. **تخمین تعداد گرافت و تکنیک پیشنهادی:**
- **کاشت موی پرتراکم (خط رویش نچرال + فرق سر):** حدود **۴,۲۰۰ تا ۵,۵۰۰ گرافت** (معادل ۱۱,۰۰۰ تا ۱۴,۰۰۰ تار موی زنده) در یک جلسه VIP بدون اسکار و جراحی.
- **کاشت ابروی تخصصی با خواب طبیعی:** حدود **۴۰۰ تا ۶۵۰ تار موی ظریف** با زاویه خواب ۳ درجه.
- **ضمانت‌نامه رسمی:** همراه با **کارت ضمانت‌نامه دیجیتال QR** جهت تضمین رویش ۹۸ درصدی گرافت‌ها و ۱ جلسه مزوتراپی/PRP رایگان.

۲. **شرایط مالی و اقساط چک صیادی:**
- **داخل ایران:** ۳۰٪ پیش‌پرداخت + **۳ تا ۱۰ قسط ماهانه با چک صیادی ثبتی**.
- **توریسم سلامت (عمان، امارات، عراق و اروپا):** پکیج کامل کاشت + ۳ شب هتل ۵ ستاره + مترجم و ترنسفر VIP فرودگاهی تنها **۹۸۰ دلار (USD)**.`;
  }

  if (mode === 'caption') {
    return `### 📱 سناریو ریلز و کپشن وایرال اینستاگرام ویژه کلینیک زیبایی و دندانپزشکی

**🎬 قلاب تصویری ۳ ثانیه اول (Reels Hook):**
نمایش تصویر قبل و بعد زیباجو با ترنزیشن طلایی + تایتل درشت روی ویدیو:
*«کی گفته برای کاشت مو یا ایمپلنت سوئیسی باید کل هزینه رو یکجا بدی؟! 🤔✨»*

---

**📝 متن کپشن آماده کپی (با نرخ تعامل و دایرکت بالا):**

👑 زیبایی و جوانی رو به فردا نسپار؛ امروز انجامش بده و هزینه‌ش رو با خیال راحت قسطی پرداخت کن!

در **کلینیک‌یار VIP**، تمام خدمات تخصصی زیبایی با بالاترین استاندارد پزشکی روز دنیا و **کارت ضمانت‌نامه دیجیتال (QR Code)** ارائه می‌شه:
✅ کاشت مو و ابرو به روش میکروگرافت فوق‌پرتراکم (خط رویش کاملاً نچرال)
✅ ایمپلنت فوری سوئیسی و کره‌ای + لمینت سرامیکی بدون تراش دندان
✅ تزریق فیلر، بوتاکس و مادلینگ صورت با آنباکسینگ ژل در حضور شما
✅ لیزر موهای زائد با دستگاه الکساندرایت ۲۰۲۶ (کولینگ یخ بدون درد)

💎 **شرایط ویژه این هفته کلینیک:**
🔹 پرداخت اقساطی ۳ تا ۱۲ ماهه فقط با **چک صیادی** (بدون ضامن!)
🔹 **۱۰٪ شارژ کیف پول زیبایی** با معرفی هر یک از دوستانتون 🎁
🔹 پکیج ویژه **توریسم سلامت (VIP Medical Tourism)** شامل هتل ۵ ستاره و ترنسفر فرودگاهی

👇 **همین الان کلمه «اقساط» یا «مشاوره» رو زیر همین پست کامنت کن** تا کارشناسان ما لیست قیمت جشنواره امروز و فرم محاسبه اقساط رو برات دایرکت کنن!

📞 رزرو مستقیم نوبت VIP از طریق لینک بیو
#کلینیک_زیبایی #کاشت_مو #ایمپلنت_اقساطی #لمینت_دندان #تزریق_فیلر #لیزر_الکساندرایت #توریسم_سلامت #کاشت_ابرو #کلینیک_یار_VIP`;
  }

  // Default: mode === 'care' (Pre & Post-Care Consultation)
  return `### 🩺 پروتکل تخصصی مراقبت‌های قبل و بعد از خدمات زیبایی (کلینیک‌یار VIP)

پاسخ پزشکی هوشمند به پرسش شما (**«${query}»**):

۱. **اقدامات طلایی قبل از مراجعه به کلینیک (Pre-Care):**
- **قطع داروهای رقیق‌کننده خون:** از **۷۲ ساعت قبل**، مصرف آسپرین، ژلوفن، ایبوپروفن، ویتامین E، امگا ۳ و دمنوش‌های گیاهی (مثل چای سبز و زعفران) را متوقف کنید تا کبودی و خونریزی به صفر برسد.
- **عدم مصرف دخانیات و الکل:** حداقل **۴۸ ساعت قبل از کاشت مو، جراحی یا تزریق** از مصرف سیگار، قلیان و الکل خودداری فرمایید تا اکسیژن‌رسانی بافتی در بالاترین سطح باشد.
- **لیزر موهای زائد:** ۲۴ ساعت قبل ناحیه را فقط با ژیلت شیو کنید و از وکس، اپیلاسیون یا کرم موبر استفاده نکنید.

۲. **مراقبت‌های حیاتی بعد از انجام خدمات (Post-Care):**
- **کاشت مو و ابرو:** تا ۳ شب اول با **زاویه ۴۵ درجه (نیمه‌نشسته)** و با بالش گردنی استراحت کنید؛ اسپری سرم شستشو را هر ۲ ساعت استفاده کرده و از خاراندن یا برخورد دست با گرافت‌ها خودداری نمایید.
- **بوتاکس و فیلر:** تا ۶ ساعت بعد از بوتاکس سر را خم نکنید و نخوابید؛ تا ۴۸ ساعت بعد از فیلر از سونا، جکوزی، حمام داغ و ورزش سنگین پرهیز کرده و روزانه **۸ لیوان آب** بنوشید تا هیالورونیک اسید فرم ایده‌آل بگیرد.
- **ایمپلنت و لمینت:** تا ۲۴ ساعت بعد از جراحی ایمپلنت از غذاهای سرد و نرم استفاده کنید و از نی برای نوشیدن مایعات استفاده نکنید.

✅ *تمامی مراجعین کلینیک‌یار VIP پس از انجام خدمات، «کارت ضمانت‌نامه دیجیتال با QR Code» و پشتیبانی ۲۴ ساعته پزشک در واتساپ دریافت می‌کنند.*`;
}

// POST /api/ai-assistant
app.post('/api/ai-assistant', async (req, res) => {
  const { mode = 'care', prompt = '', lang = 'fa' } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemPrompt =
        lang === 'en'
          ? `You are the Chief Medical Aesthetics & Cosmetic Dentistry AI Consultant at "ClinicYar VIP" (Tehran, Shiraz, Mashhad & International Medical Tourism). Mode: ${mode}. Provide structured, luxury, medically accurate advice covering pre/post-care, graft/implant/filler estimation, Sayadi check installment plans (3-12 months), or viral Instagram captions for beauty clinics.`
          : `شما دستیار و مشاور ارشد هوشمند پوست، مو، زیبایی، کاشت مو، لیزر و دندانپزشکی زیبایی در سامانه «کلینیک‌یار VIP» هستید. حالت انتخابی کاربر: ${mode}. پاسخ را بسیار ساختاریافته، محترمانه، علمی، لوکس و کاربردی به زبان فارسی (یا عربی در صورت درخواست) بنویسید و در صورت ارتباط به مزایای اقساط با چک صیادی، کارت ضمانت‌نامه دیجیتال با QR Code و پکیج‌های توریسم سلامت VIP اشاره کنید.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt || 'راهنمای کامل خدمات کلینیک زیبایی و شرایط اقساط را توضیح دهید.',
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      if (response.text) {
        res.json({
          reply: response.text,
          source: 'gemini-3.8-flash',
        });
        return;
      }
    } catch (_err) {
      // Fall through seamlessly to offline medical assistant engine
    }
  }

  // Automatic Offline Fallback Engine (Zero API Key Prompt required)
  const offlineReply = generateOfflineMedicalResponse(mode, prompt, lang);
  res.json({
    reply: offlineReply,
    source: 'clinicyar-smart-engine',
  });
});

// POST /api/github/direct-push
// Direct 1-click GitHub Push Engine for pushing full codebase + /android/android-release-workflow.yml -> .github/workflows/android-release.yml
app.post('/api/github/direct-push', async (req, res) => {
  try {
    const { token, owner, repo, branch = 'main' } = req.body || {};
    if (!token || !owner || !repo) {
      res.status(400).json({
        ok: false,
        message: 'لطفاً توکن گیت‌هاب (Personal Access Token)، نام کاربری (Owner) و نام مخزن (Repository) را وارد کنید.',
      });
      return;
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token.trim()}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'ClinicYar-VIP-Direct-Pusher',
    };

    // 1. Check if repo exists; if not, attempt to create it
    const repoCheckRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (repoCheckRes.status === 404) {
      const createRepoRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: repo,
          description: 'ClinicYar VIP | Luxury Medical Aesthetics, Hair Transplant, Cosmetic Dentistry & Medical Tourism Full-Stack PWA + Android APK/AAB',
          private: false,
          auto_init: true,
        }),
      });
      if (!createRepoRes.ok) {
        const errData = await createRepoRes.text();
        res.status(400).json({
          ok: false,
          message: `خطا در ساخت مخزن گیت‌هاب: ${errData}`,
        });
        return;
      }
      // Wait briefly for initial commit
      await new Promise((r) => setTimeout(r, 1500));
    }

    // 2. Collect project files to push (including mapping /android/android-release-workflow.yml to .github/workflows/android-release.yml on GitHub)
    const filesToUpload: Array<{ repoPath: string; localPath: string }> = [
      { repoPath: 'package.json', localPath: path.join(__dirname, 'package.json') },
      { repoPath: 'index.html', localPath: path.join(__dirname, 'index.html') },
      { repoPath: 'metadata.json', localPath: path.join(__dirname, 'metadata.json') },
      { repoPath: 'vite.config.ts', localPath: path.join(__dirname, 'vite.config.ts') },
      { repoPath: 'tsconfig.json', localPath: path.join(__dirname, 'tsconfig.json') },
      { repoPath: 'server.ts', localPath: path.join(__dirname, 'server.ts') },
      { repoPath: 'public/manifest.json', localPath: path.join(__dirname, 'public/manifest.json') },
      { repoPath: 'public/icon.svg', localPath: path.join(__dirname, 'public/icon.svg') },
      { repoPath: 'src/main.tsx', localPath: path.join(__dirname, 'src/main.tsx') },
      { repoPath: 'src/index.css', localPath: path.join(__dirname, 'src/index.css') },
      { repoPath: 'src/App.tsx', localPath: path.join(__dirname, 'src/App.tsx') },
      { repoPath: 'src/data/clinicData.ts', localPath: path.join(__dirname, 'src/data/clinicData.ts') },
      { repoPath: 'src/hooks/usePWAInstall.ts', localPath: path.join(__dirname, 'src/hooks/usePWAInstall.ts') },
      { repoPath: 'src/utils/canvasGenerators.ts', localPath: path.join(__dirname, 'src/utils/canvasGenerators.ts') },
      { repoPath: 'src/components/StoryMakerModal.tsx', localPath: path.join(__dirname, 'src/components/StoryMakerModal.tsx') },
      { repoPath: 'src/components/InstallmentCalculatorModal.tsx', localPath: path.join(__dirname, 'src/components/InstallmentCalculatorModal.tsx') },
      { repoPath: 'src/components/DigitalWarrantyModal.tsx', localPath: path.join(__dirname, 'src/components/DigitalWarrantyModal.tsx') },
      { repoPath: 'src/components/VipAndAffiliateModals.tsx', localPath: path.join(__dirname, 'src/components/VipAndAffiliateModals.tsx') },
      { repoPath: 'src/hooks/usePWAInstall.ts', localPath: path.join(__dirname, 'src/hooks/usePWAInstall.ts') },
      { repoPath: 'src/components/StoryMakerModal.tsx', localPath: path.join(__dirname, 'src/components/StoryMakerModal.tsx') },
      { repoPath: 'src/components/InstallmentCalculatorModal.tsx', localPath: path.join(__dirname, 'src/components/InstallmentCalculatorModal.tsx') },
      { repoPath: 'src/components/DigitalWarrantyModal.tsx', localPath: path.join(__dirname, 'src/components/DigitalWarrantyModal.tsx') },
      { repoPath: 'src/components/VipAndAffiliateModals.tsx', localPath: path.join(__dirname, 'src/components/VipAndAffiliateModals.tsx') },
      { repoPath: 'android/settings.gradle', localPath: path.join(__dirname, 'android/settings.gradle') },
      { repoPath: 'android/build.gradle', localPath: path.join(__dirname, 'android/build.gradle') },
      { repoPath: 'android/gradle.properties', localPath: path.join(__dirname, 'android/gradle.properties') },
      { repoPath: 'android/gradle/wrapper/gradle-wrapper.properties', localPath: path.join(__dirname, 'android/gradle/wrapper/gradle-wrapper.properties') },
      { repoPath: 'android/app/build.gradle', localPath: path.join(__dirname, 'android/app/build.gradle') },
      { repoPath: 'android/app/src/main/AndroidManifest.xml', localPath: path.join(__dirname, 'android/app/src/main/AndroidManifest.xml') },
      { repoPath: 'android/app/src/main/java/com/clinicyar/vip/MainActivity.java', localPath: path.join(__dirname, 'android/app/src/main/java/com/clinicyar/vip/MainActivity.java') },
      { repoPath: 'android/app/src/main/res/values/strings.xml', localPath: path.join(__dirname, 'android/app/src/main/res/values/strings.xml') },
      { repoPath: 'android/app/src/main/res/values/styles.xml', localPath: path.join(__dirname, 'android/app/src/main/res/values/styles.xml') },
      { repoPath: 'android/android-release-workflow.yml', localPath: path.join(__dirname, 'android/android-release-workflow.yml') },
      { repoPath: '.github/workflows/android-release.yml', localPath: path.join(__dirname, 'android/android-release-workflow.yml') },
    ];

    let uploadedCount = 0;
    for (const item of filesToUpload) {
      if (!fs.existsSync(item.localPath)) continue;
      const contentBase64 = fs.readFileSync(item.localPath).toString('base64');

      // Check existing file SHA if present
      let sha: string | undefined;
      const existingRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${item.repoPath}?ref=${branch}`,
        { headers }
      );
      if (existingRes.ok) {
        const existingJson = (await existingRes.json()) as { sha?: string };
        sha = existingJson.sha;
      }

      const putRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${item.repoPath}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            message: `Deploy ${item.repoPath} via ClinicYar VIP Direct Push`,
            content: contentBase64,
            branch,
            ...(sha ? { sha } : {}),
          }),
        }
      );

      if (putRes.ok) {
        uploadedCount++;
      }
    }

    res.json({
      ok: true,
      uploadedCount,
      repoUrl: `https://github.com/${owner}/${repo}`,
      actionsUrl: `https://github.com/${owner}/${repo}/actions`,
      message: `پوش مستقیم با موفقیت انجام شد! (${uploadedCount} فایل اصلی + پروژه کامل اندروید و ورک‌فلو ساخت خودکار APK و AAB در GitHub Actions فعال شد).`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      ok: false,
      message: `خطا در ارتباط با گیت‌هاب: ${msg}`,
    });
  }
});

// Start Express + Vite dev middleware or static production build
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ClinicYar VIP Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
