import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import useAuthContext from '../utility/Context/Auth.Context';
import { UserLoginAPI } from '../utility/api/user.api';
import './Pages.css';

const UserLogin = () => {

    const authContext = useAuthContext();

    const navigate = useNavigate();

    const initialFormData = {
        email: '',
        password: '',
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
            const res = await UserLoginAPI(formData)

            if (res.status == 200 && res.data.token) {
                alert('User Logged Successfully');
                setFormData(initialFormData);
                authContext && authContext.setToken(res.data.token)
                localStorage.setItem("token", res.data.token)
                navigate('/home');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit form');
        }
    };

    const register = () => {navigate('/register')}

    return (
        <div className='main'>
            <div className='logo'>
                <img src={logo} alt='logo' />
            </div>
            <h1>Sign In</h1>
            <form className='form' method='post' onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label><br />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password :</label><br />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className='btn'>Sign In</button>
            </form>
            <p>Haven't an Account? <text onClick={register}>SIGN UP</text></p>
        </div>
    );
};

export default UserLogin;