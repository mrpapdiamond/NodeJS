import React from 'react';
import { Box } from '@material-ui/core';
import { PayPalButton } from 'react-paypal-button-v2';

const Basket = (props) => {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <aside
      className='block col-1'
      style={{ height: '625px', overflow: 'auto' }}
    >
      <h2 className='center-little-thing'>Cart Items</h2>
      <div>
        {cartItems.length === 0 && (
          <div className='center-little-thing'>
            <h1>
              <i>Cart is empty</i>
            </h1>
          </div>
        )}
      </div>
      {cartItems.map((item) => (
        <Box p={1} m={2}>
          <div key={item.id} className='row'>
            <div className='col-2'>{item.name}</div>
            <div className='col-2 center-little-thing'>
              <button onClick={() => onAdd(item)} className='add'>
                +
              </button>
              <button onClick={() => onRemove(item)} className='remove'>
                -
              </button>
            </div>
            <div className='col-2 text-right'>
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        </Box>
      ))}
      <>
        {cartItems.length !== 0 && (
          <div>
            <hr></hr>
            <div className='row'>
              <div className='col-2'>Item Price</div>
              <div className='col-1 text-right'>${itemsPrice.toFixed(2)}</div>
            </div>
            <div className='row'>
              <div className='col-2'>Tax Price</div>
              <div className='col-1 text-right'>${taxPrice.toFixed(2)}</div>
            </div>
            <div className='row'>
              <div className='col-2'>Shipping Price</div>
              <div className='col-1 text-right'>
                ${shippingPrice.toFixed(2)}
              </div>
            </div>
            <div className='row'>
              <div className='col-2'>Total Price</div>
              <div className='col-1 text-right'>${totalPrice.toFixed(2)}</div>
            </div>

            <hr />
            <PayPalButton
              options={{
                clientId:
                  'AXLHpeUeZPLYk765IQYienN5jILEDHdrZZ9uXWN8Nu1hH6RPhQDVFHL18ZFakFakHJ4CJ_YilNHRLfau',
                currency: 'USD',
              }}
              amount={totalPrice}
              onSuccess={(details, data) => {
                alert(
                  'Transaction completed by ' + details.payer.name.given_name
                );
                console.log({ details, data });
              }}
            />
          </div>
        )}
      </>
    </aside>
  );
};

export default Basket;
