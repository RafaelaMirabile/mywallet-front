import { useContext, useEffect, useState} from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import {getCashFlow} from "../service/API"

export default function CashFlowPage(){

    const{userToken,userName}=useContext(UserContext);
    const navigate = useNavigate();
    const [userTransitions,setUserTransitions]=useState([]);
    const [balance,setBalance]=useState("");
    const [balanceColor,setBalanceColor]=useState("");
    const [loading, setLoading]=useState(true);
    
    useEffect(()=>{
        
        getCashFlow(userToken).then((cash) => {
            setUserTransitions(cash.data);
            setLoading(false);
            const positive = cash.data.filter(value => value.cashFlowType === "inflow");
            const negative = cash.data.filter(value => value.cashFlowType === "outflow");
            let count = 0;
            for(let i =0; i < positive.length; i++ ){
                const number = parseFloat(positive[i].value).toFixed(2);
                count += ((number)/100);
            }
            for(let i =0; i < negative.length; i++ ){
                const number = parseFloat(negative[i].value).toFixed(2);
                count -= ((number)/100) ;
            }
            const valueInBrasilCurrency = (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(count));
            setBalance(valueInBrasilCurrency);

            const splitValue = valueInBrasilCurrency.split("");
            if(splitValue[0]=== "-"){
                setBalanceColor(false);
            } else {
                setBalanceColor(true);
            }
            
        }).catch((error)=>{
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: '401',
                text: 'Requisição não autorizada',
              });
              navigate("/");
        });
    },[])

    function exitSession(){
        Swal.fire({
            icon: 'info',
            title: 'Deseja encerrar a sessão?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'Não',
            confirmButtonText: 'Sim'
        }).then((result)=>{
            if(result.isConfirmed){
                localStorage.clear();
                window.location.href="/";
            }
        })
    }
    
    function reformattingTransitionValue(value){
        const valueNumber = parseFloat((value/100)).toFixed(2);
        const valueString = valueNumber.toString();
        const transitionValue = valueString.replace(".",",");
        return (<>{transitionValue}</>)
    }

    return(
        <PageContainer>
            <Box>
                <Header>
                   Olá, {userName}
                   <ion-icon onClick={exitSession} name="exit-outline"></ion-icon>
                </Header>
                {loading ? <Loading><ThreeDots color="#FFFFFF" height={20} width={50}/></Loading> : 
                    <RegistrationBox>
                        <TransitionBox>                    
                           {userTransitions.length === 0 ? <Warning>Não há registros de entrada ou saída</Warning> :
                            userTransitions.map((transition,index) =>
                            <Transition key={index}>
                                <TransitionInfo>
                                    <span>{transition.date}</span>
                                    <TransitionDescription>
                                            {transition.description}
                                    </TransitionDescription>                            
                                </TransitionInfo>
                                <TransitionValue style={transition.cashFlowType === 'inflow'? {color:"green"}: {color:"red"}}>
                                    {reformattingTransitionValue(transition.value)}
                                </TransitionValue>
                            </Transition>
                            )} 
                        </TransitionBox>
                            <Balance>
                                <p>SALDO</p>
                                <BalanceValue style={balanceColor ? {color:"green"}: {color:"red"}}>
                                    {balance}
                                </BalanceValue>
                            </Balance>
                    </RegistrationBox>
                
                }
                <ActionsBox>
                    <Inflow onClick={()=>{navigate("/inflow")}}>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>
                            <p>Nova</p>
                            <p>entrada</p>
                        </span>
                    </Inflow>
                    <Outflow onClick={()=>{navigate("/outflow")}}>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <span>
                            <p>Nova</p>
                            <p>saída</p> 
                        </span>
                    </Outflow>
                </ActionsBox>
            </Box>
        </PageContainer>
    )
}

const PageContainer=styled.div`
min-height: 100vh;
background-image: linear-gradient( to top right,#441E5A,#483289 );
display: flex;
align-items: center;
justify-content: center;
`
const Box = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 92vh;
width: 90%;
`
const Header = styled.div`
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
const RegistrationBox = styled.div`
width: 100%;
min-height: 410px;
background: #FFFFFF;
border-radius: 5px;
margin-bottom: 6px;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const ActionsBox=styled.div`
display: flex;
justify-content: space-around;
`
const Inflow=styled.div`
width: 155px;
height: 114px;
margin-right: 10px;
background: #483289;
border-radius: 5px;
font-family: Raleway;
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 20px;
color: #FFFFFF;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 8px;
box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

ion-icon{
    font-size: 30px;
}
`
const Outflow=styled.div`
width: 155px;
height: 114px;
background: #483289;
border-radius: 5px;
border-radius: 5px;
font-family: Raleway;
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 20px;
color: #FFFFFF;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 8px;
box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

ion-icon{
    font-size: 30px;
}
`
const Transition = styled.div`
display: flex;
justify-content: space-between;
padding: 4px;
`
const TransitionDescription=styled.div`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #000000;
`
const TransitionValue=styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
`
const Balance = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 4px;
p{
    font-family: Raleway;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
}
`
const BalanceValue=styled.div`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 20px;
text-align: right;
`
const Warning=styled.div`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
text-align: center;
color: #868686;
padding: 110px;
margin-top: 60px;
border: 2px solid green;
`
const TransitionBox=styled.div`
height: 440px;
`
const TransitionInfo= styled.div`

display: flex;
justify-content: center;
align-items: center;
span{
    margin-right: 4px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
}
`
const Loading = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
