import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color and updates on click", () => {
  render(<App />);
  //find element by role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  //click the button
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("button is disabled when checkbox is checked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "Disable button",
  });

  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("change button color to gray when disabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "Disable button",
  });
  //disable button
  fireEvent.click(checkbox);
  //button is gray
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  //enable button
  fireEvent.click(checkbox);
  //button is MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("change blue button to gray when disabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", {
    name: "Disable button",
  });
  //change button to MidnightBlue and disable
  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  //button is gray
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  //enable button
  fireEvent.click(checkbox);
  //button is MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("works for one inner capital letters", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
