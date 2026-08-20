import localFont from 'next/font/local';

/**
 * Satoshi (Indian Type Foundry, via Fontshare) — self-hosted because it isn't
 * on Google Fonts. Both files are variable fonts spanning weights 300–900, so
 * two requests cover every weight the app uses instead of one per weight.
 *
 * `next/font/local` hashes and self-hosts these at build time, which removes
 * the render-blocking external stylesheet the old Inter `@import` needed and
 * eliminates layout shift via a generated size-adjusted fallback.
 */
export const satoshi = localFont({
  src: [
    {
      path: './Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal',
    },
    {
      path: './Satoshi-VariableItalic.woff2',
      weight: '300 900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
