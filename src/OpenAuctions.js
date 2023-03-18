import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import Cookies from "js-cookie";
import axios from "axios";
import {BrowserRouter, NavLink, Route, Routes, Router, Switch, Link} from "react-router-dom";
import Error from "./Error";
import './Table.css';
import './Input.css';



const OpenAuctions = () => {

    const[openAuctions, setOpenAuctions] = useState([]);
    const [search,setSearch] = useState("");
    const [errorCode,setErrorCode]=useState(0);

    useEffect(() => {
        axios.get("http://localhost:8989/get-open-auctions")
            .then(response => {
                if (response.data.success)
                setOpenAuctions(response.data.auctions)
                else{
                    setErrorCode(response.data.errorCode)
                }
            })
    },[])

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
                                            </tr>

                                        );} )}

             </table>
             {
                 errorCode!=0 && <Error message={errorCode} />
             }
         </div>
     );
};

export default OpenAuctions;
