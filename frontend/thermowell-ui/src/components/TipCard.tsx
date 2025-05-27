import { type Tip } from "../data/mockTips";

type Props = {
  tip: Tip;
};

const TipCard = ({ tip }: Props) => (
  <div className="p-4 border rounded-md shadow mb-4 bg-blue-50">
    <h3 className="text-lg font-semibold text-blue-800">{tip.title}</h3>
    <p className="text-sm text-blue-700 mt-1">{tip.description}</p>
  </div>
);

export default TipCard;
