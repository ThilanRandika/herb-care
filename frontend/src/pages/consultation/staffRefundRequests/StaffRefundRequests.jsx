import { useEffect, useState } from 'react';
import './staffRefundRequests.css';
import axios from 'axios';

function StaffRefundRequests() {

    const  [refundRequests, setRefundRequests] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8070/refund/pendingRefunds`)
            .then((res) => {
                console.log("Got data: ", res.data);
                setRefundRequests(res.data);
            })
            .catch((err) => {
                console.log('Error getting RefundRequests', err);
            });
    }, []);

    const handleMarkAsCompleted = async (refundId) => {
        try {
            await axios.put(`http://localhost:8070/refund/completeRefund/${refundId}`);
            // Update the refund status locally after successful completion
            setRefundRequests(prevRefundRequests => {
                return prevRefundRequests.map(refund => {
                    if (refund._id === refundId) {
                        return { ...refund, refundStatus: "Completed" };
                    }
                    return refund;
                });
            });
        } catch (error) {
            console.error('Failed to mark refund as completed', error);
        }
    };

    return (
        <>
            <div>
                <h3>Refund Requests</h3>
                <table style={{ marginTop: "5%" }}>
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Date</th>
                            <th scope="col">Refund Type</th>
                            <th scope="col">Refund Amount</th>
                            <th scope="col">Bank Account Details</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {refundRequests.map((refund, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{refund.refundDateTime}</td>
                                <td>{refund.refundType}</td>
                                <td>{refund.refundAmount}</td>
                                <td>{refund.bankAccountDetails}</td>
                                <td>{refund.refundStatus}</td>
                                <td>
                                    {refund.refundStatus !== 'Completed' && (
                                        <button variant="primary" onClick={() => handleMarkAsCompleted(refund._id)}>Mark as completed</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StaffRefundRequests;
