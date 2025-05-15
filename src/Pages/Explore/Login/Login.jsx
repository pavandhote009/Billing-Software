import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { login } from '../../../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';

function Login() {
    const {setAuthData}=useContext(AppContext);
   const navigate= useNavigate();
    const [Loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        email: '',
        password: ''
    });

    const onChangeHandler= (e) => {
        const name= e.target.name;
        const value= e.target.value;
        setData((data)=>({...data, [name]: value}));
    }
    const onSubmitHandler= async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

           const response= await login(data)
           if(response.status===200){
            toast.success('Login successful');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            setAuthData(response.data.token, response.data.role);
                navigate('/dashboard');
            // Redirect to dashboard or perform any other action
           }
            
        } catch (error) {
            console.log(error);
            toast.error('Email or password is invalid');
            
        }finally {
            setLoading(false);
        }


    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: 'url(/src/assets/blurred-city-lights.jpg)' }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-96 max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Sign in </h1>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>
        
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
            name='email'
              type="email"
              id="email"
              onChange={onChangeHandler}
              value={data.email}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
            name='password'
              type="password"
              id="password"
                onChange={onChangeHandler}
                value={data.password}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>
          
        
          
          <div>
            <button
              type="submit"
                disabled={Loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
             {Loading ? 'Loading...' : 'Sign in'}
            </button>
          </div>
        </form>
        
       
      </div>
    </div>
  );
}

export default Login;