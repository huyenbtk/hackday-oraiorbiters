import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import Swap from './views/Swap/Swap';

export default function RouterUrl() {
    return useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: 'swap', element: <Swap /> },
                { path: '', element: <Navigate to={'/swap'} /> },
            ],
        },
    ]);
}
