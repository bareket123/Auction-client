import React from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const UserMenu = () => {

    const[token, setToken] = useState("");
    const activeMenuClass=({isActive})=>(isActive ? "active-menu":"non-active-menu")
    const navigate = useNavigate();
    const [userCredit,setUserCredit]=useState(0);

    useEffect(()=>{
       setToken(Cookies.get("token")) ;
        if (token === undefined) {
            navigate("../");
        }
    },[])

    const links=[{to:"/dashboard",text:"Home"},
        {to:"/myProposalsPage",text:"My Proposals"},
        {to:"/myProductsPage",text:"My Products"},
        {to:"/openAuctions",text:"Open Auctions"},
        {to:"/MyNotifications",text:"My Notifications "}
    ]

    useEffect(() => {
        if (token!==""){
        axios.get("http://localhost:8989/get-user-credits?userToken="+token)
            .then(response => {
                if (response.data.success) {
                    setUserCredit(response.data.credit)
                }
            })
        }
    });

    return (
        <div>
            <table border={1}>
                <tr>
                    {
                        links.map((link)=>{
                            return (
                                <th>
                                    <NavLink to={link.to} > {link.text} </NavLink>
                                </th>
                            )
                        })
                    }
                    <th>my credit : {userCredit}</th>
                    <th><button onClick={()=>{
                        Cookies.remove("token"); Cookies.remove("isAdmin")
                        navigate("../");
                    }}>log out</button></th>
                </tr>
            </table>
        </div>
    );
};

export default UserMenu;
