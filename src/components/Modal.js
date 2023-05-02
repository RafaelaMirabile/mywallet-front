import styled from "styled-components"
import { deleteTransaction, updateTransaction } from "../service/API"
import { useContext, useState } from "react"
import UserContext from "../context/UserContext"
import Swal from "sweetalert2"
import IntlCurrencyInput from "react-intl-currency-input"
import dayjs from "dayjs";

export default function Modal({ isHidden, setIsHidden, modalInfo, reload, setReaload }) {

	const { userToken, userId } = useContext(UserContext);

	const [displayUpdate, setDisplayUpdate] = useState(true);
	const [displayBox, setDisplayBox] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [data, setData] = useState({ description: '', value: '', cashFlowType: '' });

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

	function deleteTransition() {
		deleteTransaction(modalInfo._id, modalInfo.token).then(() => {
			Swal.fire({
				icon: 'success',
				title: 'Deletado com sucesso!',
				confirmButtonColor: '#191970',
			});
			setReaload(!reload);
			setIsHidden(true);
		}).catch((err) => {
			console.log(err);
		})
	}

	function updateRecord(e) {
		e.preventDefault();
		let newValor;
		let body;
		let type;

		if (data.value === "") {
			newValor = modalInfo.value.split("").splice(3).filter(value => value !== ",").join("");
		} else {
			newValor = data.value.split("").splice(3).filter(value => value !== ",").join("");
		}

		if (data.cashFlowType === "outflow") {
			type = "outflow"
		} else {
			type = "inflow"
		}

		if (data.description === "") {
			body = {
				token: userToken,
				userId: userId,
				description: modalInfo.description,
				value: newValor,
				cashFlowType: type,
				date: dayjs().format('DD/MM')
			}
		} else if (data.value === "") {
			body = {
				token: userToken,
				userId: userId,
				description: data.description,
				value: newValor,
				cashFlowType: type,
				date: dayjs().format('DD/MM')
			}

		} else {
			body = {
				token: userToken,
				userId: userId,
				description: data.description,
				value: newValor,
				cashFlowType: type,
				date: dayjs().format('DD/MM')
			}
		}

		updateTransaction(modalInfo._id, userToken, body).then((res) => {
			console.log(res.data)
			Swal.fire({
				icon: 'success',
				title: 'Registro com sucesso!',
				confirmButtonColor: '#191970',
			});
			setReaload(!reload);
			setIsHidden(true);
		}).catch((err) => {
			console.log(err)
		})
	}

	function handleChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	return (
		<ModalContainer hidden={isHidden}>
			<ModalBox hidden={displayBox}>
				<Date>{modalInfo.date}</Date>
				<Description>{modalInfo.description}</Description>
				<Value style={modalInfo.cashFlowType === 'inflow' ? { color: "green" } : { color: "red" }}>
					R${(modalInfo.value / 100).toFixed(2).replace('.', ',')}
				</Value>
				<Actions>
					<ModalButton
						style={{ backgroundColor: '#9f0000' }}
						onClick={deleteTransition}
					>
						Apagar
					</ModalButton>
					<ModalButton
						style={{ backgroundColor: '#191970' }}
						onClick={() => { setDisplayUpdate(false); setDisplayBox(true); }}
					>
						Atualizar
					</ModalButton>
					<ModalButton
						style={{ backgroundColor: '#a9a9a9' }}
						onClick={() => setIsHidden(true)}
					>
						Voltar
					</ModalButton>
				</Actions>
			</ModalBox>
			<UpdateBox hidden={displayUpdate} onSubmit={updateRecord}>
				<InputFilds>
					<Input
						placeholder="Descrição"
						required
						type="text"
						name="description"
						autoFocus
						minLength="3"
						value={data.description}
						onChange={handleChange}
						disabled={isDisabled}
						validation
						autoComplete="off"
					/>
					<IntlCurrencyInput
						disabled={isDisabled}
						currency="BRL"
						config={currencyConfig}
						value={data.value}
						onChange={handleChange}
						name="value"
					/>
				</InputFilds>
				<TypeOptions>
					<Option>
						<RadioInput
							type="radio"
							name="cashFlowType"
							id="inflow"
							required
							value="inflow"
							onChange={handleChange}
							disabled={isDisabled}
							validation
						/>
						<Label htlmFor="inflow">Entrada</Label>
					</Option>
					<Option>
						<RadioInput
							type="radio"
							name="cashFlowType"
							id="outflow"
							required
							value="outflow"
							onChange={handleChange}
							disabled={isDisabled}
							validation
						/>
						<Label htlmFor="outflow">Saída</Label>
					</Option>
				</TypeOptions>
				<Actions style={{ gridTemplateColumns: 'repeat(2, auto)', marginTop: '0px' }}>
					<ModalButton onClick={updateRecord} style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#191970' }}>
						Salvar
					</ModalButton>
					<ModalButton
						style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#a9a9a9' }}
						onClick={() => { setDisplayUpdate(true); setDisplayBox(false); setData({ ...data, description: '', value: '' }); }}
					>
						Voltar
					</ModalButton>
				</Actions>
			</UpdateBox>
		</ModalContainer>
	)
}
const InputFilds = styled.div`
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

`
const UpdateBox = styled.form`
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
const Option = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
	background-color: #ffffff;
	outline: none;
	margin: 5px;
`;

const Label = styled.label`
  margin: 5px;
`;
const TypeOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Input = styled.input`
	font-family: 'Raleway', sans-serif;
	font-size: 20px;
	width: auto;
	height: 40px;
	background-color: #fffff0;
	border-radius: 5px;
	border: 1px solid #c5c5c5;
	outline: none;
	margin-bottom: 13px;
	& ::placeholder {
		font-family: 'Raleway', sans-serif;
		font-size: 20px;
		color: #000000;
	}
	& :valid {
		background-color: ${(props) => (props.validation ? '#d4f8d4' : '#fffff0')};
	}
`;
const ModalContainer = styled.div`
border: 2px solid red;
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
const ModalBox = styled.div`
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
const Description = styled.p`
	font-size: 20px;
	max-width: 90%;
	color: #000000;
	line-height: 30px;
	word-break: break-word;
`;

const Date = styled.p`
	font-size: 20px;
	max-width: 90%;
	color: #c6c6c6;
	line-height: 30px;
	word-break: break-word;
`;

const Value = styled.p`
	font-size: 20px;
	max-width: 90%;
	line-height: 30px;
	word-break: break-word;
`;

const Actions = styled.div`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: 1;
	gap: 15px;
	margin-top: 10px;
`;

const ModalButton = styled.div`
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