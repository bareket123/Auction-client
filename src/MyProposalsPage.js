import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";


function MyProposalsPage() {
    const[productName, setProductName] = useState(0);
    const[amountOffer, setAmountOffer] = useState(0);
    const[tenderStatus, setTenderStatus] = useState(0);
    const[proposalsStatus, setProposalsStatus] = useState(0);


    useEffect(() => {
        setProductName("iphone");
    }, [])

    useEffect(() => {
        setAmountOffer(100)
    }, [])

    useEffect(() => {
        setTenderStatus("open")
    }, [])

    useEffect(() => {
        setProposalsStatus("no")
    }, [])


    return (
        <div>
            <br/>
            <table border={1}>
                <tr>
                    <th> product name</th>
                    <th> The amount of the offer</th>
                    <th> Tender-open/closed</th>
                    <th> Whether the bid was won or not (closed tender)</th>
                </tr>
                <tr>
                    <td> {productName}</td>
                    <td> {amountOffer}</td>
                    <td> {tenderStatus}</td>
                    <td> {proposalsStatus}</td>
                </tr>
            </table>
        </div>
    );
}

export default MyProposalsPage;