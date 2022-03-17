import React, { useRef, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  Avatar,
} from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { auth, googleProvider } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        history.push('/');
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
        setError('Failed to log in');
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  const paperStyle = {
    padding: 30,
    height: '60vh',
    width: 400,
    margin: '40px auto',
  };

  const avatarStyle = {
    backgroundColor: '#154c79',
  };

  return (
    <Grid container>
      <Paper elevation={10} style={paperStyle}>
        <Box pt={3} mt={3}>
          <Grid align='center'>
            <Avatar style={avatarStyle}></Avatar>
            <h2>Sign In</h2>
          </Grid>
          {error && (
            <Typography variant='h5' align='center' color='error'>
              {error}
            </Typography>
          )}
        </Box>

        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Email'
              placeholder='Enter Email'
              fullWidth
              required
              type='email'
              name='email'
              inputRef={emailRef}
            />
            <TextField
              label='Password'
              placeholder='Enter Password'
              fullWidth
              required
              type='password'
              inputRef={passwordRef}
            />
            <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
              style={{ margin: '10px 0' }}
              disabled={loading}
            >
              Sign in
            </Button>
          </form>
        </div>
        <div>
          <Typography>
            <Link to='/forgot-password' color='secondary'>
              Forgot password ?
            </Link>
          </Typography>
          <Typography>
            Don't have account ?
            <Link to='signup' color='secondary'>
              {' '}
              Sign up
            </Link>
          </Typography>
        </div>
        <div>
          <Button
            variant='contained'
            fullWidth
            style={{ margin: '10px 0' }}
            onClick={signInWithGoogle}
          >
            <span
              style={{
                fontSize: '20px',
                color: '#3f51b5',
                marginRight: '10px',
              }}
            >
              <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
            </span>
            <Typography>Sign in with google</Typography>
          </Button>
        </div>
        {/* <div>
          <Button
            variant='contained'
            fullWidth
            style={{ margin: '10px 0' }}
            onClick={signInWithGithub}
          >
            <span
              style={{
                fontSize: '20px',
                color: '#3f51b5',
                marginRight: '20px',
              }}
            >
              <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
            </span>
            <Typography>Sign in with github</Typography>
          </Button>
        </div> */}
      </Paper>
    </Grid>
  );
}
