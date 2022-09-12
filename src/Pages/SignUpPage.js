import { useState } from "react"
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Swal from "sweetalert2"
import { postSignUp } from "../service/API";


export default function SignUpPage(){

    const navigate=useNavigate();
    const [email, setUserEmail]= useState("");
    const [user,setUser]=useState("");
    const[password,setUserPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [loading,setLoading]=useState(true);
    const [inputState,setInputState]=useState(false); 

    function requestSignUp(e){
        
        e.preventDefault();
        setLoading(false);
        setInputState(true);

        if(password !== confirmPassword){
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
        const body ={
            userName: user,
            userEmail: email,
            userPassword: password,
        }

        postSignUp(body).then(()=>{
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'O usuário foi cadastrado',
            });
            navigate("/");
        })
        .catch((error)=>{
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
       
    return(
        <PageContainer>
            <Box>
                <Logo>MyWallet</Logo>
                <InputFilds onSubmit={requestSignUp}>
                    <input required disabled={inputState} type="text" placeholder="Nome" value={user} onChange={e => setUser(e.target.value)}></input>
                    <input required disabled={inputState} type="email" placeholder="E-mail" value={email} onChange={e => setUserEmail(e.target.value)}></input>
                    <input required disabled={inputState} type="password" placeholder="Senha" value={password} onChange={e => setUserPassword(e.target.value)}></input>
                    <input required disabled={inputState} type="password" placeholder="Confirme Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                    {loading?<button type="submit">Cadastrar</button> : <button><ThreeDots color="#FFFFFF" height={20} width={50}/></button> }                  
                </InputFilds>
                <LinkToLoginPage to ="/">Já tem uma conta? Entre agora!</LinkToLoginPage>
            </Box>
        </PageContainer>
    )
}

const PageContainer= styled.div`
border: 2px solid green;
min-height: 100vh;
background-image: linear-gradient( to top right,#441E5A,#483289 );
display: flex;
align-items: center;
justify-content: center;
`
const Box=styled.div`
width: 86%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Logo = styled.div`
font-family: Saira Stencil One;
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 50px;
text-shadow: -3px 6px 5px rgba(68,30,90,0.57);
color: #FFFFFF;
`
const InputFilds= styled.form`
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
const LinkToLoginPage=styled(Link)`
font-family: Raleway;
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;
color: #FFFFFF;
margin-top: 14px;
`