import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import ManagePage from "./ManagePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/manage"} element={<ManagePage/>}></Route>
                <Route path={"/"} element={<LoginPage/>}></Route>
                <Route path={"/login"} element={<LoginPage/>}></Route>
                <Route path={"/dashboard"} element={<DashboardPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
