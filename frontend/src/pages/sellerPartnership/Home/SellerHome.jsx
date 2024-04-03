
import { Route, Routes } from 'react-router-dom'
import AllProduct from '../allProducts/AllProduct'
import ProductDetail from '../productDetail/ProductDetail'
import SellerNavBar from '../../../components/sellerPartnership/navBar/SellerNavBar'
import SellerBagPage from '../sellerBag/SellerBagPage'
import SellerCheckoutPage from '../chekeckout/SellerCheckoutPage'
import SellerOrdersPage from '../orders/SellerOrdersPage'
import SellerSingleOrderPage from '../singleOrder/SellerSingleOrderPage'

function SellerHome() {
  return (
    <>
    <SellerNavBar/>
    <div>SellerHome</div>
    <Routes>
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

export default SellerHome