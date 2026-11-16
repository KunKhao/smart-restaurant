import {useState} from "react";
import "./Menu.css";

const menuItems = [
    {
        id: 1,
        name: "Pad Thai",
        thaiName: "ผัดไทย",
        category: "Main Course",
        price: 16.99,
        description: "Thai stir-fried rice noodle dish with eggs, tofu, and peanuts.",
    },
    {
        id: 2,
        name: "Tom Yum Goong",
        thaiName: "ต้มยำกุ้ง",
        category: "Starter",
        price: 14.99,
        description: "Spicy and sour shrimp soup with lemongrass."
    },
    {
        id: 3,
        name: "Green Curry",
        thaiName: "แกงเขียวหวาน",
        category: "Main Course",
        price: 17.99,
        description: "Thai green curry with coconut milk and chicken."
    },
    {
        id: 4,
        name: "Som Tam",
        thaiName: "ส้มตำ",
        category: "Starter",
        price: 12.99,
        description: "Spicy green papaya salad with lime and peanuts."
    },
    {
        id: 5,
        name: "Mango Sticky Rice",
        thaiName: "ข้าวเหนียวมะม่วง",
        category: "Dessert",
        price: 9.99,
        description: "Sweet sticky rice with fresh mango and coconut milk."
    },
    {
        id: 6,
        name: "Thai Milk Tea",
        thaiName: "ชาไทย",
        category: "Beverage",
        price: 5.99,
        description: "Traditional Thai tea with creamy milk."
    }
];  

function Menu({ addToCart }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [orderType, setOrderType] = useState("Pickup");
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const filteredItems = menuItems.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || item.category === category;

        return matchSearch && matchCategory;
    });
    

    return (
    <div className="menu">
        <h1>Thai Menu</h1>

        <input
            type="text"
            placeholder="Search Thai food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <div className="categories">
            {["All", "Starter", "Main Course", "Dessert", "Beverage"].map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}>
                    {cat}
                </button>
            ))}
        </div>

        <div className="menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (

            <div className="menu-card" key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.thaiName}</p>
                <p>{item.description}</p>
                <h3>${item.price.toFixed(2)}</h3>
                
                <button onClick={() => addToCart(item)}>
                    Add to Cart
                </button>
            </div>
          ))
        ) : (
          <p>No food found.</p>
        )}
      </div>

      <div className="order-type">
        <h2>Order Type</h2>
        
        <button onClick={() => setOrderType("Pickup")}>
          Pickup
        </button>
        <button onClick={() => setOrderType("Delivery")}>
          Delivery
        </button>
        <p>Selected: {orderType}</p>
      </div>

    </div>
  );
}

export default Menu;