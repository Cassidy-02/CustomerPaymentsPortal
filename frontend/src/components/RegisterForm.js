import React, { useState } from 'react';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const nameValidator = (name) => /^[a-zA-Z\s]+$/.test(name);
  const emailValidator = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const passwordValidator = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  const numberValidator = (value) => /^\d+$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameValidator(fullName)) {
      setErrorMessage('Name must contain only letters and spaces.');
      return;
    }

    if (!emailValidator(email)) {
      setErrorMessage('Invalid email address.');
      return;
    }

    if (!numberValidator(idNumber)) {
      setErrorMessage('ID number must contain only digits.');
      return;
    }

    if (!numberValidator(accountNumber)) {
      setErrorMessage('Account number must contain only digits.');
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

    console.log('Registering:', {
      fullName,
      email,
      idNumber,
      accountNumber,
      password,
    });

    setErrorMessage('');
    setSuccessMessage('Registration successful!');
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>ID Number:</label>
        <input
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Account Number:</label>
        <input
          type="text"
          value={accountNumber}
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
