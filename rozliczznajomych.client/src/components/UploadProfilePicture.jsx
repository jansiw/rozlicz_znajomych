import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/esm/Button";
const UploadProfilePicture = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage("Najpierw wybierz zdjecie!");
            return;
        }

        const formData = new FormData();
        formData.append("profilePicture", selectedFile);

        try {
            const response = await axios.post(
                `https://localhost:7257/api/User/UploadProfilePicture/profile-picture/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage("Zdjecie profilowe zmienione pomyslnie.");
        } catch (error) {
            setMessage("Wystapil blad podczas dodawania zdjecia.");
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Zmien zdjecie profilowe</h3>
            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control type="file" onChange={handleFileChange} ></Form.Control>
                    <Button variant="outline-primary" type="submit">Zmien</Button>
                </InputGroup>
            </form>
            {message && <hr/>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadProfilePicture;
