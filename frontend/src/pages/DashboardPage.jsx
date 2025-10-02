import { useContext, useEffect, useMemo, useState } from 'react';
import { FaSearch, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import AddUserModal from '../components/AddUserModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import EditUserModal from '../components/EditUserModal';
import Pagination from '../components/Pagination';
import UserTable from '../components/UserTable';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentUserToEdit, setCurrentUserToEdit] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);


    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); 

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users'); 
            setUsers(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;
        return users.filter(user =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const handleDataChanged = (newUser) => {
    if (newUser) {
            setUsers(prevUsers => [newUser, ...prevUsers]);
        } else {
            fetchUsers();
        }
};

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            try {
                await api.delete(`/users/${userToDelete._id}`);
                setUsers(prevUsers => prevUsers.filter(u => u._id !== userToDelete._id));
            } catch (err) {
                setError('Failed to delete user.');
            } finally {
                // Close the modal and reset the state
                setDeleteModalOpen(false);
                setUserToDelete(null);
            }
        }
    };

    const openEditModal = (user) => {
        setCurrentUserToEdit(user);
        setEditModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="w-8 h-8 text-gray-600" />
                        <span className="text-gray-700">{auth?.firstName} {auth?.lastName}</span>
                        <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700" title="Logout">
                            <FaSignOutAlt className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={() => setAddModalOpen(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                + Add New User
                            </button>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaSearch className="text-gray-400"/>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {!loading && !error && (
                            <>
                                <UserTable users={currentUsers} onEdit={openEditModal} onDelete={handleDeleteUser} />
                                <Pagination
                                    usersPerPage={usersPerPage}
                                    totalUsers={filteredUsers.length}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                />
                            </>
                        )}
                    </div>
                </div>
            </main>
            {isAddModalOpen && (
                <AddUserModal
                    onClose={() => setAddModalOpen(false)}
                    onUserAdded={handleDataChanged}
                />
            )}
            {isEditModalOpen && currentUserToEdit && (
                <EditUserModal
                    user={currentUserToEdit}
                    onClose={() => setEditModalOpen(false)}
                    onUserUpdated={handleDataChanged}
                />
            )}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this user? This action cannot be undone."
            />
        </div>
    );
};

export default DashboardPage;