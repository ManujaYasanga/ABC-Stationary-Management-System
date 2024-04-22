import React, { useState } from 'react';
import { AddItemAPI } from '../utility/api/item.api';
import './Pages.css';

const AddItems = () => {

const initialFormData = {
  id: '',
  name: '',
  qty: '',
  unit_price: '',
  description: '',
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
    const res = await AddItemAPI(formData)

    if (res.status == 200) {
      alert('Form submitted successfully');
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
          <label>Name:</label><br/>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Quantity:</label><br/>
          <input type="text" name="qty" value={formData.qty} onChange={handleChange} required />
        </div>
        <div>
          <label>Unit Price(LKR):</label><br/>
          <input type="text" name="unit_price" value={formData.unit_price} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label><br/>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit"className='btn'>ADD</button>
      </form>
    </div>
  );
};

export default AddItems;