import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

const CreateProduct = () => {

        const [publisher,setPublisher]=useState("");

        // useEffect(() => {
        //         const token = Cookies.get("token");
        //
        // }, [])

    return (
        <div>
            <div>Product Name:</div>
            <input type={"text"}/>
            <br/><br/>
            <div> Product description:</div>
            <input type={"text"}/>
            <br/><br/>
            <div>Link for product image:</div>
            <input type={"url"}/>
            <br/><br/>
            <div>Minimum starting bid price: </div>
            <input type={"number"} min={0} />
            <br/><br/>
            <button>Submit</button>
        </div>
    );
};

export default CreateProduct;