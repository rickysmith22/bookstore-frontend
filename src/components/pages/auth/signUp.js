import React, {useState} from 'react'
import { navigate } from 'hookrouter'
import Cookies from 'js-cookie'

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        if(username === '' || password === '' || confirmPassword === '') {
            setError(true)
            setErrorMessage('Error: all fields must be completed')
        } else if (password !== confirmPassword) {
            setError(true)
            setErrorMessage('Error: Passwords must match')
        } else {
            fetch('http://localhost:5000/user', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response === 'Error the username you have selected has been taken') {
                    setError(true)
                    setErrorMessage("Error: the username you have selected has been taken")
                } else {
                    setError(false)
                    setErrorMessage('')
                    // name is username, set value as the username that we are passing in. If redirecting to login the cookie will be set on the login page
                    Cookies.set('username', username)
                    navigate('/')
                }
            })
        }
    }


    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="input username" 
                name="username" 
                value={username} 
                onChange={(event) => setUsername(event.target.value)}/>
                <input 
                type="password" 
                placeholder="input password" 
                name="password" 
                value={password} 
                onChange={(event) => setPassword(event.target.value)}/>
                <input 
                type="password" 
                placeholder="confirm password" 
                name="confirmPassword" 
                value={confirmPassword} 
                onChange={(event) => setConfirmPassword(event.target.value)}/>
                <button className="button">Signup</button>
            </form>

        </div>
    )
}

export default SignUp