import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <nav className="bg-gray-800 text-white py-6 px-4 sm:px-10 w-full">
        <div className="flex justify-between items-center flex-wrap">
          {/* Logo/Title */}
          <Link to='' className="text-3xl sm:text-4xl font-bold sm:mb-0">News Today</Link>
          
          {/* Navigation and Info */}
          <nav className="text-center sm:text-left">
            <p className='font-semibold md:text-xl text-sm'>Know The Biggest News Before Anybody Else</p>
          </nav>

          {/* Add New Article Button */}
          <Link
            to='/newarticle'
            className='bg-white text-gray-800 p-2 text-lg rounded-xl '>
            Add New Article
          </Link>
        </div>
      </nav>

      <body className='bg-gray-200'>
        <Outlet />
      </body>

      <footer className='bg-gray-800 text-white py-4 px-4 sm:px-10 mt-10'>
        <p className='text-center text-md md:text-xl'>© {new Date().getFullYear()} News Today App</p>
      </footer>
    </>
  );
};

export default MainLayout;
