import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/esm/Button";
import Banner from "./banner";
import { useToken } from '../components/TokenContext';


const ChangePassword = ({username}) => {
    const {token} = useToken();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword!== confirmPassword) {
            setMessage("Hasła nie są zgodne");
            return;
        }
        try {
            const response = await axios.patch(
                `https://localhost:7257/api/Login/UpdatePassword?username=${username}&password=${newPassword}`,
                
                
        
    );
    setMessage("Hasło zmienione pomyślnie.");
}
catch (error) {
    setMessage("Wystąpił błąd podczas zmiany hasła.");
    console.error(error);
}
    };
   return (
        <div>
            <Banner/>
            <Form onSubmit={handleChangePassword}>
                <div>
                <Form.Label>Podaj stare hasło:</Form.Label><br />
                <Form.Control
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required />
                </div>
                <Form.Label>Podaj nowe hasło:</Form.Label><br />
                <Form.Control
                type="password"
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                required
                 />
                 <Form.Label>Potwierdź nowe hasło:</Form.Label><br />
                 <Form.Control
                 type="password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
                  />
                  <Button type="submit">Zmień hasło</Button>
            </Form>
            {message && <p>{message}</p>}
    
        </div>
    )
}
export default ChangePassword;