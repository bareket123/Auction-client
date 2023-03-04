import React from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const UserMenu = () => {

    const[token, setToken] = useState();
    const activeMenuClass=({isActive})=>(isActive ? "active-menu":"non-active-menu")
    const navigate = useNavigate();

    // useEffect(()=>{
    //    setToken(Cookies.get("token")) ;
    //     if (token == undefined) {
    //         navigate("../login");
    //     }
    // },[])

    const links=[{to:"/dashboard",text:"Home"},
        {to:"/myProposals",text:"My Proposals"},
        {to:"/myProductsPage",text:"My Products"},
        {to:"/openAuctions",text:"Open Auctions"},
        {to:"/MyNotifications",text:"My Notifications "}
        ,{to:"/MyCredit",text:"My Credit"},
    ]

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
                    <th><button onClick={()=>{Cookies.remove("token"); Cookies.remove("isAdmin") }}>log out</button></th>
                </tr>
            </table>

            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        <Route path={"/dashboard"} element={<Dashboard/>}></Route>*/}
            {/*        <Route path={"/createProduct"} element={<CreateProduct/>}></Route>*/}
            {/*        <Route path={"/myProductsPage"} element={<MyProductsPage/>}></Route>*/}
            {/*        <Route path={"/user"} element={<UserMenu/>}></Route>*/}
            {/*        <Route path={"/openAuctions"} element={<OpenAuctions/>}></Route>*/}
            {/*        <Route path={"/myProposalsPage"} element={<MyProposalsPage/>}></Route>*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}







        </div>
    );
};

export default UserMenu;