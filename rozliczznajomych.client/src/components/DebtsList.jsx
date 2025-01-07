import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useToken } from '../components/TokenContext';
import Banner from '../components/banner';
import { Button, ListGroup, Table} from 'react-bootstrap';
import { FormControl, InputGroup } from 'react-bootstrap';
const API_BASE = "https://localhost:7257/api";
const DebtsList = ({ debts,username,view}) => {
    const { token } = useToken();
    const [debtor, setDebtor] = useState("");
    const [amount, setAmount] = useState(0);

    const handleAddDebt = async () => {
        try {
            const response = await axios.post(`${API_BASE}/Debts/AddDebt?debtor=${debtor}&creditor=${username}&amount=${amount}`, null, {
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
    const RemoveDebt = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE}/Debts/DeleteDebt/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                alert("Debt removed successfully");
                // Optionally, you can refresh the debts list here
                window.location.reload();
            }
        } catch (error) {
            console.error("There was an error removing the debt!", error);
        }
    }
    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <ListGroup className="w-100">
                {debts.map((debt, index) => (
                    <ListGroup horizontal className="justify-content-center w-100" key={index}>
                        <ListGroup.Item key={debt.id}>
                            {view !== "myDebts" ? <>Użytkownik {debt.debtor} jest winien Ci {debt.amount} zł</> : <>Jesteś winien {debt.amount}zł użytkownikowi {debt.creditor}</>}
                        </ListGroup.Item>
                        {view !== "myDebts" ? <ListGroup.Item variant="primary" style={{ cursor: "pointer" }} className="hover-darken">Edytuj</ListGroup.Item> : ""}
                        {view !== "myDebts" ? <ListGroup.Item variant="danger" style={{ cursor: "pointer" }} onClick={() => RemoveDebt(debt.id)} className="hover-darken">Usuń</ListGroup.Item> : ""}
                    </ListGroup>
                ))}
            </ListGroup>
            {view!=="myDebts"?<hr className="w-100" />:""}
            {view!=="myDebts"?<div className="mt-3 w-100">
                <InputGroup className="mb-2">
                    <FormControl
                        type="text"
                        placeholder="Dłużnik"
                        value={debtor}
                        onChange={(e) => setDebtor(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-2">
                    <FormControl
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </InputGroup>
                <Button variant="primary" onClick={handleAddDebt}>Add New Debt</Button>
            </div>:""}
        </div>
    );
};
export default DebtsList;