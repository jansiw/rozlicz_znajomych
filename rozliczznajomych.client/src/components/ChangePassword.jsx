import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/esm/Button";
import Banner from "./banner";
import { useToken } from '../components/TokenContext';

const ChangePassword = () => {
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
    }
    return (
        <div>
            <Banner/>
            <form onSubmit={handleChangePassword}>
                <div>
                <label>Podaj stare hasło: </label><br />
                <input type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required />
                </div>
                <div>
                <label>Podaj nowe hasło:</label><br></br>
                <input type="password"
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                required
                 />
                 <div>
                 </div>
                 <label>Potwierdź nowe hasło: </label><br />
                 <input type="password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
                  />
                  </div>
                  <button type="submit">Zmień hasło</button>
    
            </form>
    
        </div>
    )
}
export default ChangePassword;