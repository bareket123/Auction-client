import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ManagePage from "./ManagePage";
import CreateProduct from "./CreateProduct";
import OpenAuctions from "./OpenAuctions";
import MyProductsPage from "./MyProductsPage";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/manage"} element={<ManagePage/>}></Route>
                <Route path={"/"} element={<LoginPage/>}></Route>
                <Route path={"/login"} element={<LoginPage/>}></Route>
                <Route path={"/dashboard"} element={<Dashboard/>}></Route>
                <Route path={"/createProduct"} element={<CreateProduct/>}></Route>
                <Route path={"/myProductsPage"} element={<MyProductsPage/>}></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
