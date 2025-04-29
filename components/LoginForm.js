import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailValidator = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const passwordValidator = (password) => {
    const regex = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!emailValidator(email)) {
      setErrorMessage('Invalid email address');
      return;
    }
    if (!passwordValidator(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one letter and one number');
      return;
    }

    // Simulate API call (you'll replace this with actual backend call)
    try {
      console.log('Sending login request:', { email, password });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccessMessage('Login successful!');
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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