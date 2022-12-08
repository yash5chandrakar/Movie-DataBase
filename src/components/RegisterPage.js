import React, { useState } from 'react'
import axios from 'axios'
import WelcomePage from './WelcomePage'

const RegisterPage = (props) => {
    const isLoggedIn = props.isLoggedIn
    const setIsLoggedIn = props.setIsLoggedIn
    const username = props.username
    const SetUsername = props.SetUsername
    const [signEmail, setSignEmail] = useState("")
    const [signPassword1, setSignPassword1] = useState("")
    const [signPassword2, setSignPassword2] = useState("")
    const [logEmail, setLogMail] = useState("")
    const [logPass, setLogpass] = useState("")
    function handleLogIn(e) {
        e.preventDefault()
        axios.get("http://localhost:3001/api/getUsers").then((response) => {
            // console.log(response)
            let arr = response.data
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].email === logEmail && arr[i].password === logPass) {
                    alert("Login SuccessFull")
                    SetUsername(logEmail)
                    setIsLoggedIn(true);
                    setLogMail("")
                    setLogpass("")
                    return
                }
            }
            alert("Login Failed")
        })
    }

    function handleSignUp(e) {
        e.preventDefault()
        if (signPassword1 !== signPassword2) {
            alert("Password Do not Match")
        }
        else {
            axios.get("http://localhost:3001/api/getUsers").then((response) => {
                let arr = response.data
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].email === signEmail) {
                        alert("This email already exists!")
                        return
                    }
                }
                axios.post('http://localhost:3001/api/addUser', {
                    email: signEmail,
                    password: signPassword1,
                    admin: false,
                    items: []
                })
                    .then(function (response) {
                        // console.log(response);
                        if (response.data.ok === true) {
                            alert("Sign Up Successful!")
                        }
                        else {
                            alert("Error! Try Again.")
                        }
                        setSignEmail("")
                        setSignPassword1("")
                        setSignPassword2("")
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error")
                    });
            })
        }
    }

    return (
        <div className='outerDiv'>
            <div className='innerDiv'>
                {(isLoggedIn) ? <WelcomePage username={username} /> : <><div className='signUpLeft'>
                    <h1>SignUp</h1>
                    <form onSubmit={(e) => handleSignUp(e)}>
                        <label htmlFor='email'>Email: </label>
                        <input required type={'email'} value={signEmail} onChange={(e) => setSignEmail(e.target.value)}></input>
                        <label htmlFor='password1'>Password: </label>
                        <input type={'password'} value={signPassword1} onChange={(e) => setSignPassword1(e.target.value)} required></input>
                        <label htmlFor='password2'>Re-Enter Password: </label>
                        <input required type={'password'} value={signPassword2} onChange={(e) => setSignPassword2(e.target.value)}></input>
                        <button >SignUp</button>
                    </form>
                </div>
                    <div className='loginRight'>
                        <h1>Login</h1>
                        <form onSubmit={(e) => handleLogIn(e)}>
                            <label htmlFor='email'>Email:</label>
                            <input required type={'email'} value={logEmail} onChange={(e) => setLogMail(e.target.value)}></input>
                            <label htmlFor='password'>Password:</label>
                            <input required type={'password'} value={logPass} onChange={(e) => setLogpass(e.target.value)}></input>
                            <button>Login</button>
                        </form>
                    </div></>}

            </div>
        </div>
    )
}

export default RegisterPage
