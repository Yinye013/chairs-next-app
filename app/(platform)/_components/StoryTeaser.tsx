import Link from 'next/link';
import ClientLottie from '@/app/components/ClientLottie';
import FadeInSection from '../../components/FadeInSection';

const StoryTeaser = () => {
  return (
    <FadeInSection className="section-pad">
      <div className="container grid grid-cols-1 items-center gap-[3rem] lg:grid-cols-2">
        <div>
          <ClientLottie src="/animations/animation.json" width={20} />
        </div>
        <div>
          <p className="subheading">our story</p>
          <h2 className="heading-secondary">Crafted With Purpose</h2>
          <p className="text-[1.6rem] tracking-wide leading-relaxed">
            What started as a small team of chair-makers with a shared love
            for the craft has grown into a shop built around one idea:
            seating should feel as good as it looks. Every chair we sell is
            chosen for comfort, durability, and design that lasts.
          </p>
          <Link
            href="/about"
            className="inline-block mt-[2rem] text-green-700 font-semibold text-[1.6rem] hover:underline"
          >
            Read our full story &rarr;
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
};

export default StoryTeaser;
