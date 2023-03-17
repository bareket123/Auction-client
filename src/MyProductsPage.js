import React from 'react';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import axios from "axios";
import { styled } from '@mui/material/styles';
import {Alert, AlertTitle, Button,Snackbar} from '@mui/material';
import {Link, NavLink, useNavigate} from "react-router-dom";
import Error from "./Error";
import './Table.css';
import './Button.css';


function MyProductsPage() {
    const [token, setToken] = useState(" ");
    const [amountOfferHighest, setAmountOfferHighest] = useState(0);
    const [myAuctions, setMyAuctions] = useState([]);
    const[errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();
    // const [open, setOpen] = useState(false);


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
                }else {
                     alert("response is null")
                }

            })
    },[]);

    const onClickAdd = () => {
        navigate("../createProduct");
    }


    const endAuction=(auctionId)=>{
        axios.post("http://localhost:8989/close-exist-auction?auctionId="+auctionId,null,{
            params:{
                auctionId
            }
        }).then((res)=>{
            setErrorCode(res.data.errorCode)
            setErrorCode(0);
            if(res.data.success){

                alert("end success")
            }else {

                alert("not end ok")
            }
        });
    }



    //
    // const handleClick = () => {
    //     setOpen(true);
    //
    //     setTimeout(() => {
    //         setOpen(false);
    //     }, 10000); // 10000 milliseconds = 10 seconds
    // };
    //
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };
    return (
        <div>
            <UserMenu />

            {/*<Alert severity="error">This is an error alert — check it out!</Alert>*/}
            {/*<Snackbar*/}
            {/*    open={open}*/}
            {/*    autoHideDuration={10000} // 10000 milliseconds = 10 seconds*/}
            {/*    onClose={handleClose}*/}
            {/*    message="This alert will disappear after 10 seconds"*/}
            {/*/>*/}

            <h1> my products: </h1>
            <br />
            <table style={{border:"1px solid black"}}  className={"fl-table"}>
                <tr>
                    <th style={{fontWeight:"bold"}}>Product Name</th>
                    <th style={{fontWeight: "bold"}}>Highest proposal</th>
                    <th style={{fontWeight: "bold"}}>Auction status</th>
                    <th style={{fontWeight: "bold"}}> Close auction</th>
                </tr>
                {
                myAuctions.map((auction)=>{
                    const link = auction.auctionId;
                        return(
                            <tr>
                                <td><Link to={"/product/" + link}>{auction.productName}</Link></td>
                                {
                                    auction.highestOffer!=null ?
                                        <td>{auction.highestOffer.offerPrice} </td>
                                        :
                                        <td> no offers</td>
                                }
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

            </table>

                <button className={"button"} onClick={onClickAdd}>Add Product </button>
            {
                errorCode!==0&&
             <Error message={errorCode}/>
            }
        </div>
    );
}
export default MyProductsPage;
