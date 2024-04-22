import React, { useState } from 'react';
import { RemoveItemAPI } from '../utility/api/item.api';
import './Pages.css';

const RemoveItems = () => {

const initialFormData = {
  id: '',
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
    const res = await RemoveItemAPI(formData)

    if (res.status == 200) {
      alert(`${res.data.deletedItem.name} Removed Successfully`);
      setFormData(initialFormData);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit form');
  }
};

  return (
    <div className='main'>
      <h1>REMOVE ITEMS</h1>
      <form className='form' method='post' onSubmit={handleSubmit}>
        <div>
          <label>Item No:</label><br/>
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <button type="submit"className='btn'>Remove</button>
      </form>
    </div>
  );
};

export default RemoveItems;






