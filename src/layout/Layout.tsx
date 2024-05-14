import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './header/Header';
import Providers from 'src/contexts/Providers';
import Content from './content/Content';
import ModalCustom from 'src/components/ModalCustom/ModalCustom';

export default function Layout() {
    return (
        <Providers>
            <Header />
            <Content headerHeight="64px" />
            <ToastContainer position="top-center" autoClose={2000} theme="light" style={{ width: 'max-content', minWidth: '220px', maxWidth: '90%' }} pauseOnHover={true} />
            <ModalCustom />
        </Providers>
    );
}
