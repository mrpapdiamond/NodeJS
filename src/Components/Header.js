import React from 'react';

const Header = (props) => {
  const { countCartItems } = props;
  return (
    <header className="row block center">
      <div>
        <a href="/">
          <h1>Let's go shopping </h1>
        </a>
      </div>
      <div class="row">
        <a href="/" style={{ pointerEvents: 'none' }}>
          <h1>
            Cart{' '}
            {countCartItems ? (
              <button className="badge">{countCartItems}</button>
            ) : (
              ''
            )}
          </h1>
        </a>{' '}
        <a href="/profile">
          <h1>Profile</h1>
        </a>
      </div>
    </header>
  );
};

export default Header;
