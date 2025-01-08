import Banner from "./banner";
import { useToken } from '../components/TokenContext';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import InputGroup from 'react-bootstrap/InputGroup';
import { CircularProgress } from "@mui/material";

const ChangeUsername = ({ username }) => {
    const [newUsername, setNewUsername] = useState("");
    const [message, setMessage] = useState("");
    const { removeToken } = useToken()
    const navigate = useNavigate();
    const [isloading, setIsLoading] = useState(0);

    const handleLogout = () => {
        removeToken();// Usuwamy token z localStorage
        navigate('/'); // Przekierowanie do strony logowania
    };

const handleChangeUsername = async(e) => {
    e.preventDefault();
    setIsLoading(1);
    try {
        await axios.patch(
            `https://localhost:7257/api/Login/UpdateUsername?username=${newUsername}&user=${username}`,
        );
        setMessage("Nazwa użytkownika zmieniona pomyślnie. Zaraz nastąpi wylogowanie.");
        setTimeout(() => {
            handleLogout();
        }, 2000);
    }
    catch (error) {
        if (error.response.status==409){
            setMessage("Nazwa jest zajęta");
        }
        else {
            setMessage("Wystąpił błąd podczas zmiany nazwy użytkownika.");
            console.error(error);
        }
    }
    setIsLoading(0);
};
return (
    <div>
        <Banner/>
        <Form onSubmit={handleChangeUsername}>
            <Form.Label >Podaj nową nazwę użytkownika: </Form.Label><br />
        <InputGroup>
        <Form.Control type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        required
         />
         <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
         </InputGroup>
         <br></br>
         {isloading ? <CircularProgress />:<Button type="submit">Zmień nazwę użytkownika</Button>}
         </Form>
         {message && <hr/>}
         {message && <p>{message}</p>}
    </div>
)


}

export default ChangeUsername;