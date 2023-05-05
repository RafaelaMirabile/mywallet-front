import { deleteTransaction, updateTransaction } from "../service/API"
import { useContext, useState } from "react"
import UserContext from "../context/UserContext"
import Swal from "sweetalert2"
import IntlCurrencyInput from "react-intl-currency-input"
import dayjs from "dayjs"
import * as M from "../styles/Modal"

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
		let body;
		let type;
		const newValor = data.value.split("").splice(3).filter(value => value !== ",").join("");

		if (data.cashFlowType === "outflow") {
			type = "outflow"
		} else if (data.cashFlowType === "inflow") {
			type = "inflow"
		} else if (data.cashFlowType === "") {
			type = modalInfo.cashFlowType
		}

		if (data.description !== "" && data.value === "") {
			body = {
				token: userToken,
				userId: userId,
				description: data.description,
				value: modalInfo.value,
				cashFlowType: type,
				date: dayjs().format('DD/MM')
			}

		} else if (data.value !== "" && data.description === "") {
			body = {
				token: userToken,
				userId: userId,
				description: modalInfo.description,
				value: newValor,
				cashFlowType: type,
				date: dayjs().format('DD/MM')
			}

		} else if (data.value === "" && data.description === "" && data.cashFlowType !== modalInfo.cashFlowType) {
			body = {
				token: userToken,
				userId: userId,
				description: modalInfo.description,
				value: modalInfo.value,
				cashFlowType: type,
				date: dayjs().format('DD/MM')
			}
		}

		else {
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
			Swal.fire({
				icon: 'success',
				title: 'Registro modificado com sucesso!',
				confirmButtonColor: '#191970',
			});
			setReaload(!reload);
			setIsHidden(true);
			setData({ description: '', value: '', cashFlowType: '' });
		}).catch((err) => {
			console.log(err)
		})
	}

	function handleChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	return (
		<M.ModalContainer hidden={isHidden}>
			<M.ModalBox hidden={displayBox}>
				<M.Date>{modalInfo.date}</M.Date>
				<M.Description>{modalInfo.description}</M.Description>
				<M.Value style={modalInfo.cashFlowType === 'inflow' ? { color: "green" } : { color: "red" }}>
					R${(modalInfo.value / 100).toFixed(2).replace('.', ',')}
				</M.Value>
				<M.Actions>
					<M.ModalButton
						style={{ backgroundColor: '#9f0000' }}
						onClick={deleteTransition}
					>
						Apagar
					</M.ModalButton>
					<M.ModalButton
						style={{ backgroundColor: '#483289' }}
						onClick={() => { setDisplayUpdate(false); setDisplayBox(true); }}
					>
						Atualizar
					</M.ModalButton>
					<M.ModalButton
						style={{ backgroundColor: '#a9a9a9' }}
						onClick={() => setIsHidden(true)}
					>
						Voltar
					</M.ModalButton>
				</M.Actions>
			</M.ModalBox>
			<M.UpdateBox hidden={displayUpdate} onSubmit={updateRecord}>
				<M.InputFilds>
					<M.Input
						placeholder="Descrição"
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
				</M.InputFilds>
				<M.TypeOptions>
					<M.Option>
						<M.RadioInput
							type="radio"
							name="cashFlowType"
							id="inflow"
							value="inflow"
							onChange={handleChange}
							disabled={isDisabled}
							validation
						/>
						<M.Label htlmFor="inflow">Entrada</M.Label>
					</M.Option>
					<M.Option>
						<M.RadioInput
							type="radio"
							name="cashFlowType"
							id="outflow"
							value="outflow"
							onChange={handleChange}
							disabled={isDisabled}
							validation
						/>
						<M.Label htlmFor="outflow">Saída</M.Label>
					</M.Option>
				</M.TypeOptions>
				<M.Actions style={{ gridTemplateColumns: 'repeat(2, auto)', marginTop: '0px' }}>
					<M.ModalButton onClick={updateRecord} style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#483289' }}>
						Salvar
					</M.ModalButton>
					<M.ModalButton
						style={{ width: 'calc(50vw - 42.5px)', backgroundColor: '#a9a9a9' }}
						onClick={() => { setDisplayUpdate(true); setDisplayBox(false); setData({ ...data, description: '', value: '' }); }}
					>
						Voltar
					</M.ModalButton>
				</M.Actions>
			</M.UpdateBox>
		</M.ModalContainer>
	)
}
