/* eslint-disable no-undef */
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './Navbar.css';
import logo from '../../images/items-catalogue.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  return (
    <AppBar className="appBar" position="static" color="inherit">
      <div className="brandContainer">
        <Typography
          component={Link}
          to="/"
          className="heading"
          variant="h4"
          align="center"
        >
          Items Catalogue
        </Typography>
        <img className="image" src={logo} alt="" height="60" />
      </div>
      <Toolbar className="toolbar">
        {user ? (
          <div className="profile">
            <Avatar
              className="purple"
              alt={user?.result.name}
              src={
                user?.result.photoUrl
                  ? user?.result.photoUrl
                  : user?.result.name
              }
            />
            <Typography className="userName" variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className="button__secondary"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            color="primary"
            variant="contained"
            onClick={() => {}}
          >
            Login
          </Button>
        )}
        <Button
          style={{ marginLeft: '10px' }}
          component={Link}
          to="/tools"
          color="primary"
          variant="contained"
        >
          Tools
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
