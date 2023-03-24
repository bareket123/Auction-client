import React from 'react';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserMenu from "./UserMenu";
import {UPLOADED_NEW_PRODUCT_SUCCESSFULLY} from "./Constans";
import SnackBarAlert from "./SnackBarAlert";


const CreateProduct = () => {

        const [submitUser,setSubmitUser]=useState("");
        const [name,setName]=useState("");
        const [description,setDescription]=useState("");
        const [photo,setPhoto]=useState("");
        const [initialPrice,setInitialPrice]=useState(0);
        const navigate = useNavigate();
        const [messageCode,setMessageCode]=useState(0);

    useEffect(() => {
            setSubmitUser(Cookies.get("token"));
        }, [])

        const submit = () => {
            if (name !== "" && description !== "" && photo !== "") {
                axios.post("http://localhost:8989/create-new-auction", null, {
                    params: {
                        submitUser,
                        initialPrice,
                        productName: name,
                        productPhoto: photo,
                        productDescription: description
                    }
                }).then((response) => {
                    if (response.data.success) {
                        setMessageCode(UPLOADED_NEW_PRODUCT_SUCCESSFULLY)
                        setTimeout(()=>{
                            navigate("../myProductsPage")
                        },1000)

                    } else {
                        setMessageCode(response.data.errorCode)
                    }
                })
            }
         setMessageCode(0)
        }

    return (
        <div>
          <UserMenu />
            <div>Product Name :</div>
            <input placeholder={"Enter name"} className={"inputStyle"} type={"text"} value={name} onChange={(event)=>{setName(event.target.value)}} />
            <br/><br/>
            <div> Product Description :</div>
            <input placeholder={"Enter Description"} className={"inputStyle"} type={"text"}  value={description} onChange={(event)=>{setDescription(event.target.value)}}/>
            <br/><br/>
            <div>Link For Image :</div>
            <input placeholder={"Enter Photo Link"} className={"inputStyle"} type={"url"}  value={photo} onChange={(event)=>{setPhoto(event.target.value)}}/>
            <br/><br/>
            <div>Starting Price : </div>
            <input className={"inputStyle"} type={"number"} value={initialPrice} min={0}  onChange={(event)=>{setInitialPrice(event.target.value)}} />
            <br/><br/>

            <button className={"button"}  onClick={()=>{submit()}} >Submit</button>
            {
                messageCode!==0&&
                <SnackBarAlert message={messageCode}/>
            }
        </div>
    );
};

export default CreateProduct;
