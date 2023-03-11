import React from 'react';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import {useNavigate} from "react-router-dom";

function MyProductsPage() {
    const [token, setToken] = useState(" ");
    const [productName, setProductName] = useState(0);
    const [amountOfferHighest, setAmountOfferHighest] = useState(0);
    const [myAuctions, setMyAuctions] = useState([]);
    const [auctionStatus, setAuctionStatus] = useState(0);
    const [proposalStatusOpen, setProposalStatusOpen] = useState(0);
    const [test, setTest] = useState([]);
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
        axios.get("http://localhost:8989/get-Model-all-auctions-by-token?token="+token)
            .then(response => {
                if (response.data!=null){
                    setMyAuctions(response.data)
                    console.log(response.data.shift().productName)

                }else {
                    alert("response is null")
                }

            })
    },[]);

    const onClickAdd = (auction) => {
        navigate("../createProduct");
    }

    const getHighestOffer=(auctionId)=>{
        let currentHighest=0;
        axios.get("http://localhost:8989/get-sorted-sale-offres-by-auction?auctionId="+auctionId).then((res)=>{
            // setAmountOfferHighest(res.data.saleOfferList.get(0).offerPrice);
            if(res.data.success){
                currentHighest=res.data.saleOfferList.shift().offerPrice;
                setAmountOfferHighest(currentHighest)
            }else {
                alert("not ok")
            }

        });
    }

    const endAuction=(auctionId)=>{
        axios.post("http://localhost:8989/close-exist-auction?auctionId="+auctionId,null,{
            params:{
                auctionId
            }
        }).then((res)=>{
            if(res.data.success){
            }else {
                alert("not end ok")
            }
        });
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
                    <th style={{fontWeight: "bold"}}> Close auction</th>
                </tr>
                {
                myAuctions.map((auction)=>{
                    //getHighestOffer(auction.id)
                        return(
                            <tr>
                                <td> {auction.productName}</td>
                                {
                                    auction.highestOffer!=null ?
                                        <td>{auction.highestOffer.offerPrice} </td>
                                        :
                                        <td> no offers</td>
                                }
                                 {/*<td>{auction.highestOffer.offerPrice} </td>*/}
                                <td> {auction.auctionOpen ? "open" : "close"}</td>
                               <td>
                                   <button disabled={!auction.auctionOpen} onClick={
                                       ()=>{ endAuction(auction.auctionId);
                                           window.location.reload(false)
                                       }
                                   }>
                                   End</button>
                               </td>
                            </tr>
                        );
                    })
                }
                <tr>
                    <td>
                        <button onClick={onClickAdd}>Add Product</button>
                    </td>
                </tr>
            </table>

                {/*<CustomButton variant="contained">*/}
                {/*    Click me!*/}
                {/*</CustomButton>*/}





            {/*<table style={{border:"1px solid black"}} border={1} >*/}
            {/*    <tr>*/}
            {/*        <th> Product Name</th>*/}
            {/*        <th> Highest proposal</th>*/}
            {/*        <th> Auction status</th>*/}
            {/*        <th> Proposal status open</th>*/}
            {/*    </tr>*/}
            {/*        {*/}
            {/*            myAuctions.map((auction, index) => {*/}
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



                {/*myAuctions.map((auction, index) => {*/}
                {/*    return (*/}
                {/*        <BrowserRouter>*/}
                {/*            <Router>*/}
                {/*                <Routes path={"/product" + index} render={() => <Auction data={auction} />} />*/}
                {/*            </Router>*/}
                {/*        </BrowserRouter>*/}
                {/*    )  })*/}

        </div>
    );
}
export default MyProductsPage;
