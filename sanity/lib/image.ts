import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from '../env';

const builder = imageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity CDN URL for an image reference.
 *
 * Prefer this over the raw `asset->url` from GROQ: it lets the CDN resize and
 * serve WebP instead of shipping the full-size original.
 *
 *   urlFor(product.imageRef).width(800).height(500).url()
 */
export function urlFor(source: Image) {
  return builder.image(source).auto('format').fit('max');
}
