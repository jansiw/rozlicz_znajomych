import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/esm/Button";
import Banner from "./banner";
import { useToken } from '../components/TokenContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { CircularProgress } from "@mui/material";

const ChangePassword = ({username}) => {
    const {token} = useToken();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [visible,setVisible] = useState(0);
    const [visible1,setVisible1] = useState(0);
    const [visible2,setVisible2] = useState(0);
    const [isloading, setIsLoading] = useState(0);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(1);
        if (newPassword!== confirmPassword) {
            setMessage("Hasła nie są zgodne");
            return;
        }
        try {
            const response = await axios.patch(
                `https://localhost:7257/api/Login/UpdatePassword?username=${username}&password=${newPassword}`,
    );
    setIsLoading(0);
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
                <Form.Label>Podaj stare hasło:</Form.Label><br />
                <InputGroup>
                <Form.Control
                type={visible? "text":"password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required />
                <InputGroup.Text style={{cursor: 'pointer'}} onClick={()=>setVisible(!visible)}>{visible ? <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                </InputGroup>
                <Form.Label>Podaj nowe hasło:</Form.Label><br />
                <InputGroup>
                <Form.Control
                type={visible1?"text":"password"}
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                required
                 />
                 <InputGroup.Text style={{cursor: 'pointer'}} onClick={()=>setVisible1(!visible1)}>{visible1 ? <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                </InputGroup>
                 <Form.Label>Potwierdź nowe hasło:</Form.Label><br />
                 <InputGroup>
                 <Form.Control
                 type={visible2?"text":"password"}
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
                  />
                  <InputGroup.Text style={{cursor: 'pointer'}} onClick={()=>setVisible2(!visible2)}>{visible2 ? <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                </InputGroup><br/>
                  {isloading ? <CircularProgress />:<Button type="submit">Zmień hasło</Button>}
            </Form>
            {message && <p>{message}</p>}
    
        </div>
    )
}
export default ChangePassword;