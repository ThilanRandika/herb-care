import React from "react";
import './sellerBagPage.css'
import SellerBag from "../../../components/sellerPartnership/bag/SellerBag";

function SellerBagPage() {
  return (
    <>
    <div className="seller-BagPage">
      <SellerBag />
      {/* <Link to={"/sellerMainHome/checkout"}>
        <button>Checkout</button>
      </Link> */}
      </div>
    </>
  );
}

export default SellerBagPage;
