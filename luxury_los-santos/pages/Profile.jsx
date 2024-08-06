import React, { useState, useEffect } from 'react';
import { auth } from './../firebaseconfig'; // Adjust the path if needed
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import './Profile.css';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, []);

  const handleSaveChanges = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        if (displayName !== user.displayName) {
          await updateProfile(user, { displayName });
        }

        if (email !== user.email) {
          await updateEmail(user, email);
        }

        if (password && password === confirmPassword) {
          // Re-authenticate before changing the password
          const credential = EmailAuthProvider.credential(user.email, currentPassword);
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, password);
        }
      } catch (error) {
        console.error('Error updating profile:', error.message);
      }
    }
  };

  return (
    <div className="profilepagebro">
      <div className='screenprf'>
      <div className='accountLinks'>
      <h2>Manage My Account</h2>
      <ul>
        <li>
          <NavLink to="/profile" activeClassName="active-link">My Profile</NavLink>
        </li>
        <li>
          <NavLink to="/payment-options" activeClassName="active-link">My Payment Options</NavLink>
        </li>
      </ul>
      <h2>My Orders</h2>
      <ul>
        <li>
          <NavLink to="/order-history" activeClassName="active-link">Order History</NavLink>
        </li>
      </ul>
      <h2>Sell A Product</h2>
      <ul>
        <li>
          <NavLink to="/upload-product" activeClassName="active-link">Upload Now</NavLink>
        </li>
      </ul>
    </div>
        <div className='manageprof'>
          <div className='profwrap'>
          <h1>Edit Your Profile</h1>
          <div className='namess'>
            <div className='dispn'>
              <h5>Display Name</h5>
              <input 
                type='text' 
                placeholder='user.displayName'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />  
            </div>
            <div className='dispmail'>
            <h5>Email</h5>
              <input 
                type='email' 
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />  
            </div>
          </div>
          <div className='resetpasswords'>
            <h5>Password Changes</h5>
            <div className='ogpassword'>
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                placeholder='Current Password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />  
            </div>
            <div className='ogpassword'>
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                placeholder='New Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />  
            </div>
            <div className='ogpassword'>
              <input 
                type={confirmPasswordVisible ? 'text' : 'password'} 
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />  
            </div>
          </div>
          <div className='cnfrej'>
          <div className='cancelbtn' style={{color:'#000'}}>Cancel</div>
          <div className='savebtn' onClick={handleSaveChanges} style={{color:'white'}}>Save Changes</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
