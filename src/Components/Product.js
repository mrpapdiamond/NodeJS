import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.image}
          title={product.name}
          height={200}
        ></CardMedia>
        <CardContent>
          <Typography variant="h6" align="center">
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onAdd(product)}
        >
          <AddShoppingCartIcon /> Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
