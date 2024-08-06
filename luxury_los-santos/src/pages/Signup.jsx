import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider, prov } from './../firebaseconfig';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import charpic from './../images/GTA-V-Main-Character.jpg';
import './Signup.css';
import gic from './../images/googleicon.svg';
import gitic from './../images/githubicon.svg';
import eyeclosed from './../images/eye.svg';
import eyeopen from './../images/eyeopen.svg';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed up with Google:', user);
      navigate('/');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const result = await signInWithPopup(auth, prov);
      const user = result.user;
      console.log('Signed up with GitHub:', user);
      navigate('/');
    } catch (error) {
      console.error('Error signing up with Github:', error);
    }
  };



  // const handleSignup = async () => {
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch('http://localhost:3000/sign-up', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password, displayName }),
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  
  //       // Assuming the token is included in the response
  //       const { user, token } = data;
  
  //       console.log('Signed up user:', user);
  //       console.log('Generated token:', token);
  
  //       // Store the token in local storage or a cookie
  //       localStorage.setItem('authToken', token);
  
  //       // Navigate to the home page
  //       navigate('/');
  //     } else {
  //       const errorData = await response.json();
  
  //       if (errorData.message === 'Email already in use') {
  //         alert('Account already exists. Please log in.');
  //         navigate('/login'); // Navigate to login page
  //       } else {
  //         alert(errorData.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //     // Optional: Handle network errors or unexpected issues
  //   }
  // };

  // const handleSignup = async () => {
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }
    
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     console.log('Signed up user:', user);
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //     // Display a more specific error message
  //     alert(error.message);
  //   }
  // };

  // const handleSignup = async () => {
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }
  //   // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //   // const user = userCredential.user;
  //   try {
  //     const response = await fetch('http://localhost:3000/sign-up', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password, displayName }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Signed up user:', data.user);
  //       navigate('/');
  //     } else {
  //       const errorData = await response.json();
  //       alert(errorData.message);
  //     }
  //     // console.log('Signed up user:', user);
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };

  // const handleSignup = async () => {
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }
  
  //   try {
  //     // Create user with Firebase Authentication
  //     const userCredential = createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  
  //     // Send user data to your backend
  //     const response = await fetch('http://localhost:3000/sign-up', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password, displayName }),
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Signed up user:', data.user);
  //       navigate('/');
  //     } else {
  //       const errorData = await response.json();
  //       alert(errorData.message);
  //     }
  
  //     console.log('Signed up user:', user);
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };
  
  // const handleSignup = async () => {
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }
  
  //   try {
  //     // Create user with Firebase Authentication
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  
  //     console.log('Firebase user created:', user);
  
  //     // Send user data to your backend
  //     console.log(email);
  //     await sendDataToBackend({ email, password, displayName });
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };
  
  // const sendDataToBackend = async (userDataaa) => {
  //   console.log(userDataaa.email);
  //   try {
  //     const response = await fetch('http://localhost:3000/sign-up', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userDataaa),
  //     });
  
  //     if (response.ok) {
  //       const dataa = await response.json();
  //       console.log('Signed up user:', dataa.user);
  //       navigate('/');
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Error from backend:', errorData);
  //       alert(errorData.message);
  //     }
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      // Create user with Firebase Authentication
      const userCredential = createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send user data to your backend
      const response = await fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, displayName }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Signed up user:', data.user);
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
  
      console.log('Signed up user:', user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };


  return (
<div className='cont'>
      <div className='image'>
        <img src={charpic} alt="Game Character" />
      </div>
      <div className='form'>
        <div className='logintxt'>
          <p style={{color:'white', fontSize:'14px'}}>Have an Account?</p>
          <p style={{color:'#B4EDC0', fontFamily:'14px'}}>&nbsp;<Link to="/login" style={{ textDecoration: 'none', color: '#B4EDC0' }}>Sign In!</Link></p>
        </div>
        <h1 style={{color:'white', fontWeight:'500', fontSize:'24px', marginTop:'100px'}}>Get Started With Your Account</h1>
        <p style={{marginTop:'-15px', color:'#7E7E7E', marginBottom:'35px'}}>Getting Started is Easy</p>
        <div className='options'>
          <div className='rectt'>
            <div className='btn' onClick={handleGoogleSignup}>
              <img src={gic} alt="Google Icon" />
              <h5>Google</h5>
            </div>
          </div>
          <div className='rectt'>
            <div className='btn' onClick={handleGithubSignup}>
              <img src={gitic} alt="Github Icon" />
              <h5>Github</h5>
            </div>
          </div>
        </div>
        <div className='fkuc'>
          <hr/>
          <h6 style={{color:'white'}}>Or Continue With</h6>
          <hr/>
        </div>
        <div className='puts'>
          <div className='name'>
            <input 
              type='text' 
              placeholder='Full Name'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />  
          </div>
          <div className='name'>
            <input 
              type='email' 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />  
          </div>
          <div className='password'>
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />  
            <img 
              src={passwordVisible ? eyeopen : eyeclosed} 
              alt="Toggle Password Visibility" 
              className='eye-icon'
              onClick={togglePasswordVisibility} 
            />
          </div>
          <div className='password'>
            <input 
              type={confirmPasswordVisible ? 'text' : 'password'} 
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />  
            <img 
              src={confirmPasswordVisible ? eyeopen : eyeclosed} 
              alt="Toggle Confirm Password Visibility" 
              className='eye-icon'
              onClick={toggleConfirmPasswordVisibility} 
            />
          </div>
          <div className='password'>
            <button className='button' onClick={handleSignup}>
              <h2 style={{fontWeight: '200'}}>Create Account</h2>
            </button>
          </div>
        </div>
        <p style={{color:'#7E7D7D', marginTop:'10px', fontWeight:'200'}}>By continuing you indicate that you read and agreed to the Terms of Use</p>
      </div>
    </div>

  );
};

export default Signup;
