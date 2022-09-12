import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import GlobalStyle from "./globalStyles";
import CashFlowPage from "./Pages/CashFlowPage";
import InflowPage from "./Pages/InflowPage";
import LoginPage from "./Pages/LoginPage";
import OutflowPage from "./Pages/OutflowPage";
import SignUpPage from "./Pages/SignUpPage";

export default function App(){
    
    const locallyStoredUserName = localStorage.getItem("userName");
    const locallyStoredUserId = localStorage.getItem("userId");
    const locallyStoredUserToken = localStorage.getItem("userToken");
    
    const[userToken,setUserToken]=useState(locallyStoredUserToken);
    const[userName,setUserName]=useState(locallyStoredUserName);
    const[userId, setUserId]=useState(locallyStoredUserId);


    return (
        <UserContext.Provider value={{userToken,setUserToken,setUserId,setUserName,userId,userName}}>
            <BrowserRouter>
            <GlobalStyle/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/cashflow" element={<CashFlowPage/>}/>
                    <Route path="/inflow" element={<InflowPage/>}/>
                    <Route path="/outflow" element={<OutflowPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}