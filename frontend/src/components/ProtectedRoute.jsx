import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!auth) {
        return <Navigate to="/login" />;
    }
    
    return <Outlet />;
};

export default ProtectedRoute;