import "./app.css";
import Dice from "./Dice/Dice";
import { useState } from "react";
import Confetti from "react-confetti";

const App = () => {
  const [allDice, setAllDice] = useState(() => generateAllNewDice());

  const gameWon =
    allDice.every((dice) => dice.isHeld) &&
    allDice.every((dice) => dice.value === allDice[0].value);

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
    if (gameWon) {
      setAllDice(generateAllNewDice());
    } else {
      setAllDice((prevDice) =>
        prevDice.map((dice) =>
          dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
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
      {gameWon ? <Confetti /> : null}
      <section className="dice-container">{diceElements}</section>
      <button className={"roll-button"} onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default App;
