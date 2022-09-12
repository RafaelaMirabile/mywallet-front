import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { postOutflow } from "../service/API";
import UserContext from "../context/UserContext";
import IntlCurrencyInput from "react-intl-currency-input"
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";

const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

export default function OutflowPage(){
    
    const{userToken,userId}=useContext(UserContext);
    const navigate= useNavigate();  
    const[valor,setValor]=useState("");
    const [descricao,setDescricao]=useState("");
    const [inputState,setInputState]=useState(false);
    const [loading,setLoading]=useState(true);
    
    function outFlowRequest(e){
        e.preventDefault();
        setInputState(true);
        setLoading(false);
        
        const newValor = valor.split("").splice(3).filter(value=> value !== ",").join("");       
        
        const body ={
            token: userToken,
            userId: userId,
            description : descricao,
            value: newValor,
            cashFlowType : 'outflow',
            date: dayjs().format('DD/MM')
        }

        postOutflow(userToken,body).then(()=> {
            setValor("");
            setDescricao("");
            setInputState(false);
            setLoading(true);
            console.log(loading);
        })
        .catch(()=>{
            setInputState(false);
            console.log('n inu')});
            setLoading(true);
    }

    return(
        <PageContainer>
            <Box>
                <Header>
                Nova saída
                <ion-icon onClick={()=>{navigate('/cashflow')}} name="home"></ion-icon>
                </Header>
                <InputFilds onSubmit={outFlowRequest}>
                    <IntlCurrencyInput disabled={inputState} currency="BRL" config={currencyConfig} onChange={e=> setValor(e.target.value)} />
                    <input disabled={inputState} required type="text" placeholder="Descrição" value={descricao} onChange={e=> setDescricao(e.target.value)}></input>
                    {loading ? <button type="submit">Salvar saída</button>:<button><ThreeDots color="#FFFFFF" height={20} width={50}/></button>}                 
                </InputFilds>
            </Box>
        </PageContainer>
    )
}

const PageContainer = styled.div`
min-height: 100vh;
background-image: linear-gradient( to top right,#441E5A,#483289 );
display: flex;
align-items: center;
justify-content: center;
`
const Box= styled.div`
display: flex;
flex-direction: column;
height: 92vh;
width: 90%;
`
const Header=styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 26px;
line-height: 31px;
color: #FFFFFF;
display: flex;
justify-content: space-between;

ion-icon{
font-size: 36px;
}
`
const InputFilds = styled.form`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top: 10px;
width: 100%;

input{
    width: 100%;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px; 
    border: none;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 6px;
}
button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 46px;
    background: #483289;
    border-radius: 5px;
    border: none;
    font-family: Raleway;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    margin-top: 4px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}
`
