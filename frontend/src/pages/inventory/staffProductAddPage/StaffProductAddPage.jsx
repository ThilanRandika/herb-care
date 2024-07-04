import './staffProductAddPage.css';
import AddProductComponent from '../../../components/inventory/AddProductComponent/AddProductComponent';

function StaffProductAddPage() {
  return (
    <div>
      <h2 className='staffProductAddPage-Header'>Add new product</h2>

      <AddProductComponent/>
      
    </div>
  )
}

export default StaffProductAddPage