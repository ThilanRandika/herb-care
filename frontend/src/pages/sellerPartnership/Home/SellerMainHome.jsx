import { Route, Routes } from 'react-router-dom'
import SellerNavBar from '../../../components/sellerPartnership/navBar/SellerNavBar'
import AllProduct from '../allProducts/AllProduct'
import ProductDetail from '../productDetail/ProductDetail'
import SellerBagPage from '../sellerBag/SellerBagPage'
import SellerCheckoutPage from '../chekeckout/SellerCheckoutPage'
import SellerOrdersPage from '../orders/SellerOrdersPage'
import SellerSingleOrderPage from '../singleOrder/SellerSingleOrderPage'
import SellerHome from '../sellerHome/SellerHome'
import SellerProfilePage from '../profile/SellerProfilePage'
import SellerAppointmentPage from '../appointment/SellerAppointmentPage'
import SellerNotificationPage from '../notification/SellerNotificationPage'
import './sellerMainHome.css'
import SellerHeader from '../../../components/sellerPartnership/header/SellerHeader'

function SellerMainHome() {
  return (
    <>
    <div>
      <SellerHeader/>
      <div>
      <SellerNavBar/>
      </div>
      <div className='seller-mainHome-container'>
      <Routes>
      <Route path="/sellerHome" element={<SellerHome/>}/>
      <Route path="/allproduct" element={<AllProduct/>}/>
      <Route path="/product/:Id" element={<ProductDetail/>}/>
      <Route path="/bag" element={<SellerBagPage/>}/>
      <Route path="/checkout" element={<SellerCheckoutPage/>}/>
      <Route path="/orders/*" element={<SellerOrdersPage/>}/>
      <Route path="/singleOrder/:orderId" element={<SellerSingleOrderPage/>}/>
      <Route path="/profile" element={<SellerProfilePage/>}/>
      <Route path="/appointment" element={<SellerAppointmentPage/>}/>
      <Route path="/notification" element={<SellerNotificationPage/>}/>
    </Routes>
      </div>
    </div>
    </>
  )
}

export default SellerMainHome