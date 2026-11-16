
import { useState } from "react";
import "./Admin.css";

function Admin() {
    const [items, setItems] = useState([
        { id: 1, name: "Pad Thai", price: 16.99 },
        { id: 2, name: "Tom Yum Goong", price: 14.99 },
        { id: 3, name: "Green Curry", price: 17.99 }
    ]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [orders, setOrders] = useState([
        { id: 1, customer: "John", food: "Pad Thai", status: "Pending" },
        { id: 2, customer: "Sarah", food: "Green Curry", status: "Preparing" }
    ]);
    
    const [reservations, setReservations] = useState([
        { id: 1, name: "John", date: "2026-11-16", time: "18:00", guests: 2, status: "Pending" },
        { id: 2, name: "Sarah", date: "2026-11-17", time: "19:00", guests: 4, status: "Confirmed" }
    ]);
    function addItem(event) {
        event.preventDefault();

        const newItem = {
            id: Date.now(),
            name: name,
            price: Number(price)
        };

        setItems([...items, newItem]);
        setName("");
        setPrice("");
    }

    function deleteItem(id) {
        setItems(items.filter((item) => item.id !== id));
    }

    function editItem(item) {
    const newName = prompt("Enter new food name:", item.name);
    const newPrice = prompt("Enter new price:", item.price);

    if (newName && newPrice && Number(newPrice) > 0) {
        setItems(
            items.map((food) =>
                food.id === item.id
                    ? { ...food, name: newName, price: Number(newPrice) }
                    : food
                )
            );
        }
    }

    function updateOrder(id, newStatus) {
    setOrders(
        orders.map((order) =>
            order.id === id
                ? { ...order, status: newStatus }
                : order
            )
        );
    }
    
    function updateReservation(id, newStatus) {
    setReservations(
        reservations.map((reservation) =>
            reservation.id === id
                ? { ...reservation, status: newStatus }
                : reservation
            )
        );
    }


    return (
        <div className="admin">
            <h1>Admin Dashboard</h1>
            <h2>Manage Menu</h2>

            <form onSubmit={addItem}>
                <input
                    type="text"
                    placeholder="Food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0.01"
                    step="0.01"
                    required
                />

                <button type="submit">Add Food</button>
            </form>

            <h2>Food Items</h2>

            {items.map((item) => (
                <div key={item.id}>
                    <p>
                        {item.name} - ${item.price.toFixed(2)}
                        <button onClick={() => editItem(item)}>
                            Edit
                        </button>

                        <button onClick={() => deleteItem(item.id)}>
                            Delete
                        </button>
                    </p>
                </div>
            ))}
            <h2>Manage Orders</h2>
            {orders.map((order) => (
                <div key={order.id}>
                    <p>
                        Order #{order.id} - {order.customer}
                    </p>

                    <p>Food: {order.food}</p>

                    <p>Status: {order.status}</p>

                    <select
                        value={order.status}
                        onChange={(e) => updateOrder(order.id, e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            ))}
            <h2>Manage Reservations</h2>

            {reservations.map((reservation) => (
                <div key={reservation.id}>
                    <p>Reservation #{reservation.id}</p>
                    <p>Name: {reservation.name}</p>
                    <p>Date: {reservation.date}</p>
                    <p>Time: {reservation.time}</p>
                    <p>Guests: {reservation.guests}</p>
                    <p>Status: {reservation.status}</p>

                    <select
                        value={reservation.status}
                        onChange={(e) =>
                            updateReservation(reservation.id, e.target.value)
                        } >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            ))}     
        </div>
    );
}

export default Admin;
