import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRegisterAPI } from '../utility/api/user.api';
import logo from '../assets/logo.png'
import './Pages.css';

const UserRegister = () => {

  const navigate = useNavigate();

  const initialFormData = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password === formData.confirmPassword) {
        const res = await UserRegisterAPI(formData)

        if (res.status == 200) {
          alert('User Registered Successfully');
          setFormData(initialFormData);
          navigate('/home');
        }
      } else {
        alert('Your Password and Confirm Password are not matched');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form');
    }
  };

  const login = () => { navigate('/') }

  return (
    <div className='main'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <h1>Sign Up</h1>
      <form className='form' method='post' onSubmit={handleSubmit}>
        <div>
          <label>Username :</label><br />
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password :</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password :</label><br />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit" className='btn'>Sign Up</button>
      </form>
      <p>Already have an Account? <text onClick={login}>SIGN IN</text></p>
    </div>
  );
};

export default UserRegister;