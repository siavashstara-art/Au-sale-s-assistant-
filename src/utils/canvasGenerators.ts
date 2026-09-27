// HTML5 Canvas Generators for:
// 1. 1080x1920 HD Instagram Story Poster (Mode A: Flash Deal, Mode B: Installment Package)
// 2. Digital QR Warranty Certificate Card (1200x720 HD)

export interface StoryConfig {
  mode: 'flash' | 'installment';
  clinicName: string;
  doctorName: string;
  phone: string;
  instagramHandle: string;
  serviceTitle: string;
  cashPriceText: string;
  monthlyInstallmentText: string;
  discountPercent: number;
  materialBrand: string;
}

export interface WarrantyCardConfig {
  patientName: string;
  nationalIdOrPassport: string;
  serviceTitle: string;
  materialBrand: string;
  serialCode: string;
  issueDate: string;
  warrantyDuration: string;
  clinicName: string;
}

// Deterministic crisp QR Matrix drawer on Canvas
function drawQrMatrix(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  seedText: string,
  fgColor = '#064e3b',
  bgColor = '#ffffff'
) {
  const cells = 21;
  const cellSize = size / cells;

  ctx.fillStyle = bgColor;
  ctx.fillRect(x - 8, y - 8, size + 16, size + 16);

  // Hash helper
  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const isFinderPattern = (r: number, c: number) => {
    const inTopLeft = r < 7 && c < 7;
    const inTopRight = r < 7 && c >= cells - 7;
    const inBottomLeft = r >= cells - 7 && c < 7;
    return inTopLeft || inTopRight || inBottomLeft;
  };

  const drawFinder = (startR: number, startC: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (isBorder || isInner) {
          ctx.fillStyle = fgColor;
          ctx.fillRect(
            x + (startC + c) * cellSize,
            y + (startR + r) * cellSize,
            Math.ceil(cellSize),
            Math.ceil(cellSize)
          );
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, cells - 7);
  drawFinder(cells - 7, 0);

  ctx.fillStyle = fgColor;
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if (isFinderPattern(r, c)) continue;
      const bit = ((hash >>> ((r * cells + c) % 24)) ^ (r * 17 + c * 31)) & 1;
      if (bit === 1) {
        ctx.fillRect(
          x + c * cellSize,
          y + r * cellSize,
          Math.ceil(cellSize),
          Math.ceil(cellSize)
        );
      }
    }
  }
}

export function renderStoryToCanvas(canvas: HTMLCanvasElement, config: StoryConfig) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 1080;
  canvas.height = 1920;

  // Cheerful Luxury White + Emerald + Rose Gold Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.5, '#f0fdf4');
  bgGrad.addColorStop(1, '#fff1f2');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Decorative Top & Bottom Royal Emerald Accent Bars
  const headerGrad = ctx.createLinearGradient(0, 0, 1080, 340);
  headerGrad.addColorStop(0, '#064e3b');
  headerGrad.addColorStop(1, '#047857');
  ctx.fillStyle = headerGrad;
  ctx.beginPath();
  ctx.roundRect(48, 48, 984, 290, 40);
  ctx.fill();

  // Gold Border Frame
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(32, 32, 1016, 1856, 48);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 34px Vazirmatn, sans-serif';
  ctx.fillText('اکوسیستم آفرینش | درخشش‌یار VIP | LuminaMed', 540, 125);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 58px Vazirmatn, sans-serif';
  ctx.fillText(config.clinicName || 'کلینیک تخصصی زیبایی و دندانپزشکی درخشش‌یار VIP', 540, 215);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '600 34px Vazirmatn, sans-serif';
  ctx.fillText(config.doctorName || 'تحت نظر تیم فوق‌تخصصی پوست، مو، لیزر و دندانپزشکی زیبایی', 540, 285);

  // Mode Badge
  ctx.fillStyle = config.mode === 'flash' ? '#e11d48' : '#059669';
  ctx.beginPath();
  ctx.roundRect(140, 390, 800, 110, 55);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 44px Vazirmatn, sans-serif';
  ctx.fillText(
    config.mode === 'flash'
      ? `🔥 جشنواره تخفیف ویژه امروز (${config.discountPercent}٪ تخفیف واقعی)`
      : '💎 طرح ویژه اقساطی با چک صیادی (بدون ضامن)',
    540,
    460
  );

  // Main Service Card
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
  ctx.shadowBlur = 40;
  ctx.beginPath();
  ctx.roundRect(72, 550, 936, 780, 44);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(72, 550, 936, 780, 44);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = '800 48px Vazirmatn, sans-serif';
  ctx.fillText(config.serviceTitle.slice(0, 42), 540, 660);

  ctx.fillStyle = '#475569';
  ctx.font = '600 32px Vazirmatn, sans-serif';
  ctx.fillText(`متریال اورجینال: ${config.materialBrand}`, 540, 735);

  // Price Box 1: Cash Price
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(130, 790, 820, 190, 28);
  ctx.fill();

  ctx.fillStyle = '#64748b';
  ctx.font = '600 32px Vazirmatn, sans-serif';
  ctx.fillText('سرمایه‌گذاری نقدی جشنواره (با کارت ضمانت‌نامه دیجیتال):', 540, 855);

  ctx.fillStyle = '#0f172a';
  ctx.font = '800 54px Vazirmatn, sans-serif';
  ctx.fillText(config.cashPriceText, 540, 940);

  // Price Box 2: Monthly Sayadi Check Installment
  ctx.fillStyle = '#ecfdf5';
  ctx.beginPath();
  ctx.roundRect(130, 1020, 820, 240, 28);
  ctx.fill();

  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(130, 1020, 820, 240, 28);
  ctx.stroke();

  ctx.fillStyle = '#065f46';
  ctx.font = '700 36px Vazirmatn, sans-serif';
  ctx.fillText('✨ مبلغ هر برگ چک صیادی (اقساط راحت ۳ تا ۱۲ ماهه):', 540, 1095);

  ctx.fillStyle = '#047857';
  ctx.font = '900 62px Vazirmatn, sans-serif';
  ctx.fillText(config.monthlyInstallmentText, 540, 1195);

  // Loyalty & Warranty Benefits
  ctx.fillStyle = '#fff1f2';
  ctx.beginPath();
  ctx.roundRect(72, 1370, 936, 150, 32);
  ctx.fill();

  ctx.fillStyle = '#be123c';
  ctx.font = '700 34px Vazirmatn, sans-serif';
  ctx.fillText('🎁 ۱۰٪ شارژ هدیه کیف پول زیبایی با معرفی به دوستان + ضمانت‌نامه QR', 540, 1460);

  // Footer Contact & QR
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(72, 1560, 936, 270, 36);
  ctx.fill();

  ctx.textAlign = 'right';
  ctx.fillStyle = '#fde68a';
  ctx.font = '700 36px Vazirmatn, sans-serif';
  ctx.fillText('📞 رزرو نوبت VIP و مشاوره رایگان واتساپ:', 950, 1645);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 54px JetBrains Mono, Vazirmatn, sans-serif';
  ctx.fillText(config.phone || '0912-000-0000', 950, 1725);

  ctx.fillStyle = '#34d399';
  ctx.font = '600 32px JetBrains Mono, sans-serif';
  ctx.fillText(`Instagram: ${config.instagramHandle || '@LuminaMed.VIP'}`, 950, 1790);

  drawQrMatrix(ctx, 115, 1595, 195, `${config.clinicName}|${config.phone}|${config.serviceTitle}`, '#064e3b', '#ffffff');
}

