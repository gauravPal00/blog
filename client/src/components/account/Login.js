import { Box, TextField, Button, styled, Typography } from '@mui/material'
import { useState,useContext } from 'react'
import { API } from '../service/api'
import { DataContext, } from '../context/DataProvider'
import { useNavigate } from 'react-router-dom'

const Component = styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6)
`
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 0"
})

const Wrapper = styled(Box)`
padding: 25px 35px ;
display:flex ;
flex:1 ;
flex-direction:column ;
& > div,& > button ,& > p {
  margin-top:20px
}
`
const LoginButton = styled(Button)`
text-transform : none ;
background-color:#fb6418;
color:#fff;
height:48px;
border-radius:2px;
`

const SignUpbutton = styled(Button)`
text-transform : none ;
background-color:#fff;
color:#2874f0;
height:48px;
border-radius:2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/20%)
`
const Text = styled(Typography)`
color:#878787;
`

const Error = styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600

`
const signupIntialValue = {
  name: "",
  username: "",
  password: ""
}
const loginIntialValue = {
  username: "",
  password: ""
}


export const Login = ({isUserAuthenticated}) => {

  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  const [account, toogleAccount] = useState("login")
  const [signup, setSignup] = useState(signupIntialValue)
  const [login, setLogin] = useState(loginIntialValue)
  const [error, setError] = useState("")

  const {setAccount} = useContext(DataContext)
  const navigate = useNavigate()

  const toogleSignup = () => {
    account === "signup" ? toogleAccount("login") : toogleAccount("signup")
  }

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value })
  }

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const signUpUser = async () => {
    let response = await API.userSignup(signup)
    if (response.isSuccess) {
      setError("")
      setSignup(signupIntialValue)
      toogleAccount("login")
    }
    else {
      setError("Something went wrong please try again later")
    }
  }

  const loginUser = async () => {
    let response = await API.userLogin(login)
    if (response.isSuccess) {
      setError("")
      sessionStorage.setItem("accessToken",`Bearer ${response.data.accessToken}`)
      sessionStorage.setItem("refreshToken",`Bearer ${response.data.refreshToken}`)
      setAccount({username:response.data.username,name:response.data.name})
      setLogin(loginIntialValue)
      isUserAuthenticated(true)
      navigate("/")
    }
    else {
      setError("Something went wrong please try again later")
    }
  }
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {
          account === "login" ? 
          <Wrapper>
            <TextField variant='standard' value={login.username} name="username" onChange={(e) => onValueChange(e)} label="Enter Username" />
            <TextField variant='standard' value={login.password} name='password' onChange={(e) => onValueChange(e)} label="Enter Password" />
            <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignUpbutton onClick={() => toogleSignup()}>Create an account</SignUpbutton>
          </Wrapper>
            :
            <Wrapper>
              <TextField variant='standard' value={signup.name} onChange={(e) => onInputChange(e)} name="name" label="Enter Name" />
              <TextField variant='standard'  value={signup.username} onChange={(e)=> onInputChange(e)} name="username" label="Enter Username" />
              <TextField variant='standard' value={signup.password} onChange={(e) => onInputChange(e)} name="password" label="Enter Password" />

              {error && <Error>{error}</Error>}
              <SignUpbutton onClick={() => signUpUser()} >Signup</SignUpbutton>
              <Text style={{ textAlign: "center" }}>OR</Text>
              <LoginButton onClick={() => toogleSignup()} variant='contained'>Already have an account</LoginButton>
            </Wrapper>
        }

      </Box>
    </Component>
  )
}
