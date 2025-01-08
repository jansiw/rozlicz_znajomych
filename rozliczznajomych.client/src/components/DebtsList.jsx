import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { useToken } from '../components/TokenContext';
import Banner from '../components/banner';
import { Button, ListGroup, Table} from 'react-bootstrap';
import { FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import UpdateDebt from '../components/UpdateDebt';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const API_BASE = "https://localhost:7257/api";
const DebtsList = ({ debts,username,view}) => {
    const { token } = useToken();
    const [debtor, setDebtor] = useState("");
    const [amount, setAmount] = useState(0);
    const [id, setId] = useState(null);
    const [amount2, setAmount2] = useState(0);
    const totalDebt = debts.reduce((sum, debt) => sum + Number(debt.amount), 0);
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
    const showUpdateForm = (id,amount) => {
        if (id!==null){
            return <UpdateDebt debtId={id} currentAmount={amount} onUpdateComplete={()=>{setId(null);setAmount2(0);}}/>;
        }
        return null
    }
    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <ListGroup className="w-100">
                {debts.map((debt, index) => (
                    <ListGroup horizontal className="justify-content-center w-100" key={index}>
                        <ListGroup.Item key={debt.id}>
                            {view !== "myDebts" ? <>Użytkownik {debt.debtor} jest winien Ci {debt.amount} zł</> : <>Jesteś winien {debt.amount}zł użytkownikowi {debt.creditor}</>}
                        </ListGroup.Item>
                        {view !== "myDebts" ? <ListGroup.Item variant="primary" style={{ cursor: "pointer" }} className="hover-darken" onClick={() => { setId(debt.id); setAmount2(debt.amount); }}><FontAwesomeIcon icon={faPencil} /></ListGroup.Item> : ""}
                        {view !== "myDebts" ? <ListGroup.Item variant="danger" style={{ cursor: "pointer" }} onClick={() => RemoveDebt(debt.id)} className="hover-darken"><FontAwesomeIcon icon={faTrash} /></ListGroup.Item> : ""}
                    </ListGroup>
                ))}
            </ListGroup>
            <hr className="w-100" />
            {view ==="myDebts"? <h2 className="mt-3">Suma twoich długów: {totalDebt} zł</h2> : ""}
            {view !== "myDebts" ? <div className="mt-3 w-100">
                {showUpdateForm(id,amount2)}
                {/* <InputGroup className="mb-2">
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
                <Button variant="primary" onClick={handleAddDebt}>Add New Debt</Button> */}
            </div> : ""}
        </div>
    );
};
export default DebtsList;