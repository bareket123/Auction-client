import React from 'react';
import {useState,useEffect} from "react";
import Cookies from "js-cookie";


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
            <div>   Product Name:             <br/>  {props.object.name} </div>
            <br/>

            <img src={props.object.pictureLink} alt={props.object.name}/>
            <br/>

            <div> Product description:            <br/> {props.object.description} </div>
            <br/>

            <div> creation date :{props.object.creationDate}   </div>
            <br/>

            <div> start price: {props.object.startPrice}   </div>
            <br/>

            <div>amount proposals: {props.object.amountProposals} </div>
            <br/>

            <div> publisher :{props.object.publisher} </div>
            <br/>


            { props.object.myProposals.length!=0 &&
                <div> my proposals :
                    <table>
                        {  props.object.myProposals.map((proposal)=>{
                            return(
                                <tr> <td>{ proposal.creationDate} </td>
                                    <td>{ proposal.price}</td>
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
                token == props.object.publisher.token &&
                <button> finish auction </button>
            }
        </div>
    );
}







export default Auction;