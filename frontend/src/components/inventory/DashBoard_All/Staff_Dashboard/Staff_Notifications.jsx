import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Staff_Notifications.css"; // Import CSS file for styling
import config from "../../../../config";

export default function Staff_Notifications() {
  const [approvalProcesses, setApprovalProcesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApprovalProcesses, setFilteredApprovalProcesses] = useState([]);

  useEffect(() => {
    function getApprovalProcesses() {
      axios
        .get(`${config.BASE_URL}/ApprovalProcess/`)
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


    // Function to extract only the date part from the datetime string
    const extractDate = (dateTimeString) => {
      return dateTimeString.split("T")[0];
    };
  

  return (
    <div className="staff-notifications-container">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="staff-notifications-search"
      />
      <table className="staff-notifications-table">
        <thead>
          <tr className="staff-table-header">
            <th className="staff-notifications-table-header">Product Name</th>
            <th className="staff-notifications-table-header">Category</th>
            <th className="staff-notifications-table-header">Price</th>
            <th className="staff-notifications-table-header">Quantity</th>
            <th className="staff-notifications-table-header">Expire Date</th>
            <th className="staff-notifications-table-header">Status</th>
            <th className="staff-notifications-table-header">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApprovalProcesses.map((approvalProcess, index) => (
            <tr key={index} className="staff-table-item">
              <td className="staff-notifications-table-data">{approvalProcess.name}</td>
              <td className="staff-notifications-table-data">{approvalProcess.category}</td>
              <td className="staff-notifications-table-data">{approvalProcess.price}</td>
              <td className="staff-notifications-table-data">{approvalProcess.quantity}</td>
              <td className="staff-notifications-table-data">{extractDate(approvalProcess.expireDate)}</td>
              <td className="staff-notifications-table-data-status">{approvalProcess.status}</td>
              <td className="staff-notifications-table-data-action">{approvalProcess.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
