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
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import '../App.css';
import YupPassword from 'yup-password';
YupPassword(Yup)
const RegisterForm = ({user, onSubmit,isLogin, isloading}) => {
    const [visible, setVisible] = useState(false);
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Nazwa użytkownika musi mieć co najmniej 3 znaki')
            .max(15, 'Nazwa użytkownika może mieć maksymalnie 15 znaków')
            .required('Nazwa użytkownika jest wymagana'),
        password: Yup.string().password()
            .min(5, 'Hasło musi mieć co najmniej 5 znaków, 1 duza litere, 1 mala litere, cyfre oraz znak')
            .required('Hasło jest wymagane')
            .minSymbols(1, "Hasło musi mieć co najmniej jeden symbol")
            .minLowercase(1, "Hasło musi mieć co najmniej jedna mala litere")
            .minUppercase(1, "Hasło musi mieć co najmniej jedna duza litere")
            .minNumbers(1,"Hasło musi mieć co najmniej cyfre")
            

    });
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                onSubmit(values); // Przekazuje dane do funkcji `onSubmit`
                setSubmitting(false);
            }}
        >
            {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3" style={{width:'100%'} }>
                        <Field
                            as={Form.Control}
                            name="username"
                            type="text"
                            placeholder="Nazwa użytkownika"
                            isInvalid = { touched.username && !!errors.username && !isLogin }
                            style={{ width: '300px' } }
                        />
                   
                        <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                        {isLogin ? "" : <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>}
                </InputGroup>
                    <InputGroup className="mb-3" style={{width:'100%'} }>
                        <Field
                            as={Form.Control}
                            name="password"
                            type={visible ? "text" : "password"}
                            placeholder="Hasło"
                            isInvalid={touched.password && !!errors.password && !isLogin}
                        />
                    {/*<Form.Control type={visible ? "text" : "password"}*/}
                    {/*    placeholder="haslo"*/}
                    {/*    value={user.password}*/}
                    {/*    onChange={(e) => user.setPassword(e.target.value)}*/}
                    {/*    required></Form.Control>*/}
                    <InputGroup.Text style={{cursor: 'pointer'}} onClick={()=>setVisible(!visible)}>{visible ? <FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                        <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                        {isLogin ?"": <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>}
                    </InputGroup>
                <p id="logininfo"></p>
                    {isloading ? <CircularProgress /> : <Button type="submit" disabled={isSubmitting }>{isLogin ? "Zaloguj sie" : "Zarejestruj sie"}</Button>}
            </Form>
            )}
        </Formik>
    )
}
export default RegisterForm