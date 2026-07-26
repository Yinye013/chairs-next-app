import FadeInSection from '../../components/FadeInSection';

const tips = [
  {
    title: 'Keep it out of direct sun',
    description:
      'Prolonged sunlight can fade fabric and dry out leather over time. Position chairs away from windows when you can.',
  },
  {
    title: 'Clean spills right away',
    description:
      'Blot, don’t rub, and use a mild soap solution for fabric or a leather-safe cleaner to keep the finish looking new.',
  },
  {
    title: 'Tighten hardware seasonally',
    description:
      'A quick check of screws and joints every few months keeps frames sturdy and prevents squeaks.',
  },
];

const CareTips = () => {
  return (
    <FadeInSection className="section-pad bg-[#F9F9F9]">
      <div className="container">
        <p className="subheading">keep it looking new</p>
        <h2 className="heading-secondary">Chair Care Tips</h2>
        <div className="grid grid-cols-1 gap-[3rem] md:grid-cols-3">
          {tips.map(({ title, description }) => (
            <div key={title} className="bg-white rounded-lg p-[2.4rem] shadow-sm">
              <h3 className="heading-tertiary">{title}</h3>
              <p className="text-[1.5rem] text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default CareTips;
