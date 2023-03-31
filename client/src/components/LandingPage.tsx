import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';
import Search from './Search';
import ProductList from './ProductList';
import { Product } from '../../../types/product';

interface ILandingPageProps {
    filteredProducts: Product[];
    isLoading: boolean;
    alert: { message: string; type: string };
    setAlert: any;
    searchRole: string;
    setSearchTerm: any;
    setSearchRole: any;
    loadProductsError: any;
}

const LandingPage = ({
    filteredProducts,
    isLoading,
    alert,
    setAlert,
    searchRole,
    setSearchTerm,
    setSearchRole,
    loadProductsError,
}: ILandingPageProps) => {
    useEffect(() => {
        if (loadProductsError)
            setAlert({
                message: 'There was an error loading the list of products.',
                type: 'error',
            });
    }, [loadProductsError, setAlert]);

    return (
        <div id="wrapper" className="p-6">
            <header className="font-bold flex justify-center p-2">
                <h1>milos-despotovic-is24-full-stack-competition-req97073</h1>
            </header>
            <main>
                <Dashboard
                    totalProducts={filteredProducts?.length}
                    alert={alert}
                    setAlert={setAlert}
                />
                <Search
                    setSearchTerm={setSearchTerm}
                    searchRole={searchRole}
                    setSearchRole={setSearchRole}
                />
                <ProductList products={{ data: filteredProducts, isLoading }} />
                <Outlet />
            </main>
        </div>
    );
};

export default LandingPage;
