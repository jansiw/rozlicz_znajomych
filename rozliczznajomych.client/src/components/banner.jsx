import '../css/banner.css'
import { Link }  from 'react-router-dom'
//import Login from '../pages/login.jsx'
//import Register from '../pages/register.jsx'
const Banner = () => {
    return (
            <div className="banner">
                <Link className="text" to="/">Rozlicz znajomych</Link>
                <div className="links">
                    <Link className="link" to="/login">Zaloguj siê</Link>
                    <Link className="link" to="/register">Zarejestruj siê</Link>
                </div>
            </div>
    )
}
export default Banner;