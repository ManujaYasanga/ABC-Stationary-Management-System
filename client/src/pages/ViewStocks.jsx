import React, { useState } from 'react';
import { ViewStocksAPI } from '../utility/api/item.api';
import './Pages.css';

const ViewStocks = () => {

const initialFormData = { id: '' };
const [formData, setFormData] = useState(initialFormData);

const [itemName, setItemName] = useState('');
const [qty, setQty] = useState(undefined);
const [unitPrice, setunitPrice] = useState('');
const [inStock, setInStock] = useState('');


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

    const res = await ViewStocksAPI(formData)

    if (res.status == 200) {
      setItemName(res.data.Item.name);
      setQty(res.data.Item.qty);
      setunitPrice(res.data.Item.unit_price)
      setFormData(initialFormData);

      if (qty == 0 ) {
        setInStock('No');
      }else{
        setInStock('Yes')
      }
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to view');
  }
};

  return (
    <div className='main'>
      <h1>VIEW ITEM</h1>
      <form className='form' method='post' onSubmit={handleSubmit}>
        <div>
          <label>Item No:</label><br/>
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <button type="submit"className='btn'>VIEW</button>
      </form>
      <div>
        <h3>NAME :</h3>
        <p>{itemName}</p>
        <h3>Quantity :</h3>
        <p>{qty}</p>
        <h3>Unit Price :</h3>
        <p>Rs.{unitPrice}</p>
        <h3>In Stock :</h3>
        <p>{inStock}</p>
        {/* <h3>Description :</h3>
        <p>{description}</p> */}
      </div>
    </div>
  );
};

export default ViewStocks;