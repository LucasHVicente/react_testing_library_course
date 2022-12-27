import { render, screen } from "../../../test-utils/testing-library-utils";
import { OrderConfirmation } from "../OrderConfirmation";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("should render error message if server returns an error", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030", (req, res, ctx) => res(ctx.status(500)))
  );
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "An unexpected error ocurred. Please try again later."
  );
});
