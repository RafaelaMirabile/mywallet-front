import styled from "styled-components"

export const InputFilds = styled.div`
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
	border: 1px solid #C6C6C6;
}
`
export const UpdateBox = styled.form`
	width: calc(100vw - 50px);
	height: auto;
	background-color: #fffff0;
	border-radius: 5px;
	position: relative;
	display: ${(props) => (props.hidden ? 'none' : 'flex')};
	flex-direction: column;
	justify-content: space-between;
	padding: 10px;
`
export const Option = styled.div`
  display: flex;
  align-items: center;
`;
export const RadioInput = styled.input`
	accent-color: #483289;
	outline: none;
	margin: 5px;
`;

export const Label = styled.label`
  margin: 5px;
  font-family: Raleway;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
`;
export const TypeOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const Input = styled.input`
	font-family: 'Raleway', sans-serif;
	font-size: 20px;
	width: auto;
	height: 40px;
	background-color: #fffff0;
	border-radius: 5px;
	border: 1px solid #c5c5c5;
	outline: none;
	margin-bottom: 13px;
	::placeholder {
		font-family: 'Raleway', sans-serif;
		font-size: 20px;
		color: black;
	}
	& :valid {
		background-color: ${(props) => (props.validation ? '#d4f8d4' : '#fffff0')};
	}
`;
export const ModalContainer = styled.div`
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background: rgba(0, 0, 0, 0.8);
z-index: 10;
justify-content: center;
align-items: center;
display: ${(props) => (props.hidden ? 'none' : 'flex')};
`;
export const ModalBox = styled.div`
	width: calc(100vw - 50px);
	height: auto;
	background-color: #fffff0;
	border-radius: 5px;
	position: relative;
	display: ${(props) => (props.hidden ? 'none' : 'flex')};
	flex-direction: column;
	justify-content: space-between;
	padding: 10px;
`
export const Description = styled.p`
	font-size: 20px;
	max-width: 90%;
	color: #000000;
	line-height: 30px;
	word-break: break-word;
`;

export const Date = styled.p`
	font-size: 20px;
	max-width: 90%;
	color: #c6c6c6;
	line-height: 30px;
	word-break: break-word;
`;

export const Value = styled.p`
	font-size: 20px;
	max-width: 90%;
	line-height: 30px;
	word-break: break-word;
`;

export const Actions = styled.div`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: 1;
	gap: 15px;
	margin-top: 10px;
`;

export const ModalButton = styled.div`
font-family: 'Raleway', sans-serif;
font-size: 18px;
font-weight: 700;
color: #ffffff;
width: calc(33.3vw - 33.3px);
height: 46px;
border: none;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.75);
pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};

&:hover {
	cursor: pointer;
	filter: brightness(1.1);
}

`