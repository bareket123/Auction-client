import React from 'react';
import {useState,useEffect} from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";


/*
פרטי המוצר-שם המוצר,תמונה,תאריך פתיחת המכרז, מחיר מינימלי עבור המוצר , כמות הצעות המכרז, שם משתמש שהציע את המוצר למכירה,ההצעות שלי על המוצר.
            אפשרות להגשת הצעה על המכרז- צריך להיות גבוהה מההצעות הקודמות שלי על המכרז.
            ניקח את הערך הגבוהה למוצר שהצעתי מבין ההצעות.
            כפתור לסיום מכרז במידה והמוצר הינו של המשתמש
 */

//ההצעות שלי על המוצר-מימוש בצד שרת, נצטרך לעשות מתודה שתקבל מכרז ויוזר מהשרת ומחזירה רשימת הצעות שכל הצעה תכיל מחיר ותאריך.


const Auction = (props) => {

    const[addProposal, setAddProposal] = useState(false);
    const[token, setToken] = useState(" ");
    const[highestProposal, setHighestProposal] = useState(" ");



    useEffect(() => {
        setToken ( Cookies.get("token") ) ;
    }, [])


    return (
        <div>
            <UserMenu/>
            <div>   Product Name:             <br/>  {props.data.product.name} </div>
            <br/>

            <img src={props.data.product.photo} alt={props.data.product.name}/>
            <br/>

            <div> Product description:            <br/> {props.data.product.description} </div>
            <br/>

            <div> creation date :{props.data.openDate}   </div>
            <br/>

            <div> start price: {props.data.initialPrice}   </div>
            <br/>

            <div>amount proposals: {props.data.saleOffers.length} </div>
            <br/>

            <div> publisher :{props.data.submitUser.username} </div>
            <br/>


            { props.data.saleOffers.length!=0 &&
                <div> my proposals :
                    <table>
                        {  props.data.saleOffers.map((proposal)=>{
                            return(
                                <tr> <td>{ proposal.openDate} </td>
                                    <td>{ proposal.offerPrice}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            }





            <button onClick={ ()=>{
                setAddProposal(!addProposal)
            }
            } > add proposal </button>
            {
                addProposal &&  <div>      <input type={"number"} />      <button > send </button>   </div>
            }
            {
                token == props.data.submitUser.token &&
                <button> finish auction </button>
            }
        </div>
    );
}







export default Auction;