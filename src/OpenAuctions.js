import React from 'react';
import {useEffect, useState} from "react";
import UserMenu from "./UserMenu";


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
        setOpenAuctions([ {name: "dog" , pictureLink:"http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ" , creationDate:"wwwww" , amountProposals : 1 },
            {name: "cffff" , pictureLink:"http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ" , creationDate:"wwwww" , amountProposals : 2 },
            {name: "and" , pictureLink:"http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ" , creationDate:"wwwww" , amountProposals : 3 },
            {name: "vvcff" , pictureLink:"http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ" , creationDate:"wwwww" , amountProposals : 4 }]);
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
                           return(
                            <div>
                                <div>{auction.name} </div>
                                <img src={auction.pictureLink} alt={auction.name}  />
                                <div>  {auction.creationDate}   </div>
                                <div>  {auction.amountProposals}   </div>
                            </div>
                               )
                           }
                       )
                    }
                </div>
        </table>


            {/*<BrowserRouter>*/}
            {/*<Routes>*/}
            {/*{*/}
            {/*    openAuctions.map((auction)=>{*/}
            {/*        return (*/}
            {/*                    <Route path={"/"+auction.name} elmanageement={<Auction object={auction}/>}></Route>*/}
            {/*    )*/}
            {/*    })*/}
            {/*}*/}
            {/*    </Routes>*/}
            {/*    </BrowserRouter>*/}
        </div>
    );
};

export default OpenAuctions;