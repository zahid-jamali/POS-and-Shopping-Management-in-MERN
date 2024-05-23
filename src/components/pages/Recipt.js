// In Receipt.js
import { useLocation } from "react-router-dom";
import Navbar from "../subcomponents/Navbar";

const Recipt = () => {
    const location = useLocation();
    const { order } = location.state || {};

    return (
        <>
            <Navbar />
            <h2>Order Receipt</h2>
            <p>Order ID: {order._id}</p>
            <p>Name: {order.billingInfo.name}</p>
            <p>Email: {order.billingInfo.email}</p>
            <p>Address: {order.billingInfo.address}</p>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
            <h3>Order Items:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.title}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Recipt;
