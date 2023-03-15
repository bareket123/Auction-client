import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function UserPage(){
    const[token, setToken] = useState("");
    const [myOpenAuctions,setMyOpenAuctions]=useState(0);
    const [credit,setCredit]=useState(0);
    const navigate = useNavigate();



    useEffect(() => {
        const token = Cookies.get("token");
        setToken(token);
        axios.get("http://localhost:8989/get-open-auction-size-by-token?token="+token).then((response)=>{
            setMyOpenAuctions(response.data)
        })
    }, []);

    const updateCredit =()=>{

        const updatedCredits = credit
        axios.post("http://localhost:8989/update-credits", null, {
            params: {
                token, updatedCredits
            }
        }).then((response) => {
            if (response.data.success) {
                alert("success")
                Cookies.remove("isAdmin")
                Cookies.remove("token")
                navigate("../")

            }
        })
    }

    return(
        <div>
            <h1>number of open auctions: {myOpenAuctions}</h1>

            change credit <input type={"number"} value={credit} onChange={(event)=>{setCredit(event.target.value)}}/>
            <button onClick={updateCredit}>update</button>
            <div style={{fontWeight:"bold"}}> logged as admin <br/> </div>





        </div>

    )








}
export default UserPage;