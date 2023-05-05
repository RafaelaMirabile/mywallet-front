import { useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { postSignUp } from "../service/API"
import * as S from "../styles/SignUpPage"

export default function SignUpPage() {
    const navigate = useNavigate();

    const [email, setUserEmail] = useState("");
    const [user, setUser] = useState("");
    const [password, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [inputState, setInputState] = useState(false);

    function requestSignUp(e) {
        e.preventDefault();
        setLoading(false);
        setInputState(true);

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Senhas diferentes!',
            })
            setUserPassword("");
            setConfirmPassword("");
            setLoading(true);
            setInputState(false);
            return;
        }
        const body = {
            userName: user,
            userEmail: email,
            userPassword: password,
        }

        postSignUp(body).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'O usuário foi cadastrado',
            });
            navigate("/");
        })
            .catch((error) => {
                console.log(error.response);
                const errorStatus = error.response.data;
                Swal.fire({
                    icon: 'error',
                    title: 'Cadastro Inválido',
                    text: `Houve algum erro durante o cadastro :( 
                    ${errorStatus} `,
                });
                setUserEmail("");
                setUser("");
                setUserPassword("");
                setConfirmPassword("");
                setLoading(true);
                setInputState(false);
            })

    }

    return (
        <S.PageContainer>
            <S.Box>
                <S.Logo>MyWallet</S.Logo>
                <S.InputFilds onSubmit={requestSignUp}>
                    <input required disabled={inputState} type="text" placeholder="Nome" value={user} onChange={e => setUser(e.target.value)}></input>
                    <input required disabled={inputState} type="email" placeholder="E-mail" value={email} onChange={e => setUserEmail(e.target.value)}></input>
                    <input required disabled={inputState} type="password" placeholder="Senha" value={password} onChange={e => setUserPassword(e.target.value)}></input>
                    <input required disabled={inputState} type="password" placeholder="Confirme Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                    {loading ? <button type="submit">Cadastrar</button> : <button><ThreeDots color="#FFFFFF" height={20} width={50} /></button>}
                </S.InputFilds>
                <S.LinkToLoginPage to="/">Já tem uma conta? Entre agora!</S.LinkToLoginPage>
            </S.Box>
        </S.PageContainer>
    )
}
