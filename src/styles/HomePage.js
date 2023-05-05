import styled from "styled-components"

export const PageContainer = styled.div`
min-height: 100vh;
background-image: linear-gradient( to top right,#441E5A,#483289 );
display: flex;
align-items: center;
justify-content: center;
`
export const Box = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 92vh;
width: 90%;
`
export const TransitionsBox = styled.div`
height: 280px;
overflow-y: ${(props)=> props.userTransitions === 0 ? 'hidden' : 'scroll'};
display: flex;
flex-direction: column;
margin-top: 10px;
justify-content: ${(props)=> props.userTransitions === 0 ? 'center' : ''};;

ion-icon{
    color: #C6C6C6;
}
`
export const Header = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 28px;
line-height: 31px;
color: #FFFFFF;
display: flex;
justify-content: space-between;

ion-icon{
font-size: 36px;
}
`
export const RegistrationBox = styled.div`
width: 100%;
height: 410px;
background: #FFFFFF;
border-radius: 5px;
margin-bottom: 6px;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 20px;
`
export const ActionsBox = styled.div`
display: flex;
justify-content: space-around;
`
export const Button = styled.div`
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
export const Transition = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 2px;
padding: 4px;
`
export const TransitionDescription = styled.div`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 19px;
color: #000000;
margin-left: 6px;
`
export const TransitionValue = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 19px;
`
export const Balance = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10px;
p{
    font-family: Raleway;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: #000000;
}
`
export const BalanceValue = styled.div`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 20px;
text-align: right;
`
export const Warning = styled.div`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
text-align: center;
color: #868686;
padding: 110px;
margin-top: 60px;
`
export const Info = styled.div`
font-family: Raleway;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
text-align: center;
color:#C6C6C6;
padding-bottom: 6px;
border-bottom: 1px solid #C6C6C6;;

`
export const TransitionInfo = styled.div`
display: flex;
justify-content: center;
align-items: center;
span{
    margin-right: 4px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 19px;
    color: #C6C6C6;
}
`
export const Loading = styled.div`
display: flex;
justify-content: center;
align-items: center;
`