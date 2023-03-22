import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import UserMenu from "./UserMenu";
import {ADD_NEW_OFFER_TO_AUCTION, AUCTION_WAS_CLOSED} from "./Constans";

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
                // } else setErrorCode(response.data.errorCode)
            })
    },[])

    const filterUsersByName=()=>{
        const originalArray=users
        if (originalArray.length>0){
            let filterArray=originalArray.filter((user)=>{
                let allow=false;
                if (user.username.includes(search)){
                    allow=true;
                }
                return allow;
            })
            return filterArray;
        }else return originalArray;

    }


    return  (
        <div>
            <UserMenu/>

            {
                users.length===0 ?

                    <h2 style={{textAlign :"center" ,color:"white"}}>No users have been added yet</h2>
            :
                    <div>
            Users: {users.length}
            <h2 style={{textAlign :"left"}}>
                Search User :  <input className={"inputStyle"}  placeholder={"search"} value={search} type={"text"} onChange={ (event)=>{setSearch(event.target.value)}}/>
            </h2>
            <table>
                {

                    filterUsersByName().map((user) => {
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

                    </div>
            }
        </div>
    )
}
export default ManagePage;
