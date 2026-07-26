import FadeInSection from '../../components/FadeInSection';

const regions = [
  { code: 'USA', name: 'United States' },
  { code: 'CAN', name: 'Canada' },
  { code: 'GBR', name: 'United Kingdom' },
  { code: 'AUS', name: 'Australia' },
];

const ShipsTo = () => {
  return (
    <FadeInSection className="section-pad">
      <div className="container text-center">
        <p className="subheading">where we deliver</p>
        <h2 className="heading-secondary">We Ship To</h2>
        <div className="flex flex-wrap justify-center gap-[2.4rem]">
          {regions.map((region) => (
            <div
              key={region.code}
              className="border border-gray-200 rounded-lg px-[2.4rem] py-[1.2rem] text-[1.6rem] font-semibold"
            >
              {region.name}
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default ShipsTo;
