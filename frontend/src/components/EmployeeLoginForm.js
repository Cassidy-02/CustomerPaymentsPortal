import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // RegEx whitelist patterns
  const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
  const passwordPattern = /^[a-zA-Z0-9@#$%^&+=]{6,20}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs with whitelist RegEx
    if (!usernamePattern.test(username)) {
      setError('Username must be 3–20 letters or numbers only.');
      return;
    }

    if (!passwordPattern.test(password)) {
      setError('Password must be 6–20 valid characters (letters, numbers, @#$%^&+=).');
      return;
    }

    // Dummy login check
    if (username === 'employee' && password === 'secure123') {
      navigate('/employee-dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default EmployeeLoginForm;

