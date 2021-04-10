/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import './ItemsComp.css';
import Item from './Item/Item';

const ItemsComp = ({ setCurrentId }) => {
  const items = useSelector((state) => state.items);

  return !items.length ? (
    <CircularProgress style={{ color: '#ffffff' }} />
  ) : (
    <Grid className="container" container alignItems="stretch" spacing={3}>
      {items.map((item) => (
        <Grid item key={item._id} xs={12} sm={6}>
          <Item setCurrentId={setCurrentId} item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsComp;
