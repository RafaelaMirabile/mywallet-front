import styled from "styled-components"
import { Link } from "react-router-dom"

export const PageContainer= styled.div`
min-height: 100vh;
background-image: linear-gradient( to top right,#441E5A,#483289 );
display: flex;
align-items: center;
justify-content: center;
`
export const Box=styled.div`
width: 86%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export const Logo = styled.div`
font-family: Saira Stencil One;
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 50px;
text-shadow: -3px 6px 5px rgba(68,30,90,0.57);
color: #FFFFFF;
`
export const InputFilds= styled.form`
width: 100%;
display: flex;
flex-direction: column;
margin-top: 10px;

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
export const LinkToSignUpPage=styled(Link)`
font-family: Raleway;
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;
color: #FFFFFF;
margin-top: 14px;
`