import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import items from '../../images/items-catalogue.jpg';
import Form from '../Form/Form';
import './Home.css';
import { getItems } from '../../actions/itemsAction';
import ItemsComp from '../ItemsComp/ItemsComp';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [currentId, dispatch]);

  return (
    <Container className="container" maxWidth="lg">
      <AppBar className="appBar" position="static" color="inherit">
        <Typography className="heading" variant="h2" align="center">
          Items Catalogue
        </Typography>
        <img className="image" src={items} alt="" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className="grid__container" spacing={2}>
            <Grid item xs={12} md={8}>
              <ItemsComp setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
