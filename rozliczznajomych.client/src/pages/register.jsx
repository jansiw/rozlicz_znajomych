import Banner from '../components/banner';
import axios from "axios";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/registerform';
const API_BASE = "https://localhost:7257/api/Login"
const Register = () => {
    useEffect(()=> {
        document.title = "Zarejestruj sie";
    })
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userid, setUserId] = useState(0);
    const [isloading, setIsLoading] = useState(0);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(1)
        const user = { userid,username,password }
        axios.post(`${API_BASE}/AddUser`, user)
            .then(response => {
                if (response.status === 200) {
                    document.getElementById('logininfo').innerHTML = "User added succesfully. Going back to homepage.";
                    document.getElementById('logininfo').style.color = "green";
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                    //navigate('/');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    //alert(error.response.data);
                    document.getElementById('logininfo').innerHTML = error.response.data;
                    document.getElementById('logininfo').style.color = "red";
                    setIsLoading(0);
                }
                else {
                    setIsLoading(0);
                    console.error(error)
                }
            })
    }
    return (
        <div>
            <Banner />
            Zarejestruj sie
            <RegisterForm user={{ userid, username, password, setUserId, setUsername, setPassword }} onSubmit={handleSubmit} isLogin={false} isloading={isloading} />
        </div>
    )
}
export default Register;