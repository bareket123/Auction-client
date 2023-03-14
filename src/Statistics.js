import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

function Statistics() {
    const[users, setUsers] = useState("");
    const[allAuctionsSize, setAllAuctionsSize] = useState(0);
    const[proposals, setProposals] = useState(0);

    // useEffect(()=>{
    //
    // },[users,allAuctionsSize,proposals])


    useEffect(()=>{
        axios.get("http://localhost:8989/get-users-size").then((res)=>{
            setUsers(res.data)
            // e.preventDefault();
        });
    });

    useEffect(() => {
        // if (allAuctionsSize!==undefined){
            axios.get("http://localhost:8989/get-all-auctions-size")
                .then((response) => {
                    setAllAuctionsSize(response.data)
                     // e.preventDefault();

                })
        //}

    })

    useEffect(() => {
        if (proposals!==undefined){
            axios.get("http://localhost:8989/get-all-sale-offers-size")
                .then((response) => {
                    setProposals(response.data)

                })
        }

    })

    return (
        <div>

            <br/>
            <table border={1}>
                Statistics :
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
