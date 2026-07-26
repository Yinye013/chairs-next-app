import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import FadeInSection from '../../components/FadeInSection';

const perks = [
  {
    Icon: Truck,
    title: 'Free Shipping',
    description: 'On every order, nationwide, no minimum spend required.',
  },
  {
    Icon: RotateCcw,
    title: '30-Day Returns',
    description: "Not the right fit? Send it back within 30 days, no questions asked.",
  },
  {
    Icon: ShieldCheck,
    title: 'Lifetime Warranty',
    description: 'Every chair is built to last and backed for as long as you own it.',
  },
];

const ShoppingPerks = () => {
  return (
    <FadeInSection className="section-pad bg-[#F9F9F9]">
      <div className="container">
        <div className="grid grid-cols-1 gap-[4rem] md:grid-cols-3">
          {perks.map(({ Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center gap-[1.2rem]">
              <div className="bg-[#15803d] rounded-full p-4">
                <Icon className="text-white" size={28} />
              </div>
              <h3 className="heading-tertiary">{title}</h3>
              <p className="text-[1.5rem] text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default ShoppingPerks;
