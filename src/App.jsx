import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Chatbot from "./components/Chatbot";

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);


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
          addToCart={addToCart}
          decreaseQuantity={decreaseQuantity} 
          removeFromCart={removeFromCart} 
          setOrders={setOrders} 
        />} />

        <Route path="/reservation" element={
          <Reservation 
            reservations = {reservations}
            setReservations = {setReservations}
        />} />

        <Route path="/admin" element={
          <Admin 
            orders = {orders} 
            setOrders = {setOrders}
            reservations = {reservations}
            setReservations = {setReservations} 
          />
        } />
        
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
