import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import UserMenu from "./UserMenu";

function ManagePage () {
    const[users, setUsers] = useState([]);
    const [search,setSearch] = useState("");
    const adminToken="Admin";




    useEffect(() => {

        Cookies.set("isAdmin",true)
        Cookies.set("token",adminToken);
        axios.get("http://localhost:8989/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                }
            })
    },[])

    const filterUsersByName=()=>{
        const originalArray=users
        if (originalArray.length>0){
            return originalArray.filter((user) => {
                let allow = false;
                if (user.username.includes(search)) {
                    allow = true;
                }
                return allow;
            });
        }else return originalArray;

    }


    return  (
        <div>
            <UserMenu/>

            {
                users.length===0 ?

                    <h2>No users have been added yet</h2>
            :
                    <div className={"login-font"}>
           <h3 style={{textAlign :"left"}}>Users: {users.length}</h3>
            <h2 style={{textAlign :"left"}}>
                Search User: <input className={"inputStyle"}  placeholder={"search"} value={search} type={"text"} onChange={ (event)=>{setSearch(event.target.value)}}/>
            </h2>
            <table className={"login-font"}>
                {

                    filterUsersByName().map((user) => {
                        return (
                            <tr>
                                <td>{user.id}.</td>
                                <td ><Link className={"login-font"} to={"/UserPage/"+user.username} onClick={
                                    ()=>{Cookies.set("isAdmin",true);Cookies.set("token",user.token)}}>
                                    {user.username}</Link></td>
                            </tr>
                        )
                    })
                }
            </table>

                    </div>
            }
        </div>
    )
}
export default ManagePage;
