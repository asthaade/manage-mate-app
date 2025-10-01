import { useContext, useState } from 'react';
import { FaEnvelope, FaLock, FaPhone, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/register', { firstName, lastName, email, phone, password });
            login(response.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-600">
            <div className="w-full max-w-md p-8 space-y-6">
                <div className="text-center text-white">
                    <FaShoppingCart className="inline-block w-16 h-16 mb-4" />
                    <h2 className="text-2xl font-bold">Signup</h2>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    <div className="flex space-x-4">
                        <div className="relative w-1/2">
                            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                             <input type="text" required className="w-full p-3 pl-10 text-white bg-black/25 border border-gray-600 rounded-md" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} /> {/* Adjusted padding */}
                        </div>
                        <div className="relative w-1/2">
                            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                             <input type="text" required className="w-full p-3 pl-10 text-white bg-black/25 border border-gray-600 rounded-md" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/> {/* Adjusted padding */}
                        </div>
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input type="email" required className="w-full p-3 pl-10 text-white bg-black/25 border border-gray-600 rounded-md" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Adjusted padding */}
                    </div>
                    <div className="relative">
                        <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input type="tel" required className="w-full p-3 pl-10 text-white bg-black/25 border border-gray-600 rounded-md" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /> {/* Adjusted padding */}
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input type="password" required className="w-full p-3 pl-10 text-white bg-black/25 border border-gray-600 rounded-md" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/> {/* Adjusted padding */}
                    </div>
                    <button type="submit" className="w-full p-3 font-semibold text-gray-800 bg-white rounded-md hover:bg-gray-200 transition-colors"> {/* Adjusted padding */}
                        SIGN UP
                    </button>
                    <p className="text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-white hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;