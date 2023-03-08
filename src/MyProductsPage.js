import React from 'react';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";

import axios from "axios";
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Auction from "./Auction";
import {useNavigate} from "react-router-dom";
// import { Router, Route, Routes, NavLink,BrowserRouterProps } from 'react-router-dom';
import { BrowserRouter, Router, Routes, NavLink } from 'react-router-dom';


function MyProductsPage() {
    const [token, setToken] = useState(" ");
    const [productName, setProductName] = useState(0);
    const [amountOfferHighest, setAmountOfferHighest] = useState(0);
    const [myProducts, setMyProducts] = useState([]);
    const [auctionStatus, setAuctionStatus] = useState(0);
    const [proposalStatusOpen, setProposalStatusOpen] = useState(0);
    const navigate = useNavigate();




    const CustomButton = styled(Button)({
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            backgroundColor: 'darkred',
        },
    });


    useEffect(() => {
        const token = Cookies.get("token");
        setToken(token);
        axios.get("http://localhost:8989/get-all-auctions-by-token?token=" + token)
            .then(response => {
                setMyProducts(response.data)
            })
    }, []);

    const onClickAdd = () => {
        navigate("../createProduct");
    }

    return (
        <div>
            <UserMenu />
            <br />
            <table style={{border:"1px solid black"}}>
                <tr>
                    <th style={{fontWeight:"bold"}}>Product Name</th>
                    <th style={{fontWeight: "bold"}}>Highest proposal</th>
                    <th style={{fontWeight: "bold"}}>Auction status</th>
                    <th style={{fontWeight: "bold"}}> Proposal status open</th>
                </tr>
                {
                myProducts.map((auction)=>{
                        return(
                            <tr>
                                <td> {auction.product.name}</td>
                                 <td>{auction.product.name}</td>
                                <td> {auction.open ? "true" : "false"}</td>
                               <td>
                               {auction.open &&
                                 <button>End Auction</button>
                               }
                               </td>
                            </tr>
                        );
                    })
                }
            </table>







            {/*<table style={{border:"1px solid black"}} border={1} >*/}
            {/*    <tr>*/}
            {/*        <th> Product Name</th>*/}
            {/*        <th> Highest proposal</th>*/}
            {/*        <th> Auction status</th>*/}
            {/*        <th> Proposal status open</th>*/}
            {/*    </tr>*/}
            {/*        {*/}
            {/*            myProducts.map((auction, index) => {*/}
            {/*            return (*/}
            {/*                 <tr>*/}
            {/*                <NavLink to={"/product" + index}>*/}
            {/*                   <td> {auction.product.name}</td>*/}
            {/*                                 <td> {auction.open ? "true" : "false"}</td>*/}
            {/*                                <td>*/}
            {/*                                    ---*/}
            {/*                                    {auction.open &&*/}
            {/*                                        <button>End Auction</button>*/}
            {/*                                    }*/}
            {/*                                </td>*/}
            {/*                            <td>{auction.product.name}</td>*/}
            {/*                </NavLink>*/}
            {/*                 </tr>*/}
            {/*            )*/}
            {/*            })*/}
            {/*             }*/}
            {/*    /!*<button onClick={onClickAdd}>Add Product</button>*!/*/}
            {/*    /!*<CustomButton variant="contained">*!/*/}
            {/*    /!*    Click me!*!/*/}
            {/*    /!*</CustomButton>*!/*/}
            {/*</table>*/}
            {/*{*/}


            {/*    myProducts.map((auction, index) => {*/}
            {/*        return (*/}
            {/*            <BrowserRouter>*/}
            {/*                <Router>*/}
            {/*                    <Routes path={"/product" + index} render={() => <Auction data={auction} />} />*/}
            {/*                </Router>*/}
            {/*            </BrowserRouter>*/}
            {/*        )  } )*/}
            {/*}*/}
        </div>
    );
}
export default MyProductsPage;
