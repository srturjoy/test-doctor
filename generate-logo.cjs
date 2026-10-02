const fs = require('fs');
const { execSync } = require('child_process');

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <!-- Gradients for dynamic swooshes -->
    <linearGradient id="orangeTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#fb923c" />
    </linearGradient>
    <linearGradient id="orangeBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="40%" stop-color="#f97316" />
      <stop offset="80%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
  </defs>

  <!-- Dark navy outer background matching exact reference -->
  <rect width="1000" height="1000" fill="#181343" />

  <!-- Outer circle border track -->
  <circle cx="500" cy="500" r="455" fill="none" stroke="#251b5e" stroke-width="8" />

  <!-- Top orange sweep arch -->
  <path d="M 180 340 C 260 140, 740 140, 820 340 C 760 210, 240 210, 180 340 Z" fill="url(#orangeTopGrad)" />

  <!-- Bottom orange sweep arch -->
  <path d="M 130 570 C 190 890, 810 890, 870 570 C 810 830, 190 830, 130 570 Z" fill="url(#orangeBottomGrad)" />

  <!-- Main circular white container -->
  <circle cx="500" cy="500" r="395" fill="#ffffff" stroke="#241b5a" stroke-width="4" />

  <!-- Inner border ring -->
  <circle cx="500" cy="500" r="388" fill="none" stroke="#f1f5f9" stroke-width="1.5" />

  <!-- LOGO GRAPHICS INSIDE CIRCLE -->
  <g id="logo-content" transform="translate(0, 0)">
    
    <!-- LEFT ICON: Mountain & Sunrise Waves -->
    <g id="mountain-icon" transform="translate(182, 455)">
      <!-- Orange Sunrise Arch over mountain -->
      <path d="M 6 52 C 2 -10, 72 -14, 88 40 C 72 0, 20 6, 6 52 Z" fill="#ea580c" />
      <circle cx="48" cy="22" r="13" fill="#f97316" />
      <!-- Purple Mountain Peaks -->
      <path d="M 10 94 L 38 48 L 56 74 L 78 38 L 108 94 Z" fill="#24185c" />
      <!-- Internal snow/cut lines on mountain -->
      <path d="M 38 48 L 48 64 L 38 72 L 56 74" stroke="#ffffff" stroke-width="3" fill="none" />
      <path d="M 78 38 L 88 56 L 78 66 L 95 86" stroke="#ffffff" stroke-width="3" fill="none" />
    </g>

    <!-- CENTER TEXT: MINDSET & Subtitle -->
    <!-- MIND -->
    <text x="310" y="534" font-family="'Liberation Sans', 'Segoe UI', Arial, sans-serif" font-size="78" font-weight="900" fill="#20165a" letter-spacing="-1">MIND</text>
    
    <!-- Vertical divider line between MIND and SET -->
    <line x1="534" y1="472" x2="534" y2="534" stroke="#20165a" stroke-width="4" />
    
    <!-- SET -->
    <text x="548" y="534" font-family="'Liberation Sans', 'Segoe UI', Arial, sans-serif" font-size="78" font-weight="900" fill="#ea580c" letter-spacing="-1">SET</text>

    <!-- Orange underline under MINDSET -->
    <rect x="312" y="546" width="398" height="6.5" rx="3" fill="#ea580c" />

    <!-- Subtitle: PSYCHOTHERAPY & COUNSELING CENTER -->
    <text x="312" y="574" font-family="'Liberation Sans', 'Segoe UI', Arial, sans-serif" font-size="18.5" font-weight="900" fill="#20165a" letter-spacing="0.8">PSYCHOTHERAPY &amp; COUNSELING CENTER</text>

    <!-- VERTICAL DIVIDER TO LAW SECTION -->
    <line x1="728" y1="462" x2="728" y2="584" stroke="#20165a" stroke-width="2.5" />

    <!-- RIGHT SECTION: GAVEL & LAW & LEGAL AID -->
    <g id="gavel-section" transform="translate(744, 452)">
      <!-- Gavel Mallet & Handle -->
      <g transform="translate(18, 8) rotate(-25)">
        <!-- Mallet Head -->
        <rect x="18" y="2" width="40" height="20" rx="4" fill="#24185c" />
        <rect x="15" y="0" width="6" height="24" rx="2" fill="#24185c" />
        <rect x="55" y="0" width="6" height="24" rx="2" fill="#24185c" />
        <!-- Handle -->
        <rect x="34" y="22" width="7" height="42" rx="3" fill="#ea580c" />
      </g>
      <!-- Sounding Block Base -->
      <path d="M 8 58 L 58 58 L 52 68 L 14 68 Z" fill="#ea580c" />
      <rect x="4" y="68" width="58" height="5" rx="2" fill="#24185c" />

      <!-- LAW & LEGAL AID Text -->
      <text x="32" y="94" text-anchor="middle" font-family="'Liberation Sans', 'Segoe UI', Arial, sans-serif" font-size="20" font-weight="900" fill="#20165a" letter-spacing="0.5">LAW &amp;</text>
      <text x="32" y="116" text-anchor="middle" font-family="'Liberation Sans', 'Segoe UI', Arial, sans-serif" font-size="18" font-weight="900" fill="#20165a" letter-spacing="0.2">LEGAL AID</text>
    </g>

  </g>
</svg>`;

fs.writeFileSync('public/logo.svg', svgContent);
console.log('Saved public/logo.svg');

try {
  execSync('convert -density 300 public/logo.svg -resize 1024x1024 public/logo.png');
  execSync('convert -density 150 public/logo.svg -resize 192x192 public/favicon.png');
  console.log('Successfully generated public/logo.png and public/favicon.png');
} catch (err) {
  console.error('Convert failed, copying generated jpg or fallback:', err.message);
}
