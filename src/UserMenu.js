import React from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";

const UserMenu = () => {


    const activeMenuClass=({isActive})=>(isActive ? "active-menu":"non-active-menu")

    const links=[{to:"/MyProposalsPage",text:"My Proposals"},
        {to:"/MyProductsPage",text:"My Products"}
        ,{to:"/",text:"  "},
        {to:"/MyNotifications",text:"My Notifications "}
        ,{to:"/MyCredit",text:"My Credit"},
        {to:"/Disconnection",text:"Disconnection "}
    ]

    return (
        <div>

            {/*<BrowserRouter>*/}
            {/*    <nav className={"navMenu"}>*/}

            {/*        {*/}
            {/*            links.map((link)=>{*/}
            {/*                return(*/}
            {/*                    <NavLink to={link.to} className={activeMenuClass}> {link.text} <br/></NavLink>*/}

            {/*                )*/}
            {/*            })*/}
            {/*        }*/}
            {/*        <div id="indicator"></div>*/}
            {/*    </nav>*/}

                <Routes>
                    <Route path={links[4].to} element={<Home/>}/>
                    <Route path={links[0].to} element={<LiveResultPage1/>}/>
                    <Route path={links[1].to} element={<LeagueTablePage2/>}/>
                    <Route path={links[2].to} element={<LiveLeagueTablePage3/>}/>
                    <Route path={links[3].to} element={<SignInPage4/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default UserMenu;