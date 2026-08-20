import { defineField, defineType } from 'sanity';

/**
 * Product catalog document.
 *
 * The four `listItemOne..Four` fields from the old static array are given real
 * names here — an editor typing into a CMS cannot be expected to know that
 * "listItemThree" means material.
 *
 * `slug` is load-bearing: it is the cart line-item id persisted in visitors'
 * localStorage, and the key future backend orders will reference. It must
 * never be replaced by Sanity's `_id`.
 */
export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used in URLs and as the cart/order key. Changing this on an existing product will orphan it from carts and past orders.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image' as const,
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (NGN)',
      type: 'number',
      description: 'Whole naira, no decimals.',
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: 'useCase',
      title: 'Use case',
      type: 'string',
      options: {
        list: [
          'Leisure & Relaxing',
          'Luxury Seating',
          'Work',
          'Home Comfort',
          'Home Decor',
          'Office Chair',
          'Executive Chair',
          'Lounge Chair',
          'Portable',
          'Compact Design',
          'Back Support',
          'Unique Design',
          'Leisure',
          'Leisure & Relaxation',
        ],
      },
    }),
    defineField({
      name: 'comfort',
      title: 'Comfort',
      type: 'string',
      description: 'Free text, e.g. "Comfortable for 6h" or "Fully Reclines".',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      options: {
        list: [
          'Vegan Leather',
          'Italian Leather',
          'Premium Leather',
          'Synthetic Leather',
          'Leather Finish',
          'Steel Frame',
          'Wood Frame',
          'Mesh Back',
          'Mesh Backrest',
          'Organic Cotton',
          'Nylon Fabric',
          'Velvet Fabric',
          'Plush Fabric',
          'Water-Resistant Fabric',
          'Memory Foam',
          'Cushioned Seat',
          'Recliner',
          'Adjustable Height',
          'Adjustable Backrest',
          'Sleek Design',
          'Comfy Cushion',
          'Ergonomic design',
          'High Durability',
          'Lightweight',
          'Semi-Reclines',
          'Manual Recline',
        ],
      },
    }),
    defineField({
      name: 'weightKg',
      title: 'Weight (kg)',
      type: 'number',
      description: 'Stored as a number; the UI renders "Weighs 20kg".',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text' as const,
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in the homepage "Featured Chairs" carousel.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      description:
        'Display only. The backend owns the authoritative count once orders exist.',
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference' as const,
      to: [{ type: 'category' }],
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'image' },
  },
});
