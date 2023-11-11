import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/register', { name, email, password });
      Swal.fire('Successfully registered!', '', 'success');
      router.push('/login');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.toString(), 'error');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">Register Your Account</h2>
        <p className="text-center text-sm text-gray-600 mt-4">
          Or{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-700">Sign in to your account</Link>
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="block w-full rounded-md py-3 px-4 mb-3 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            required
            className="block w-full rounded-md py-3 px-4 mb-3 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="block w-full rounded-md py-3 px-4 mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Register;
