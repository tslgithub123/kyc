import React from 'react';
import { useForm } from '../../hooks/useForm';

function LoginForm({ onSubmit, isLoading, error }) {
  const { values, handleChange } = useForm({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && (
        <div style={{ color: 'red' }}>{error.message}</div>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
