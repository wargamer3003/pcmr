import { useState } from 'react'

import '../styles/login-page/login-page-styles.css'
import LoginButtonComponent from '../components/login-page/login-button-component'
import FooterComponent from '../components/misc/footer-component'
import appImage from '../assets/place-holder.png'
import RegisterButtonComponent from '../components/login-page/register-button-component'


type Props = {onLogin: () => void}

export default function LoginPage({ onLogin }: Props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => 
    {

        try {
            const response = await fetch(
                'http://localhost:8080/api/login',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username,password})
                }
            )
            if (response.ok) {onLogin()}
            else {alert('Credenciais erradas')}
        }
        catch (error) {
            console.error(error)
            alert('Não conectou API')
        }
    }

    return (
        <div>

            <h1 style={{ color: '#4E5452' }}>
                Medycist
            </h1>

            <div>
                <img src={appImage} alt="Illustrative image" style={{ width: '25%', height: 'auto' }} />
            </div>

            <form className="login-page"onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="username" style={{ marginTop: '1rem' }}>Username</label>
                <input className="input" id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input className="input" id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <div className="button-row">
                    <LoginButtonComponent onClick={handleLogin} />
                    <RegisterButtonComponent />
                </div>
            </form>
            <FooterComponent />
        </div>
    )
}
