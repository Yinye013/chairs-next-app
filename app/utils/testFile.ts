import supabase from '../services/supabase';

type testObj = {
  imgPath: string;
  testimonial: string;
  clientName: string;
};

export const testArr: Array<testObj> = [
  {
    imgPath: '/assets/testimonial-images/ayo-ogunseinde-sibVwORYqs0-unsplash.jpg',
    testimonial: 'These chairs are worth every penny for their durability. A true investment!',
    clientName: 'Arthur O',
  },
  {
    imgPath: '/assets/testimonial-images/foto-sushi-6anudmpILw4-unsplash.jpg',
    testimonial: 'These chairs changed my space, making it more comfortable and stylish.',
    clientName: 'Michael B',
  },
  {
    imgPath: '/assets/testimonial-images/ivana-cajina-_7LbC5J-jw4-unsplash.jpg',
    testimonial: 'The ethical considerations in these chair choices won me over.',
    clientName: 'Romeo B',
  },
];

type hitusupFiles = {
  imgPath: string;
  id: number;
};

export const hitusupArr: Array<hitusupFiles> = [
  {
    imgPath: '/assets/gridpics/gridpic1.jpg',
    id: 1,
  },
  {
    imgPath: '/assets/gridpics/gridpic2.jpg',
    id: 2,
  },
  {
    imgPath: '/assets/gridpics/gridpic3.jpg',
    id: 3,
  },
  {
    imgPath: '/assets/gridpics/gridpic4.jpg',
    id: 4,
  },
  {
    imgPath: '/assets/gridpics/gridpic5.jpg',
    id: 5,
  },
  {
    imgPath: '/assets/gridpics/gridpic6.jpg',
    id: 6,
  },
  {
    imgPath: '/assets/gridpics/gridpic7.jpg',
    id: 7,
  },
  {
    imgPath: '/assets/gridpics/gridpic8.jpg',
    id: 8,
  },
  {
    imgPath: '/assets/gridpics/gridpic9.jpg',
    id: 9,
  },
];

export type ProductCardProps = {
  imgPath: string;
  title: string;
  listItemOne: string;
  listItemTwo: string;
  listItemThree: string;
  listItemFour: string;
  price: number;
  id: string;
};

export const productsArr: Array<ProductCardProps> = [
  {
    imgPath: '/assets/gridpics/gridpic1.jpg',
    title: 'The Classic Comfort',
    listItemOne: 'Leisure & Relaxing',
    listItemTwo: 'Comfortable for 6h',
    listItemThree: 'Vegan Leather',
    listItemFour: 'Weighs 20kg',
    price: 275000,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic2.jpg',
    title: 'The Elegant Touch',
    listItemOne: 'Luxury Seating',
    listItemTwo: 'Comfortable all day',
    listItemThree: 'Italian Leather',
    listItemFour: 'Weighs 30kg',
    price: 950,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic3.jpg',
    title: 'The Sturdy Stand',
    listItemOne: 'Work',
    listItemTwo: 'Ergonomic design',
    listItemThree: 'Steel Frame',
    listItemFour: 'Weighs 28kg',
    price: 650,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic4.jpg',
    title: 'The Worker Bee',
    listItemOne: 'Work',
    listItemTwo: 'Comfortable for 8h',
    listItemThree: 'Vegan Leather',
    listItemFour: 'Weighs 22kg',
    price: 525,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic5.jpg',
    title: 'The Chair 4/2',
    listItemOne: 'Leisure and Relaxing',
    listItemTwo: 'Comfortable all day',
    listItemThree: 'Organic Cotton',
    listItemFour: 'Weighs 80kg',
    price: 800,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic6.jpg',
    title: 'The Compact Chill',
    listItemOne: 'Portable',
    listItemTwo: 'Lightweight',
    listItemThree: 'Nylon Fabric',
    listItemFour: 'Weighs 10kg',
    price: 200,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic7.jpg',
    title: 'The Luxury Lounge',
    listItemOne: 'Home Comfort',
    listItemTwo: 'High Durability',
    listItemThree: 'Vegan Leather',
    listItemFour: 'Weighs 24kg',
    price: 825,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic8.jpg',
    title: 'The Office Standard',
    listItemOne: 'Office Chair',
    listItemTwo: 'Adjustable Height',
    listItemThree: 'Mesh Back',
    listItemFour: 'Weighs 15kg',
    price: 315,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic9.jpg',
    title: 'The Laid Back',
    listItemOne: 'Leisure & Relaxing',
    listItemTwo: 'Comfortable for 4h',
    listItemThree: 'Vegan Leather',
    listItemFour: 'Weighs 16kg',
    price: 250,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic10.jpg',
    title: 'The Plush Comfort',
    listItemOne: 'Lounge Chair',
    listItemTwo: 'Cushioned Seat',
    listItemThree: 'Velvet Fabric',
    listItemFour: 'Weighs 35kg',
    price: 710,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic11.jpg',
    title: 'The Ergonomic Elite',
    listItemOne: 'Back Support',
    listItemTwo: 'Memory Foam',
    listItemThree: 'Mesh Backrest',
    listItemFour: 'Weighs 18kg',
    price: 450,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic12.jpg',
    title: 'The Executive Lux',
    listItemOne: 'Executive Chair',
    listItemTwo: 'Premium Leather',
    listItemThree: 'Recliner',
    listItemFour: 'Weighs 32kg',
    price: 1100,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic13.jpg',
    title: 'The Modern Minimal',
    listItemOne: 'Home Decor',
    listItemTwo: 'Sleek Design',
    listItemThree: 'Wood Frame',
    listItemFour: 'Weighs 12kg',
    price: 320,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic14.jpg',
    title: 'The Bold Statement',
    listItemOne: 'Unique Design',
    listItemTwo: 'Comfy Cushion',
    listItemThree: 'Leather Finish',
    listItemFour: 'Weighs 40kg',
    price: 990,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic15.jpg',
    title: 'The Relaxing Recliner',
    listItemOne: 'Leisure',
    listItemTwo: 'Fully Reclines',
    listItemThree: 'Synthetic Leather',
    listItemFour: 'Weighs 38kg',
    price: 900,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic16.jpg',
    title: 'The Cozy Corner',
    listItemOne: 'Home Comfort',
    listItemTwo: 'Semi-Reclines',
    listItemThree: 'Plush Fabric',
    listItemFour: 'Weighs 35kg',
    price: 780,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic17.jpg',
    title: 'The Comfort Cloud',
    listItemOne: 'Leisure & Relaxation',
    listItemTwo: 'Manual Recline',
    listItemThree: 'Vegan Leather',
    listItemFour: 'Weighs 40kg',
    price: 850,
    id: crypto.randomUUID(),
  },
  {
    imgPath: '/assets/gridpics/gridpic18.jpg',
    title: 'The Urban Lounger',
    listItemOne: 'Compact Design',
    listItemTwo: 'Adjustable Backrest',
    listItemThree: 'Water-Resistant Fabric',
    listItemFour: 'Weighs 28kg',
    price: 670,
    id: crypto.randomUUID(),
  },
];

// console.log("Hello there cunts");

// const insertProducts = async () => {

//   const hasInserted = localStorage.getItem("productsInserted");
//   if (hasInserted) {
//     console.log("Products already inserted. Skipping...");
//     return;
//   }
//   const { data, error } = await supabase.from("products").insert(cardArr);

//   if (data) {
//     console.log("Inserted products:", data);
//     localStorage.setItem("productsInserted", "true");
//   }
//   if (error) {
//     console.error("Insertion error:", error);
//   }
// };

// insertProducts();
