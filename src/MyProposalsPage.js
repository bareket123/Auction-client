import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import Cookies from "js-cookie";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import './Table.css';

function MyProposalsPage() {

    const[myProposals, setMyProposals] = useState([]);
    const[token, setToken] = useState("");


    useEffect(() => {
        const token = Cookies.get("token");
        setToken(token);
        axios.get("http://localhost:8989/get-my-offers-model?token="+token).then(response=>{
            setMyProposals(response.data.myOffersModels)

        })
    });

    return (
        <div>
            <UserMenu/>
            <h1> My Proposals: </h1>

            <br/>
            <table className={"fl-table"}>
                <tr>
                    <th> Product Name</th>
                    <th> Offer Price</th>
                    <th> Auction Status</th>
                    <th>Offer Status</th>
                </tr>
                {

                    myProposals!==undefined &&
                    myProposals.map((offer) =>{
                        const link = offer.auctionId;
                        return (
                            <tr>
                                <td><Link to={"/product/" + link}>{offer.productName}</Link></td>
                                <td>{offer.saleOfferModel.offerPrice}</td>
                                <td> {offer.auctionStatus?"Open":"Close"}</td>
                                {
                                    offer.auctionStatus?
                                    <td>Auction Is Still Open </td>
                                        :
                                        <td>{offer.saleOfferModel.won ?"Won":"Not Won"}</td>
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
