import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup; 