import React from 'react'
import SearchBar from '../../components/inventory/User_searching_all/Search_Bar/SearchBar'
import Products from '../../components/inventory/User_searching_all/Products/Products'
import Recommended from '../../components/inventory/User_searching_all/Recommended/Recommended'
import Sidebar from '../../components/inventory/User_searching_all/SideBar/Sidebar'

function User_searching() {
  return (
    <div>
        <Sidebar/>
        <SearchBar/>
        <Recommended/>
        <Products/>
        
    </div>
    
  )
}

export default User_searching