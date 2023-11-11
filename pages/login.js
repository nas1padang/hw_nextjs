import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/login', { email, password });
      Cookies.set('token', res.data.token);
      Swal.fire('Successfully login!', '', 'success');
      router.push('/');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.toString(), 'error');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">Sign In to Your Account</h2>
        <p className="text-center text-sm text-gray-600 mt-4">
          Or{' '}
          <Link href="/register" className="text-green-500 hover:text-green-700">Register your account</Link>
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            required
            className="block w-full rounded-md py-3 px-4 mb-3 bg-gray-50 border border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            required
            className="block w-full rounded-md py-3 px-4 mb-4 bg-gray-50 border border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full rounded-md bg-green-600 py-2 px-4 text-white hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
