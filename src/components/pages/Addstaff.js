import { useEffect, useRef, useState } from "react";
import Navbar from "../subcomponents/Navbar";
import { useNavigate } from "react-router-dom";

const Addstaff = () => {

    const navigate=useNavigate();
    useEffect(()=>{
        if(sessionStorage.length<=0){
            navigate("/");
        };
    }, [])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [flag, setFlag] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setName(nameRef.current.value);
        setEmail(emailRef.current.value);
        setPhone(phoneRef.current.value);
        setPassword(passwordRef.current.value);
        setFlag(true);

        nameRef.current.value = emailRef.current.value = phoneRef.current.value = passwordRef.current.value = "";
    };


    const createPostRequest = async () => {
        try {
            const resp = await fetch("http://127.0.0.1:4444/user/create", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                }),
            });
            const contentType = resp.headers.get("content-type");
            if (resp.status===200 && contentType && contentType.includes("application/json")) {
                const data = await resp.json();
                setResponse(`New user created as ${name}`);
            }
            else if (resp.status===400 ) {
                const data = await resp.json();
                setResponse(data.message);
            }

            else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
        setFlag(false);
    };
    

    useEffect(() => {
        if (flag) {
            createPostRequest();
        }
    }, [flag]);

    return (
        <>
            <Navbar />
            <div className="loginForm">
                <h2>Add staff</h2>
                <p>{response}</p>
                <form onSubmit={handleSubmit}>
                    <label>Name: </label><br />
                    <input type="text" ref={nameRef} required /><br />
                    <label>Email: </label><br />
                    <input type="email" ref={emailRef} required /><br />
                    <label>Phone: </label><br />
                    <input type="number" ref={phoneRef} required /><br />
                    <label>Password: </label><br />
                    <input type="password" ref={passwordRef} required /><br />
                    <button>Submit</button>
                </form>
            </div>
        </>
    );
};

export default Addstaff;
