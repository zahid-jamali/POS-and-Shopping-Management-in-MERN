import { useNavigate } from "react-router-dom";
import Navbar from "../subcomponents/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.length <= 0) {
            navigate("/");
        }
    }, [navigate]);

    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);
    const [totalprice, setTotalprice]=useState(0);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCartItems = cart.map(item =>
            item._id === id ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCartItems);
    };

    const calculateTotalPrice = (item) => {
        return item.newPrice * item.quantity;
    };
    useEffect(() => {
        const tmp = cart.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0);
        setTotalprice(tmp);
    }, [cart]);

    const handleCheckout = () => {
        navigate("/checkout", { state: { cart, totalprice } });
    };

    return (
        <>
            <Navbar />
            <h2>Cart Page</h2>
            Cart length: {cart.length}

            <table>
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((prd, idx) => (
                        <tr key={prd._id}>
                            <td>{idx + 1}</td>
                            <td><img src={`http://127.0.0.1:4444/${prd.productImage}`} className="cartImage" alt={prd.title} /></td>
                            <td>{prd.title}</td>
                            <td>{prd.description}</td>
                            <td>{prd.newPrice}</td>
                            <td><input type="number" value={prd.quantity} onChange={e => handleQuantityChange(prd._id, parseInt(e.target.value))} /></td>
                            <td>{calculateTotalPrice(prd)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            Total Price: {totalprice}
            <button onClick={handleCheckout}>Checkout</button>
        </>
    );
};

export default Cart;
