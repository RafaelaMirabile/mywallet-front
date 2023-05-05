import { useContext, useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import UserContext from "../context/UserContext"
import { getCashFlow } from "../service/API"
import Modal from "../components/Modal"
import * as H from "../styles/HomePage"

export default function HomePage() {
    const { userToken, userName } = useContext(UserContext);
    const navigate = useNavigate();

    const [userTransitions, setUserTransitions] = useState([]);
    const [balance, setBalance] = useState("");
    const [balanceColor, setBalanceColor] = useState("");
    const [loading, setLoading] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    const [modalInfo, setModalInfo] = useState({});
    const [reload, setReaload] = useState(false);

    useEffect(() => {

        getCashFlow(userToken).then((cash) => {
            setUserTransitions(cash.data);
            setLoading(false);
            balanceValueAndColor(cash.data);

        }).catch((error) => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Tivemos um problema no servidor, tente novamente mais tarde.',
                confirmButtonColor: '#483289'
            });
            navigate("/");
        });
    }, [reload]);

    function balanceValueAndColor(data) {
        const positive = data.filter(value => value.cashFlowType === "inflow");
        const negative = data.filter(value => value.cashFlowType === "outflow");
        let count = 0;

        for (let i = 0; i < positive.length; i++) {
            const number = parseFloat(positive[i].value).toFixed(2);
            count += ((number) / 100);
        }
        for (let i = 0; i < negative.length; i++) {
            const number = parseFloat(negative[i].value).toFixed(2);
            count -= ((number) / 100);
        }
        const valueInBrasilCurrency = (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(count));
        setBalance(valueInBrasilCurrency);

        const splitValue = valueInBrasilCurrency.split("");
        if (splitValue[0] === "-") {
            setBalanceColor(false);
        } else {
            setBalanceColor(true);
        }
    }

    function exitSession() {
        Swal.fire({
            icon: 'info',
            title: 'Deseja encerrar a sessão?',
            showCancelButton: true,
            confirmButtonColor: '#483289',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = "/";
            }
        })
    }

    function ReformatedTransitionValue(value) {
        const valueNumber = parseFloat((value.transition / 100)).toFixed(2);
        const valueString = valueNumber.toString();
        const transitionValue = valueString.replace(".", ",");

        return (
            <>{transitionValue}</>
        )
    }

    return (
        <H.PageContainer>
            <H.Box>
                <Modal
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                    modalInfo={modalInfo}
                    setUserTransitions={setUserTransitions}
                    setReaload={setReaload}
                    reload={reload}
                />
                <H.Header>
                    Olá, {userName}
                    <ion-icon onClick={exitSession} name="exit-outline"></ion-icon>
                </H.Header>
                {loading
                    ?
                    <H.Loading><ThreeDots color="#FFFFFF" height={20} width={50} /></H.Loading>
                    :
                    <H.RegistrationBox>
                        {userTransitions.length === 0 ? <></> : <H.Info>Clique no registro para mais informações</H.Info>}
                        <H.TransitionsBox userTransitions={userTransitions.length}>
                            {userTransitions.length === 0
                                ?
                                <H.Warning>Não há registros de entrada ou saída</H.Warning>
                                :
                                userTransitions.map((transition, index) => (
                                    <H.Transition key={index} onClick={() => { setIsHidden(false); setModalInfo(transition) }}>
                                        <H.TransitionInfo>
                                            <span>{transition.date}</span>
                                            <H.TransitionDescription>
                                                {transition.description}
                                            </H.TransitionDescription>
                                        </H.TransitionInfo>
                                        <H.TransitionValue style={transition.cashFlowType === 'inflow' ? { color: "green" } : { color: "red" }}>
                                            <ReformatedTransitionValue
                                                transition={transition.value}
                                            />
                                        </H.TransitionValue>
                                    </H.Transition>
                                )
                                )
                            }
                        </H.TransitionsBox>
                        <H.Balance>
                            <p>SALDO</p>
                            <H.BalanceValue style={balanceColor ? { color: "green" } : { color: "red" }}>
                                {balance}
                            </H.BalanceValue>
                        </H.Balance>
                    </H.RegistrationBox>

                }
                <H.ActionsBox>
                    <H.Button onClick={() => { navigate("/inflow") }}>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <span>
                            <p>Nova</p>
                            <p>entrada</p>
                        </span>
                    </H.Button>
                    <H.Button onClick={() => { navigate("/outflow") }}>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <span>
                            <p>Nova</p>
                            <p>saída</p>
                        </span>
                    </H.Button>
                </H.ActionsBox>
            </H.Box>
        </H.PageContainer>
    )
}


