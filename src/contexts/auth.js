import React, { createContext, useState, useEffect } from 'react';
import { login } from '../services/api/users';
import axios from '../config/axios'; 

const Context = createContext();

function AuthProvider({ children }){

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          axios.defaults.headers.Authorization = `Token ${JSON.parse(token)}`;
          setAuthenticated(true);
        }
    
    }, []);


    async function handleLogin(username, password)
    {
        let credentials = { username, password };
        const { data: { token,  user_id} }  = await login(credentials)

        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('id', user_id)
        axios.defaults.headers.Authorization = `Token ${token}`;

        setAuthenticated(true);
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider};