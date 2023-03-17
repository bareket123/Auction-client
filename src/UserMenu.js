import React from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './UserMenu.css';

const UserMenu = () => {

    const[token, setToken] = useState(undefined);
    const[isAdmin, setIsAdmin] = useState(undefined);
    // const activeMenuClass=({isActive})=>(isActive ? "active-menu":"non-active-menu")
    const navigate = useNavigate();
    const [credits,setCredits]=useState(0);

    useEffect(()=>{
        setToken(Cookies.get("token")) ;
        setIsAdmin(Cookies.get("isAdmin"))
        // if (token === undefined && isAdmin===false) {
        //     navigate("../");
        // }else if (isAdmin) navigate("../manage");
    },[])

    const links =[{to:"/dashboard",text:"Home"},
        {to:"/openAuctions",text:"Open Auctions"}
    ]
    const userLinks=[
        {to:"/myProposalsPage",text:"My Proposals"},
        {to:"/myProductsPage",text:"My Products"},
    ]

    useEffect(() => {
        if (isAdmin) {
            axios.get("http://localhost:8989/get-total-system-payments")
                .then(response => {
                    setCredits(response.data)

                })
        }else {
            if (token!==undefined){
                axios.get("http://localhost:8989/get-user-credits?userToken="+token)
                    .then(response => {
                        if (response.data.success) {
                            setCredits(response.data.credit)
                        }
                    })
            }
        }

    });

    return (
        <div>
            <table id={"nav-bar"} border={1}>
                <tr >
                    {
                        links.map((link) => {
                            return (
                                <th>
                                    <NavLink id={"font-nav"} to={link.to}> {link.text} </NavLink>
                                </th>
                            )
                        })
                    }
                    {
                        !isAdmin &&
                        userLinks.map((link)=>{
                            return (
                                <th>
                                    <NavLink id={"font-nav"} to={link.to} > {link.text} </NavLink>
                                </th>
                            )
                        })
                    }
                    <th>{isAdmin ? "System Credits :" : "my credit :" }{credits}</th>
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
