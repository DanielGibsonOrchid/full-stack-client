import React from 'react';
import { Link } from 'react-router-dom';

/* Authentication error page */
const Forbidden = () => {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Sorry, you don't have user access to this page</p>
      <Link className="button button-secondary" to="/">Back Home</Link>
    </div>
  )
}

export default Forbidden;