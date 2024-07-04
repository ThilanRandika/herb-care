import './staffMainSidebar.css';
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import herbcareLogo from '../../../../Images/logo/Herb_Care_Logo.png';

function StaffMainSidebar() {
    const [selected, setSelected] = useState("Dashboard");

    return (
        <div>
            <Box>
                <Sidebar>
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img 
                                alt="HerbCare Logo"
                                width="100px"
                                height="100px"
                                src={herbcareLogo}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography 
                                variant="h6"
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}
                            >
                                Herbcare Staff
                            </Typography>
                        </Box>
                    </Box>

                    <Menu>
                        <MenuItem 
                            component={<Link to="/staff" />} 
                            onClick={() => setSelected("Dashboard")}
                            style={{
                                backgroundColor: selected === "Dashboard" ? "#c3cdb2" : "transparent",
                            }}
                        > 
                            Dashboard 
                        </MenuItem>
                        <SubMenu label="Orders" defaultOpen>
                            <MenuItem 
                                component={<Link to="/staff/staffOrders/dashboard" />} 
                                onClick={() => setSelected("Retail Orders")}
                                style={{
                                    backgroundColor: selected === "Retail Orders" ? "#c3cdb2" : "transparent",
                                }}
                            > 
                                Retail Orders 
                            </MenuItem>
                            <MenuItem 
                                component={<Link to="/staff/SellerStaff/dashboard" />} 
                                onClick={() => setSelected("Wholesale Orders")}
                                style={{
                                    backgroundColor: selected === "Wholesale Orders" ? "#c3cdb2" : "transparent",
                                }}
                            > 
                                Wholesale Orders 
                            </MenuItem>
                        </SubMenu>
                        <SubMenu label="Manage" defaultOpen>
                            {/* <MenuItem 
                                component={<Link to="/staff/Staff_Dashboard" />} 
                                onClick={() => setSelected("Products")}
                                style={{
                                    backgroundColor: selected === "Products" ? "#c3cdb2" : "transparent",
                                }}
                            > 
                                Products 
                            </MenuItem> */}
                            <MenuItem 
                                component={<Link to="/staff/staffInventoryMainDashBoard" />} 
                                onClick={() => setSelected("Inventory")}
                                style={{
                                    backgroundColor: selected === "Inventory" ? "#c3cdb2" : "transparent",
                                }}
                            > 
                                Inventory 
                            </MenuItem>
                            <MenuItem 
                                component={<Link to="/staff/staffGift/Default_gift_packages" />} 
                                onClick={() => setSelected("Gift Packages")}
                                style={{
                                    backgroundColor: selected === "Gift Packages" ? "#c3cdb2" : "transparent",
                                }}
                            > 
                                Gift Packages 
                            </MenuItem>
                            <MenuItem 
                                component={<Link to="/staff/staffHolidayPackages" />} 
                                onClick={() => setSelected("Holiday Packages")}
                                style={{
                                    backgroundColor: selected === "Holiday Packages" ? "#c3cdb2" : "transparent",
                                }}
                            > 
                                Holiday Packages 
                            </MenuItem>
                        </SubMenu>
                        <MenuItem 
                            component={<Link to="/staff/DisplayFeedbackStaff" />} 
                            onClick={() => setSelected("Feedbacks/Complaints")}
                            style={{
                                backgroundColor: selected === "Feedbacks/Complaints" ? "#c3cdb2" : "transparent",
                            }}
                        > 
                            Feedbacks/Complaints 
                        </MenuItem>
                        <MenuItem 
                            component={<Link to="/staff/consultationStaff" />} 
                            onClick={() => setSelected("Consultation")}
                            style={{
                                backgroundColor: selected === "Consultation" ? "#c3cdb2" : "transparent",
                            }}
                        > 
                            Consultation 
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </Box>
        </div>
    );
}

export default StaffMainSidebar;
