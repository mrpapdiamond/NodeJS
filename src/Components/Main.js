import React from 'react';
import Product from './Product';
import { Grid, Box } from '@material-ui/core';

const Main = (props) => {
  const { products, onAdd } = props;
  return (
    <main className="block col-2">
      <h1 className="center-little-thing">Products</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="scroll"
      >
        {products.map((product) => (
          <Grid item xs={6} md={4} key={product.id}>
            <Box m={1} pt={2}>
              <Product product={product} onAdd={onAdd}></Product>
            </Box>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Main;
