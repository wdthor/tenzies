import "./dice.css";

const Dice = ({ value }: { value: number }) => {
  return <button className="dice">{value}</button>;
};

export default Dice;
