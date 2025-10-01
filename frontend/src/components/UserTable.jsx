import { FaEdit, FaTrash } from 'react-icons/fa';

const ContactTable = ({ users, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((contact, index) => (
                        <tr key={contact._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${contact.firstName} ${contact.lastName}`}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                <button onClick={() => onEdit(contact)} className="text-indigo-600 hover:text-indigo-900"><FaEdit /></button>
                                <button onClick={() => onDelete(contact._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactTable;