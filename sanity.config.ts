import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './sanity/env';

/**
 * Sanity Studio config.
 *
 * Studio is hosted separately (`npx sanity deploy` → <project>.sanity.studio)
 * rather than embedded at /studio in this app. Embedding conflicts with
 * `trailingSlash: true` in next.config.js — Next 14 has no per-route override,
 * and dropping it would change every canonical URL on the site. Hosting it
 * apart also keeps ~2MB of Studio JS out of the standalone build, and lets
 * Studio upgrades ship independently of the storefront.
 *
 * Run locally with `npm run studio`.
 */
export default defineConfig({
  name: 'default',
  title: 'The Chair Shop',
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
