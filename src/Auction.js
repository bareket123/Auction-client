import React from 'react';
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Error from "./Error";
import './Table.css';
import './Button.css';


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
    const [isAdmin,setIsAdmin]=useState(false);



    // const publisherAlert = () => {
    //    console.log(isPublisher)
    //     debugger
    //     if (isPublisher){
    //         const sse = new EventSource("http://localhost:8989/sse-handler?submitUserToken=" + token + "&auctionId=" + id);
    //         sse.onmessage = (message) => {
    //             const data = message.data;
    //
    //             if (data == 1002) {
    //                 alert("added new offer")
    //                 setTimeout(() => {
    //                 }, 1000)
    //             }
    //         }
    //     }
    //
    // }

    useEffect(()=>{
        setToken ( Cookies.get("token") );
        setIsAdmin(Cookies.get("isAdmin"));
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
            setErrorCode(0)
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
            }else {
                setErrorCode(res.data.errorCode)
            }
        });
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

            <div>amount proposals : { auction.allOffers!=undefined ? auction.allOffers.length : "0"} </div>
            <br/>

            <div> publisher : {auction.publisher} </div>
            <br/>

            {
                isPublisher ?
                        <div>
                            All proposals :
                            <table border={3} >
                                <tr >
                                    <th>Submitter Username</th>
                                    <th>offerPrice</th>
                                </tr>
                                <ol>
                                    {
                                        auction.allOffers.map((proposal)=>{
                                            return(
                                                <tr>
                                                    <li>
                                                        <td>{proposal.submitterUserName}</td>
                                                        <td> {proposal.offerPrice}</td>

                                                        </li>
                                                </tr>
                                            )
                                        })}
                                </ol>
                            </table>
                            <br/>
                       <button disabled={isAdmin} onClick={endAuction} className={"button"}> finish auction </button>
                        </div>



                    :

                 offerByUser.length !== 0 &&

                    <div>

                <div>
                    my proposals :
                    <table border={3} >
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
                {
                    !isPublisher &&
                    <button disabled={isAdmin} className={"button"} onClick={ ()=>{setAddProposal(!addProposal)}} > add proposal </button>

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
            {
                errorCode!==0 && <Error message={errorCode} />
            }
        </div>
    );
}
export default Auction;
