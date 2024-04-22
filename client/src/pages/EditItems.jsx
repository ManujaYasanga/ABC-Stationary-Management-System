import React, { useState } from 'react';
import { EditItemAPI } from '../utility/api/item.api';
import './Pages.css';

const EditItems = () => {

const initialFormData = {
  id: '',
  name: '',
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

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== '')
    );

    const res = await EditItemAPI(filteredData)

    if (res.status == 200) {
      alert('Form Edited successfully');
      setFormData(initialFormData);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit form');
  }
};

  return (
    <div className='main'>
      <h1>EDIT ITEMS</h1>
      <form className='form' method='post' onSubmit={handleSubmit}>
        <div>
          <label>Item No:</label><br/>
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label><br/>
          <input type="text" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div>
          <label>Unit Price(LKR):</label><br/>
          <input type="text" name="unit_price" value={formData.unit_price} onChange={handleChange}/>
        </div>
        <div>
          <label>Description:</label><br/>
          <textarea name="description" value={formData.description} onChange={handleChange}/>
        </div>
        <button type="submit"className='btn'>EDIT</button>
      </form>
    </div>
  );
};

export default EditItems;