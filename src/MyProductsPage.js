import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import {useNavigate} from "react-router-dom";

function MyProductsPage() {
    const[token, setToken] = useState(" ");
    const[productName, setProductName] = useState(0);
    const[amountOfferHighest, setAmountOfferHighest] = useState(0);
    const[tenderStatus, setTenderStatus] = useState(0);
    const[OfferStatusOpen, setOfferStatusOpen] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setToken ( Cookies.get("token") ) ;
        //הוספת שליחת בקשה לשרת לקבלת כל המכרזים של היוזר לפי תוקן
    }, [])

    useEffect(() => {
        setProductName("computer");
    }, [])

    useEffect(() => {
        setAmountOfferHighest(800)
    }, [])

    useEffect(() => {
        setTenderStatus("open")
    }, [])

    useEffect(() => {
        setOfferStatusOpen("yes")
    }, [])

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
                    <th> The amount of the offer the highest</th>
                    <th> Is the tender open/closed?</th>
                    <th> If the auction is open - the auction end button for that product</th>
                </tr>
                <tr>
                    <td> {productName}</td>
                    <td> {amountOfferHighest}</td>
                    <td> {tenderStatus}</td>
                    <td> {OfferStatusOpen}</td>
                </tr>
                <button onClick={onClickAdd}>Add Product</button>

            </table>
        </div>
    );
}

export default MyProductsPage;