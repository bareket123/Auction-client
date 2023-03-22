import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserMenu from "./UserMenu";
import React from 'react';
import Statistics from "./Statistics";
import {ADD_NEW_OFFER_TO_AUCTION, AUCTION_WAS_CLOSED} from "./Constans";
import SnackBarAlert from "./SnackBarAlert";


function Dashboard () {

    const[username, setUsername] = useState("");
    const navigate = useNavigate();
    const[messageCode, setMessageCode] = useState(0);
    const token = Cookies.get("token");



    useEffect(() => {
        if (token === undefined) {
            navigate("../");
        } else {
            axios.get("http://localhost:8989/get-username-by-token?token="+token).then((response)=>{
                setUsername(response.data)
            })
        }
    }, []);


    return (
        <div>
            <UserMenu/>
            <h3>    Hello {username} !</h3>
            <h3> Welcome to our website !</h3>
            <h3> Have a fun experience. </h3>
            <div> message: {messageCode}</div>
            {/*{*/}
            {/*    messageCode!==0&&*/}
            {/*    <SnackBarAlert message={messageCode}/>*/}
            {/*}*/}
            <Statistics/>
        </div>
    )
}

export default Dashboard;
