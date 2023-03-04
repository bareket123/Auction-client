import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function ManagePage () {

    const[users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://ec2-18-221-114-107.us-east-2.compute.amazonaws.com:8989/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                }
            })
    }, [])

    const loginAs = (token) => {
        Cookies.set("token", token);
        Cookies.set("isAdmin", true);
        navigate("../dashboard");
    }

    return  (
        <div>
            Users: {users.length}
            <table>
                {
                    users.map((item) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td><button onClick={() => loginAs(item.token)}>Login As</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ManagePage;
