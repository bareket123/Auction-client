import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import Statistics from "./Statistics";
import './Table.css';
import './Button.css';
import './Input.css';
import './Selectors.css';
import {SIGN_UP_SUCCESSFULLY} from "./Constans";
import SnackBarAlert from "./SnackBarAlert";


function LoginPage () {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[type, setType] = useState("login");
    const[messageCode, setMessageCode] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../")
        } else {
            navigate("../dashboard")
        }
    }, [type])

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
        if (type === "signUp") {
            axios.post("http://localhost:8989/sign-up", null, {
                params: {username,  password}
            }).then((response) => {
                if (response.data.success) {

                    setUsername("")
                    setPassword("")
                    setPassword2("")
                    setMessageCode(SIGN_UP_SUCCESSFULLY)
                     setType("Login")


                } else {
                    setMessageCode(response.data.errorCode);
                }


            })
        } else {
            axios.post("http://localhost:8989/login", null, {
                params: {username,  password}
            }).then((response) => {
                if (response.data.success) {
                    setMessageCode(0)
                    Cookies.set("token", response.data.token);
                    navigate("../dashboard")
                } else {
                    setMessageCode(response.data.errorCode);
                }
            })
        }
        setMessageCode(0)
    }


    return (
        <div style={{margin: "25px"}}>
            <div className={"login-font"}>
                 <span style={{marginRight: "5px"}}>
                     <input className={"inputStyle"}  type={"radio"} name={"type"} value={"login"}
                            checked={type === "login"} onChange={typeChanged} />Login
                 </span>
                <span>
                 <input className={"inputStyle"}  type={"radio"} name={"type"} value={"signUp"}
                               checked={type === "signUp"} onChange={typeChanged}/>Sign Up
          </span>  </div>

            <table className={"login-font"} >
                <tr>
                    <td className={"login-font"}>
                        Username:
                    </td>
                    <td >
                        <input className={"inputStyle"} placeholder={"Enter Username"} type={"text"} value={username} onChange={usernameChanged}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input  className={"inputStyle"}  placeholder={"Enter Password"} type={"password"} value={password} onChange={passwordChanged}/>
                    </td>
                    <td>
                        {
                            type === "signUp" && password.length < 6 &&  password.length > 0 &&
                            <div style={{color: "red" ,fontSize:"30px"}}>Password too weak</div>
                        }
                    </td>
                </tr>
                {
                    type === "signUp" &&
                    <tr>
                        <td>Repeat Password:</td>
                        <td><input className={"inputStyle"} type={"password"}  placeholder={"Repeat password"} value={password2} onChange={password2Changed}/></td>
                        <td>
                            {
                                ( password !== password2 && password2.length>0) &&
                                <div style={{color: "red" ,fontSize:"30px"}}> Passwords Don't match </div>
                            }
                        </td>
                    </tr>
                }
            </table>
            <button onClick={submit} className={"button"} disabled={
                password.length < 6 ||
                (password !== password2 && type === "signUp") ||
                username.length === 0
            }>{type === "signUp" ? "Sign Up" : "Login"}
            </button>
            {
                type==="login" &&
                <button   className={"button"} onClick={()=>{
                navigate("../manage");}
                }>Admin Page</button>
            }
            <Statistics/>
            {
                messageCode!==0&&
                <SnackBarAlert message={messageCode}/>
            }

        </div>
    )
}
export default LoginPage;
