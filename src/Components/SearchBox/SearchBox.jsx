import React from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBox({ onSearch }) {
    const [searchText, setSearchText] = React.useState('');

    const handleInputChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        onSearch(text);
    };

    return (
        <div className="relative w-full text-black bg-gray-100 rounded-lg max-w-sm m-2">
            <input
                type="text"
                className="w-full py-2 pl-10 pr-4 placeholder-gray-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Search Items"
                value={searchText}
                onChange={handleInputChange}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
    );
}

export default SearchBox;