import React from "react";
import Link from "next/link";
import HeroImage from "public\assets\images\gridpic9.jpg";

const Herosection = () => {
  const headingPrimary: string = "For a better life, we design and create ";
  const heroDescription: string =
    "We spend our days in a little store in the centre of Lagos obsessively perfecting our chairs. The end result is a great balance of beauty and comfort that will benefit your health in the long run.";

  return (
    <section className="p-4">
      <main className="container">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="pt-[9.6rem]">
            <h1 className="text-[5.2rem] font-bold tracking-normal leading-[1.1]">
              {headingPrimary}
              <span className="text-green-700">better seats.</span>
            </h1>
            <p className="text-[1.8rem] mt-[2.2rem] tracking-wide">
              {heroDescription}
            </p>

            <Link
              href="/"
              className="inline-block mt-[2.2rem] text-white bg-green-700 text-[1.8rem] py-6 px-14 rounded-lg hover:bg-green-800 transition-all"
            >
              {" "}
              LEARN MORE &darr;
            </Link>
          </div>
          <div>
            <img />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Herosection;
