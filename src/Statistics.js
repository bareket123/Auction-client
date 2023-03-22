import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './Table.css';

function Statistics() {
    const[users, setUsers] = useState("");
    const[allAuctionsSize, setAllAuctionsSize] = useState(0);
    const[proposals, setProposals] = useState(0);


    useEffect(()=>{
        axios.get("http://localhost:8989/get-users-size").then((res)=>{
            setUsers(res.data)
        });
    });

    useEffect(() => {
            axios.get("http://localhost:8989/get-all-auctions-size")
                .then((response) => {
                    setAllAuctionsSize(response.data)
                })
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get("http://localhost:8989/get-all-sale-offers-size")
                .then((response) => {
                    setProposals(response.data);
                });
        }, 1000);

        return () => clearInterval(intervalId);

    }, []);

    return (
        <div>
            <br/>
          <h2 style={{textDecoration:"underline"}}>  Statistics :    </h2>
            <table border={1} className={"fl-table"}>
                <tr>
                    <th> Users</th>
                    <th> Auctions</th>
                    <th> Proposals</th>
                </tr>
                <tr>
                    <td> {users}</td>
                    <td> {allAuctionsSize}</td>
                    <td> {proposals}</td>
                </tr>
            </table>
        </div>
        );
}

export default Statistics;
