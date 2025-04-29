import React, { useState } from 'react';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [idnumber, setIdNumber] = useState('');
  const [accountnumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const nameValidator = (name) => /^[a-zA-Z\s]+$/.test(name);
  const usernameValidator = (username) => /^[a-zA-Z0-9]+$/.test(username);
  const idNumberValidator = (idnumber) => /^\d{8}$/.test(idnumber);
  const accountNumberValidator = (accountnumber) => /^\d{10}$/.test(accountnumber);
  const emailValidator = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const passwordValidator = (password) =>
    /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameValidator(fullName)) {
      setErrorMessage('Name must contain only letters and spaces.');
      return;
    }

    if (!usernameValidator(username)) {
      setErrorMessage('Invalid email address.');
      return;
    }

    if (!idNumberValidator(idnumber)) {
      setErrorMessage('ID number must be 8 digits long.');
      return;
    }

    if (!accountNumberValidator(accountnumber)) {
      setErrorMessage('Account number must be 10 digits long.');
      return;
    }

    if (!passwordValidator(password)) {
      setErrorMessage('Password must be at least 8 characters and include a letter and a number.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email: username,
          password,
          idnumber,
          accountnumber
        })
      });

      if (response.ok) {
        setSuccessMessage('Registration successful!');
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Registration failed.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred during registration.');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>ID Number:</label>
        <input
          type="text"
          value={idnumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Account Number:</label>
        <input
          type="text"
          value={accountnumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
