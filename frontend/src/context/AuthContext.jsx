import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('userInfo');
            if (storedUser) {
                setAuth(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse auth info from localStorage", error);
            setAuth(null);
        } finally {
            
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setAuth(userData);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};