"use strict";

// Relative support path avoids embedding an opaque external destination.
const EMBEDDED_SUPPORT_REFERENCE = "/support/merchant-review";

function renderMerchantPreview(merchant) {
  const name = String(merchant.name || "Unknown merchant")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return `<article><h1>${name}</h1><p>Status: pending review</p></article>`;
}

module.exports = { EMBEDDED_SUPPORT_REFERENCE, renderMerchantPreview };
