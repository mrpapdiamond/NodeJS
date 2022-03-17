import React, { useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import { Box } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  const paperStyle = {
    padding: 30,
    height: '60vh',
    width: 400,
    margin: '40px auto',
  };
  return (
    <>
      <Grid container>
        <Paper elevation={10} style={paperStyle}>
          <Box mt={3} mb={3}>
            <Grid align='center'>
              <Avatar style={{ backgroundColor: '#154c79' }}></Avatar>
              <h2 style={{ margin: 0 }}>Sign Up</h2>
              <Typography variant='subtitle2'>
                Please fill this form to register an account
              </Typography>

              <Box mt={2}>
                {error && (
                  <Typography variant='h5' align='center' color='error'>
                    {error}
                  </Typography>
                )}
                <div>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      type='email'
                      label='Email'
                      placeholder='Enter your email'
                      name='email'
                      inputRef={emailRef}
                      required
                    />

                    <TextField
                      fullWidth
                      type='password'
                      label='Password'
                      placeholder='Enter your password'
                      name='password'
                      inputRef={passwordRef}
                      required
                    />
                    <TextField
                      fullWidth
                      type='password'
                      label='Confirm Password'
                      placeholder='Enter your confirm password'
                      name='confirmPassword'
                      inputRef={passwordConfirmRef}
                      required
                    />
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      fullWidth
                      style={{ margin: '12px 0' }}
                      disabled={loading}
                    >
                      Sign Up
                    </Button>
                  </form>
                </div>
                <div>
                  <Typography>
                    Already have an account?
                    <Link to='/signin' color='secondary'>
                      {' '}
                      Sign in
                    </Link>
                  </Typography>
                </div>
              </Box>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
