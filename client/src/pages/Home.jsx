import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../utility/api/user.api'; // Assuming this is the function to get user data
import useAuthContext from '../utility/Context/Auth.Context';

export default function Home() {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const [user, setUser] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const res = await getUserData(token); // Send token to the server to get user data
        setUser({username: res.data.user.username, email: res.data.user.email});
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally, handle error (e.g., redirect to login page)
        navigate('/login');
      }
    }

    getData();
  }, []);

  const addStocks = () => {
    navigate('/add-stocks');
  };

  const viewStocks = () => {
    navigate('/view-stocks');
  };

  const releaseStocks = () => {
    navigate('/release-stocks');
  };

  const addItems = () => {
    navigate('/add-items');
  };

  const editItems = () => {
    navigate('/edit-items');
  };

  const removeItems = () => {
    navigate('/remove-items');
  };

  return (
    <div>
      <div>{user.username || 'Username'}</div>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <div className='options'>
        <div className='options-row-1'>
          <button className='lg_btn' onClick={addStocks}>Add Stocks</button>
          <button className='lg_btn' onClick={viewStocks}>View Stocks</button>
          <button className='lg_btn' onClick={releaseStocks}>Release Stocks</button>
        </div>
        <div className='options-row-2'>
          <button className='lg_btn' onClick={addItems}>Add Items</button>
          <button className='lg_btn' onClick={editItems}>Edit Items</button>
          <button className='lg_btn' onClick={removeItems}>Remove Items</button>
        </div>
      </div>
    </div>
  );
}
