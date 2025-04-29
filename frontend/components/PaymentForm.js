import React, { useState } from 'react';

const PaymentForm = () => {
  const [recipient, setRecipient] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateRecipient = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateAccount = (acc) => /^\d{10,16}$/.test(acc);
  const validateAmount = (amt) => !isNaN(amt) && Number(amt) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateRecipient(recipient)) {
      setErrorMessage('Recipient name must contain letters only.');
      return;
    }

    if (!validateAccount(account)) {
      setErrorMessage('Account number must be 10–16 digits.');
      return;
    }

    if (!validateAmount(amount)) {
      setErrorMessage('Amount must be a number greater than 0.');
      return;
    }

    // Simulate API call
    console.log('Payment submitted:', { recipient, account, amount });
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Recipient Name:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Account Number:</label>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;