import React from 'react';
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import { useParams } from "react-router-dom";
import axios from "axios";

const Auction = () => {

    const[addProposal, setAddProposal] = useState(false);
    const[token, setToken] = useState(" ");
    const[offerPrice, setOfferPrice] = useState(0);
    const[auction, setAuction] = useState({});
    const[offerByUser, setOfferByUser] = useState([]);
    const [isPublisher,setIsPublisher]=useState(false);
    const {id} = useParams();


    useEffect(() => {
        setToken ( Cookies.get("token") );


    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8989/get-product-by-id?auctionId="+id+"&token="+token).then((response=>{
            if (response.data.success){
                setAuction(response.data.productModels)
                setIsPublisher(response.data.publisher)
                setOfferByUser(response.data.productModels.saleOffersByUser)

            }

        }))

    })

const addNewOffer=()=>{
        axios.post(("http://localhost:8989/create-sale-offer"), null, {
            params: {
                token:token, offerPrice:offerPrice, auctionId: id
            }
         }).then((res) =>{
             if (res.data.success){
                 alert("working")
             }else {
                 alert("not working")
             }
             console.log(res.data)
        })
    setOfferPrice(0);
}


    return (
        <div>

            <UserMenu/>
            <div>   Product Name:   {auction.productName} </div>
                <br/>

            <img src={auction.productPhoto} alt={"no picture"}/>
            <br/>

            <div> Product description:  {auction.productDescription} </div>
            <br/>

            <div> creation date : {auction.creationDate}   </div>
            <br/>

            <div> start price : {auction.initialPrice}   </div>
            <br/>

            <div>amount proposals : {auction.numberOffers} </div>
            <br/>

            <div> publisher : {auction.publisher} </div>
            <br/>
            {
                isPublisher ?
                    <button> finish auction </button>


                    :

                    // <div>

                    offerByUser.length !== 0 &&

                    <div>

                <div>
                    my proposals :
                    <table>
                        <ol>
                        {
                            auction.saleOffersByUser.map((proposal)=>{
                            return(
                                <tr>
                                    <td><li>{proposal.offerPrice}</li></td>
                                </tr>
                            )
                        })}
                        </ol>
                    </table>
                </div>





                </div>

            }
            <div>
                <button onClick={ ()=>{setAddProposal(!addProposal)}} > add proposal </button>
                {
                    addProposal &&
                    <div>
                        <input type={"number"} onChange={(event)=>setOfferPrice(event.target.value)} value={offerPrice} />
                        <button onClick={addNewOffer} > send </button>
                    </div>
                }

            </div>
        </div>
    );
}
export default Auction;
