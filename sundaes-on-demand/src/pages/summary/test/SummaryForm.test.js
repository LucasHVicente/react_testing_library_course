import { fireEvent, render, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

describe("Terms and conditons checkbox", () => {
  test("should render checkbox unchecked and button disabled by default", async () => {
    render(<SummaryForm />);
    const checkbox = await screen.findByRole("checkbox", {
      name: /terms and conditions/i,
    });

    const submitButton = await screen.findByRole("button", {
      name: /confirm order/i,
    });

    expect(submitButton).toBeDisabled();

    expect(checkbox).not.toBeChecked();
  });

  test("should enable submit button when checked and disable when unchecked", async () => {
    render(<SummaryForm />);
    const checkbox = await screen.findByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = await screen.findByRole("button", {
      name: /confirm order/i,
    });

    fireEvent.click(checkbox);
    expect(submitButton).toBeEnabled();

    fireEvent.click(checkbox);
    expect(submitButton).toBeDisabled();
  });
});
