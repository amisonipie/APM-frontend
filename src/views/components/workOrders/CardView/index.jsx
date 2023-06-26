import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./Main";

function CardView({ item }) {
  return (
    <div className="cardView">
      <Header item={item} />
      <MainContent item={item} />
      <Footer item={item} />
    </div>
  );
}

export default CardView;
