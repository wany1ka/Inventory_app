import React, { useState } from 'react';
import '../styles/Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '', 
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (response.status === 201) {
          setSuccess(true);
        }
      } else {
        const errorData = await response.json();
        setError(errorData);
      }
    } catch (error) {
      setError('Error occurred');
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="register-container">
      <h2 className='font-bold text-lg'>Register</h2>
      {success ? (
        <p>Registration successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required />
          </div>
          {error && (
            <div className="error">
              {typeof error === 'string' ? (
                <p>{error}</p>
              ) : (
                Object.keys(error).map((key) => (
                  <p key={key}>{`${key}: ${error[key]}`}</p>
                ))
              )}
            </div>
          )}
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
