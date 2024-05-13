import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
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
        className="search-input staff-proposals-search"
      />
      <table className="proposals-table staff-proposals-table">
        <thead>
          <tr>
            <th className="table-header-staff-table-header">Product Name</th>
            <th className="table-header-staff-table-header">Category</th>
            <th className="table-header-staff-table-header">Price</th>
            <th className="table-header-staff-table-header">Quantity</th>
            <th className="table-header-staff-table-header">Expire Date</th>
            {/* <th className="table-header-staff-table-header">Update</th> */}
            <th className="table-header-staff-table-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProposals.map((proposal, index) => (
            <tr key={index}>
              <td className="table-item staff-table-item">{proposal.name}</td>
              <td className="table-item staff-table-item">{proposal.category}</td>
              <td className="table-item staff-table-item">{proposal.price}</td>
              <td className="table-item staff-table-item">{proposal.quantity}</td>
              <td className="table-item staff-table-item">{extractDate(proposal.expireDate)}</td>
              {/* <td className="table-item staff-table-item">
                <Link to={`/Inventory_Dashboard/UpdateProposals/${proposal._id}`}>
                  <button className="staff-proposals-update-button">Update</button>
                </Link>
              </td> */}
              <td className="table-item staff-table-item">
              {proposal.status === "Pending" ? (
                <div className="button-container">
                  <button onClick={() => handleAction(proposal._id, "Approved")} className="Inventory-approve-button">Approve</button>
                  <button onClick={() => handleAction(proposal._id, "Rejected")} className="Inventory-reject-button">Reject</button>
                </div>
              ) : (
                proposal.status === "Approved" ? (
                  <span className="status-approved">{proposal.status}</span>
                ) : proposal.status === "Rejected" ? (
                  <span className="status-rejected">{proposal.status}</span>
                ) : null   
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}


