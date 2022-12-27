import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";
import { OrderSummary } from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState("entry");

  function getComponent() {
    switch (orderPhase) {
      case "entry":
        return <OrderEntry setOrderPhase={setOrderPhase} />;
      case "review":
        return <OrderSummary setOrderPhase={setOrderPhase} />;

      case "confirmation":
        return <OrderConfirmation setOrderPhase={setOrderPhase} />;
      default:
        break;
    }
  }

  return (
    <Container>
      <OrderDetailsProvider>{getComponent()}</OrderDetailsProvider>
    </Container>
  );
}

export default App;
