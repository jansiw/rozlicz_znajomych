import Banner from '../components/banner'
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RegisterForm from '../components/registerform';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../components/TokenContext';
const API_BASE = "https://localhost:7257/api/Login"
function Login() {
    //sk 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setToken } = useToken();
    const [isloading, setIsLoading] = useState(0);
    useEffect(() => {
        CheckToken();
    }, [])
    useEffect(() => {
        document.title = "Zaloguj sie";
    })
    const CheckLogin = (values) => {
        setIsLoading(1);
        axios.post('https://localhost:7257/api/Login/Login', { username:values.username, password:values.password })
            .then(response => {
                if (response.status === 200) {
                    const token = response.data.token;
                    setToken(token); // Ustawiamy token w kontek�cie i zapisujemy go w localStorage
                    //alert("Zalogowano pomy�lnie");
                    document.getElementById('logininfo').innerHTML = "Zalogowano pomyslnie. Powrot do strony glownej";
                    document.getElementById('logininfo').style.color = "green";
                    setTimeout(() => {
                        navigate('/');
                    },2000)
                    //navigate('/');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    document.getElementById('logininfo').innerHTML = "Podano nieprawidlowe haslo";
                    document.getElementById('logininfo').style.color = "red";
                    setIsLoading(0);
                }
            });
    };

    const CheckToken = () => {
        const token = localStorage.getItem('token'); // Pobieranie tokena z LocalStorage

        if (!token) {
            console.log("Brak tokena, u�ytkownik niezalogowany.");
            return;
        }

        axios.get(`${API_BASE}/CheckToken?token=${token}`)
            .then(response => {
                if (response.status === 200) {
                    alert(`Ju� jeste� zalogowany jako ${response.data.username}`);
                    navigate('/'); // Przekierowanie na stron� g��wn�
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.log("Token jest niewa�ny lub wygas�.");
                    localStorage.removeItem('token');
                } else {
                    console.error(error);
                }
            });
    };


    return (
        <div>
        <Banner/>
            Zaloguj sie
            <RegisterForm user={{ username, password, setUsername, setPassword }} isLogin={true} onSubmit={CheckLogin} isloading={isloading} />
        </div>
    );
}

export default Login;