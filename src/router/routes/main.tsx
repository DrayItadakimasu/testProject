import React from 'react';
import { Route, Routes } from 'react-router-dom';
// layout
import DefaultLayout from '../../layouts/default';
// pages
import Home from '../../pages/Home';

function MainRoutes() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </DefaultLayout>
  );
}

export default MainRoutes;
