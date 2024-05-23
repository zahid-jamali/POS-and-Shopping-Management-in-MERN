import { useEffect, useState } from "react";
import Navbar from "../subcomponents/Navbar";
import { useNavigate } from "react-router-dom";

const Viewstaff = () => {

    const navigate=useNavigate();
    useEffect(()=>{
        if(sessionStorage.length<=0){
            navigate("/");
        };
    }, [])

    const [response, setResponse] = useState([]);
    const [flag, setFlag] = useState(true);

    const getStaff = async () => {
        const resp = await fetch("http://127.0.0.1:4444/user");
        if (resp.ok) {
            const data = await resp.json();
            setResponse(data);
        }
        setFlag(false);
    };

    useEffect(() => {
        if (flag) {
            getStaff();
        }
    }, [flag]);

    return (
        <>
            <Navbar />
            <h3>We have following active staff members!</h3>
            <table align="center" width="60%" border="1px">
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {response.map((usr, indx) => (
                        <tr key={usr._id}>
                            <td>{indx + 1}</td>
                            <td>{usr.Name}</td>
                            <td>{usr.Email}</td>
                            <td>{usr.Phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Viewstaff;
