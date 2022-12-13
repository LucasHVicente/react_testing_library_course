import "./App.css";
import { useState } from "react";

export function replaceCamelWithSpaces(color) {
  return color.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? "gray" : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <input
        id="disable-button-checkbox"
        onChange={(e) => setDisabled(e.target.checked)}
        type="checkbox"
        defaultChecked={disabled}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
