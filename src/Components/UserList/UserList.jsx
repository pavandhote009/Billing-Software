import React from 'react';
import { deleteUser } from '../../Service/UserService';
import toast from 'react-hot-toast';

function UserList({ user=[], setUser }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredUsers = user.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  
);
console.log(filteredUsers);

  const deleteByUserId = async (id) => {
    try {
      await deleteUser(id);
      setUser((prevUsers) => prevUsers.filter((user) => user.userId !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete user");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 gap-4 p-4 rounded-lg shadow-lg">
      <div className='searchbar mb-2 flex items-center gap-2 border border-gray-300 rounded-md p-2 bg-white focus-within:ring-2 focus-within:ring-orange-500'> 
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search users..."
          className="w-full placeholder:text-xs text-sm p-1 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
        />
        <button className="text-orange-500 hover:text-orange-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <h2 className="font-semibold text-lg text-white mb-2">Users</h2>
      
      {user.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No users found. Add a user to get started.
        </div>
      ) : (
        <div className="overflow-auto max-h-[calc(100vh-200px)] pr-2 space-y-2">
          {filteredUsers.map((user) => (
            <div key={user.userId} className='flex justify-between items-center gap-4 border border-gray-300 rounded-md p-3 bg-white hover:bg-gray-50 transition-colors'>
              <div className='flex-1 min-w-0'>
                <h5 className='font-medium text-gray-800 truncate'>{user.name}</h5>
                <p className='text-sm text-gray-600 truncate'>{user.email}</p>
              </div>
              <button 
                className='text-red-500 hover:text-red-700 transition-colors p-1'
                onClick={() => deleteByUserId(user.userId)}
                aria-label="Delete user"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;