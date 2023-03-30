import React from 'react';
import Dashboard from './Dashboard';
import Search from './Search';
import ProductList from './ProductList';
import { Product } from '../../../types/product';

const LandingPage = ({}) => {
    return (
        <div id="wrapper" className="p-4">
            <header className="font-bold flex justify-center p-2">
                milos-despotovic-is24-full-stack-competition-req97073
            </header>
            <main>
                <Dashboard />
                <Search />
                <ProductList />
            </main>
        </div>
    );
};

export default LandingPage;
