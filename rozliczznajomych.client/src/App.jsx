import { useEffect} from 'react';
import './App.css';
import './css/banner.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Home from './pages/home.jsx'
import { TokenProvider } from './components/TokenContext';
import Profil from './pages/profil.jsx';
import List from './pages/list.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Debts from './pages/debts.jsx';
//import {CheckToken } from "./pages/login"
function App() { 
    //useEffect(() => {
    //    CheckToken(); // Sprawdzanie tokena przy starcie aplikacji
    //}, []);
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      }, []);
    return (
        <TokenProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home /> }/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                 <Route path="/profil" element={<Profil />} />
                 <Route path='/list' element={<List />} />
                 <Route path='*' element={<h1>404 - Nie znaleziono strony</h1>} />
                 <Route path='/debts' element={<Debts/>}/>
             </Routes>
            </Router>
        </TokenProvider>
    );
}

export default App;