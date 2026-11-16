import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );
    
    if (existingItem) {
      setCart(
        cart.map((cartItem) => 
          cartItem.id === item.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
        ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  }

  function decreaseQuantity(item) {
    if (item.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id 
            ? {...cartItem, quantity: cartItem.quantity - 1} 
            : cartItem
        )
      );
    }
  }
  
  function removeFromCart(item) {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart 
          cart={cart} 
          decreaseQuantity={decreaseQuantity} 
          removeFromCart={removeFromCart} />} 
        />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
