import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from '@mui/charts';

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

            {/*<BarChart width={500} height={300} data={[{users},{auctions},{proposals}]} >*/}
            {/*    <CartesianGrid strokeDasharray="3 3" />*/}
            {/*    <XAxis />*/}
            {/*    <YAxis />*/}
            {/*    <Tooltip />*/}
            {/*    <Legend />*/}
            {/*    <Bar dataKey="value" fill="#8884d8" />*/}
            {/*</BarChart>*/}
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