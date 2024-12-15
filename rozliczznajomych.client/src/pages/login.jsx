import Banner from '../components/banner'
import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import RegisterForm from '../components/registerform';
import { useNavigate } from 'react-router-dom';
const API_BASE = "https://localhost:7257/api/Login"
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const CheckLogin = (e) => {
        e.preventDefault();
        axios.get(`${API_BASE}/CheckUser?username=${username}&password=${password}`)
            .then(response => {
                if (response.status == 200) { 
                    alert("Zalogowano pomyslnie")
                    navigate('/')
                }
            }
            )
            .catch(error => {
                if (error.response && error.response.status == 401) {
                    alert("Podano zle haslo")
                }
                else {
                    console.error(error);
                }
            })
    }
    return (
        <div>
        <Banner/>
            Zaloguj sie
            <RegisterForm user={{ username, password, setUsername, setPassword }} isLogin={true} onSubmit={CheckLogin} />
        </div>
    );
}

export default Login;