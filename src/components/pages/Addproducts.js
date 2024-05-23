import { useEffect, useRef, useState } from "react";
import Navbar from "../subcomponents/Navbar";
import { useNavigate } from "react-router-dom";

const Addproducts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.length <= 0) {
      navigate("/");
    }
  }, [navigate]);

  const [response, setResponse] = useState("");
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const [stock, setStock]=useState(0);
  const [oldPrice, setOldPrice]=useState(0);
  const [newPrice, setNewPrice]=useState(0);
  const [image, setImage]=useState();
  const [flag, setFlag]=useState(false)


  const titleRef = useRef();
  const descRef = useRef();
  const stockRef = useRef();
  const oldPriceRef = useRef();
  const newPriceRef = useRef();
  const imageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle(titleRef.current.value);
    setDescription(descRef.current.value);
    setStock(stockRef.current.value);
    setOldPrice(oldPriceRef.current.value);
    setNewPrice(newPriceRef.current.value);
    setImage(imageRef.current.files[0]);
    e.target.reset();
    setFlag(true);

  };

  const createPostRequest = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("oldPrice", oldPrice);
    formData.append("newPrice", newPrice);
    formData.append("productImage", image);
    formData.append("userId", JSON.parse(sessionStorage.getItem("user"))._id);
  
    const resp = await fetch("http://127.0.0.1:4444/product/create", {
      method: "POST",
      body: formData,
    });
  
    if (resp.status === 201 || resp.status === 500) {
      const data = await resp.json();
      setResponse(data);
    }
    setFlag(false);
  };




  useEffect(()=>{
    if(flag){
      createPostRequest();
    }
  }, [flag])


  return (
    <>
      <Navbar />
      <h2>Add products page!</h2>

      <div className="loginForm">
        <p>{response.message}</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Product Title: </label>
          <br />
          <input type="text" ref={titleRef} required />
          <br />
          <label>Product Description: </label>
          <br />
          <input type="text" ref={descRef} required />
          <br />
          <label>Stock: </label>
          <br />
          <input type="number" ref={stockRef} required />
          <br />
          <label>Old price: </label>
          <br />
          <input type="number" ref={oldPriceRef} required />
          <br />
          <label>New Price: </label>
          <br />
          <input type="number" ref={newPriceRef} required />
          <br />
          <label>Image: </label>
          <br />
          <input type="file" ref={imageRef} accept="image/*" required />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Addproducts;
