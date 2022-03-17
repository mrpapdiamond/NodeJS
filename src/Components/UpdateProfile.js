import React, { useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const paperStyle = {
    padding: 30,
    height: '60vh',
    width: 400,
    margin: '40px auto',
  };
  return (
    // <>
    //   <Card>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Update Profile</h2>
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group id="email">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control
    //             type="email"
    //             ref={emailRef}
    //             required
    //             defaultValue={currentUser.email}
    //           />
    //         </Form.Group>
    //         <Form.Group id="password">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control
    //             type="password"
    //             ref={passwordRef}
    //             placeholder="Leave blank to keep the same"
    //           />
    //         </Form.Group>
    //         <Form.Group id="password-confirm">
    //           <Form.Label>Password Confirmation</Form.Label>
    //           <Form.Control
    //             type="password"
    //             ref={passwordConfirmRef}
    //             placeholder="Leave blank to keep the same"
    //           />
    //         </Form.Group>
    //         <Button disabled={loading} className="w-100" type="submit">
    //           Update
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     <Link to="/">Cancel</Link>
    //   </div>
    // </>

    <>
      <Grid container>
        <Paper elevation={10} style={paperStyle}>
          <Box mt={3} mb={3}>
            <Grid align='center'>
              <Avatar style={{ backgroundColor: '#154c79' }}></Avatar>
              <h2 style={{ marginTop: 10 }}>Update Profile</h2>

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
                      defaultValue={currentUser.email}
                    />

                    <TextField
                      fullWidth
                      type='password'
                      label='Password'
                      placeholder='Leave blank to keep the same'
                      name='password'
                      inputRef={passwordRef}
                    />
                    <TextField
                      fullWidth
                      type='password'
                      label='Confirm Password'
                      placeholder='Leave blank to keep the same'
                      name='confirmPassword'
                      inputRef={passwordConfirmRef}
                    />
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      fullWidth
                      style={{ margin: '12px 0' }}
                      disabled={loading}
                    >
                      Update
                    </Button>
                  </form>
                </div>
                <div>
                  <Typography>
                    <Link to='/'>Cancel</Link>
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
