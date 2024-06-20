import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../pendingOrders/sellerApprovelPendingOrders.css'; // Import shared CSS file
import { AuthContext } from '../../../../context/AuthContext';
import config from "../../../../config";

function SellerOngoingOrders() {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`${config.BASE_URL}/sellerOrder/ongoingOrders/${user.sellerId}`)
        .then((res) => {
            console.log(res.data);
            setOrders(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const handleGenerateOrderInvoice = async (orderId) => {
        try {
          const response = await axios.get(`${config.BASE_URL}/sellerOrder/generateOrderInvoice/${orderId}/${user.sellerId}`, {
            responseType: 'blob', // Receive response as Blob (binary data)
          });
      
          // Create a blob URL for the PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
      
          // Create a link element to trigger the download
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `invoice_${orderId}.pdf`);
          document.body.appendChild(link);
          link.click();
      
          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error generating invoice:', error);
        }
      };

    return (
        <div className="seller-approvel-pending-orders-container">
            <h2 className="seller-order-history-heading">Ongoing Orders</h2>
            <table className="seller-order-history-table">
                <thead>
                    <tr>
                        <th className="seller-order-id">Order Id</th>
                        <th className="seller-order-price">Price</th>
                        <th className="seller-payment-method">Payment Method</th>
                        <th className="seller-order-status">Status</th>
                        <th className="seller-order-date">Date</th>
                        <th className="seller-order-actions">Invoice</th>
                        <th className="seller-order-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className={`seller-order-row-${index}`}>
                            <td>{order.orderviewId}</td>
                            <td>{order.price}</td>
                            <td>{order.paymentMethod}</td>
                            <td className={`seller-order-status-${order.status.toLowerCase()}`}>{order.status}</td>
                            <td>{order.date}</td>
                            <td>
                                <span className="seller-view-order-invoice" onClick={() => handleGenerateOrderInvoice(order.id)}>get invoice</span>
                            </td>
                            <td>
                                <Link to={`/sellerMainHome/singleOrder/${order.id}`} className="seller-view-order-link">
                                    View Order
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SellerOngoingOrders;
