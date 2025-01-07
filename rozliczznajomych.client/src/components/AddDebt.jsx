import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useToken } from '../components/TokenContext';
import Banner from '../components/banner';
import { Button, ListGroup, Table} from 'react-bootstrap';
import { FormControl, InputGroup } from 'react-bootstrap';
const API_BASE = "https://localhost:7257/api";

const AddDebt = (username,friend) => {
    const handleAddDebt = async () => {
        try {
            const response = await axios.post(`${API_BASE}/Debts/AddDebt?debtor=${friend}&creditor=${username}&amount=${amount}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                alert("Debt added successfully");
                // Optionally, you can refresh the debts list here
                window.location.reload();

            }
        } catch (error) {
            console.error("There was an error adding the debt!", error);
        }
    };
    return (
        <>
                <InputGroup className="mb-2">
                    <FormControl
                        type="number"
                        placeholder="Ilość zł"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </InputGroup>
                <Button variant="primary" onClick={handleAddDebt}>Dodaj dług</Button>
            </>
    );
}
export default AddDebt;