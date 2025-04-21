import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ fetchUsers, editingUser, setEditingUser, users }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        email: editingUser.email,
        age: editingUser.age,
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      age: formData.age,
    };
    
    console.log('Form Data to be sent:', userData); 
  
    try {
      if (editingUser) {
        await axios.put(`https://postgresusermanagement-2.onrender.com/api/users/${editingUser.id}`, userData);
        setEditingUser(null);
      } else {
        await axios.post('https://postgresusermanagement-2.onrender.com/api/users', userData);
      }
  
      setFormData({ firstName: '', lastName: '', email: '', age: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };
  

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default UserForm;
