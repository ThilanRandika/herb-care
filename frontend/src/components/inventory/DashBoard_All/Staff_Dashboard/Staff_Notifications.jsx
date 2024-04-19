import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Staff_Notifications.css"; // Import CSS file for styling

export default function Staff_Notifications() {
  const [approvalProcesses, setApprovalProcesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApprovalProcesses, setFilteredApprovalProcesses] = useState([]);

  useEffect(() => {
    function getApprovalProcesses() {
      axios
        .get("http://localhost:8070/ApprovalProcess/")
        .then((res) => {
          console.log(res.data); // Assuming the data is in res.data
          setApprovalProcesses(res.data); // Set the approval processes state with fetched data
          setFilteredApprovalProcesses(res.data); // Initialize filtered approval processes with all approval processes
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getApprovalProcesses();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filter approval processes based on search query
    const filtered = approvalProcesses.filter((approvalProcess) =>
      approvalProcess.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredApprovalProcesses(filtered);
  };

  return (
    <div className="approval-processes-container">
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApprovalProcesses.map((approvalProcess, index) => (
            <tr key={index}>
              <td>{approvalProcess.name}</td>
              <td>{approvalProcess.category}</td>
              <td>{approvalProcess.price}</td>
              <td>{approvalProcess.quantity}</td>
              <td>{approvalProcess.expireDate}</td>
              <td>{approvalProcess.status}</td>
              <td>{approvalProcess.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
