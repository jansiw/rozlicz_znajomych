import React, { useState } from "react";
import axios from "axios";

const UploadProfilePicture = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage("Please select a file first.");
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
            <h3>Upload Profile Picture</h3>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadProfilePicture;
