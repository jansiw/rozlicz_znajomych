import React, { useState } from "react";
import axios from "axios";
import { useToken } from '../components/TokenContext';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';

const API_BASE = "https://localhost:7257/api";

const UpdateDebt = ({ debtId, currentAmount, onUpdateComplete}) => {
    const { token } = useToken();
    const [amount, setAmount] = useState(currentAmount);
    const [message, setMessage] = useState("");

    const handleUpdateDebt = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_BASE}/Debts/UpdateDebt/${debtId}?amount=${ amount }`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                setMessage("Dług zaktualizowany pomyślnie.");
                setTimeout(() => {
                    onUpdateComplete(); // Callback to refresh the debts list
                }, 1000);
            }
        } catch (error) {
            console.error("There was an error updating the debt!", error);
        }
    }

    return (
        <>
        <h3>Podaj dług</h3>
        <Form onSubmit={handleUpdateDebt}>
            <InputGroup className="mb-2">
                <FormControl
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </InputGroup>
            <Button variant="primary" onClick={handleUpdateDebt}>Zaktualizuj dług</Button>
        </Form>
        {message&&<p>{message}</p>}
        </>
    );
};

export default UpdateDebt;