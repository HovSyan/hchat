import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.Fragment>
        <RouterProvider router={router} />
    </React.Fragment>,
);
