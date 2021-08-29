import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="center">
    <h1>404 - Not Found!</h1>
    <Link to="/">Go to the Landing Page!</Link>
  </div>
);

export default NotFound;
