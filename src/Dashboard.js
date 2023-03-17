import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserMenu from "./UserMenu";
import React from 'react';
import Statistics from "./Statistics";

function Dashboard () {

    const [isAdmin,setIsAdmin]=useState(false);
    const [credit,setCredit]=useState(0);
    const[username, setUsername] = useState("");
    const navigate = useNavigate();
    const token = Cookies.get("token");

    useEffect(()=>{
        if (token !==undefined){
            const sse = new EventSource("http://localhost:8989/sse-handler?submitUserToken=" + token);
            sse.onmessage = (message) => {
                const data = message.data;
                console.log("data is: " +data)
                if (data ==="1") {
                    alert("added new offer")

                    // setTimeout(() => {
                    // }, 1000)
                }else if (data==="2"){
                    alert("auction was closed")
                }
            }

        }

    },[])


    useEffect(() => {
        if (token === undefined) {
            navigate("../");
        } else {

            axios.get("http://localhost:8989/get-username-by-token?token="+token).then((response)=>{
                setUsername(response.data)
            })
            setIsAdmin(Cookies.get("isAdmin"));
        }
    }, []);

    // const logout = () => {
    //     Cookies.remove("token");
    //     navigate("../login");
    // }
    //
    // const showConversation = (recipient) => {
    //     setRecipientId(recipient.id);
    //     setCurrentRecipient(recipient.username)
    //     axios.get("http://ec2-18-221-114-107.us-east-2.compute.amazonaws.com:8989/get-conversation?token=" + token + "&recipientId=" + recipient.id)
    //         .then(response => {
    //             setConversation(response.data.messageList)
    //         })
    //     const sse = new EventSource("http://ec2-18-221-114-107.us-east-2.compute.amazonaws.com:8989/sse-handler?token=" + token + "&recipientId=" + recipient.id);
    //     sse.onmessage = (message) => {
    //         const data = message.data;
    //         if (data == "1") {
    //             setTyping(true)
    //             setTimeout(() => {
    //                 setTyping(false)
    //             }, 1000)
    //         } else {
    //            const newMessage = JSON.parse(message.data);
    //            setConversation((prevConversation) => {
    //                const newConversation = prevConversation.slice();
    //                newConversation.push(newMessage);
    //                return newConversation;
    //            });
    //         }
    //     }
    // }

    // const newMessageChanged = (event) => {
    //     setNewMessage(event.target.value);
    //     axios.post("http://ec2-18-221-114-107.us-east-2.compute.amazonaws.com:8989/start-typing", null, {
    //         params: {
    //             token, recipientId
    //         }
    //     })
    // }

    // const send = () => {
    //     axios.post("http://ec2-18-221-114-107.us-east-2.compute.amazonaws.com:8989/send-message", null, {
    //         params: {
    //             token, recipientId, content: newMessage
    //         }
    //     }).then((response) => {
    //         if (response.data.success) {
    //             showConversation({id: recipientId, username: currentRecipient});
    //             setNewMessage("");
    //         }
    //     })
    // }

    const updateCredit =()=>{
        const updatedCredits = credit
        axios.post("http://localhost:8989/update-credits", null, {
            params: {
                token, updatedCredits
            }
        }).then((response) => {
            if (response.data.success) {
               alert("success")

            }
        })
    }

    return (
        <div>
                <UserMenu/>
            <h3>    Hello {username} !</h3>
            <h3> Welcome to our website !</h3>
            <h3> Have a fun experience. </h3>

            <Statistics/>
            {/*</div>*/}
            {/*<div id={"page"}>*/}
                {/*<div id={"sideBar"}>*/}
                {/*    {*/}
                {/*        recipients.map(item => {*/}
                {/*            return (*/}
                {/*                <div style={{marginBottom: "10px"}}>*/}
                {/*                    /!*<button onClick={() => showConversation(item)}>*!/*/}
                {/*                    /!*    {item.username}*!/*/}
                {/*                    /!*</button>*!/*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</div>*/}
                {/*<div id={"content"}>*/}
                    {/*{*/}
                    {/*    conversation.map(message => {*/}
                    {/*        return (*/}
                    {/*            <Message data={message}/>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                    {/*<div>*/}
                    {/*    {*/}
                    {/*        recipientId > 0 &&*/}
                    {/*        <div>*/}
                    {/*            <div>*/}
                    {/*                <span>{currentRecipient}</span>*/}
                    {/*                {*/}
                    {/*                    typing &&*/}
                    {/*                    <span> is typing...</span>*/}
                    {/*                }*/}
                    {/*            </div>*/}
                    {/*            <input value={newMessage} onChange={newMessageChanged}/>*/}
                    {/*            <button onClick={send} disabled={newMessage == ""}>SEND</button>*/}
                    {/*        </div>*/}
                    {/*    }*/}
            {/*        /!*</div>*!/*/}
            {/*    </div>*/}

            {/*</div>*/}
            {
                isAdmin && <div>
                    change credit <input type={"number"} value={credit} onChange={(event)=>{setCredit(event.target.value)}}/>
                    <button onClick={updateCredit}>update</button>
                   <div style={{fontWeight:"bold"}}> logged as admin <br/> </div>

                </div>
            }


        </div>
    )
}

export default Dashboard;
