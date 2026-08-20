import { defineCliConfig } from 'sanity/cli';

/**
 * Config for the `sanity` CLI (`npm run studio`, `npm run studio:deploy`).
 *
 * The values are inline rather than imported from sanity/env.ts because the
 * CLI reads this file *before* it loads any .env file, so anything that
 * asserts on process.env throws here. Both are public identifiers — the
 * project id already ships in the client bundle — so there is nothing secret
 * to leak.
 *
 * Separate from sanity.config.ts, which configures the Studio app itself.
 */
export default defineCliConfig({
  api: {
    projectId: '73w2jeo6',
    dataset: 'production',
  },
});
