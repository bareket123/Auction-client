import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserMenu from "./UserMenu";

const CreateProduct = () => {

        const [submitUser,setSubmitUser]=useState("");
        const [name,setName]=useState("");
        const [description,setDescription]=useState("");
        const [photo,setPhoto]=useState("");
        const [initialPrice,setInitialPrice]=useState(0);
        const navigate = useNavigate();
        useEffect(() => {
                setSubmitUser(Cookies.get("token"));

        }, [])

        const submit = () => {

                axios.post("http://localhost:8989/create-new-auction", null, {
                        params: {
                                submitUser, initialPrice, name ,photo ,description
                        }
                }).then((response) => {
                        if (response.data.success) {
                            alert("working")
                                navigate("../myProductsPage")
                        }else {
                            alert("not working")
                        }
                })
        }

    return (
        <div>
          <UserMenu/>
            <div>Product Name:</div>
            <input type={"text"} value={name} onChange={(event)=>{setName(event.target.value)}} />
            <br/><br/>
            <div> Product description:</div>
            <input type={"text"}  value={description} onChange={(event)=>{setDescription(event.target.value)}}/>
            <br/><br/>
            <div>Link for product image:</div>
            <input type={"url"}  value={photo} onChange={(event)=>{setPhoto(event.target.value)}}/>
            <br/><br/>
            <div>Minimum starting bid price: </div>
            <input type={"number"} value={initialPrice} min={0} onChange={(event)=>{setInitialPrice(event.target.value)}} />
            <br/><br/>
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default CreateProduct;
