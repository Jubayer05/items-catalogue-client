import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

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
  );
};

export default Home;
