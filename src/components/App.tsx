import "./app.css";
import Dice from "./Dice/Dice";

const App = () => {
  return (
    <main>
      <section className="dice-container">
        <Dice value={1} />
        <Dice value={2} />
        <Dice value={3} />
        <Dice value={4} />
        <Dice value={5} />
        <Dice value={6} />
        <Dice value={7} />
        <Dice value={8} />
        <Dice value={9} />
        <Dice value={10} />
      </section>
    </main>
  );
};

export default App;
