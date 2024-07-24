import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default NotFoundPage;