/* eslint-disable react/prop-types */
import CircularProgress from '@mui/material/CircularProgress';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
const RegisterForm = ({user, onSubmit,isLogin, isloading}) => {
    const [visible,setVisible]= useState(false);
    return (
        <div>
            <br></br>
            <form onSubmit={onSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control type="text"
                        placeholder="nazwa uzytkownika"
                        value={user.username}
                        onChange={(e) => user.setUsername(e.target.value)}
                        required></Form.Control>
                    <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control type={visible ? "text" : "password"}
                        placeholder="haslo"
                        value={user.password}
                        onChange={(e) => user.setPassword(e.target.value)}
                        required></Form.Control>
                    <InputGroup.Text style={{cursor: 'pointer'}} onClick={()=>setVisible(!visible)}>{visible ? <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                    <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                </InputGroup>
                <p id="logininfo"></p>
                {isloading ? <CircularProgress/>:<Button type="submit">{isLogin ? "Zaloguj sie" : "Zarejestruj sie"}</Button>}
            </form>
        </div>
    )
}
export default RegisterForm