import React, {useState} from 'react'
import { navigate } from 'hookrouter'
import Cookies from 'js-cookie'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        if(username === '' || password === '') {
            setError(true)
            setErrorMessage('Error: all fields must be completed')
        } else {
            fetch('http://localhost:5000/user/verify', {
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
                if(response === 'User has not been verified') {
                    setError(true)
                    setErrorMessage("Error: the username you have selected has been taken")
                } else if(response === 'User has been verified') {
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
                <button className="button">Login</button>
            </form>

        </div>
    )
}

export default Login