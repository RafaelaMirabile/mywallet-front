import { useContext, useState } from "react"
import { postLogin } from "../service/API"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import UserContext from "../context/UserContext"
import * as L from "../styles/LoginPage"

export default function LoginPage() {
    const { setUserName, setUserId, setUserToken, userName, userToken, userId } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [inputState, setInputState] = useState(false);

    function loginRequest(e) {
        e.preventDefault();
        setLoading(false);
        setInputState(true);

        const body = {
            userEmail: email,
            userPassword: password,
        }

        postLogin(body).then((session) => {
            setUserEmail("");
            setUserPassword("");
            setInputState(false);

            if ((userName === null && userId === null && userToken === null)) {
                localStorage.setItem("userToken", session.data.token);
                setUserToken(session.data.token);
                localStorage.setItem("userId", session.data.userId);
                setUserId(session.data.userId);
                localStorage.setItem("userName", session.data.userName);
                setUserName(session.data.userName);
            }
            navigate('/home');
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Usuário e/ou senha incorretos!',
                confirmButtonColor: '#483289',
            });
            setUserEmail("");
            setUserPassword("");
            setLoading(true);
            setInputState(false);
        })
    }

    return (
        <L.PageContainer>
            <L.Box>
                <L.Logo>MyWallet</L.Logo>
                <L.InputFilds onSubmit={loginRequest}>
                    <input required disabled={inputState} type="email" placeholder="E-mail" value={email} onChange={e => setUserEmail(e.target.value)}></input>
                    <input required disabled={inputState} type="password" placeholder="Senha" value={password} onChange={e => setUserPassword(e.target.value)}></input>
                    {loading ? <button type="submit">Entrar</button> : <button><ThreeDots color="#FFFFFF" height={20} width={50} /></button>}
                </L.InputFilds>
                <L.LinkToSignUpPage to="/sign-up">Primeira vez? Cadastre-se!</L.LinkToSignUpPage>
            </L.Box>
        </L.PageContainer>
    )
}
