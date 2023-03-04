import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";
import axios from "axios";
import {BrowserRouter, NavLink, Route, Routes,Router,Switch} from "react-router-dom";
import Auction from "./Auction";


const OpenAuctions = () => {
    /*
     1. שליחת בקשה לשרת לקבלת רשימת המכרזים הפתוחים
     2. רנדור כל מכרז בפני עצמו -
     .שם מוצר, תמונה,תאריך יצירה,כמות המציעים הכללית, כמות ההצעות על המוצר (של המשתמש)
     וכפתור להגשת הצעה חדשה שיוסיף לנו על המסך - סכום + כפתור שלח למוכר
          *תיבת טקסט לחיפוש מוצר
לחיצה על מוצר תוביל לעמוד הבא של אותו מוצר.
התראות: מוצר שהגשתי הצעה אליו נמכר ,מישהו הגיש הצעה למוצר שהעלתי.
     */

    const[openAuctions, setOpenAuctions] = useState([]);
    const[filteredList, setFilteredList] = useState([]);
    const [search,setSearch] = useState("");
    const productPreview = {name: "" , pictureLink:"" , creationDate:"" , amountProposals : 0 };
    useEffect(() => {
        axios.get("http://localhost:8989/get-open-auctions")
            .then(response => {
                setOpenAuctions(response.data)
            })
    },[])

    const filterAuctions = (event) =>{
        setSearch(event.target.value)
        if (search==="" || search.length===0)
            return setFilteredList(openAuctions)
        else{
            return setFilteredList(openAuctions.filter((auction)=>auction.name.includes(search)))
        }
    }




    return (
        <div>
            <UserMenu/>
            <h1> open auctions: </h1>
            <table border={1}>
                <tr>
                    <td>
                        search product :  <input placeholder={"search"} value={search} type={"text"} onChange={ filterAuctions}/>
                    </td>
                </tr>

                <div className="wrapper" >

                            {

                                filteredList.map((auction)=>{
                                        const link = auction.product.name;
                                        return(
                                            <div style={{background:"pink"}}>
                                                <NavLink to={link} >
                                                    <div>{auction.product.name} </div>
                                                    <img src={auction.product.photo} alt={auction.product.name}  />
                                                    <div> Open date : <br/> {auction.openDate}   </div>
                                                    <div> Amount of offers : {auction.saleOffers.length}   </div>
                                                </NavLink>

                                            </div>
                                        )
                                    }
                                )
                            }

                </div>
            </table>

            {/*<Router>*/}
            {/*    <Switch>*/}
            {/*        {*/}
            {/*            openAuctions.map((auction)=>{*/}
            {/*                return(*/}
            {/*                    <div>*/}
            {/*                        <Route exact path="/products" render={() => <Auction object={auction} />} />*/}
            {/*                        <Route exact path="/products/:id" component={Auction} />*/}
            {/*                    </div>*/}

            {/*                    )*/}

            {/*            })*/}
            {/*        }*/}

            {/*    </Switch>*/}
            {/*</Router>*/}
        </div>
    );
};

export default OpenAuctions;