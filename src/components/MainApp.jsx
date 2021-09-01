import React from "react";
import { useContext } from "react";
import { NavCtx } from "../Contexts/NavContext";
import BuyWindow from "./windows/BuyWindow";
import MintWindow from "./windows/MintWindow";
import SellWindow from "./windows/SellWindow";

const MainApp = () => {
  const { page } = useContext(NavCtx);

  return (
    <>
      {page === "buy" ? (
        <BuyWindow />
      ) : page === "sell" ? (
        <SellWindow />
      ) : (
        <MintWindow />
      )}
    </>
  );
};

export default MainApp;
