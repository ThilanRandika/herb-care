import React from "react";
import "./GiftPackage_manage.css";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddDefaultGiftPack from "../../../../components/gift package/defaultGiftPackage/AddDefaultGiftPack";
import DefaultGiftpackages from "../../../../components/gift package/defaultGiftPackage/DefaultGiftPackages";
import DisplayGiftPackOrders from "../../../../components/gift package/giftPackageOrders/DisplayGiftPackOrders";

function GiftPackage_manage(){

    // <div className="gift-dashboard-container">
    //         <h2><center>GiftPackage_management</center></h2>


    //         <Link to="/Default_gift_packages"><button className="giftPackage-staff-giftPackageManage-btn">Default gift packages</button></Link> {/*Display exsisting default gift packages*/}
    //         <br></br> <br></br>
    //         <Link to="/add_Default_gift_pack"><button className="giftPackage-staff-giftPackageManage-btn">Add default gift packages</button> </Link> {/*Add default gift packages*/}   
    //         <br></br> <br></br>
    //         {/* <Link><button className="giftPackage-staff-giftPackageManage-btn">Customize gift packages</button> </Link> {/*Display customise gift packages made by customers}
    //         <br></br> <br></br> */}
    //         <Link to="/Gift-Package-Orders"><button className="giftPackage-staff-giftPackageManage-btn">Gift package orders</button> </Link> {/*Display gift package oders done by customers*/}
    //         <br></br> <br></br>  

    //      </div>

    return(
        
        <>
        <div className="giftPackage-staff-content">
            <div>
                <div className="seller-manager-sidebar">
                    <ul className="seller-manager-sidebar-nav">
                        <li className="seller-manager-sidebar-item">
                        <NavLink
                            className="seller-manager-sidebar-link"
                            activeClassName="active"
                            to={"/staff/staffGift/Default_gift_packages"}
                            exact
                        >
                            Default gift packages
                        </NavLink>
                        </li>
                        <li className="seller-manager-sidebar-item">
                        <NavLink
                            className="seller-manager-sidebar-link"
                            activeClassName="active"
                            to={"/staff/staffGift/add_Default_gift_pack"}
                        >
                            Add default gift packages
                        </NavLink>
                        </li>
                        <li className="seller-manager-sidebar-item">
                        <NavLink
                            className="seller-manager-sidebar-link"
                            activeClassName="active"
                            to={"/staff/staffGift/Gift-Package-Orders"}
                        >
                            Gift package orders
                        </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
            <Routes>
              <Route exact path="/Default_gift_packages" element={<DefaultGiftpackages />} />
              <Route exact path="/add_Default_gift_pack" element={<AddDefaultGiftPack />} />
              <Route path="/Gift-Package-Orders" element={<DisplayGiftPackOrders/>}></Route>
            </Routes>
            </div>
        </div>
        </>
    )
}

export default GiftPackage_manage