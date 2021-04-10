/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase/app';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from './Input';
import './Auth.css';
import IconGoogle from './Icon';
import { googleProvider } from '../../firebase';
import { signup, signin } from '../../actions/auth';

const initializeState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const Auth = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initializeState);
  const history = useHistory();

  const handleChange = (e) => {
    formData[e.target.name] = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchForm = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
    setFormData(initializeState);
  };

  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((response) => {
        const { credential, user } = response;
        const result = {
          name: user.displayName,
          photoUrl: user.photoURL,
          email: user.email,
          googleId: response.additionalUserInfo.profile.id,
        };
        dispatch({
          type: 'AUTH',
          data: {
            accessToken: credential.accessToken,
            token: credential.idToken,
            result,
          },
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={3}>
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  register
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  register
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
              fromValue={formData.email}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            {isSignUp ? 'Sign Up' : 'sign in'}
          </Button>

          <Button
            className="google-button"
            onClick={googleSignIn}
            color="primary"
            fullWidth
            variant="contained"
            startIcon={<IconGoogle />}
          >
            Google Sign In
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchForm}>
                {isSignUp
                  ? 'Already have an account? Signin'
                  : "Don't have an account? signup"}
              </Button>
            </Grid>
          </Grid>

          {/* TODO: Remove Later */}
        </form>
      </Paper>
      {/* TODO: Remove Later */}
    </Container>
  );
};

export default Auth;
