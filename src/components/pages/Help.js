import { useEffect } from "react";
import Navbar from "../subcomponents/Navbar";
import { useNavigate } from "react-router-dom";

const Help=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        if(sessionStorage.length>0){
            navigate("/home");
        }
    });

    return (<>
        <Navbar></Navbar>
        <div className="help">
            <h2>Help page</h2>
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam tenetur aperiam cupiditate itaque neque iste explicabo totam ratione nulla, at voluptates expedita animi fuga odit repellendus labore eaque officiis?

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam tenetur aperiam cupiditate itaque neque iste explicabo totam ratione nulla, at voluptates expedita animi fuga odit repellendus labore eaque officiis?

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam tenetur aperiam cupiditate itaque neque iste explicabo totam ratione nulla, at voluptates expedita animi fuga odit repellendus labore eaque officiis?
        </div>    
    </>);
};

export default Help;