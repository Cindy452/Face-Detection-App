import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('signout')}
          className='f4 no-underline pa3 mr3 dim bg-red white pointer'
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('signin')}
          className='f4 no-underline pa3 mr3 dim bg-blue white pointer'
        >
          Signin
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className='f4 no-underline pa3 mr3 dim bg-purple white pointer'
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;