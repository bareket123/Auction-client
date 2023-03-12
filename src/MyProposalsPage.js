import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import Cookies from "js-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import Error from "./Error";

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
                        const link = offer.auctionId;
                        return (
                            <NavLink to={"/product/"+link}>
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
                                {
                                    errorCode!==0&&
                                    <Error message={errorCode}/>
                                }
                    </NavLink>
                        )
                    })
                }
            </table>
        </div>
    );
}
export default MyProposalsPage;
