import React, { useEffect } from 'react'
import Userform from '../../Components/UserForm/Userform'
import UserList from '../../Components/UserList/UserList'
import { fetchUsers } from '../../Service/UserService';
import toast from 'react-hot-toast';

function ManageUsers() {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]); // Initialize as empty array

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        
        setUsers(response.data ); // Ensure we always set an array
        console.log("this  is from manageusers",response.data);
      } catch (error) {
        console.error(error);
        toast.error('Unable to fetch users');
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [])

  return (
    <div className="flex flex-col h-screen bg-slate-800 lg:flex-row gap-4 p-4">
      {/* Left Column - 70% on large screens */}
      <div className="w-full lg:w-[70%] bg-slate-800 border-1 border-gray-200 text-white p-4 rounded">
        <Userform setUser={setUsers} />
      </div>

      {/* Right Column - 30% on large screens */}
      <div className="w-full lg:w-[30%] bg-slate-800 border-1 border-gray-200 text-white p-4 rounded">
        {loading ? (
          <div className="text-center text-white">Loading users...</div>
        ) : (
          <UserList user={users} setUser={setUsers} />
        )}
      </div>
    </div>
  )
}

export default ManageUsers