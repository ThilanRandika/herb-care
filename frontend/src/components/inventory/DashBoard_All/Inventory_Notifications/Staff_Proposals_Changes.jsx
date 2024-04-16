import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Staff_Proposals_Changes.css"; // Import CSS file for styling

export default function StaffProposalsChanges() {
  const [proposals, setProposals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProposals, setFilteredProposals] = useState([]);

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
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal._id === id ? { ...proposal, status: newStatus } : proposal
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
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
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Expire Date</th>
            <th>Update</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {filteredProposals.map((proposal, index) => (
            <tr key={index}>
              <td>{proposal.name}</td>
              <td>{proposal.category}</td>
              <td>{proposal.price}</td>
              <td>{proposal.quantity}</td>
              <td>{proposal.expireDate}</td>
              <td>
                <button >Update</button>
              </td>
              <td>
                <button onClick={() => handleAction(proposal._id, "Approved")}>Approve</button>
              </td>
              <td>
                <button onClick={() => handleAction(proposal._id, "Rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
