/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

// Tworzymy kontekst
const TokenContext = createContext();

// Komponent dostarczaj¹cy kontekst
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState('');

    // £adujemy token z localStorage przy za³adowaniu komponentu
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    // Funkcja do ustawienia tokena
    const setNewToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    // Funkcja do usuniêcia tokena
    const removeToken = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <TokenContext.Provider value={{ token, setToken: setNewToken, removeToken }}>
            {children}
        </TokenContext.Provider>
    );
};

// Hook do korzystania z tokena w innych komponentach
export const useToken = () => {
    return useContext(TokenContext);
};
