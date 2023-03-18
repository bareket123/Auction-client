import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";
import UserMenu from "./UserMenu";
import Error from "./Error";


function UserPage(){
    const[token, setToken] = useState(undefined);
    const [myOpenAuctions,setMyOpenAuctions]=useState(0);
    const [credit,setCredit]=useState(0);
    const [userCredit,setUserCredit]=useState(0);
    const {username} = useParams();
    const navigate = useNavigate();
    const[errorCode, setErrorCode] = useState(0);



    useEffect(() => {
        const token = Cookies.get("token");
        setToken(token);
        if (token!=undefined){
            getUserCredits()

        }
        axios.get("http://localhost:8989/get-open-auction-size-by-token?token="+token).then((response)=>{
            setMyOpenAuctions(response.data)
        })

    });

    const getUserCredits = () =>{
        axios.get("http://localhost:8989/get-user-credits?userToken="+token).then((response)=>{
             if (response.data.success){
                 setUserCredit(response.data.credit)
             }else {
                 setErrorCode(response.data.errorCode)
             }

        })
    }

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
            <UserMenu/>
            <h2><u>User:</u>  {username}</h2>
            <h1>Open Auctions: {myOpenAuctions} </h1>
            <h2> Current credit : {userCredit} $</h2>

               <h2>  Update {username} Credit  <input type={"number"} min={0} value={credit} onChange={(event)=>{setCredit(event.target.value)}} placeholder={"Enter new credit"}/>
                   <button onClick={updateCredit}>update</button></h2>
                <div>
                {
                    errorCode > 0 &&
                    <Error message={errorCode} lineBreak={true}/>
                }
                </div>


        </div>

    )








}
export default UserPage;