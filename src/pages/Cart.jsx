
import { useState } from "react";
import "./Cart.css";

function Cart({ cart, decreaseQuantity, addToCart, removeFromCart, setOrders }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [orderType, setOrderType] = useState("Pickup");
    const [address, setAddress] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    function placeOrder(event) {
    event.preventDefault();

    const newOrder = {
        id: Date.now(),
        name: name,
        phone: phone,
        orderType: orderType,
        address: address,
        items: [...cart],
        total: total,
        status: "Pending"
    };

    setOrders((previousOrders) => [...previousOrders, newOrder]);

    setOrderPlaced(true);
}

    return (
        <div className="cart">
            <h1>My Shopping Cart </h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <p>{item.name} - ${item.price.toFixed(2)}</p>

                        <button onClick={() => decreaseQuantity(item)}>
                            -
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => addToCart(item)}>
                            +
                        </button>

                        <button onClick={() => removeFromCart(item)}>
                            Remove
                        </button>
                    </div>
                ))
            )}

            <h2>Total: ${total.toFixed(2)}</h2>

            {cart.length > 0 && !orderPlaced && (
                <div className="checkout">
                    <h2>Checkout</h2>

                    <form onSubmit={placeOrder}>
                        <label>Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />

                        <label>Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />

                        <label>Order Type</label>
                        <select
                            value={orderType}
                            onChange={(event) => setOrderType(event.target.value)}
                        >
                            <option value="Pickup">Pickup</option>
                            <option value="Delivery">Delivery</option>
                        </select>

                        {orderType === "Delivery" && (
                            <>
                                <label>Delivery Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    required
                                />
                            </>
                        )}

                        <button type="submit">Place Order</button>
                    </form>
                </div>
            )}

            {orderPlaced && (
                <div className="order-confirmation">
                    <h2>Order Confirmed! 🎉</h2>
                    <p>Thank you, {name}!</p>
                    <p>Phone: {phone}</p>
                    <p>Order Type: {orderType}</p>
                    {orderType === "Delivery" && (
                        <p>Address: {address}</p>
                    )}
                    <p>Total: ${total.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default Cart;
