import Banner from '../components/banner';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/registerform';
const API_BASE = "https://localhost:7257/api/Login"
const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userid, setUserId] = useState(0);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { userid,username,password }
        axios.post(`${API_BASE}/AddUser`, user)
            .then(() => {
                alert('User added succesfully')
                navigate('/');
            })
            .catch(error => console.error(error))
    }
    return (
        <div>
            <Banner />
            Zarejestruj sie
            <RegisterForm user={{ userid,username, password, setUserId,setUsername, setPassword }} onSubmit={handleSubmit} isLogin={false} />
        </div>
    )
}
export default Register;