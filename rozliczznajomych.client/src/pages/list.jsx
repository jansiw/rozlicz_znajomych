import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../components/TokenContext';
import '../App.css';
import Banner from '../components/banner';
const API_BASE = "https://localhost:7257/api"

const List = () => {
    const { token, setToken } = useToken();
    const navigate = useNavigate();
    const checkToken = () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.log("Brak tokena, użytkownik niezalogowany.");
            navigate("/");
            return;
        }
}

return (
    <div>
        <Banner />
    </div>

)
}

export default List;