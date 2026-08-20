/**
 * One-off migration: the 18 hand-written products in app/utils/testFile.ts
 * become Sanity documents, with their local images uploaded as assets.
 *
 *   npx tsx scripts/migrate-products.ts --dry-run   # inspect, write nothing
 *   npx tsx scripts/migrate-products.ts             # commit
 *
 * Idempotent: document _ids are derived from the slug and images are deduped
 * by Sanity on content hash, so re-running converges rather than duplicating.
 *
 * Requires SANITY_API_WRITE_TOKEN (un-prefixed — this never runs in a browser).
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { config } from 'dotenv';
import { productsArr } from '../app/utils/testFile';

config({ path: '.env.local' });

const dryRun = process.argv.includes('--dry-run');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET',
  );
}
if (!token && !dryRun) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN (required unless --dry-run)');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token,
  useCdn: false,
});

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

/** 'Weighs 20kg' -> 20. Throws rather than silently writing NaN. */
function parseWeight(value: string): number {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  if (!match) {
    throw new Error(`Could not parse a weight from "${value}"`);
  }
  return Number(match[1]);
}

async function uploadImage(imgPath: string) {
  const filePath = join(process.cwd(), 'public', imgPath);
  const buffer = readFileSync(filePath);
  const ext = extname(filePath).toLowerCase();
  const contentType = MIME[ext];
  if (!contentType) {
    throw new Error(`Unsupported image extension "${ext}" for ${imgPath}`);
  }
  const asset = await client.assets.upload('image', buffer, {
    filename: basename(filePath),
    contentType,
  });
  return asset._id;
}

async function main() {
  console.log(
    `${dryRun ? '[dry run] ' : ''}Migrating ${productsArr.length} products to ${projectId}/${dataset}\n`,
  );

  const docs = [];

  for (let index = 0; index < productsArr.length; index++) {
    const p = productsArr[index];
    const weightKg = parseWeight(p.listItemFour);

    let assetId: string | null = null;
    if (!dryRun) {
      assetId = await uploadImage(p.imgPath);
    }

    docs.push({
      // Deterministic id keyed on the slug, so re-runs replace rather than duplicate.
      _id: `product-${p.id}`,
      _type: 'product',
      title: p.title,
      slug: { _type: 'slug', current: p.id },
      price: p.price,
      useCase: p.listItemOne,
      comfort: p.listItemTwo,
      material: p.listItemThree,
      weightKg,
      // Reproduces today's `productsArr.slice(0, 9)` in FeaturedChairs and the
      // implicit array ordering, so nothing moves visually post-migration.
      featured: index < 9,
      order: index,
      stock: 10,
      description: '',
      ...(assetId
        ? {
            image: {
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId },
              alt: p.title,
            },
          }
        : {}),
    });

    console.log(
      `  ${String(index + 1).padStart(2)}. ${p.id.padEnd(20)} ${p.title} — ₦${p.price.toLocaleString()}, ${weightKg}kg${index < 9 ? ', featured' : ''}`,
    );
  }

  if (dryRun) {
    console.log('\n[dry run] Nothing written. Re-run without --dry-run.');
    return;
  }

  await docs
    .reduce((tx, doc) => tx.createOrReplace(doc), client.transaction())
    .commit();

  console.log(`\nCommitted ${docs.length} products.`);
}

main().catch((err) => {
  console.error('\nMigration failed:', err.message);
  process.exit(1);
});
