import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import Error from "./Error";
import React from "react";
import UserMenu from "./UserMenu";

function ManagePage () {
    const[users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [errorCode,setErrorCode]=useState(0);


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





    return  (
        <div>
            <UserMenu/>
            Users: {users.length}
            <table>
                {
                    users.map((user) => {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td><Link to={"/UserPage/"+user.username} onClick={
                                    ()=>{Cookies.set("isAdmin",true);Cookies.set("token",user.token)}}>
                                    {user.username}</Link></td>
                            </tr>
                        )
                    })
                }
            </table>


            <div>
            {
                errorCode!=0 && <Error message={errorCode} />
            }
            </div>
        </div>
    )
}
export default ManagePage;
