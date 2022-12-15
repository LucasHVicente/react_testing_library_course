import { Alert } from "react-bootstrap";

export default function AlertBanner({
  message = "An unexpected error ocurred. Please try again later.",
  variant = "danger",
}) {
  return (
    <Alert style={{ backgroundColor: "red" }} variant={variant}>
      {message}
    </Alert>
  );
}
