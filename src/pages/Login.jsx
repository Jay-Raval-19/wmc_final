import React, { useState } from 'react';
import './Login.css';
import bg from './../images/gtabg.png';
import six from './../images/sixicon.svg';
import gic from './../images/googleicon.svg';
import gitic from './../images/githubicon.svg';
import eyeclosed from './../images/eye.svg';
import eyeopen from './../images/eyeopen.svg';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider, prov } from './../firebaseconfig';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false); // State for animation
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    width: 400,
    height: 55,
    color: 'white',
    fontWeight: 100,
    marginLeft: '20px',
    border: '1px solid #CF6363',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'background-color 0.5s, color 0.5s', // Increased duration
    '&:hover': {
      backgroundColor: 'rgba(207, 99, 99, 0.5)',
      color: 'white',
    },
  }));

  const handleLogin = async (e) => {
    setAnchorEl(e.currentTarget);
    setLoggingIn(true); // Start fade-out animation

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      navigate('/loading1');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('Account does not exist. Please sign up instead.');
      } else {
        setError('Error logging in. Please try again.');
      }
      console.error('Error logging in:', error);
    } finally {
      // Simulate a delay to see the animation effect
      setTimeout(() => {
        setLoggingIn(false); // Reset animation state
      }, 8000); // Adjust delay as needed
    }
  };

// const handleLogin = async (e) => {
//   e.preventDefault();
//   setAnchorEl(e.currentTarget);
//   setLoggingIn(true); // Start fade-out animation

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     console.log('Logged in user:', user);
//     navigate('/loading1');
//   } catch (error) {
//     if (error.code === 'auth/wrong-password') {
//       setError('Incorrect password. Please try again.');
//     } else if (error.code === 'auth/user-not-found') {
//       setError('Account does not exist. Please sign up instead.');
//     } else {
//       setError('Error logging in. Please try again.');
//     }
//   } finally {
//     // Simulate a delay to see the animation effect
//     setTimeout(() => {
//       setLoggingIn(false); // Reset animation state
//     }, 8000); // Adjust delay as needed
//   }
// };

  
  const handleGoogleLogin = async (e) => {
    setAnchorEl(e.currentTarget);
    setLoggingIn(true); // Start fade-out animation

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in with Google:', user);
      navigate('/loading1');
    } catch (error) {
      setError('Error logging in with Google. Please try again.');
      setAnchorEl(e.currentTarget);
      console.error('Error logging in with Google:', error);
    } finally {
      // Simulate a delay to see the animation effect
      setTimeout(() => {
        setLoggingIn(false); // Reset animation state
      }, 8000); // Adjust delay as needed
    }
  };

  const handleGithubLogin = async (e) => {
    setAnchorEl(e.currentTarget);
    setLoggingIn(true); // Start fade-out animation

    try {
      const result = await signInWithPopup(auth, prov);
      const user = result.user;
      console.log('Logged in with GitHub:', user);
      navigate('/loading1');
    } catch (error) {
      setError('Error logging in with GitHub. Please try again.');
      setAnchorEl(e.currentTarget);
      console.error('Error logging in with GitHub:', error);
    } finally {
      // Simulate a delay to see the animation effect
      setTimeout(() => {
        setLoggingIn(false); // Reset animation state
      }, 8000); // Adjust delay as needed
    }
  };

  const id = error ? 'error-popper' : undefined;
  const open = Boolean(error);

  return (
    <div>
      <div className={`log ${loggingIn ? 'fade-out' : ''}`}>
        <img src={bg} alt="background"/>
      </div>
      <div className={`content ${loggingIn ? 'fade-out' : ''}`}>
        <div className={`six ${loggingIn ? 'fade-out' : ''}`}>
          <img src={six} alt="Six Icon"/>
        </div>
        <div className={`txt ${loggingIn ? 'fade-out' : ''}`}>
          <h1 style={{fontWeight:'600',fontSize:'36px'}}>Welcome Back</h1>
          <p style={{fontWeight:'300',fontSize:'18px', marginTop:'-3px'}}>Login into your account</p>
        </div>
        <div className={`kkk ${loggingIn ? 'fade-out' : ''}`}>
          <div className={`ops ${loggingIn ? 'fade-out' : ''}`}>
            <div className={`recttt ${loggingIn ? 'fade-out' : ''}`}>
              <div className={`btn ${loggingIn ? 'fade-out' : ''}`} onClick={handleGoogleLogin}>
                <img src={gic} alt="Google Icon" />
                <h5>Google</h5>
              </div>
            </div>
            <div className={`recttt ${loggingIn ? 'fade-out' : ''}`}>
              <div className={`btn ${loggingIn ? 'fade-out' : ''}`} onClick={handleGithubLogin}>
                <img src={gitic} alt="Github Icon" />
                <h5>Github</h5>
              </div>
            </div>
          </div>
          <div className={`fkuc ${loggingIn ? 'fade-out' : ''}`}>
            <hr/>
            <h6 style={{color:'white'}}>Or Continue With</h6>
            <hr/>
          </div>
          {error && (
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                {error} <br />
                {error === 'Incorrect password. Please try again.' && (
                  <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#FF380D' }}>Forgot Password?</Link>
                )}
              </Box>
            </Popper>
          )}
          <div className={`name ${loggingIn ? 'fade-out' : ''}`}>
            <input 
              type='email' 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`password ${loggingIn ? 'fade-out' : ''}`}>
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
          <div className={`btns ${loggingIn ? 'fade-out' : ''}`}>
            <FormControlLabel control={<Android12Switch defaultChecked />} label="Remember Me"/>
            <p style={{fontSize:'15px'}}><Link to="/signup" style={{ textDecoration: 'none', color: '#FF380D' }}>Sign Up ?</Link></p>
          </div>
          <StyledButton onClick={handleLogin}>
            <h2>Log In</h2>
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
