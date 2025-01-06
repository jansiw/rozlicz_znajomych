import Banner from '../components/banner'
import '../App.css';
import RegisterForm from '../components/registerform';
import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../components/TokenContext';
import { ListGroup } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import UploadProfilePicture from '../components/UploadProfilePicture';
import ChangePassword from '../components/ChangePassword';
import ChangeUsername from '../components/ChangeUsername';
const API_BASE = "https://localhost:7257/api"


const Profil = () => {
    const { token, setToken } = useToken();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [userId, setUserId] = useState(null);
    const [choice, setChoice] = useState(0);
    const CheckToken = () => {
        const token = localStorage.getItem('token'); // Pobieranie tokena z LocalStorage
        if (!token) {
            console.log("Brak tokena, u�ytkownik niezalogowany.");
            navigate("/");
            return;
        }

        axios.get(`${API_BASE}/Login/CheckToken?token=${token}`)
            .then(response => {
                if (response.status === 200) {
                    setUsername(response.data.username);
                    fetchProfilePicture(response.data.userId);
                    setUserId(response.data.userId);
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
    const fetchProfilePicture = (userId) => {
        axios.get(`${API_BASE}/User/GetProfilePicture/profile-picture/${userId}`, {
            responseType: 'blob' // Oczekujemy obrazu w odpowiedzi
        })
            .then(response => {
                // Konwersja Blob na URL i ustawienie zdjęcia
                const imageUrl = URL.createObjectURL(response.data);
                setProfilePicture(imageUrl);
            })
            .catch(error => {
                console.error("Nie udało się pobrać zdjęcia profilowego:", error);
            });
    };

    useEffect(() => {
        CheckToken();
    }, []);

    const renderChoice = () => {
        switch (choice) {
            case 1:
                return <UploadProfilePicture userId={userId} />;
            case 2:
                return <ChangePassword username={username}/>;
            case 3:
                return <ChangeUsername username={username} />;
        }
    }

    const ActiveExample = () => {
        return (
            <ListGroup as="ul">
                <ListGroup.Item as="li" onClick={() => setChoice(1)}>
                    Zmien zdjecie profilowe
                </ListGroup.Item>
                <ListGroup.Item as="li" onClick={() => setChoice(2)}>Zmień hasło</ListGroup.Item>
                <ListGroup.Item as="li"onClick={() => setChoice(3)}> Zmień nazwę użytkownika</ListGroup.Item>
            </ListGroup>
        );
    };
    return (
        <div>
        <Banner/>
        <h1>Twój Profil</h1>
            <p>Witaj na stronie swojego profilu!</p>
            {profilePicture ? (
                <Image src={profilePicture} height="150px" width="150px" roundedCircle />
            ) : (
                <p>Ładowanie zdjęcia profilowego...</p>
            )}
            <h3>{username}</h3>
            <hr></hr>
                {/* Wywołanie ActiveExample */}
            <ActiveExample />
            {/*{<UploadProfilePicture userId={userId} />*/}
            {renderChoice() }
        </div>
    )
}
export default Profil;