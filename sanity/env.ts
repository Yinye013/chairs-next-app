/**
 * Sanity environment configuration, shared by the Next app and the Studio.
 *
 * The two read different prefixes: Next inlines `NEXT_PUBLIC_*`, while the
 * Sanity CLI only exposes `SANITY_STUDIO_*`. This checks both so one
 * `.env.local` serves both, and fails fast at import rather than producing a
 * confusing empty product grid at runtime.
 */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_STUDIO_PROJECT_ID for the Studio)',
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET (or SANITY_STUDIO_DATASET for the Studio)',
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_STUDIO_API_VERSION ||
  '2024-10-01';
