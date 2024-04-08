import { Route, Routes } from 'react-router-dom'
import SellerNavBar from '../../../components/sellerPartnership/navBar/SellerNavBar'
import AllProduct from '../allProducts/AllProduct'
import ProductDetail from '../productDetail/ProductDetail'
import SellerBagPage from '../sellerBag/SellerBagPage'
import SellerCheckoutPage from '../chekeckout/SellerCheckoutPage'
import SellerOrdersPage from '../orders/SellerOrdersPage'
import SellerSingleOrderPage from '../singleOrder/SellerSingleOrderPage'
import SellerHome from '../sellerHome/SellerHome'

function SellerMainHome() {
  return (
    <>
    <SellerNavBar/>
    <Routes>
      <Route path="/sellerHome" element={<SellerHome/>}/>
      <Route path="/allproduct" element={<AllProduct/>}/>
      <Route path="/product/:Id" element={<ProductDetail/>}/>
      <Route path="/bag" element={<SellerBagPage/>}/>
      <Route path="/checkout" element={<SellerCheckoutPage/>}/>
      <Route path="/orders" element={<SellerOrdersPage/>}/>
      <Route path="/singleOrder/:orderId" element={<SellerSingleOrderPage/>}/>
    </Routes>
    </>
  )
}

export default SellerMainHome