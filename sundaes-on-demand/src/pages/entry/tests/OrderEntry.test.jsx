import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";

import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

test("should handle error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("should disable submit button if no scoops are added", async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  const submitOrderButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });
  expect(submitOrderButton).toBeDisabled();
  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "1");
  expect(submitOrderButton).toBeEnabled();

  await user.clear(chocolateScoop);
  await user.type(chocolateScoop, "0");
  expect(submitOrderButton).toBeDisabled();
});
