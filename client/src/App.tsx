import { Routes, Route } from 'react-router-dom';
import api from './api/api';
import useSWR from 'swr';
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

    return (
        <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />}>
                {/* Add product form - modal */}
                <Route
                    path="products/add"
                    element={
                        <Modal>
                            <ProductForm />
                        </Modal>
                    }
                />

                {/* Edit product form - modal */}
                <Route
                    path="/products/edit/:productId"
                    element={
                        <Modal>
                            <ProductForm />
                        </Modal>
                    }
                />

                {/* Delete product form - modal */}
                <Route
                    path="/products/delete/:productId"
                    element={
                        <Modal>
                            <DeleteForm />
                        </Modal>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
