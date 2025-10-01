import { useState } from 'react';

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const [pageInput, setPageInput] = useState('');
    const pageNumbers = [];
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageInputChange = (e) => {
        setPageInput(e.target.value);
    };

    const handlePageInputSubmit = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(pageInput, 10);

        if (pageNumber >= 1 && pageNumber <= totalPages) {
            paginate(pageNumber);
        }
        setPageInput('');
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <nav>
                <ul className="flex items-center">
                    {pageNumbers.map(number => (
                        <li key={number} className="mx-1">
                            <button
                                onClick={() => paginate(number)}
                                className={`px-3 py-1 rounded-md text-sm font-medium
                                    ${currentPage === number 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <form onSubmit={handlePageInputSubmit}>
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={pageInput}
                    onChange={handlePageInputChange}
                    placeholder="Page"
                    className="w-20 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
        </div>
    );
};

export default Pagination;