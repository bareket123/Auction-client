import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import axios from "axios";
import {BrowserRouter, NavLink, Route, Routes,Router,Switch} from "react-router-dom";
import Error from "./Error";

const OpenAuctions = () => {

    const[openAuctions, setOpenAuctions] = useState([]);
    const[filteredList, setFilteredList] = useState([]);
    const [search,setSearch] = useState("");
    const [errorCode,setErrorCode]=useState(0);

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
            <table border={1}>
                <tr>
                    <td>
                        search product :  <input placeholder={"search"} value={search} type={"text"} onChange={ (event)=>{setSearch(event.target.value)}}/>
                    </td>
                </tr>
                <div className="wrapper" >
                            {
                                filter().map((auction)=>{
                                        const link = auction.auctionId;
                                        return(
                                                <div>
                                                    <div style={{background:"pink"}}>
                                                    <NavLink to={"/product/"+link} >
                                                        <div>{auction.productName} </div>
                                                        <img src={auction.productPhoto} alt={"no picture"}  />
                                                        <div> Open date : <br/> {auction.creationDate}   </div>
                                                        <div> Amount of offers : {auction.amountOfSaleOffers}   </div>
                                                    </NavLink>
                                                </div>
                                                </div>
                                        );
                                    }
                                )
                            }
                </div>
            </table>

            {
                errorCode!=0 && <Error message={errorCode} />
            }
        </div>
    );
};
export default OpenAuctions;
