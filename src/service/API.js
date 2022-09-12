import axios from "axios";

const URL_BASE = 'http://localhost:5000'

function postSignUp(body){
    const promise = axios.post(`${URL_BASE}/sign-up`,body);
    return promise;
}

function postLogin(body){
    const promise = axios.post(`${URL_BASE}`,body);
    return promise;
}

function getCashFlow(userToken){
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const promise = axios.get(`${URL_BASE}/cashflow`,config);
    return promise;
}

function postInflow(userToken,body){
    const config ={
        headers:{
            Authorization : `Bearer ${userToken}`
        }
    }
    const promise = axios.post(`${URL_BASE}/inflow`,body,config);
    return promise
}



export{postLogin, postSignUp,getCashFlow,postInflow}