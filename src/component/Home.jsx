import React from 'react';
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <div className='w-full p-3 bg-green-600 flex flex-row justify-between item-center'>
            <div className="w-1/3 ml-10">
                <div className='text-white text-xl font-bold'>CRUD APP</div> 
            </div>
            <ul className="w-52 mr-10 flex flex-row justify-between items-center">
                <li><Link to="/users" className='text-base font-bold text-white'>Users</Link></li>
                <li><Link to="/account" className='text-base font-bold text-white'>My Account</Link></li>
            </ul>
        </div>
        <Outlet />
    </div>
  )
}

export default Home