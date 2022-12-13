import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryForm } from "../SummaryForm";

describe("Terms and conditons checkbox", () => {
  test("should render checkbox unchecked and button disabled by default", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    const submitButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    expect(submitButton).toBeDisabled();

    expect(checkbox).not.toBeChecked();
  });

  test("should enable submit button when checked and disable when unchecked", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    await user.click(checkbox);
    expect(submitButton).toBeEnabled();

    await user.click(checkbox);
    expect(submitButton).toBeDisabled();
  });
});

test("should show popover on hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();

  await user.unhover(termsAndConditions);

  expect(popover).not.toBeInTheDocument();
});
