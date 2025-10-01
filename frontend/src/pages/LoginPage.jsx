import { useContext, useState } from 'react';
import { FaEnvelope, FaLock, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-600">
            <div className="w-full max-w-md p-8 space-y-8">
                <div className="text-center text-white">
                    <FaShoppingCart className="inline-block w-16 h-16 mb-4" />
                    <h2 className="text-2xl font-bold">Login</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    <div className="relative">
                        <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            required
                            className="w-full p-3 pl-10 text-white bg-black/25 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            required
                            className="w-full p-3 pl-10 text-white bg-black/25 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 font-semibold text-gray-800 bg-white rounded-md hover:bg-gray-200 transition-colors"
                    >
                        LOGIN
                    </button>
                    <p className="text-center text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-white hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;