export function renderWarrantyCardToCanvas(canvas: HTMLCanvasElement, config: WarrantyCardConfig) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 1200;
  canvas.height = 720;

  // Crisp Luxury White & Emerald Certificate Background
  const grad = ctx.createLinearGradient(0, 0, 1200, 720);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.6, '#f0fdf4');
  grad.addColorStop(1, '#ecfdf5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 720);

  // Double Ornamental Border
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(24, 24, 1152, 672, 32);
  ctx.stroke();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(38, 38, 1124, 644, 24);
  ctx.stroke();

  // Top Header Strip
  ctx.fillStyle = '#064e3b';
  ctx.beginPath();
  ctx.roundRect(56, 56, 1088, 130, 20);
  ctx.fill();

  ctx.textAlign = 'right';
  ctx.fillStyle = '#fde68a';
  ctx.font = '800 36px Vazirmatn, sans-serif';
  ctx.fillText('کارت ضمانت‌نامه دیجیتال و اصالت متریال پزشکی (QR Verified)', 1110, 115);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '600 22px Vazirmatn, sans-serif';
  ctx.fillText(`${config.clinicName} | LuminaMed VIP International Certificate`, 1110, 158);

  // Details Grid
  ctx.fillStyle = '#0f172a';
  ctx.font = '700 28px Vazirmatn, sans-serif';
  ctx.fillText(`نام زیباجو / Patient: ${config.patientName}`, 1110, 255);
  ctx.fillText(`کد ملی / Passport ID: ${config.nationalIdOrPassport}`, 1110, 315);

  ctx.fillStyle = '#047857';
  ctx.font = '800 30px Vazirmatn, sans-serif';
  ctx.fillText(`خدمت انجام‌شده: ${config.serviceTitle}`, 1110, 385);

  ctx.fillStyle = '#334155';
  ctx.font = '600 25px Vazirmatn, sans-serif';
  ctx.fillText(`برند و متریال مصرفی: ${config.materialBrand}`, 1110, 445);
  ctx.fillText(`مدت و نوع ضمانت: ${config.warrantyDuration}`, 1110, 505);
  ctx.fillText(`تاریخ صدور: ${config.issueDate}   |   کد رهگیری اصالت: ${config.serialCode}`, 1110, 565);

  // Footer Verification Note
  ctx.fillStyle = '#059669';
  ctx.font = '700 22px Vazirmatn, sans-serif';
  ctx.fillText('✅ این گواهی در سامانه هوشمند درخشش‌یار VIP (کلینیک‌یار) ثبت و قابل استعلام با اسکن QR است.', 1110, 640);

  // Left Side QR Code & Seal
  drawQrMatrix(
    ctx,
    95,
    235,
    240,
    `CLINICYAR-WARRANTY|${config.serialCode}|${config.patientName}|${config.serviceTitle}`,
    '#064e3b',
    '#ffffff'
  );

  ctx.textAlign = 'center';
  ctx.fillStyle = '#064e3b';
  ctx.font = 'bold 20px JetBrains Mono, monospace';
  ctx.fillText(config.serialCode, 215, 515);

  ctx.fillStyle = '#d97706';
  ctx.font = 'bold 20px Vazirmatn, sans-serif';
  ctx.fillText('SEAL OF AUTHENTICITY', 215, 550);
}
