import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";

test("should turn input box red when invalid", async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);

  const chocolateInput = screen.getByRole("spinbutton");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");

  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "11");

  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1.5");

  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  expect(chocolateInput).not.toHaveClass("is-invalid");
});
