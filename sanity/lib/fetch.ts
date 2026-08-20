import 'server-only';
import { client } from './client';

/**
 * Single entry point for every Sanity read.
 *
 * Routing all queries through here means adding draft/preview mode or webhook
 * revalidation later is a change to this one file rather than to every
 * component. The cache tags let a future `/api/revalidate` route purge product
 * content on publish, instead of waiting out the revalidate window.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = ['product'],
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}
