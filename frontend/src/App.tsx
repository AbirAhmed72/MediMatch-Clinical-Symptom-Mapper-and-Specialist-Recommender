import "./App.css";
import Button from "./components/Button";

function App() {
  const handleClick = () => {
    alert("CLICKED...");
  };

  return (
    <div>
      <Button
        clickEvent={handleClick}
        hoverEvent={() => console.log("MOUSE HOVERED")}
      />
    </div>
  );
}

export default App;
