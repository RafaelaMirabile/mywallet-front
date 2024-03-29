import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { postOutflow } from "../service/API"
import UserContext from "../context/UserContext"
import IntlCurrencyInput from "react-intl-currency-input"
import { ThreeDots } from "react-loader-spinner"
import dayjs from "dayjs"
import * as O from "../styles/OutFlowPage"
import Swal from "sweetalert2"

export default function OutflowPage() {
    const { userToken, userId } = useContext(UserContext);
    const navigate = useNavigate();

    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [inputState, setInputState] = useState(false);
    const [loading, setLoading] = useState(true);

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

    function outFlowRequest(e) {
        e.preventDefault();
        setInputState(true);
        setLoading(false);

        if (valor === "") {
            Swal.fire({
                icon: 'error',
                title: 'Saída invalida',
                text: ` Por favor inserir valor de saída`,
                confirmButtonColor: '#191970'
            });
            setValor("");
            setDescricao("");
            setInputState(false);
            setLoading(true);
        } else {
            const newValor = valor.split("").splice(3).filter(value => value !== ",").join("");

            const body = {
                token: userToken,
                userId: userId,
                description: descricao,
                value: newValor,
                cashFlowType: 'outflow',
                date: dayjs().format('DD/MM')
            }

            postOutflow(userToken, body).then(async () => {
                setValor("");
                setDescricao("");
                setInputState(false);
                setLoading(true);

                await Swal.fire({
                    icon: 'success',
                    title: 'Adicionado com sucesso!',
                    confirmButtonColor: '#483289',
                });
                navigate('/home');
            })
                .catch((error) => {
                    console.log(error.response);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro no servidor',
                        text: 'Por favor tente mais tarde',
                        confirmButtonColor: '#483289'
                    });
                    setInputState(false);
                    console.error(error);
                    setLoading(true);
                });
        }
    }

    return (
        <O.PageContainer>
            <O.Box>
                <O.Header>
                    Nova saída
                    <ion-icon onClick={() => { navigate('/home') }} name="home"></ion-icon>
                </O.Header>
                <O.InputFilds onSubmit={outFlowRequest}>
                    <IntlCurrencyInput
                        disabled={inputState}
                        currency="BRL"
                        config={currencyConfig}
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        required
                    />
                    <input
                        disabled={inputState}
                        required type="text"
                        placeholder="Descrição" value={descricao}
                        onChange={e => setDescricao(e.target.value)}></input>
                    {loading ? <button type="submit">Salvar saída</button> : <button><ThreeDots color="#FFFFFF" height={20} width={50} /></button>}
                </O.InputFilds>
            </O.Box>
        </O.PageContainer>
    )
}

