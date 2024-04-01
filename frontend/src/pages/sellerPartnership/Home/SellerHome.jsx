
import { Route, Routes } from 'react-router-dom'
import AllProduct from '../allProducts/AllProduct'
import ProductDetail from '../productDetail/ProductDetail'
import SellerNavBar from '../../../components/sellerPartnership/navBar/SellerNavBar'
import SellerBagPage from '../sellerBag/SellerBagPage'
import SellerCheckoutPage from '../chekeckout/SellerCheckoutPage'

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
    </Routes>
    </>
  )
}

export default SellerHome