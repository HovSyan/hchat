import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App';
import { LoaderFunctionArgs, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Login from './components/login/Login';
import Error from './components/error/Error';
import networkHealthcheckService from './services/network-healthcheck.service';

const router = createBrowserRouter([
    {
        path: '/',
        loader,
        element: <App />
    },
    {
        path: '/login',
        loader,
        element: <Login />
    },
    {
        path: '/error',
        loader,
        element: <Error />
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

function loader(args: LoaderFunctionArgs) {
    return networkHealthcheckService.ping().then(result => {
        const isErrorPage = args.request.url.endsWith('/error');

        console.log(result, args.request.url);

        if (result && isErrorPage) {
            return redirect('/');
        }

        if (!result && !isErrorPage) {
            return redirect('/error');
        }

        return null;
    });
}