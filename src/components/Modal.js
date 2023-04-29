import styled from "styled-components"
import { deleteTransaction, getCashFlow } from "../service/API";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";


export default function Modal({ isHidden, setIsHidden, modalInfo, reload, setReaload }) {

	const { userToken } = useContext(UserContext);

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

	return (
		<ModalContainer hidden={isHidden}>
			<ModalBox hidden={isHidden}>
				<Description>{modalInfo.description}</Description>
				<Date>{modalInfo.date}</Date>
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
						style={{ backgroundColor: '#a9a9a9' }}
						onClick={() => setIsHidden(true)}
					>
						Voltar
					</ModalButton>
				</Actions>
			</ModalBox>
		</ModalContainer>
	)
}

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

`;