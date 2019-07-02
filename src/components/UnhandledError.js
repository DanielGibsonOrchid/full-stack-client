import React from 'react';
import { Link } from 'react-router-dom';

/* 500 error page */
const unhandledError = () => {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <Link className="button button-secondary" to="/">Back Home</Link>
    </div>
  )
}

export default unhandledError;