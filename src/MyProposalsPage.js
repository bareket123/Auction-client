import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import Cookies from "js-cookie";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import Error from "./Error";
import './Table.css';


function MyProposalsPage() {

    const[myProposals, setMyProposals] = useState([]);
    const[token, setToken] = useState("");
    const[errorCode, setErrorCode] = useState(0);


    useEffect(() => {
        const token = Cookies.get("token");
        setToken(token);
        axios.get("http://localhost:8989/get-my-offers-model?token="+token).then(response=>{
            setMyProposals(response.data.myOffersModels)
            setErrorCode(response.data.errorCode)
        })
    });

    return (
        <div>
            <UserMenu/>
            <h1> My Proposals: </h1>

            <br/>
            <table border={1} className={"fl-table"}>
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
                                <td> {offer.auctionStatus?"open":"close"}</td>
                                {
                                    offer.auctionStatus?
                                    <td> auction still open</td>
                                        :
                                        <td>{offer.saleOfferModel.won ?"won":"not won"}</td>
                                }

                                <div>
                                {
                                    errorCode!==0&&
                                    <Error message={errorCode}/>
                                }
                                </div>
                        </tr>
                        )
                    })

                }
            </table>
        </div>
    );
}
export default MyProposalsPage;
