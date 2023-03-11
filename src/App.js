import './App.css';
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ManagePage from "./ManagePage";
import CreateProduct from "./CreateProduct";
import OpenAuctions from "./OpenAuctions";
import MyProductsPage from "./MyProductsPage";
import UserMenu from "./UserMenu";
import MyProposalsPage from "./MyProposalsPage";
import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Auction from "./Auction";



function App() {
    const [auctions,setAuctions]=useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:8989/get-all-auctions").then(response=>{
    //         setAuctions(response.data)
    //     })
    // }, []);

    return (
        <div>

            {/*<Router>*/}


            {/*</Router>*/}



            <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LoginPage/>}></Route>
                <Route path={"/manage"} element={<ManagePage/>}></Route>
                <Route path={"/dashboard"} element={<Dashboard/>}></Route>
                <Route path={"/createProduct"} element={<CreateProduct/>}></Route>
                <Route path={"/myProductsPage"} element={<MyProductsPage/>}></Route>
                <Route path={"/user"} element={<UserMenu/>}></Route>
                <Route path={"/openAuctions"} element={<OpenAuctions/>}></Route>
                <Route path={"/myProposalsPage"} element={<MyProposalsPage/>}></Route>
            <Route exact path={"/product/:id"} element={<Auction/>}/>


        </Routes>

        </BrowserRouter>
        </div>
    );
}

export default App;
