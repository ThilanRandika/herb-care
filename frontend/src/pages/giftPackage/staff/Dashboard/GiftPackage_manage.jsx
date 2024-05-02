import React from "react";
import "./GiftPackage_manage.css";
import { Link } from "react-router-dom";

function GiftPackage_manage(){

    return(
        <div>
            <h2><center>GiftPackage_management</center></h2>

            <Link to="/Default_gift_packages"><button className="giftPackage-staff-giftPackageManage-btn">Default gift packages</button></Link> {/*Display exsisting default gift packages*/}
            <br></br> <br></br>
            <Link to="/add_Default_gift_pack"><button className="giftPackage-staff-giftPackageManage-btn">Add default gift packages</button> </Link> {/*Add default gift packages*/}   
            <br></br> <br></br>
            {/* <Link><button className="giftPackage-staff-giftPackageManage-btn">Customize gift packages</button> </Link> {/*Display customise gift packages made by customers}
            <br></br> <br></br> */}
            <Link to="/Gift-Package-Orders"><button className="giftPackage-staff-giftPackageManage-btn">Gift package orders</button> </Link> {/*Display gift package oders done by customers*/}
            <br></br> <br></br>  
            
            

        </div>
    )
}

export default GiftPackage_manage