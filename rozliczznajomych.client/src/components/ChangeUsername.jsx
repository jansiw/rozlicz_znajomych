import Banner from "./banner";
import { useToken } from '../components/TokenContext';
import React, { useState } from "react";
import axios from "axios";

const ChangeUsername = () => {
    const [newUsername, setNewUsername] = useState("");


const handleChangeUsername = async(e) => {
    e.preventDefault;

}
return (
    <div>
        <form onSubmit={handleChangeUsername}>
            <label >Podaj nową nazwę użytkownika: </label><br />
        <input type="text"
        required
         />
         <button type="submit">Zmień nazwę użytkownika</button>
         </form>
    </div>
)


}

export default ChangeUsername;