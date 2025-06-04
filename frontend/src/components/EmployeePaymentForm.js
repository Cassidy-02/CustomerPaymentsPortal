import React, { useState } from "react";

function EmployeePaymentForm() {
  const [form, setForm] = useState({
    payee: "John Doe",
    amount: "1500.00",
    currency: "ZAR",
    SWIFT: "ABCDEF12",
    reason: "Monthly salary",
  });

  const [message, setMessage] = useState("");

  const validate = () => {
    const namePattern = /^[a-zA-Z\s]{2,50}$/;
    const amountPattern = /^\d+(\.\d{1,2})?$/;
    const currencyPattern = /^[A-Z]{3}$/;
    const swiftPattern =  /^[A-Z]{6}[A-Z0-9]{2,5}$/;
    const reasonPattern = /^[\w\s.,'-]{5,100}$/;

    if (
      !namePattern.test(form.payee) ||
      !amountPattern.test(form.amount) ||
      !currencyPattern.test(form.currency) ||
      !swiftPattern.test(form.SWIFT)||
      !reasonPattern.test(form.reason)
    ) {
      setMessage("Please enter valid payment details.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulated API call placeholder
    console.log("Payment submitted:", form);
    setMessage("Payment submitted successfully.");
    setForm({ payee: "", amount: "", currency: "", SWIFT: "", reason: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  return (
    <div>
      <h2>Send Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Payee:</label>
        <input
          name="payee"
          value={form.payee}
          onChange={handleChange}
          required
        />

        <label>Amount:</label>
        <input
          name="amount"
          type="number"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <label>Currency (e.g., USD):</label>
        <input
          name="currency"
          value={form.currency}
          onChange={handleChange}
          required
        />

        <label>SWIFT CODE:</label>
        <input
          name="SWIFT"
          value={form.SWIFT}
          onChange={handleChange}
          required
        />

        <label>Reason:</label>
        <input
          name="reason"
          value={form.reason}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit to SWIFT</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default EmployeePaymentForm;
