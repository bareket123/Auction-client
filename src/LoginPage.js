import {useEffect, useState} from "react";
import axios from "axios";
import Error from "./Error";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import Statistics from "./Statistics";
import './Table.css';
import './Button.css';
import './Input.css';
import './Selectors.css';



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
            navigate("../")
        } else {
            navigate("../dashboard")
        }
    }, [])

    // useEffect((e)=>{
    //     e.preventDefault();
    // })

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
            axios.post("http://localhost:8989/sign-up", null, {
                params: {username,  password}
            }).then((response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    setUsername("")
                    setPassword("")
                    setPassword2("")
                    alert ("OK")
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })
        } else {
            axios.post("http://localhost:8989/login", null, {
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
                     <input className={"inputStyle"}  type={"radio"} name={"type"} value={"login"}
                            checked={type == "login"} onChange={typeChanged} />Login
                 </span>
                 <input className={"inputStyle"}  type={"radio"} name={"type"} value={"signUp"}
                               checked={type == "signUp"} onChange={typeChanged}/>Sign Up
            </div>

            <table className={"selectTeamsTable"} className={"positionTable"}>
                <tr>
                    <td>
                        Username:
                    </td>
                    <td>
                        <input className={"inputStyle"} placeholder={"Enter your username"} type={"text"} value={username} onChange={usernameChanged}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input  className={"inputStyle"}  placeholder={"Enter your password"} type={"password"} value={password} onChange={passwordChanged}/>
                    </td>
                    <td>
                        {
                            type == "signUp" && password.length < 6 &&  password.length > 0 &&
                            <Error message={"Password too weak"} lineBreak={false}/>
                        }
                    </td>
                </tr>
                {
                    type == "signUp" &&
                    <tr>
                        <td>Repeat Password:</td>
                        <td><input className={"inputStyle"} type={"password"}  placeholder={"Enter repeat password"} value={password2} onChange={password2Changed}/></td>
                        <td>
                            {
                                password != password2 &&
                                <Error message={"Passwords Don't match"} lineBreak={true}/>
                            }
                        </td>
                    </tr>
                }
            </table>
            {
                errorCode > 0 &&
                <Error message={errorCode} lineBreak={true}/>
            }
            <button onClick={submit} className={"button"} disabled={
                password.length < 6 ||
                (password != password2 && type == "signUp") ||
                username.length == 0
            }>{type == "signUp" ? "Sign Up" : "Login"}</button>
            <Statistics/>

        </div>
    )
}
export default LoginPage;
