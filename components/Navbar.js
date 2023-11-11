import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('token'));
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">BukuGratis</span>
      </div>
      <div className="text-sm lg:flex-grow">
        <Link href="/" className="text-teal-100 hover:text-white mr-4">Home</Link>
        {isLoggedIn && <Link href="/books/create" className="text-teal-100 hover:text-white mr-4">Add Book</Link>}
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={() => {
              Cookies.remove('token');
              window.location.reload();
            }}
            className="text-sm px-4 py-2 border rounded text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:text-gray-800"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="text-sm px-4 py-2 border rounded text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:text-gray-800"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
