import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'; // Correct import paths
import './index.css';
import App from './pages/App.jsx';
import View from './pages/View';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/view/:id',
    element: <View />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
