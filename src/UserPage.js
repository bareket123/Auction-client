import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {useParams} from "react-router-dom";
import UserMenu from "./UserMenu";
import { UPDATED_USER_CREDIT_SUCCESSFULLY} from "./Constans";
import SnackBarAlert from "./SnackBarAlert";


function UserPage(){
    const[token, setToken] = useState(undefined);
    const [myOpenAuctions,setMyOpenAuctions]=useState(0);
    const [credit,setCredit]=useState("");
    const [userCredit,setUserCredit]=useState(0);
    const {username} = useParams();

    const[messageCode, setMessageCode] = useState(0);



    useEffect(() => {
        const token = Cookies.get("token");
        setToken(token);
        if (token!==undefined){
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
                 setMessageCode(response.data.errorCode)
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
                setMessageCode(UPDATED_USER_CREDIT_SUCCESSFULLY)

            }
        })
        setMessageCode(0)
        setCredit("")
    }

    return(
        <div>
            <UserMenu/>
            <h2>User: {username}</h2>
            <h2>Open Auctions: {myOpenAuctions} </h2>
            <h2> Current Credit: {userCredit} $</h2>
               <h2>  Update {username} Credit  <input className={"inputStyle"} type={"number"} min={0} value={credit} onChange={(event)=>{setCredit(event.target.value)}} placeholder={"Enter new credit"}/>
                   <button className={"button"} onClick={()=>{updateCredit()}}>update</button></h2>
                <div>
                </div>
            {
               ( messageCode!==0 && messageCode!==1005)&&
                <SnackBarAlert message={messageCode}/>
            }
        </div>

    )
}
export default UserPage;
