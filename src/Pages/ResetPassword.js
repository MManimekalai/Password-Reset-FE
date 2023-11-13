import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
    
      return;
    }
  
    try {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const response = await axios.post(`https://reset-password-rfqh.onrender.com/auth/reset-password?id=${id}&token=${token}`, {
        password,
      });

  
      if (response.data.message === "Password reset successfully") {
        alert('Password reset successfully')
        navigate("/", { replace: true });
      } else {
        console.log("Password reset failed");
        alert('Password reset failed')
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);      
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              className="form-control rounded-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
