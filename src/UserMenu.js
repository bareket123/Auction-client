import React from 'react';
import { NavLink} from "react-router-dom";
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './UserMenu.css';

const UserMenu = () => {

    const navigate = useNavigate();
    const [credits,setCredits]=useState(0);
    const token=Cookies.get("token");
    const isAdmin=Cookies.get("isAdmin")



    const homeTo = isAdmin? "/manage" : "/dashboard";
    const links =[{to:homeTo,text:"Home"},
        {to:"/openAuctions",text:"Open Auctions"}
    ]
    const userLinks=[
        {to:"/myProposalsPage",text:"My Proposals"},
        {to:"/myProductsPage",text:"My Products"},
    ]


    useEffect(() => {
        if (isAdmin) {
            const interval = setInterval(() => {
                axios.get("http://localhost:8989/get-total-system-payments")
                    .then(response => {
                        setCredits(response.data)
                    })
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [isAdmin])


    useEffect(() => {
            if (token!==undefined && !isAdmin){
                axios.get("http://localhost:8989/get-user-credits?userToken="+token)
                    .then(response => {
                        if (response.data.success) {
                            setCredits(response.data.credit)
                        }
                    })
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
                    <th>{isAdmin ? "System Credits : " : "My Credit : " }{credits}</th>
                    <th><button className={"button"} onClick={()=>{
                        Cookies.remove("token"); Cookies.remove("isAdmin")
                        navigate("../");
                    }}>log out</button></th>
                </tr>
            </table>
        </div>
    );
};
export default UserMenu;
