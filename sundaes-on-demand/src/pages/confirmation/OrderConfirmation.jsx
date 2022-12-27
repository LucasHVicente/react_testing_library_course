import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [error, setError] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((e) => setError(true));
    //TODO extra practice error
  }, []);

  function handleCreateNewOrder() {
    setOrderNumber(null);
    resetOrder();
    setOrderPhase("entry");
  }

  const createNewOrderButton = (
    <Button onClick={handleCreateNewOrder}>Create new order</Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner />
        {createNewOrderButton}
      </>
    );
  }

  return (
    <Container>
      {orderNumber ? (
        <>
          <h1>Thank you!</h1>
          <h2>Your order number is {orderNumber}</h2>
          <span>as per our terms and conditions, nothing wil happen now</span>
          {createNewOrderButton}
        </>
      ) : (
        <span>Loading</span>
      )}
    </Container>
  );
}
