
import './App.css';
import AddProduct from './components/AddProduct';
import Header from './components/Header';
import AllProducts  from './components/AllProducts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route

function App() {
  return (
    <Router> {/* Wrap your routes with Router */}
      <div className="App">
        
        <Header/>

        <Routes> {/* Wrap your Route components with Routes */}
          <Route path='/add' element={<AddProduct />} /> {/* Use element prop instead of component */}
        </Routes>
        <Routes> {/* Wrap your Route components with Routes */}
          <Route path='/' element={<AllProducts />} /> {/* Use element prop instead of component */}
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
