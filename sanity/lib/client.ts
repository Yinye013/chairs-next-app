// `@sanity/client` directly, not `next-sanity`. next-sanity re-exports
// createClient wrapped in its live-preview stack (@sanity/preview-kit,
// channels, comlink, stega) — ~160KB that landed in the statically prerendered
// homepage chunk even though this module is server-only and none of that
// tooling is used here. Same client, same options, none of the payload.
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '../env';

/**
 * Read-only Sanity client for the storefront.
 *
 * Kept separate from `app/utils/apiClient.ts` (the NestJS auth client) on
 * purpose — different hosts, different auth, different failure modes.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});
