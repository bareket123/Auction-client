import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import Error from "./Error";
import React from "react";

function ManagePage () {
    const[users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [errorCode,setErrorCode]=useState(0);
    const[totalSystemPayments, setTotalSystemPayments] = useState(0);


    useEffect(() => {
        Cookies.set("isAdmin",true)
        Cookies.remove("token")
        axios.get("http://localhost:8989/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                }else setErrorCode(response.data.errorCode)
            })
    },[])

    useEffect(() => {
        axios.get("http://localhost:8989/get-total-system-payments")
            .then(response => {
                setTotalSystemPayments(response.data)

            })
    },[])




    return  (
        <div>
            Users: {users.length}
            <table>
                {
                    users.map((item) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td><Link to={"/UserPage/"} onClick={()=>{Cookies.set("isAdmin",true);Cookies.set("token",item.token)}}>{item.username}</Link></td>
                                {/*<td><button onClick={() => loginAs(item.token)}>Login As</button></td>*/}
                            </tr>
                        )
                    })
                }
            </table>

            <td><Link to={"/openAuctions/"} >click to move to open auction</Link></td>


            <div>total system payments: {totalSystemPayments}</div>
            {
                errorCode!=0 && <Error message={errorCode} />
            }
        </div>
    )
}
export default ManagePage;
