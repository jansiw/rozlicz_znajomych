import { useEffect} from 'react';
import './App.css';
import './css/banner.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Home from './pages/home.jsx'
import { TokenProvider } from './components/TokenContext';
//import {CheckToken } from "./pages/login"
function App() { 
    //useEffect(() => {
    //    CheckToken(); // Sprawdzanie tokena przy starcie aplikacji
    //}, []);
    return (
        <TokenProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home /> }/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
             </Routes>
            </Router>
        </TokenProvider>
    );
}

export default App;