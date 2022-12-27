import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

export function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber));
    //TODO extra practice error
  }, []);

  function handleCreateNewOrder() {
    setOrderNumber(null);
    resetOrder();
    setOrderPhase("entry");
  }

  return (
    <Container>
      {orderNumber ? (
        <>
          <h1>Thank you!</h1>
          <h2>Your order number is {orderNumber}</h2>
          <span>as per our terms and conditions, nothing wil happen now</span>
          <Button onClick={handleCreateNewOrder}>Create new order</Button>
        </>
      ) : (
        <span>Loading</span>
      )}
    </Container>
  );
}
