import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserMenu from "./UserMenu";
import React from 'react';
import Statistics from "./Statistics";

function Dashboard () {

    const[username, setUsername] = useState("");
    const navigate = useNavigate();
    const token = Cookies.get("token");

    useEffect(()=>{
        if (token !==undefined){
            const sse = new EventSource("http://localhost:8989/sse-handler?submitUserToken=" + token);
            sse.onmessage = (message) => {
                const data = message.data;
                console.log("data is: " +data)
                if (data ==="1") {
                    alert("added new offer")
                }else if (data==="2"){
                    alert("auction was closed")
                }
            }

        }

    },[])


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

            <Statistics/>

        </div>
    )
}

export default Dashboard;
