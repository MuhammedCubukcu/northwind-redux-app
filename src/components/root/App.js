import React from "react";
import Navi from "../navi/Navi";
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import {Routes , Route } from "react-router-dom"
import CartDetail from "../cart/CartDetail";

function App() {

  return (
    <Container>
      <Navi />
      <Routes>
        <Route path=""  component={Dashboard} />
        <Route path="product"  component={Dashboard} />
        <Route path="cart"  component={CartDetail} />
      </Routes>
      <Dashboard />
    </Container>
  );
}

export default App;
