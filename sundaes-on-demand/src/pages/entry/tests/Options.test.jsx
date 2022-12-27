import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

test("should display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("should display image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "M&Ms topping",
    "Hot fudge topping",
    "Peanut butter cups topping",
  ]);
});

test("should not update subtotal if invalid scoops are added", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  const scoopsSubtotal = await screen.findByText(/scoops total:/i);

  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "-1");

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "11");

  expect(scoopsSubtotal).toHaveTextContent("0.00");
  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "1.5");

  expect(scoopsSubtotal).toHaveTextContent("0.00");
});
