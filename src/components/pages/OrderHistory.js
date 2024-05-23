import { useEffect, useState } from "react";
import Navbar from "../subcomponents/Navbar";

const OrderHistory=()=>{
    const [flag, setFlag]=useState(true);
    const [response, setResponse]=useState([]);
    
    
    const createGetRequest=async ()=>{
        const resp=await fetch("http://127.0.0.1:4444/order/");
       
        if (resp.status === 200){
            setResponse(await resp.json());
            console.log("It was okay!");
        }
        console.log("create get request function called!");
        setFlag(false);
    };


    useEffect(()=>{
        if(flag){
            createGetRequest();
        }
    }, [flag])
    return(<>
        <Navbar />
        <h2>Order History!</h2>
        {response.length}
        <table border="1px">
            <tr>
                <th>Serial No</th>
                <th width="40%">Products</th>
                <th>Total Price</th>
                <th>Billing Info</th>
                <th>Seller</th>
                <th>Created At</th>
            </tr>
            {response.map((order, idx)=>{
                return(<>
                    <tr>
                        <td>{idx+1}</td>
                        <td align="center">
                            <small>
                            <table border="1px">
                                <tr>
                                    <th>Serial No</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                                {order.items.map((itm, idx)=>{
                                    return(<tr>
                                        <td>{idx+1}</td>
                                        <td>{itm.product.title}</td>
                                        <td>{itm.product.newPrice}</td>
                                        <td>{itm.quantity}</td>
                                    </tr>)
                                })}
                            </table>
                            </small>
                        </td>
                        <td>{order.totalPrice}</td>
                        <td>
                            {order.billingInfo.name}<br />
                            {order.billingInfo.email}<br />
                            {order.billingInfo.address} <br />
                            </td>
                        <td>{order.user.Name}</td>
                        <td><small>{order.createdAt}</small> </td>
                    </tr>
                    </>);
            })}
        </table>
    </>);
};

export default OrderHistory;