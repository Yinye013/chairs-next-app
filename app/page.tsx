import Herosection from './(platform)/_components/Herosection';
import About from './(platform)/_components/About';
import FeaturedChairs from './(platform)/_components/FeaturedChairs';
import ShoppingPerks from './(platform)/_components/ShoppingPerks';
import StoryTeaser from './(platform)/_components/StoryTeaser';
import Features from './(platform)/_components/Features';
import CareTips from './(platform)/_components/CareTips';
import Testimonials from './(platform)/_components/Testimonials';
import ShipsTo from './(platform)/_components/ShipsTo';
import CallToAction from './(platform)/_components/CallToAction';

const Home = () => {
  return (
    <>
      <Herosection />
      <About />
      <FeaturedChairs />
      <ShoppingPerks />
      <StoryTeaser />
      <Features />
      <CareTips />
      <Testimonials />
      <ShipsTo />
      <CallToAction />
    </>
  );
};

export default Home;
