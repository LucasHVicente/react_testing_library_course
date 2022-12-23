import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("should update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("should update toppings subtotal when toppings are selected", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  //assert default subtotal to $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  //update subtotal on click
  const mmsCheckbox = await screen.findByRole("checkbox", { name: /m&ms/i });
  await user.click(mmsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: /hot fudge/i,
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  //remove topping and update subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("should grand total update if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");

    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    //add scoop
    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, "1");
    //assert updated grand total
    expect(grandTotal).toHaveTextContent("2.00");

    //add topping and update grand total
    const mmsTopping = await screen.findByRole("checkbox", { name: /m&ms/i });
    await user.click(mmsTopping);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("should grand total update if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const mmsTopping = await screen.findByRole("checkbox", { name: /m&ms/i });

    //add topping and update grand total
    await user.click(mmsTopping);
    expect(grandTotal).toHaveTextContent("1.50");

    //add scoop and update grand total
    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateScoop);
    await user.type(chocolateScoop, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("should grand total update if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const mmsTopping = await screen.findByRole("checkbox", { name: /m&ms/i });

    //add toppingand update grand total
    await user.click(mmsTopping);

    //remove topping and update grand total
    await user.click(mmsTopping);
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
