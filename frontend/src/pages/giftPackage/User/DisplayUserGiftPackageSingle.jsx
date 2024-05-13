import React from 'react';
import SingleGiftPackageDisplay from '../../../components/gift package/customizeGiftPackage/SinglePackageDetails';
import Footer from '../../../components/common/footer/footer';
import Header from '../../../components/common/header/header';

function DisplaySinglePackage() {
  return (
    <div>
        <Header></Header>
        <SingleGiftPackageDisplay/>
        <Footer></Footer>
    </div>
  )
}

export default DisplaySinglePackage