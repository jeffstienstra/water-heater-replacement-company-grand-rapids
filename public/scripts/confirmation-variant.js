const root = document.getElementById('confirmation-root');
if (!root) {
  throw new Error('confirmation-root not found');
}

const rawVariants = root.getAttribute('data-variants');
if (!rawVariants) {
  throw new Error('confirmation variant data missing');
}

const variants = JSON.parse(rawVariants);
const params = new URLSearchParams(window.location.search);
const count = Number.parseInt(params.get('photo_count') || '0', 10);
const key = count === 1 || count === 2 ? count : 0;
const variant = variants[String(key)] || variants['0'];

const headline = document.getElementById('submission-headline');
const body = document.getElementById('receipt-body');
const sectionKicker = document.getElementById('section-kicker');
const sectionTitle = document.getElementById('section-title');
const sectionSubtitle = document.getElementById('section-subtitle');
const primaryCta = document.getElementById('primary-cta');
const prefilledText = document.getElementById('prefilled-text');
const photoUploadSection = document.getElementById('photo-upload-section');
const timelineSection = document.getElementById('timeline-section');
const timelineKicker = document.getElementById('timeline-kicker');
const timelineTitle = document.getElementById('timeline-title');
const timelineGrid = document.getElementById('timeline-grid');
const fallbackKicker = document.getElementById('fallback-kicker');
const fallbackTitle = document.getElementById('fallback-title');
const fallbackSubtitle = document.getElementById('fallback-subtitle');

if (headline) headline.textContent = variant.headline;
if (body) body.textContent = variant.body;

if (sectionKicker) sectionKicker.textContent = variant.middleTitle || '';
if (sectionTitle) sectionTitle.textContent = variant.middleTitle || '';
if (sectionSubtitle) sectionSubtitle.textContent = variant.middleSubtitle || '';

if (primaryCta && variant.buttonText && variant.smsBody) {
  primaryCta.textContent = variant.buttonText;
  primaryCta.setAttribute('aria-label', variant.buttonText);
  primaryCta.setAttribute('href', `sms:+16163150999?&body=${encodeURIComponent(variant.smsBody)}`);
}

if (prefilledText) {
  if (variant.smsBody) {
    prefilledText.textContent = `Prefilled text: "${variant.smsBody}"`;
  } else {
    prefilledText.textContent = '';
  }
}

if (photoUploadSection) {
  photoUploadSection.hidden = key > 0;
}

if (timelineSection) {
  timelineSection.hidden = key === 0;
}

if (timelineKicker) timelineKicker.textContent = variant.timelineTitle || 'What Happens Next';
if (timelineTitle) timelineTitle.textContent = variant.timelineTitle || 'What Happens Next';

if (timelineGrid) {
  const phases = Array.isArray(variant.phases) ? variant.phases : [];
  timelineGrid.innerHTML = phases
    .map((phase, index) => {
      const connector =
        index < phases.length - 1
          ? '<div class="mt-3 h-full w-px flex-1 bg-slate-200" aria-hidden="true"></div>'
          : '';

      const label = index === 0 ? 'Up Next' : index === 1 ? 'Quote Verification' : 'Priority Booking';

      return `
      <article class="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex flex-col items-center">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">${index + 1}</div>
          ${connector}
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wide text-slate-500">${label}</p>
          <h3 class="mt-1 text-base font-bold text-slate-900">${phase.title}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-700">${phase.description}</p>
        </div>
      </article>
    `;
    })
    .join('');
}

if (fallbackKicker) fallbackKicker.textContent = variant.fallbackTitle;
if (fallbackTitle) fallbackTitle.textContent = variant.fallbackTitle;
if (fallbackSubtitle) fallbackSubtitle.textContent = variant.fallbackSubtitle;
