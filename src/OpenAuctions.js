import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import axios from "axios";
import Cookies from "js-cookie";
import { Link} from "react-router-dom";
import './Table.css';
import './Input.css';
import SnackBarAlert from "./SnackBarAlert";
import {ADD_NEW_OFFER_TO_AUCTION, AUCTION_WAS_CLOSED} from "./Constans";




const OpenAuctions = () => {

    const[openAuctions, setOpenAuctions] = useState([]);
    const [search,setSearch] = useState("");
    const[messageCode, setMessageCode] = useState(0);
    const token=Cookies.get("token");

    useEffect(()=>{

    },[messageCode])


    useEffect(()=>{
           const sse = new EventSource("http://localhost:8989/sse-handler?submitUserToken=" + token);
           sse.onmessage = (message) => {
               const data = message.data;
               console.log("data is: " +data)
               if (data ==="1") {
                   setMessageCode("1")
               }else if (data==="2"){
                   setMessageCode(AUCTION_WAS_CLOSED)

               }
           }

        setMessageCode (0)
    },[]);


    useEffect(() => {
        axios.get("http://localhost:8989/get-open-auctions?token="+token)
            .then(response => {
                setOpenAuctions(response.data)

            })

    })

    const filter=()=>{
        const originalArray=openAuctions
       if (originalArray.length>0){
           let filterArray=originalArray.filter((auction)=>{
               let allow=false;
               if (auction.productName.includes(search)){
                   allow=true;
               }
               return allow;
           })
           return filterArray;
       }else return originalArray;

    }


    return (
        <div>
                <UserMenu/>
             <h1> Open Auctions: </h1>
            <br/>
           <h2>
               Search Product :  <input className={"inputStyle"} placeholder={"search"} value={search} type={"text"} onChange={ (event)=>{setSearch(event.target.value)}}/>
           </h2>

            <table  className={"fl-table"}>

                 <tr> <th> Product Name</th>
                     <th> Product Photo</th>
                     <th> Open date</th>
                     <th>  Amount of offers</th>
                     <th>  Amount of my offers</th>
                 </tr>

                             {
                                 filter().map((auction)=>{
                                         const link = auction.auctionId;

                                        return(
                                                <tr>
                                                    <td><Link to={"/product/" + link}>{auction.productName}</Link></td>
                                                    <td>  <img width="250" height="200"   src={auction.productPhoto} alt={"no picture"}  /></td>
                                                    <td> {auction.creationDate}</td>
                                                    <td>  {auction.amountOfSaleOffers}</td>
                                                    <td>  {auction.amountOfMySaleOffers}</td>
                                            </tr>
                                        );} )}
             </table>
            {

                <SnackBarAlert message={messageCode}/>

            }

         </div>
     );
};

export default OpenAuctions;
