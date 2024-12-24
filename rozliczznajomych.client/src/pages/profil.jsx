import Banner from '../components/banner'
import '../App.css';
import RegisterForm from '../components/registerform';
import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../components/TokenContext';
import { ListGroup } from 'react-bootstrap';
const API_BASE = "https://localhost:7257/api/Login"


const Profil = () => {
    const { token, setToken } = useToken();
    const navigate = useNavigate();
    const CheckToken = () => {
        const token = localStorage.getItem('token'); // Pobieranie tokena z LocalStorage
        if (!token) {
            console.log("Brak tokena, u�ytkownik niezalogowany.");
            navigate("/");
            return;
        }

        axios.get(`${API_BASE}/CheckToken?token=${token}`)
            .then(response => {
                if (response.status === 200) {
                    console.log(`Ju� jeste� zalogowany jako ${response.data.username}`);
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
    useEffect(() => {
        CheckToken();
    }, []);
    const ActiveExample = () => {
        return (
            <ListGroup as="ul">
                <ListGroup.Item as="li">
                    Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item as="li" disabled>
                    Morbi leo risus
                </ListGroup.Item>
                <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
        );
    };
    return (
        <div>
        <Banner/>
        <h1>Twój Profil</h1>
                <p>Witaj na stronie swojego profilu!</p>
                {/* Wywołanie ActiveExample */}
                <ActiveExample />
        </div>
    )
}
export default Profil;