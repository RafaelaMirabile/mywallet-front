import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import GlobalStyle from "./globalStyles";
import InflowPage from "./pages/InflowPage";
import LoginPage from "./pages/LoginPage";
import OutflowPage from "./pages/OutflowPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

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
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/inflow" element={<InflowPage/>}/>
                    <Route path="/outflow" element={<OutflowPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}