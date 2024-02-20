type testObj = {
  imgPath: string;
  testimonial: string;
  clientName: string;
};

export const testArr: Array<testObj> = [
  {
    imgPath: "/assets/testimonial-images/ayo-ogunseinde-sibVwORYqs0-unsplash.jpg",
    testimonial: "These chairs are worth every penny for their durability. A true investment!",
    clientName: "Arthur O",
  },
  {
    imgPath: "/assets/testimonial-images/foto-sushi-6anudmpILw4-unsplash.jpg",
    testimonial: "These chairs changed my space, making it more comfortable and stylish.",
    clientName: "Michael B",
  },
  {
    imgPath: "/assets/testimonial-images/ivana-cajina-_7LbC5J-jw4-unsplash.jpg",
    testimonial: "The ethical considerations in these chair choices won me over.",
    clientName: "Romeo B",
  },
];

type hitusupFiles = {
  imgPath: string;
  id: number;
};

export const hitusupArr: Array<hitusupFiles> = [
  {
    imgPath: "/assets/gridpics/gridpic1.jpg",
    id: 1,
  },
  {
    imgPath: "/assets/gridpics/gridpic2.jpg",
    id: 2,
  },
  {
    imgPath: "/assets/gridpics/gridpic3.jpg",
    id: 3,
  },
  {
    imgPath: "/assets/gridpics/gridpic4.jpg",
    id: 4,
  },
  {
    imgPath: "/assets/gridpics/gridpic5.jpg",
    id: 5,
  },
  {
    imgPath: "/assets/gridpics/gridpic6.jpg",
    id: 6,
  },
  {
    imgPath: "/assets/gridpics/gridpic7.jpg",
    id: 7,
  },
  {
    imgPath: "/assets/gridpics/gridpic8.jpg",
    id: 8,
  },
  {
    imgPath: "/assets/gridpics/gridpic9.jpg",
    id: 9,
  },
];

type cardProps = {
  imgPath: string;
  title: string;
  listItemOne: string;
  listItemTwo: string;
  listItemThree: string;
  listItemFour: string;
  price: number;
  id: number;
};

export const cardArr: Array<cardProps> = [
  {
    imgPath: "/assets/gridpics/gridpic9.jpg",
    title: "The Laid Back",
    listItemOne: "Leisure & Relaxing",
    listItemTwo: "Comfortable for 4h",
    listItemThree: "Vegan Leather",
    listItemFour: "Weighs 16kg",
    price: 250,
    id: 1,
  },
  {
    imgPath: "/assets/gridpics/gridpic4.jpg",
    title: "The Worker Bee",
    listItemOne: "Work",
    listItemTwo: "Comfortable for 8h",
    listItemThree: "Vegan Leather",
    listItemFour: "Weighs 22kg",
    price: 525,
    id: 2,
  },
  {
    imgPath: "/assets/gridpics/gridpic5.jpg",
    title: "The Chair 4/2",
    listItemOne: "Leisure and Relaxing",
    listItemTwo: "Comfortable all day",
    listItemThree: "Organic Cotton",
    listItemFour: "Weighs 80kg",
    price: 800,
    id: 3,
  },
];
