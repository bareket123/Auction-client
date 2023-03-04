import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';


function MyProductsPage() {
    const[token, setToken] = useState(" ");
    const[productName, setProductName] = useState(0);
    const[amountOfferHighest, setAmountOfferHighest] = useState(0);
    const[myProducts, setMyProducts] = useState([]);
    const[auctionStatus, setAuctionStatus] = useState(0);
    const[proposalStatusOpen, setProposalStatusOpen] = useState(0);
    const navigate = useNavigate();



    const CustomButton = styled(Button)({
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            backgroundColor: 'darkred',
        },
    });


    useEffect(() => {
        const token =Cookies.get("token");
        setToken ( token ) ;
        axios.get("http://localhost:8989/get-all-auctions-by-token?token="+token)
            .then(response => {
                    setMyProducts(response.data)
            })
    },[myProducts]);

    const onClickAdd = () =>{
        navigate("../createProduct");
    }

    return (
        <div>
            <UserMenu/>
            <br/>
            <table border={1}>
                <tr>
                    <th> Product Name</th>
                    <th> Highest proposal</th>
                    <th> Auction status</th>
                    <th> Proposal status open</th>
                </tr>

                    {

                        myProducts.map((auction) =>{
                            return (
                                <tr>
                                    <td> {auction.product.name}</td>
                                    <td> </td>
                                    <td> {auction.open ? "true" : "false"}</td>
                                    <td>
                                        ---
                                    {
                                        auction.open &&
                                        <button>End Auction</button>
                                    }
                                    </td>
                                </tr>
                            )
                        })
                    }

                <button onClick={onClickAdd}>Add Product</button>
                <CustomButton variant="contained">
                    Click me!
                </CustomButton>
            </table>
        </div>
    );
}

export default MyProductsPage;