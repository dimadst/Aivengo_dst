const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const faqItems = [...document.querySelectorAll(".faq-list details")];
const placeholderLinks = document.querySelectorAll("[data-store-link]");
const screenshotCards = document.querySelectorAll("[data-screenshot]");
const screenshotDialog = document.querySelector("[data-screenshot-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogCaption = document.querySelector("[data-dialog-caption]");
const dialogClose = document.querySelector("[data-dialog-close]");
const guideSteps = [...document.querySelectorAll("[data-guide-step]")];
const guidePreviewImage = document.querySelector("[data-guide-preview-image]");
const guidePhone = guidePreviewImage?.closest(".guide-phone");
const guidePreviewTitle = document.querySelector("[data-guide-preview-title]");
const guideCount = document.querySelector("[data-guide-count]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (year) {
  year.textContent = new Date().getFullYear();
}

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

screenshotCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!screenshotDialog || !dialogImage || !dialogCaption) return;
    dialogImage.src = card.dataset.screenshot;
    dialogImage.alt = card.dataset.caption || "Екран DimFin";
    dialogCaption.textContent = card.dataset.caption || "DimFin";
    screenshotDialog.showModal();
  });
});

dialogClose?.addEventListener("click", () => screenshotDialog?.close());
screenshotDialog?.addEventListener("click", (event) => {
  if (event.target === screenshotDialog) screenshotDialog.close();
});

guideSteps.forEach((step) => {
  step.addEventListener("click", () => {
    guideSteps.forEach((item) => {
      const isCurrent = item === step;
      item.classList.toggle("is-active", isCurrent);
      item.setAttribute("aria-selected", String(isCurrent));
    });

    if (guidePreviewImage) {
      guidePreviewImage.src = step.dataset.guideImage;
      guidePreviewImage.alt = step.dataset.guideTitle || "Екран DimFin";
      const isUnframed = step.dataset.guideImage?.endsWith("calendar.png") ||
                         step.dataset.guideImage?.endsWith("analytics.png") ||
                         step.dataset.guideImage?.endsWith("analytics-overview.png") ||
                         step.dataset.guideImage?.endsWith("voice-input.png");
      guidePhone?.classList.toggle("is-framed-screenshot", !isUnframed);
    }
    if (guidePreviewTitle) guidePreviewTitle.textContent = step.dataset.guideTitle;
    if (guideCount) guideCount.textContent = `Крок ${step.dataset.guideStep} із ${guideSteps.length}`;
  });
});
