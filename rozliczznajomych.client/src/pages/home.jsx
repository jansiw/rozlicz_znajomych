import Banner from '../components/banner'
import '../App.css';
import '../css/banner.css'
import { useToken } from '../components/TokenContext';
import {useEffect } from 'react'
const Home = () => {
    const { token } = useToken();
    useEffect(() => {
        document.title = "Rozlicz Znajomego";
    })
    return (
    <div>
        <Banner />
            {token ? <h2>Witaj na stronie rozlicz znajomego</h2> : <h2>Aby wyswietlic zawartosc zaloguj sie</h2>}
        </div>
    )
}
export default Home;