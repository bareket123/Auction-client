import React from 'react';
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import './Table.css';
import './Button.css';
import {Button, IconButton, Snackbar} from "@mui/material";



const Auction = () => {

    const[addProposal, setAddProposal] = useState(false);
    const[token, setToken] = useState("");
    const[offerPrice, setOfferPrice] = useState(0);
    const[auction, setAuction] = useState({});
    const[offerByUser, setOfferByUser] = useState([]);
    const [isPublisher,setIsPublisher]=useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const [errorCode,setErrorCode]=useState(0);
    // const [isAdmin,setIsAdmin]=useState(false);
    const [open, setOpen] = useState(false);



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                X
            </Button>
        </>

    );


    useEffect(()=>{
        setToken ( Cookies.get("token") );
        if (token!==undefined)
            axios.get("http://localhost:8989/get-product-by-id?auctionId="+id+"&token="+token).then((response=>{
                if (response.data.success){
                    setAuction(response.data.productModels)
                    setIsPublisher(response.data.publisher)
                    setOfferByUser(response.data.productModels.saleOffersByUser)

                }else{
                    setErrorCode(response.data.errorCode)
                }

        }))

    })

const addNewOffer=()=> {
    axios.post(("http://localhost:8989/create-sale-offer"), null, {
        params: {
            token: token, offerPrice: offerPrice, auctionId: id
        }
    }).then((res) => {
        if (res.data.success) {
            alert("added successfully")
        } else setErrorCode(res.data.errorCode)
    })
    setOfferPrice(0);

    axios.post(("http://localhost:8989/added-new-offer"), null, {
        params: {
            token, auctionId: id
        }

    })

}


    const endAuction=()=>{
        axios.post("http://localhost:8989/close-exist-auction",null,{
            params:{
                auctionId: id
            }
        }).then((res)=>{
            if(res.data.success){
                setOpen(true);
             // alert("end auction success")
            }else {
                setErrorCode(res.data.errorCode)
            }
        });
    }

    return (
        <div>

            <UserMenu/>

                <Snackbar
                // style={{ top: '50px', left: '1600px', backgroundColor: 'red' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="end auction success"
                action={action}
            />


            <div><u>Product Name:</u> {auction.productName} </div>
                <br/>

            <img width="200" height="200" src={auction.productPhoto} alt={"no picture"}/>
            <br/>

            <div><u> Product Description:</u> {auction.productDescription} </div>
            <br/>

            <div> <u>Creation Date:</u> {auction.creationDate}   </div>
            <br/>

            <div><u> Start Price:</u> {auction.initialPrice}$ </div>
            <br/>

            <div><u>Amount Proposals:</u> { auction.allOffers!=undefined ? auction.allOffers.length : "0"} </div>
            <br/>

            <div><u> Publisher:</u> {auction.publisher} </div>
            <br/>

            {
                isPublisher ?
                        <div>
                        <u> All Proposals:</u>
                            <table className={"fl-table"}>
                                <tr >
                                    <th></th>
                                    <th>Submitter Username</th>
                                    <th>Offer Price</th>
                                </tr>

                                    {
                                        auction.allOffers.map((proposal,index)=>{
                                            return(
                                                <tr>
                                                        <td>{index+1}</td>
                                                        <td>{proposal.submitterUserName}</td>
                                                        <td> {proposal.offerPrice}</td>

                                                </tr>
                                            )
                                        })}

                            </table>
                            <br/>
                       <button  onClick={endAuction} className={"button"}> End Auction </button>
                        </div>

                    :

                 offerByUser.length !== 0 &&

                    <div>

                <div>
                <u> My Proposals:</u>
                    <table className={"fl-table"} >
                       <tr>
                           <th></th>
                           <th>Offered Price</th>
                       </tr>
                        {
                            auction.saleOffersByUser.map((proposal,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{proposal.offerPrice + " $"}</td>
                                </tr>
                            )
                        })}


                    </table>
                </div>

                </div>

            }
            <div>
                {
                    !isPublisher &&
                    <button  className={"button"} onClick={ ()=>{setAddProposal(!addProposal)}} > Add </button>

                }
                {
                    addProposal &&
                    <div>
                        <input type={"number"} onChange={(event) => {
                            setOfferPrice(event.target.value);

                        }

                        } value={offerPrice} />
                        <button className={"button"} onClick={addNewOffer} > send </button>
                    </div>
                }

            </div>
            <div>
            {
                errorCode!==0 && <Error message={errorCode} />
            }
            </div>
        </div>
    );
}
export default Auction;
