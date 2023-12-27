"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Herosection = () => {
  const headingPrimary: string = "For a better life, we design and create ";
  const heroDescription: string =
    "We spend our days in a little store in the centre of the world obsessively perfecting our chairs. The end result is a great balance of beauty and comfort that will benefit your health in the long run.";

  return (
    <section className="pt-[4.8rem] pb-[9.6rem]">
      <main className="container">
        <div className="grid lg:grid-cols-2 gap-14">
          <div className="pt-[5.2rem]">
            <div className="mb-[3.2rem]">
              <h1 className="heading-primary">{headingPrimary}</h1>
              <div className="flex justify-center lg:justify-start">
                <span className="heading-primary text-center text-green-700 inline-block lg:text-left ">
                  <Typewriter
                    cursor
                    cursorBlinking
                    delaySpeed={1000}
                    deleteSpeed={50}
                    loop={0}
                    typeSpeed={100}
                    words={[
                      "better seats.",
                      "comfort for you.",
                      "quality assurance.",
                    ]}
                  />
                </span>
              </div>
            </div>

            <p className="text-[1.8rem] text-center mb-[1.6rem] tracking-wide lg:text-left">
              {heroDescription}
            </p>

            <Link
              href="#about"
              className="inline-block mt-[2.2rem] text-center text-white bg-green-700 text-[1.8rem] py-6 px-14 rounded-lg hover:bg-green-800 transition-all lg:text-left"
            >
              {" "}
              LEARN MORE &darr;
            </Link>
          </div>
          <div>
            <Image
              src={"/assets/images/hero.jpg"}
              alt={"hero image"}
              width={500}
              height={450}
              className="mx-auto"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Herosection;
