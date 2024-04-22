import React, { useState } from 'react';
import { ReleaseStockAPI } from '../utility/api/item.api';
import './Pages.css';

const ReleaseStocks = () => {

const initialFormData = {
  id: '',
  qty: '',

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
    const res = await ReleaseStockAPI(formData)

    if (res.status == 200) {
      alert('Stock remove successfully');
      setFormData(initialFormData);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit form');
  }
};

  return (
    <div className='main'>
      <h1>ADD ITEMS</h1>
      <form className='form' method='post' onSubmit={handleSubmit}>
        <div>
          <label>Item No:</label><br/>
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label><br/>
          <input type="text" name="qty" value={formData.qty} onChange={handleChange} required />
        </div>
        <button type="submit"className='btn'>REMOVE</button>
      </form>
    </div>
  );
};

export default ReleaseStocks;

