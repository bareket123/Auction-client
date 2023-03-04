import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
// import Paper from '@mui/material/Paper';
// import {
//     Chart,
//     PieSeries,
//     Title,
// } from '@devexpress/dx-react-chart-material-ui';
// import { Animation } from '@devexpress/dx-react-chart';

function Statistics() {
    const[users, setUsers] = useState(0);
    const[auctions, setAuctions] = useState(0);
    const[proposals, setProposals] = useState(0);



    // שליחת בקשה לשרת לקבלת מספר היוזרים העדכני במערכת ועדכון
    useEffect(() => {
        axios.get("http://localhost:8989/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users.length)
                }else alert("failed")
            })
    },[]) //לא מתעדכן בלייב רק ברענון דף


    //שליחת בקשה לשרת למספר מכרזים קיימים במערכת (פתוחים וסגורים)
    useEffect(() => {
        setAuctions(2)
    }, [])

    //שליחת בקשה לשרת למספר הצעות קיימים במערכת (למכרזים פתוחים וסגורים)
    useEffect(() => {
        setProposals(8)
    }, [])


    return (
        <div>

            <br/>
            <table border={1}>
                <tr>
                    <th> Users</th>
                    <th> Auctions</th>
                    <th> Proposals</th>
                </tr>
                <tr>
                    <td> {users}</td>
                    <td> {auctions}</td>
                    <td> {proposals}</td>
                </tr>
            </table>
        </div>


        // <Paper>
        //     <Chart
        //         data={2}
        //     >
        //         <PieSeries
        //             valueField="area"
        //             argumentField="country"
        //         />
        //         <Title
        //             text="Area of Countries"
        //         />
        //         <Animation />
        //     </Chart>
        // </Paper>
        );
}

export default Statistics;