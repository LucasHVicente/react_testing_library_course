import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  render(<App />);

  //add icecream scoops and toppings
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "1");
  const mmsTopping = await screen.findByRole("checkbox", { name: /m&ms/i });
  await user.click(mmsTopping);

  //find and click order button
  const orderSundaeButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });
  await user.click(orderSundaeButton);
  //check summary info based on order
  //    check totals
  const scoopsTotal = screen.getByRole("heading", { name: /scoops: \$/i });
  const toppingsTotal = screen.getByRole("heading", { name: /toppings: \$/i });
  expect(scoopsTotal).toHaveTextContent("2.00");
  expect(toppingsTotal).toHaveTextContent("1.50");

  //    check items
  const orderItems = screen.getAllByRole("listitem");
  const orderItemsList = orderItems.map((item) => item.textContent);
  expect(orderItemsList).toEqual(["1 Chocolate", "M&Ms"]);

  //accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsCheckbox);
  const submitOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(submitOrderButton);

  //confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/your order number is /i);
  expect(orderNumber).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);
  //check that scoops and toppings subtotals have been reset

  const scoopsSubtotal = await screen.findByText(/scoops total: \$/i);
  const toppingsSubtotal = await screen.findByText(/toppings total: \$/i);
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});
