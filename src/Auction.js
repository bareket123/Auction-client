import React from 'react';
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import { useParams} from "react-router-dom";
import axios from "axios";
import './Table.css';
import './Button.css';
import SnackBarAlert from "./SnackBarAlert";
 import {CLOSED_AUCTION_SUCCESSFULLY, ADD_NEW_OFFER} from "./Constans";

const Auction = () => {

    const[addProposal, setAddProposal] = useState(false);
    let token = Cookies.get("token");
    const[offerPrice, setOfferPrice] = useState(0);
    const[auction, setAuction] = useState({});
    const[offerByUser, setOfferByUser] = useState([]);
    const [isPublisher,setIsPublisher]=useState(false);
    const {id} = useParams();
    const [messageCode, setMessageCode] = useState(0);
    const isAdmin=Cookies.get("isAdmin");

    useEffect(()=>{
    },[messageCode])


    useEffect(()=>{

        if (token!==undefined)
            axios.get("http://localhost:8989/get-product-by-id?auctionId="+id+"&token="+token).then((response=>{
                if (response.data.success){
                    setAuction(response.data.productModels)
                    setIsPublisher(response.data.publisher)
                    setOfferByUser(response.data.productModels.saleOffersByUser)
                }else{
                    setMessageCode(response.data.errorCode)
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
            setMessageCode(ADD_NEW_OFFER)

        } else setMessageCode(res.data.errorCode)
    })
    setOfferPrice(0);
    setMessageCode(0);
}

    const endAuction=()=>{
        axios.post("http://localhost:8989/close-exist-auction",null,{
            params:{
                auctionId: id
            }
        }).then((res)=>{
            if(res.data.success){
                setMessageCode(CLOSED_AUCTION_SUCCESSFULLY)
            }else {
                setMessageCode(res.data.errorCode)
            }
        });
       setMessageCode(0)
    }

    return (
        <div >
            <UserMenu/>
             {
                ( messageCode!==0 && messageCode!==1005) &&
                <SnackBarAlert message={messageCode}/>
            }
            <div id={"auction-font"}><u>Product Name:</u> {auction.productName} </div>
                <br/>
            <img id={"auction-font"} width="200" height="200" src={auction.productPhoto} alt={"no picture"}/>
            <br/>

            <div id={"auction-font"}><u> Product Description:</u> {auction.productDescription} </div>
            <br/>

            <div id={"auction-font"}> <u>Creation Date:</u> {auction.creationDate}   </div>
            <br/>

            <div id={"auction-font"}><u> Start Price:</u> {auction.initialPrice}$ </div>
            <br/>

            <div id={"auction-font"}><u>Amount Proposals:</u> { auction.allOffers!=undefined ? auction.allOffers.length : "0"} </div>
            <br/>

            <div id={"auction-font"}><u> Publisher:</u> {auction.publisher} </div>
            <br/>

            {
                (isPublisher && !isAdmin) ?
                        <div >
                        <u id={"auction-font"}> All Proposals:</u>
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
                            <button  onClick={endAuction} disabled={!auction.open} className={"button"}> End Auction </button>
                        </div>
                    :
                ( offerByUser.length !== 0 && !isAdmin )&&

                <div >
                <u id={"auction-font"}> My Proposals:</u>
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

            }
            <div>
                {
                    (!isPublisher && !isAdmin && auction.open) &&
                    <button  className={"button"} onClick={ ()=>{setAddProposal(!addProposal)}} > Add </button>
                }
                {
                    (!auction.open&& !isPublisher)&&
                    <div style={{color: "red" ,fontSize:"30px"}}>The auction is closed, no bids can be submitted</div>
                }
                {
                    addProposal &&
                    <div>
                        <input className={"inputStyle"} type={"number"} onChange={(event) => {
                            setOfferPrice(event.target.value);
                        }
                        } value={offerPrice} />
                        <button className={"button"} onClick={addNewOffer} > send </button>
                    </div>
                }
            </div>
        </div>
    );
}
export default Auction;
