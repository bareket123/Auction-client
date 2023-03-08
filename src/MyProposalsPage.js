import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import Cookies from "js-cookie";
import axios from "axios";


function MyProposalsPage() {
    const[productName, setProductName] = useState(0);
    const[amountOffer, setAmountOffer] = useState(0);
    const[tenderStatus, setTenderStatus] = useState(0);
    const[proposalsStatus, setProposalsStatus] = useState(0);
    const[myProposals, setMyProposals] = useState([]);

    const[token, setToken] = useState("");

    useEffect(() => {
        setToken(Cookies.get("token"));
        axios.get("http://localhost:8989/get-sales-offers-by-user?token="+token).then((response)=>{
            setMyProposals(response.data.saleOfferList);
        })
    }, []);


    return (
        <div>
            <UserMenu/>
            <br/>
            <table border={1}>
                <tr>
                    <th> product name</th>
                    <th> amount proposal</th>
                    <th>  Auction status</th>
                    <th> Whether the bid was won or not (closed tender)</th>
                </tr>
                {
                    myProposals.map((proposal) =>{
                        return (
                            <tr>
                                <td> {productName}</td>
                                <td> {amountOffer}</td>
                                <td> {tenderStatus}</td>
                                <td> {proposal.won ? "won" : "lo"}</td>
                            </tr>
                        )
                    })
                }

            </table>
        </div>
    );
}

export default MyProposalsPage;