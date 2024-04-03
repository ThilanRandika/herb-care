import React from "react";
import SellerBag from "../../../components/sellerPartnership/bag/SellerBag";
import { Link } from "react-router-dom";

function SellerBagPage() {
  return (
    <>
      <SellerBag />
      <Link to={"/sellerHome/checkout"}>
        <button>Checkout</button>
      </Link>
    </>
  );
}

export default SellerBagPage;
