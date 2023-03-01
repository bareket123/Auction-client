import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ManagePage from "./ManagePage";
import Statistics from "./Statistics";
import CreateProduct from "./CreateProduct";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/manage"} element={<ManagePage/>}></Route>
                <Route path={"/"} element={<LoginPage/>}></Route>
                <Route path={"/login"} element={<LoginPage/>}></Route>
                <Route path={"/dashboard"} element={<Dashboard/>}></Route>
                <Route path={"/createProduct"} element={<CreateProduct/>}></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
