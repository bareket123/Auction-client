import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import Error from "./Error";
import React from "react";

function ManagePage () {
    const[users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [errorCode,setErrorCode]=useState(0);

    useEffect(() => {
        axios.get("http://localhost:8989/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                }else setErrorCode(response.data.errorCode)
            })
    },[])

    const loginAs = (token) => {
        Cookies.set("token", token);
        Cookies.set("isAdmin", true);
        navigate("../dashboard");
    }

    return  (
        <div>
            Users: {users.length}
            <table>
                {
                    users.map((item) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td><button onClick={() => loginAs(item.token)}>Login As</button></td>
                            </tr>
                        )
                    })
                }
            </table>
            {
                errorCode!=0 && <Error message={errorCode} />
            }
        </div>
    )
}
export default ManagePage;
