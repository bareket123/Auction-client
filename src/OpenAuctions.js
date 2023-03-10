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
    /*
    שלושה שלבים:
1. ב-Router אתם צריכים להגדיר Route שיש בו משתנה. נגיד שה-Route שבחרתם נקרא product, אז לכתוב אותו ככה:
      <Route exact path="/product/:id" component={MyProductComponent} />
שימי לב שאחרי המילה product מגיע התו / ולאחריו התו : (נקודתיים) שמסמן שמדובר בפרמטר.

2. לשים לינק שנראה ככה:
/product/131 כלומר, המילה product, לאחריה התו / ולאחריה ערך עבור המשתנה id, בדוגמה שכתבתי הערך הוא 131.

3. בתוך הקומפוננטה MyProductComponent אתם תרצו לבדוק איזה מוצר צריך להציג. כלומר, תרצו לקרוא מתוך ה-url מה המספר שכתוב שם. אפשר לעשות את זה בשתי דרכים:
עם HOOKS:
import { useParams } from "react-router-dom";
.....
  const {id } = useParams();
....

עם CLASS COMPONENT:
const id = this.props.match.params.id


ברגע שיש לכם את ה-id ניתן לעשות עם הערך הזה מה שרוצים
     */

    const[openAuctions, setOpenAuctions] = useState([]);
    const[filteredList, setFilteredList] = useState([]);
    const [search,setSearch] = useState("");
    const productPreview = {name: "" , pictureLink:"" , creationDate:"" , amountProposals : 0 };
    useEffect(() => {
        axios.get("http://localhost:8989/get-open-auctions")
            .then(response => {
                setOpenAuctions(response.data.auctions)
            })
    },[])

    const filter=()=>{
        const originalArray=openAuctions
       if (originalArray.length>0){
           let filterArray=originalArray.filter((auction)=>{
               let allow=false;
               if (auction.productName.includes(search)){
                   allow=true;
               }
               return allow;
           })
           return filterArray;
       }else return originalArray;

    }






    return (
        <div>
            <UserMenu/>
            <h1> open auctions: </h1>
            <table border={1}>
                <tr>
                    <td>
                        search product :  <input placeholder={"search"} value={search} type={"text"} onChange={ (event)=>{setSearch(event.target.value)}}/>
                    </td>
                </tr>

                <div className="wrapper" >

                            {
                                filter().map((auction)=>{
                                        const link = auction.productName;
                                        return(
                                            // <Router>
                                                <div>
                                                    <div style={{background:"pink"}}>
                                                    <NavLink to={link} >
                                                        {/*<Route key={auction.id} path={"/auction/${auction.id}"} render={() => <Auction auction={auction} />} />*/}
                                                        <div>{auction.productName} </div>
                                                        <img src={auction.productPhoto} alt={auction.productName}  />
                                                        <div> Open date : <br/> {auction.creationDate}   </div>
                                                        <div> Amount of offers : {auction.amountOfSaleOffers}   </div>
                                                    </NavLink>

                                                </div>



                                                </div>


                                        );


                                    }
                                )
                            }

                </div>
            </table>

            {/*<Router>*/}
            {/*    <BrowserRouter>*/}
        {/*            {*/}
        {/*                openAuctions.map((auction)=>{*/}
        {/*                    return(*/}
        {/*                        <div>*/}
        {/*                            <Route exact path="/products" render={() => <Auction object={auction} />} />*/}
        {/*                            <Route exact path="/products/:id" component={Auction} />*/}
        {/*                        </div>*/}

        {/*                        )*/}

        {/*                })*/}
        {/*            }*/}

        {/*        </BrowserRouter>*/}
        {/*    </Router>*/}

        </div>
    );
};

export default OpenAuctions;
