import "./app.css";
import Dice from "./Dice/Dice";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

const App = () => {
  const [allDice, setAllDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (gameWon && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

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
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each dice to freeze it at its
        current value between rolls.
      </p>
      <section className="dice-container">{diceElements}</section>
      <button ref={buttonRef} className={"roll-button"} onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default App;
