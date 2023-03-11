import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import Cookies from "js-cookie";
import axios from "axios";

function MyProposalsPage() {
    const[productName, setProductName] = useState("");
    const[amountOffer, setAmountOffer] = useState(0);
    const[tenderStatus, setTenderStatus] = useState(0);
    const[proposalsStatus, setProposalsStatus] = useState(0);
    const[myProposals, setMyProposals] = useState([]);
    const[myAuctions, setMyAuctions] = useState([]);
    const[token, setToken] = useState("");
    const[saleOfferToAuction, setSaleOfferToAuction] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        setToken(token);
        console.log(token);
        axios.get("http://localhost:8989/get-my-offers-model?token="+token).then(response=>{
            setMyProposals(response.data.myOffersModels)
           setSaleOfferToAuction(response.data.myOffersModels.saleOfferModels)
        })
    }, []);

    return (
        <div>
            <UserMenu/>
            <br/>
            <table border={1}>
                <tr>
                    <th> product name</th>
                    <th> offer Price</th>
                    <th>  Auction status</th>
                    <th> Whether the bid was won or not (closed tender)</th>
                </tr>
                {
                    myProposals.map((offer) =>{
                      // getSaleOffers(auction.id)
                        return (
                            <tr>
                                <td> {offer.productName}</td>
                                <td>{offer.saleOfferModel.offerPrice}</td>
                                <td> {offer.auctionStatus?"open":"close"}</td>
                                {
                                    offer.auctionStatus.open?
                                    <td> auction still open</td>
                                        :
                                        <td>{offer.won?"won":"not won"}</td>
                                }
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
}
export default MyProposalsPage;
