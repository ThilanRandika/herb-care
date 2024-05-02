import { useEffect, useState } from 'react';
import './staffRefundRequests.css';
import axios from 'axios';

function StaffRefundRequests() {
    const [refundRequests, setRefundRequests] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchRefundRequests();
    }, []);

    const fetchRefundRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/refund/pendingRefunds`);
            setRefundRequests(response.data);
        } catch (error) {
            console.error('Error getting refund requests', error);
        }
    };

    const handleMarkAsCompleted = async (refundId) => {
        try {
            await axios.put(`http://localhost:8070/refund/completeRefund/${refundId}`);
            setShowAlert(true); // Show success alert
            // Re-fetch refund requests after marking as completed
            fetchRefundRequests();
            // Hide success alert after 3 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to mark refund as completed', error);
        }
    };

    return (
        <>
            <div className='consultation-staff-refundRequests'>
                <h3>Refund Requests</h3>
                {showAlert && (
                    <div className="alert alert-success" role="alert">
                        Refund completed successfully!
                    </div>
                )}
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
