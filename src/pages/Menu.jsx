import {useState} from "react";
import "./Menu.css";

const menuItems = [
    {
        id: 1,
        name: "Pad Thai",
        thaiName: "ผัดไทย",
        description: "Thai stir-fried rice noodle dish with eggs, tofu, and peanuts.",
        ingredients: "Rice noodles, shrimp, egg, tofu, peanuts, and bean sprouts.",
        price: 16.99,
        category: "Main Course",
        vegetarian: false
    },
    {
        id: 2,
        name: "Tom Yum Goong",
        thaiName: "ต้มยำกุ้ง",
        description: "Spicy and sour shrimp soup with lemongrass.",
        ingredients: "Shrimp, lemongrass, lime, and chili peppers.",
        price: 14.99,
        category: "Starter",
        vegetarian: false
    },
    {
        id: 3,
        name: "Green Curry",
        thaiName: "แกงเขียวหวาน",
        description: "Thai green curry with coconut milk and chicken.",
        ingredients: "Coconut milk, green chilies, galangal, and chicken.", 
        price: 17.99,
        category: "Main Course",
        vegetarian: false
    },
    {
        id: 4,
        name: "Som Tam",
        thaiName: "ส้มตำ",
        description: "Spicy green papaya salad with lime and peanuts.",
        ingredients: "Green papaya, lime, chili peppers, and peanuts.",
        price: 12.99,
        category: "Starter",
        vegetarian: true
    },
    {
        id: 5,
        name: "Mango Sticky Rice",
        thaiName: "ข้าวเหนียวมะม่วง",
        description: "Sweet sticky rice with fresh mango and coconut milk.",
        ingredients: "Sticky rice, fresh mango, and coconut milk.",
        price: 9.99,
        category: "Dessert",
        vegetarian: true
    },
    {
        id: 6,
        name: "Thai Milk Tea",
        thaiName: "ชาไทย",
        description: "Traditional Thai tea with creamy milk.",
        ingredients: "Thai tea, milk, and sugar.",
        price: 5.99,    
        category: "Beverage",
        vegetarian: true
    }
];  

function Menu({ addToCart }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [orderType, setOrderType] = useState("Pickup");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [cart, setCart] = useState([]);
    const [maxPrice, setMaxPrice] = useState("All");
    const [dietary, setDietary] = useState("All");
    
    const filteredItems = menuItems.filter((item) => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || item.category === category;
        const matchMaxPrice = maxPrice === "All" || item.price <= parseFloat(maxPrice);
        const matchDietary = dietary === "All" || item.vegetarian === (dietary === "Vegetarian");

        return matchSearch && matchCategory && matchMaxPrice && matchDietary;
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
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                <option value="All">All Prices</option>
                <option value="10">Up to $10</option>
                <option value="15">Up to $15</option>
                <option value="20">Up to $20</option>
            </select>

            <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
                <option value="All">All Dietary Options</option>
                <option value="Vegetarian">Vegetarian</option>
            </select>
        </div>

        <div className="menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (

            <div className="menu-card" key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.thaiName}</p>
                <p>{item.description}</p>
                <p><strong>Ingredients:</strong> {item.ingredients}</p>
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