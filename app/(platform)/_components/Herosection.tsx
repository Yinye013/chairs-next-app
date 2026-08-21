'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { motion, animate } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const HERO_WORDS = [
  'unmatched comfort.',
  'timeless design.',
  'everyday functionality.',
];

// Widest phrase: reserves the inline box so shorter ones cause no reflow.
const LONGEST_WORD = HERO_WORDS.reduce((a, b) => (b.length > a.length ? b : a));

const Herosection = () => {
  const headingPrimary: string =
    'For a better life, we design and craft chairs that blend ';
  const heroDescription: string =
    'Because every moment you sit should be filled with joy, sparking a sense of inspiration and enveloping you in complete relaxation, making every seat an experience to cherish.';

  // The typewriter starts empty and types character by character, so it cannot
  // be part of the server render: the h1 would paint incomplete (delaying LCP)
  // and reflow on every keystroke. Render the first phrase as real text, then
  // hand over to the typewriter once mounted.
  const [typing, setTyping] = useState(false);
  useEffect(() => setTyping(true), []);

  return (
    <section
      id="hero"
      className="h-[100vh] h-[100dvh] flex justify-center items-center py-[6rem]"
    >
      <main className="container">
        <div className=" flex flex-col gap-[3rem] items-center justify-center text-center">
          <p className="uppercase tracking-[2px] text-[1.3rem] font-semibold text-green-700">
            Free Shipping &middot; 30-Day Returns &middot; Lifetime Warranty
          </p>
          <h1 className="text-center text-[4rem] md:text-[5rem] font-bold leading-[1.2]">
            {headingPrimary}
            {/* Width-stable inline phrase: an invisible copy of the longest
                phrase holds the box open, so typing never reflows the heading.
                min-width needs inline-block — it does not apply to inline boxes.
                Only from md up: at mobile widths the longest phrase is wider
                than the container, so nowrap would overflow the viewport.
                Below md the phrase wraps normally and the reserved two-line
                height keeps the shift off the rest of the page. */}
            <span className="relative block min-h-[2.4em] md:min-h-0 md:inline-block md:align-bottom">
              <span aria-hidden className="hidden md:inline">
                {LONGEST_WORD}
              </span>
              <span className="herosection-p-bg md:absolute md:inset-0 md:whitespace-nowrap md:text-left">
                {typing ? (
                  <Typewriter
                    cursor
                    cursorBlinking
                    delaySpeed={1000}
                    deleteSpeed={50}
                    loop={0}
                    typeSpeed={100}
                    words={HERO_WORDS}
                  />
                ) : (
                  HERO_WORDS[0]
                )}
              </span>
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
