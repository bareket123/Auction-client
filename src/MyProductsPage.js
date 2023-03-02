import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ErrorMessage from "./ErrorMessage";


function MyProductsPage() {
    const[productName, setProductName] = useState(0);
    const[amountOfferHighest, setAmountOfferHighest] = useState(0);
    const[tenderStatus, setTenderStatus] = useState(0);
    const[OfferStatusOpen, setOfferStatusOpen] = useState(0);


    useEffect(() => {
        setProductName("computer");
    }, [])

    useEffect(() => {
        setAmountOfferHighest(800)
    }, [])

    useEffect(() => {
        setTenderStatus("open")
    }, [])

    useEffect(() => {
        setOfferStatusOpen("yes")
    }, [])


    return (
        <div>
            <br/>
            <table border={1}>
                <tr>
                    <th> Product Name</th>
                    <th> The amount of the offer the highest</th>
                    <th> Is the tender open/closed?</th>
                    <th> If the auction is open - the auction end button for that product</th>
                </tr>
                <tr>
                    <td> {productName}</td>
                    <td> {amountOfferHighest}</td>
                    <td> {tenderStatus}</td>
                    <td> {OfferStatusOpen}</td>




                </tr>
            </table>
        </div>
    );
}

export default MyProductsPage;