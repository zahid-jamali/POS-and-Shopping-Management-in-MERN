import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Loginpage from './components/pages/Loginpage';
import Home from './components/pages/Home';
import Help from './components/pages/Help';
import Logout from './components/pages/Logout';
import Addstaff from './components/pages/Addstaff';
import Viewstaff from './components/pages/Viewstaff';
import Addproducts from './components/pages/Addproducts';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Recipt from './components/pages/Recipt';
import OrderHistory from './components/pages/OrderHistory';
import Updatestock from './components/pages/Updatestock';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={<Home />} />
        <Route path='/help' element={<Help />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/add-staff' element={<Addstaff />} />
        <Route path='/view-staff' element={<Viewstaff />} />
        <Route path='/add-products' element={<Addproducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/receipt' element={<Recipt />} />
        <Route path='/order-history' element={<OrderHistory />} />
        <Route path='/update-stock' element={<Updatestock />} />
      </Routes> 
    </BrowserRouter>
      
    </>
  );
}

export default App;
