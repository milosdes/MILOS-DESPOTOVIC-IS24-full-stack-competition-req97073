import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from './api/api';
import useSWR from 'swr';
import { Product } from '../../types/product';
import Modal from './components/Modal';
import ProductForm from './components/forms/ProductForm';
import DeleteForm from './components/forms/DeleteForm';
import LandingPage from './components/LandingPage';

function App() {
    //Use SWR to manage the API call for all products
    const {
        data,
        error: loadProductsError,
        isLoading,
        mutate: refreshProducts,
    }: { data: any; error: any; isLoading: boolean; mutate: any } = useSWR(
        '/products',
        api.get
    );

    //Store the state for search and for alerts
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRole, setSearchRole] = useState('All');
    const [alert, setAlert] = useState({ message: '', type: 'none' });

    const navigate = useNavigate();

    //Filter the products for search by developers or scrum master
    const filterProducts = (searchRole: string) => {
        return data?.data?.filter((product: Product) => {
            //Filter for developers
            if (searchRole === 'Developers') {
                const str = product.Developers.join(' ').toLowerCase();
                if (str.includes(searchTerm.toLowerCase())) {
                    return true;
                }
                //Filter for scrummaster
            } else if (searchRole === 'Scrummaster') {
                const str = product.scrumMasterName.toLowerCase();
                if (str.includes(searchTerm.toLowerCase())) {
                    return true;
                }
                //Do not filter any
            } else if (searchRole === 'All') return true;
        });
    };

    const filteredProducts = filterProducts(searchRole);

    //Handlers for ADD, SAVE/EDIT, and DELETE to pass to modal
    const handleAddProductClicked = async (formValues: any) => {
        try {
            const postResponse = await api.post('/products', formValues);
            navigate('/');
            setAlert({
                message: postResponse.data.message,
                type: 'success',
            });
            //This function refreshes the data in the dashboard
            refreshProducts();
        } catch (err: any) {
            console.log(err);
            navigate('/');
            setAlert({
                message: err.message,
                type: 'error',
            });
        }
    };

    //Handles save clicked with POST to /products/:id
    const handleSaveEditClicked = async (
        updatedValues: Product,
        productId: string
    ) => {
        try {
            const response = await api.put(
                `/products/${productId}`,
                updatedValues
            );
            refreshProducts();
            setAlert({ message: response.data.message, type: 'success' });
            navigate('/');
        } catch (err: any) {
            console.log(err);
            setAlert({ message: err.message, type: 'error' });
            navigate('/');
        }
    };

    //Handles delete clicked with DELETE to /products/:id
    const handleDeleteClicked = async (productId: number) => {
        try {
            const response = await api.delete(`/products/${productId}`);
            refreshProducts();
            setAlert({ message: response.data.message, type: 'success' });
            navigate('/');
        } catch (err: any) {
            console.log(err);
            setAlert({ message: err.message, type: 'error' });
            navigate('/');
        }
    };

    return (
        <Routes>
            {/* Landing page */}
            <Route
                path="/"
                element={
                    <LandingPage
                        filteredProducts={filteredProducts}
                        isLoading={isLoading}
                        alert={alert}
                        setAlert={setAlert}
                        searchRole={searchRole}
                        setSearchTerm={setSearchTerm}
                        setSearchRole={setSearchRole}
                        loadProductsError={loadProductsError}
                    />
                }
            >
                {/* Add product form - modal */}
                <Route
                    path="products/add"
                    element={
                        <Modal>
                            <ProductForm
                                onSubmit={handleAddProductClicked}
                                productsList={filteredProducts}
                            />
                        </Modal>
                    }
                />

                {/* Edit product form - modal */}
                <Route
                    path="/products/edit/:productId"
                    element={
                        <Modal>
                            <ProductForm
                                onSubmit={handleSaveEditClicked}
                                productsList={filteredProducts}
                            />
                        </Modal>
                    }
                />

                {/* Delete product form - modal */}
                <Route
                    path="/products/delete/:productId"
                    element={
                        <Modal>
                            <DeleteForm onSubmit={handleDeleteClicked} />
                        </Modal>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
