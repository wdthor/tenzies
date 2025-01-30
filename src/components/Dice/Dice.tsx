import "./dice.css";

interface DiceProps {
  value: number;
  isHeld: boolean;
  id: string;
  holdOneDice: (id: string) => void;
}
const Dice: React.FC<DiceProps> = ({ value, isHeld, id, holdOneDice }) => {
  return (
    <button
      className={`dice ${isHeld ? "dice dice-held" : ""}`}
      onClick={() => holdOneDice(id)}
    >
      {value}
    </button>
  );
};

export default Dice;
