import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <section className="logOut">
      <p>See you soon</p>
      <Link to={'/logout'}>
        <button className="logBackIn" type="button">
          Log back in
        </button>
      </Link>
    </section>
  );
};

export default Logout;
