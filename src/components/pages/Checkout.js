import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../subcomponents/Navbar";

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, totalprice } = location.state || {};

    const [billingInfo, setBillingInfo] = useState({
        name: "",
        email: "",
        address: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({
            ...billingInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:4444/order/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart,
                totalPrice:totalprice,
                billingInfo,
                userId:JSON.parse(sessionStorage.getItem('user'))._id
            }),
        });

        const data = await response.json();

        if (response.ok) {
            navigate("/receipt", { state: { order: data } });
        } else {
            alert("Order creation failed!");
        }
    };

    return (
        <>
            <Navbar />
            <h2>Checkout Page</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={billingInfo.name} onChange={handleInputChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={billingInfo.email} onChange={handleInputChange} required />
                <label>Address:</label>
                <input type="text" name="address" value={billingInfo.address} onChange={handleInputChange} required />
                <button type="submit">Place Order</button>
            </form>
        </>
    );
};

export default Checkout;
