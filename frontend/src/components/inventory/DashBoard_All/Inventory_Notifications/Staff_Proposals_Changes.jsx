import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Staff_Proposals_Changes.css"; // Import CSS file for styling

export default function StaffProposalsChanges() {
  const [proposals, setProposals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [statusChanges, setStatusChanges] = useState({});

  useEffect(() => {
    function getProposals() {
      axios
        .get("http://localhost:8070/ApprovalProcess/")
        .then((res) => {
          console.log(res.data); // Assuming the data is in res.data
          setProposals(res.data); // Set the proposals state with fetched data
          setFilteredProposals(res.data); // Initialize filtered proposals with all proposals
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProposals();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filter proposals based on search query
    const filtered = proposals.filter((proposal) =>
      proposal.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProposals(filtered);
  };

  // Function to handle approval or rejection of proposal
  const handleAction = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8070/ApprovalProcess/${id}`, { status: newStatus });
      // Update the status in the state
      setStatusChanges({ ...statusChanges, [id]: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // Function to extract only the date part from the datetime string
  const extractDate = (dateTimeString) => {
    return dateTimeString.split("T")[0];
  };

  return (
    <div className="staff-proposals-changes-container">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table className="proposals-table">
        <thead>
          <tr>
            <th className="table-header">Product Name</th>
            <th className="table-header">Category</th>
            <th className="table-header">Price</th>
            <th className="table-header">Quantity</th>
            <th className="table-header">Expire Date</th>
            <th className="table-header">Update</th>
            <th className="table-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProposals.map((proposal, index) => (
            <tr key={index}>
              <td className="table-item">{proposal.name}</td>
              <td className="table-item">{proposal.category}</td>
              <td className="table-item">{proposal.price}</td>
              <td className="table-item">{proposal.quantity}</td>
              <td className="table-item">{extractDate(proposal.expireDate)}</td> {/* Display only the date part */}
              <td className="table-item">
                <button className="update-button">Update</button>
              </td>
              <td className="table-item">
                {proposal.status === "Pending" ? (
                  <div className="button-container">
                    <button onClick={() => handleAction(proposal._id, "Approved")} className="approve-button">Approve</button>
                    <button onClick={() => handleAction(proposal._id, "Rejected")} className="reject-button">Reject</button>
                  </div>
                ) : (
                  <span>{proposal.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
