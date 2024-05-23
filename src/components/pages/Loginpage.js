import Navbar from "../subcomponents/Navbar";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loginpage=()=>{
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [flag, setFlag]=useState(false);
    const [msg, setMsg]=useState();

    const emailRef=useRef();
    const passwordRef=useRef();

    const navigate=useNavigate();
    useEffect(()=>{
        if(sessionStorage.length>0){
            navigate("/home");
        }
    }, [])

    const handleSubmit =async (e)=>{
        e.preventDefault();
        setEmail(emailRef.current.value);
        setPassword(passwordRef.current.value);
        emailRef.current.value=passwordRef.current.value="";
        setFlag(true);
    }

    const createPostRequest =async () =>{
        const resp=await fetch("http://127.0.0.1:4444/user/authenticate", {
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                'email':email,
                'password':password,
            })
        });

        if(resp.ok){
            setMsg("Status code 200")
            const user=await resp.json();
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/home");
        }
        else if(resp.status===404 || resp.status===401){
            setMsg("Credential not matches!");
        }
        else{
            setMsg("An Error occured, Please try again")
        }
        setFlag(false)

    }

    useEffect(()=>{
        if(flag){
            createPostRequest();
        }
    }, [flag])


    return (
        <>
            <Navbar></Navbar>

            <div className="loginForm">
                <form onSubmit={handleSubmit}>
                    <label>Email: </label><br></br>
                    <input type="email" ref={emailRef} /><br></br>

                    <label>Password: </label><br></br>
                    <input type="password" ref={passwordRef} required /><br></br>                   
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            <br></br>
            {msg }

        </>
    );
}

export default Loginpage;