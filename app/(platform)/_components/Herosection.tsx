'use client';
import Link from 'next/link';
import Image from 'next/image';
// import { motion, animate } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const Herosection = () => {
  const headingPrimary: string =
    'For a better life, we design and craft chairs that blend ';
  const heroDescription: string =
    'Because every moment you sit should be filled with joy, sparking a sense of inspiration and enveloping you in complete relaxation, making every seat an experience to cherish.';

  return (
    <section className="h-[100vh] flex justify-center items-center">
      <main className="container">
        <div className=" flex flex-col gap-[3rem] items-center justify-center text-center">
          <h1 className="text-center text-[4rem] md:text-[5rem] font-bold leading-[1.2]">
            {headingPrimary}{' '}
            <span className="herosection-p-bg">
              <Typewriter
                cursor
                cursorBlinking
                delaySpeed={1000}
                deleteSpeed={50}
                loop={0}
                typeSpeed={100}
                words={[
                  'unmatched comfort.',
                  'timeless design.',
                  'everyday functionality.',
                ]}
              />
            </span>
          </h1>

          <p className="text-[1.8rem] text-center tracking-wide">
            {heroDescription}
          </p>

          <Link
            href="#about"
            className="inline-block text-center text-white bg-green-700 text-[1.8rem] py-6 px-14 rounded-lg hover:bg-green-800 transition-all"
          >
            {' '}
            LEARN MORE &darr;
          </Link>
        </div>
        {/* <motion.div
            className="flex items-center"
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
          >
            <img src={'/assets/images/whitesofa.webp'} alt={'hero image'} className="mx-auto w-[100%] md:h-[300px]" />
          </motion.div> */}
      </main>
    </section>
  );
};

export default Herosection;
