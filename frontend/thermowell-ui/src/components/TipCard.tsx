const TipCard = ({ tip }: { tip: { title: string; description: string; icon?: string } }) => (
  <div className="w-full">
    <div className="flex items-center gap-2 mb-1">
      {tip.icon && <span className="text-xl" aria-hidden>{tip.icon}</span>}
      <h3 className="text-lg font-semibold font-heading">{tip.title}</h3>
    </div>
    <p className="text-primary mt-1 text-base leading-relaxed">{tip.description}</p>
  </div>
);

export default TipCard;
