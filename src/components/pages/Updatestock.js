import { useEffect, useRef, useState } from "react";
import Navbar from "../subcomponents/Navbar";

const Updatestock=()=>{
    const [flag, setFlag]=useState(true);
    const [products, setProducts]=useState([]);
    const [msg, setMsg]=useState('');
    const [uploadProdcut, setUploadProduct]=useState();
    const [uploadQuantity, setUploadQuantity]=useState();


    const handleChange=(e)=>{
        setUploadQuantity(e.target.value);
        setUploadProduct(e.target.id);
    }

    const getAllProducts=async ()=>{
        const resp=await fetch('http://127.0.0.1:4444/product');
        if(resp.ok){
            setProducts(await resp.json());
        }
        setFlag(false)
    }
    useEffect(()=>{
        if(flag){
            getAllProducts();
        }
    }, [flag])


    const handleSubmit=async () => {
        // e.preventDefault();

        const res=await fetch('http://127.0.0.1:4444/product/update', {
            method:"POST",
            headers:{
                'Content-type':"application/json",
            },
            body:JSON.stringify({
                product:uploadProdcut,
                quantity: uploadQuantity
            }),

        });
        if(res.ok){
            setMsg(await res.json().message);       
        }
        await getAllProducts();
    };


    return(<>
        <Navbar />
        <h2>Updatestock table</h2>
        {msg}
        <table>
            <tr>
                <th>Serail No.</th>
                <th>Image</th>
                <th>Product</th>
                <th>Available Stock</th>
                <th>Update Stock</th>
                <td>Remarks</td>
            </tr>
            {products.map((prd, idx)=>{
                
                return(<tr>
                        <td>{idx+1}</td>
                        <td><img src={`http://127.0.0.1:4444/${prd.productImage}`} width="150px" height="200px" /></td>
                        <td>{prd.title}<br /><small>{prd.description}</small></td>
                        <td>{prd.stock}  </td>
                        <td><input type="number" onChange={handleChange} id={prd._id}/></td>
                        <td><button onClick={()=>{
                            handleSubmit();
                        }}>Update</button></td>
                   
                </tr>);
            })}

        </table>
    
    </>);
}

export default Updatestock;