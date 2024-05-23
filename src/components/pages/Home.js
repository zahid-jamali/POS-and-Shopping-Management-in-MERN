import Navbar from "../subcomponents/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Home=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        if(sessionStorage.length<=0){
            navigate("/");
        };
    }, [])

    const [flag, setFlag]=useState(true);
    const [response, setResponse]=useState([]);
    const [cart, setCart]=useState([]);

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item._id === product._id);

        if (!existingProduct) {
            product={...product, ...{quantity:1}};
            setCart([...cart, product]);
        }
    };
    
    const createGetRequest=async ()=>{
        const resp=await fetch("http://127.0.0.1:4444/product/");
        if (resp.ok){
            setResponse(await resp.json());
        }
        setFlag(false);
    }
    useEffect(()=>{
        if(flag){
            createGetRequest();
        };
    }, [flag]);


    return (<>
    <Navbar></Navbar>
    <h2>Home page</h2>
    <p><Link to="/cart" state={cart}>Cart: {cart.length}</Link></p>
    <div class="card-container">
        {response.filter(prd => prd.stock > 0).map((prd)=>{
            return(<>
                <div class="card">
                    <img src={`http://127.0.0.1:4444/${prd.productImage}`} alt="Product Image" />
                    <h2>{prd.title}</h2>
                    <p class="old-price"><del>{prd.oldPrice}</del></p>
                    <p class="new-price">{prd.newPrice}</p>
                    <button class="add-to-cart" onClick={()=>{addToCart(prd)}}>Add to Cart</button>
                </div>

            </>);
        })}


      
    </div>


    </>);
}

export default Home;