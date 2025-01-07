import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from '../components/TokenContext';
import Banner from '../components/banner';
import { Button, Table } from 'react-bootstrap';
import DebtsList from '../components/DebtsList';
const API_BASE = "https://localhost:7257/api";


const Debts = () => {
    const { token } = useToken();
    const [debts, setDebts] = useState([]);
    const [view, setView] = useState("myDebts");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            const response = await axios.get(`${API_BASE}/Login/CheckToken?token=${token}`);
            setUsername(response.data.username);
        };
        fetchUsername();
    }, [token]);

    const fetchDebts = async (type) => {
        let url = `${API_BASE}/Debts/GetDebtsBy${type === "myDebts" ? "Debtor" : "Creditor"}/${username}`;
        const response = await axios.get(url);
        setDebts(response.data);
    };

    useEffect(() => {
        if (username) {
            fetchDebts(view);
        }
    }, [view, username]);

    return (
        <div>
            <Banner />
            <h1>Lista długów</h1>
            <Button variant={view==="myDebts" ?"primary":"secondary"} onClick={() => setView("myDebts")}>Moje Długi</Button>
            <Button variant={view!=="myDebts" ?"primary":"secondary"} onClick={() => setView("friendsDebts")}>Długi znajomych</Button>
            <DebtsList debts={debts} username={username} view={view}/>
        </div>
    );
};

export default Debts;