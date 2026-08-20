import { createClient } from 'next-sanity';
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
