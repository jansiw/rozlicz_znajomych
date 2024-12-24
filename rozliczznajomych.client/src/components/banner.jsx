import '../css/banner.css'
import { Link, useNavigate }  from 'react-router-dom'
//import Login from '../pages/login.jsx'
//import Register from '../pages/register.jsx'
import { useEffect } from 'react';
import { useToken } from '../components/TokenContext';
const Banner = () => {
    //const [token,setToken] = useState('');
    const navigate = useNavigate();
    const { token, removeToken } = useToken();

    // Funkcja do obs³ugi wylogowywania
    const handleLogout = () => {
        removeToken();// Usuwamy token z localStorage
        navigate('/'); // Przekierowanie do strony logowania
    };
    //useEffect(() => {
    //    const storedToken = localStorage.getItem('token');
    //    setToken(storedToken); // Ustawiamy stan tokena, jeœli jest zapisany w localStorage
    //}, []);
    return (
            <div className="banner">
            <Link className="text" to="/">Rozlicz znajomych</Link>
            <div className="links">
                {token ? (<>
                    <a className="link">Profil</a>
                    <a className="link">Lista znajomych</a>
                    <a className="link" onClick={handleLogout}>Wyloguj sie</a>
                </>) :
                    (<>
                        <Link className="link" to="/login">Zaloguj sie</Link>
                        <Link className="link" to="/register">Zarejestruj sie</Link>
                    </>
                    )
                }
                </div>
            </div>
    )
}
export default Banner;