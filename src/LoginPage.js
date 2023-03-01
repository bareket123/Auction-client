import {useEffect, useState} from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


function LoginPage () {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[type, setType] = useState("login");
    const[errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
        } else {
            navigate("../dashboard")
        }
    }, [])

    const usernameChanged = (event) => {
        setUsername(event.target.value)
    }

    const passwordChanged = (event) => {
        setPassword(event.target.value);
    }

    const password2Changed = (event) => {
        setPassword2(event.target.value);
    }

    const typeChanged = (event) => {
        setType(event.target.value);
    }



    const submit = () => {
        if (type == "signUp") {
            axios.post("http://ec2-18-221-114-107.us-east-2.compute.amazonaws.com:8989/sign-up", null, {
                params: {username,  password}
            }).then((response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    alert ("OK")
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })
        } else {
            axios.post("http://ec2-18-221-114-107.us-east-2.compute.amazonaws.com:8989/login", null, {
                params: {username,  password}
            }).then((response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    Cookies.set("token", response.data.token);
                    navigate("../dashboard")
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })

        }
    }

    return (
        <div style={{margin: "25px"}}>
            <div>
                 <span style={{marginRight: "5px"}}>
                     <input type={"radio"} name={"type"} value={"login"}
                            checked={type == "login"} onChange={typeChanged} />Login
                 </span>
                 <input type={"radio"} name={"type"} value={"signUp"}
                               checked={type == "signUp"} onChange={typeChanged}/>Sign Up
            </div>
            <table>
                <tr>
                    <td>
                        Username:
                    </td>
                    <td>
                        <input type={"text"} value={username} onChange={usernameChanged}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input type={"password"} value={password} onChange={passwordChanged}/>
                    </td>
                    <td>
                        {
                            type == "signUp" && password.length < 6 &&  password.length > 0 &&
                            <ErrorMessage message={"Password too weak"} lineBreak={false}/>
                        }
                    </td>
                </tr>
                {
                    type == "signUp" &&
                    <tr>
                        <td>Repeat Password:</td>
                        <td><input type={"password"} value={password2} onChange={password2Changed}/></td>
                        <td>
                            {
                                password != password2 &&
                                <ErrorMessage message={"Passwords Don't match"} lineBreak={true}/>
                            }
                        </td>
                    </tr>
                }

            </table>

            {
                errorCode > 0 &&
                <ErrorMessage message={errorCode} lineBreak={true}/>
            }
            <button onClick={submit} disabled={
                password.length < 6 ||
                (password != password2 && type == "signUp") ||
                username.length == 0
            }>{type == "signUp" ? "Sign Up" : "Login"}</button>

        </div>
    )
}

export default LoginPage;
