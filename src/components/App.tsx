import "./app.css";
import Dice from "./Dice/Dice";
import { useState } from "react";

const App = () => {
  const [allDice, setAllDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: crypto.randomUUID(),
      };
    });
  }

  function rollDice() {
    setAllDice(generateAllNewDice());
  }

  function holdOneDice(id: string) {
    setAllDice((prevDice) =>
      prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const diceElements = allDice.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      id={dice.id}
      holdOneDice={holdOneDice}
    />
  ));
  return (
    <main>
      <section className="dice-container">{diceElements}</section>
      <button className={"roll-button"} onClick={rollDice}>
        Roll
      </button>
    </main>
  );
};

export default App;
