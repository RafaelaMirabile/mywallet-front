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
height: 92vh;
width: 90%;
`
export const Header = styled.div`
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
export const InputFilds = styled.form`
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
    ::placeholder {
		font-family: 'Raleway', sans-serif;
		font-size: 20px;
		color: black;
	}
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