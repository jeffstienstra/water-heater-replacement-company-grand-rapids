import { getConfirmationVariant, parsePhotoCount } from '../data/confirmationVariants';

const params = new URLSearchParams(window.location.search);
const key = parsePhotoCount(params.get('photo_count'));
const variant = getConfirmationVariant(key);

const headline = document.getElementById('submission-headline');
const body = document.getElementById('receipt-body');
const sectionKicker = document.getElementById('section-kicker');
const sectionTitle = document.getElementById('section-title');
const sectionSubtitle = document.getElementById('section-subtitle');
const primaryCta = document.getElementById('primary-cta') as HTMLAnchorElement | null;
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

if (sectionKicker) sectionKicker.textContent = variant.middleTitle;
if (sectionTitle) sectionTitle.textContent = variant.middleTitle;
if (sectionSubtitle) sectionSubtitle.textContent = variant.middleSubtitle || '';

if (primaryCta && variant.buttonText && variant.smsBody) {
  primaryCta.textContent = variant.buttonText;
  primaryCta.setAttribute('aria-label', variant.buttonText);
  primaryCta.setAttribute('href', `sms:+16163150999?&body=${encodeURIComponent(variant.smsBody)}`);
}

if (prefilledText && variant.smsBody) {
  prefilledText.textContent = `Prefilled text: "${variant.smsBody}"`;
}

if (photoUploadSection) {
  photoUploadSection.hidden = key > 0;
}

if (timelineSection) {
  timelineSection.hidden = key === 0;
}

if (timelineKicker && variant.timelineTitle) timelineKicker.textContent = variant.timelineTitle;
if (timelineTitle && variant.timelineTitle) timelineTitle.textContent = variant.timelineTitle;

if (timelineGrid) {
  const phases = variant.phases || [];
  timelineGrid.innerHTML = phases.map((phase, index) => {
    const connector = index < phases.length - 1
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
  }).join('');
}

if (fallbackKicker) fallbackKicker.textContent = variant.fallbackTitle;
if (fallbackTitle) fallbackTitle.textContent = variant.fallbackTitle;
if (fallbackSubtitle) fallbackSubtitle.textContent = variant.fallbackSubtitle;
