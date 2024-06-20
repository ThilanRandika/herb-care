import './staffMainSidebar.css'
import { useState } from 'react'
import {ProSidebar, Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from 'react-router-dom';

function StaffMainSidebar() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    
    return (
        <div>

            <Box>
                <Sidebar>
                    <Menu>
                        <MenuItem component={<Link to="/staff" />} > Dashboard </MenuItem>
                        <SubMenu label="Orders">
                            <MenuItem component={<Link to="/staff/staffOrders/dashboard" />} > Retail Orders </MenuItem>
                            <MenuItem component={<Link to="/staff/SellerStaffDashboard" />} > Wholesale Orders </MenuItem>
                        </SubMenu>
                        <SubMenu label="Manage">
                            <MenuItem component={<Link to="/staff/Staff_Dashboard" />} > Products </MenuItem>
                            <MenuItem component={<Link to="/staff/staffGift/Default_gift_packages" />} > Gift Packages </MenuItem>
                            <MenuItem component={<Link to="/staff/staffHolidayPackages" />} > Holiday Packages </MenuItem>
                        </SubMenu>
                        <MenuItem component={<Link to="/staff/DisplayFeedbackStaff" />} > Feedbacks/Complaints </MenuItem>
                        <MenuItem component={<Link to="/staff/consultationStaff" />} > Consultation </MenuItem>
                    </Menu>
                </Sidebar>
            </Box>

        </div>
    )
}

export default StaffMainSidebar