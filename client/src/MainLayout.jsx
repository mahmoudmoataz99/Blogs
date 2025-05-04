import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav 
        aria-label="Main navigation" 
        className="bg-gray-800 text-white py-6 px-4 sm:px-10 w-full"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Link 
            to="/" 
            className="text-3xl sm:text-4xl font-bold hover:text-gray-300 transition-colors"
            aria-label="News Today homepage"
          >
            News Today
          </Link>
          
          <div className="text-center sm:text-left">
            <p className='font-semibold md:text-xl text-sm'>
              Know The Biggest News Before Anybody Else
            </p>
          </div>

          <Link
            to='/newarticle'
            className='bg-white text-gray-800 p-2 text-lg rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            aria-label="Add new article"
          >
            Add New Article
          </Link>
        </div>
      </nav>

      <main className='bg-gray-200 flex-grow'>
        <Outlet />
      </main>

      <footer className='bg-gray-800 text-white py-4 px-4 sm:px-10'>
        <p className='text-center text-md md:text-xl'>
          © {new Date().getFullYear()} News Today App
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;