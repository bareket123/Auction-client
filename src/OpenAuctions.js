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
    // const[filteredList, setFilteredList] = useState([]);
    const [search,setSearch] = useState("");
    const [errorCode,setErrorCode]=useState(0);
    const isAdmin=Cookies.get("isAdmin");

    useEffect(() => {
        axios.get("http://localhost:8989/get-open-auctions")
            .then(response => {
                if (response.data.success)
                setOpenAuctions(response.data.auctions)
                else setErrorCode(response.data.errorCode)
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
             <h1> open auctions: </h1>
            <br/>
           <h2>
               search product :  <input className={"inputStyle"} placeholder={"search"} value={search} type={"text"} onChange={ (event)=>{setSearch(event.target.value)}}/>
           </h2>

            <table border={1} className={"fl-table"}>

                 <tr> <th> productName</th>
                     <th> productPhoto</th>
                     <th> Open date</th>
                     <th>  Amount of offers</th>
                 </tr>

                             {
                                 filter().map((auction)=>{
                                         const link = auction.auctionId;

                                        return(
                                                <tr>
                                                    <td><Link to={"/product/" + link}>{auction.productName}</Link></td>


                                                    <td>   <img width="30" height="40"   src={auction.productPhoto} alt={"no picture"}  /></td>
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
