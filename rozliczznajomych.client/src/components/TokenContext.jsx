/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

// Tworzymy kontekst
const TokenContext = createContext();

// Komponent dostarczający kontekst
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState('');

    // Ładujemy token z localStorage przy załadowaniu komponentu
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    // Funkcja do ustawienia tokena
    const setNewToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    // Funkcja do usunięcia tokena
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
