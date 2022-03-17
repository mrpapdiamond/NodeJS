import React, { useState } from 'react';
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
import { Link, useHistory } from 'react-router-dom';

export default function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/signin');
    } catch {
      setError('Failed to log out');
    }
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
        <Grid align='center'>
          <Avatar style={avatarStyle}></Avatar>
          <h2>Profile</h2>
        </Grid>
        {error && (
          <Typography variant='h5' align='center' color='error'>
            {error}
          </Typography>
        )}
        <Box mt={7}>
          <TextField
            label='Email'
            placeholder='Enter Email'
            fullWidth
            required
            type='email'
            name='email'
            value={currentUser.email}
          />
          <Box mt={3} mb={1}>
            <Typography>
              <Link to='/update-profile' color='secondary'>
                Update Profile
              </Link>
            </Typography>
          </Box>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            style={{ margin: '10px 0' }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
