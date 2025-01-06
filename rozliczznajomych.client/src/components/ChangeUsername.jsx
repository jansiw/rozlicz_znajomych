import Banner from "./banner";
import { useToken } from '../components/TokenContext';
import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import InputGroup from 'react-bootstrap/InputGroup';


const ChangeUsername = ({ username }) => {
    const [newUsername, setNewUsername] = useState("");
    const [message, setMessage] = useState("");


const handleChangeUsername = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.patch(
            `https://localhost:7257/api/Login/UpdateUsername?username=${newUsername}&user=${username}`,
        );
        setMessage("Nazwa użytkownika zmieniona pomyślnie.");
    }
    catch (error) {
        setMessage("Wystąpił błąd podczas zmiany nazwy użytkownika.");
        console.error(error);

}
};
return (
    <div>
        <Banner/>
        <Form onSubmit={handleChangeUsername}>
            <Form.Label >Podaj nową nazwę użytkownika: </Form.Label><br />
        <Form.Control type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        required
         />
         <Button type="submit">Zmień nazwę użytkownika</Button>
         </Form>
         {message && <p>{message}</p>}
    </div>
)


}

export default ChangeUsername;