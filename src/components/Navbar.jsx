import{Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Restaurant</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/reservation">Reservation</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/chatbot">Chatbot</Link>
            </div>
        </nav>
    );
}

export default Navbar;