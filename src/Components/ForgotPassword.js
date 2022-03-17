import React, { useRef, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  Avatar,
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
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
            <h2>Password Reset</h2>
          </Grid>
          {error && (
            <Typography variant='h5' align='center' color='error'>
              {error}
            </Typography>
          )}

          {message && (
            <Typography variant='h6' align='center' style={{ color: 'blue' }}>
              {message}
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
            <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
              style={{ margin: '10px 0' }}
              disabled={loading}
            >
              Reset Password
            </Button>
          </form>
        </div>
        <div>
          <Typography>
            <Link to='/signin' color='secondary'>
              Login
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
      </Paper>
    </Grid>
  );
}
