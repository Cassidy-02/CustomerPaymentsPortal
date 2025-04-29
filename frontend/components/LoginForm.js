import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [accountnumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailValidator = (username) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(username);
  };

  const passwordValidator = (password) => {
    const regex = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!emailValidator(username)) {
      setErrorMessage('Invalid username address');
      return;
    }
    if (!passwordValidator(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one letter and one number');
      return;
    }

    // Simulate API call (you'll replace this with actual backend call)
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful!');
        setUsername('');
        setPassword('');
        setAccountNumber('');
        localStorage.setItem('token', data.token);
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label><br />
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Account Number:</label><br />
        <input
          type="text"
          value={accountnumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
      </div>  
      
      <div>
        <label>Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;