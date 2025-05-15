import React, { useState } from 'react';
import { addUser } from '../../Service/UserService';
import toast from 'react-hot-toast';

function Userform({ setUser }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        role: 'ROLE_USER' 
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Fixed typo here
        setLoading(true);
        try {
            const response = await addUser(data);
            setUser(prevUsers => [...prevUsers, response.data]);
            toast.success('User added successfully');
            setData({ name: '', email: '', password: '', role: 'ROLE_USER' });
        } catch (error) {
            console.error(error);
            toast.error('Error adding user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-full mx-auto h-full p-2">
            <div className="bg-white text-black rounded-lg shadow-md p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder="John Doe"
                            className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={onChangeHandler}
                            value={data.email}
                            placeholder="Email"
                            className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={onChangeHandler}
                            value={data.password}
                            placeholder="********"
                            className="w-full px-3 py-1 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-orange-600 text-white py-1 px-4 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        {loading ? 'Loading...' : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Userform;