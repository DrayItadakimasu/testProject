import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// sections
import MainRoutes from './routes/main';

function Router() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

export default Router;
