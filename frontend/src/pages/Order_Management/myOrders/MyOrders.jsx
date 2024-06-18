
import Header from "../../../components/common/header/header";
import CompletedOrders from "../../../components/order/completedOrders/CompletedOrders";
import CustomerOngoingOrders from "../../../components/order/ongoingOrders/CustomerOngoingOrders";
import Footer from '../../../components/common/footer/footer';
import './myOrders.css'
import { Route, Routes } from "react-router-dom";
import CustomerOneOrder from "../../../components/order/oneOrder/CustomerOneOrder";


function MyOrders() {


    return (
        <>
        <Header/>
        <div className="my-orders-all-contents">
            <CustomerOngoingOrders/>
            <CompletedOrders/>
        </div>
        <Footer/>

        <Routes>
        <Route path="/customerOneOrder/:id" element={< CustomerOneOrder/>} />
      </Routes>
        </>
    );
}

export default MyOrders;
