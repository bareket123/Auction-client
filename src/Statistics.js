import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

function Statistics() {
    const[users, setUsers] = useState(0);
    const[openAuctions, setOpenAuctions] = useState(0);
    const[closeAuctions, setCloseAuctions] = useState(0);
    const[proposals, setProposals] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8989/get-users-size")
            .then(response => {
                    setUsers(response.data)
            })
    },[])

    useEffect(() => {
        axios.get("http://localhost:8989/get-open-auction-size")
            .then(response => {
                    setOpenAuctions(response.data)

            })

        axios.get("http://localhost:8989/get-close-auction-size")
            .then(response => {
                setCloseAuctions(response.data)
            })
    },[])

    useEffect(() => {
        axios.get("http://localhost:8989/get-all-sale-offers-size")
            .then(response => {
                    setProposals(response.data)
            })
    },[])

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
                    <td> {openAuctions+closeAuctions}</td>
                    <td> {proposals}</td>
                </tr>
            </table>
        </div>
        );
}

export default Statistics;