import { useEffect, useState } from 'react';
import Alert from './Alert';
import api from '../api/api';
import { plusIcon } from '../icons';
import { useNavigate } from 'react-router-dom';
// import Modal from './xOld-Modal';
// import ProductForm from './form/xOld-ProductForm';

interface IDashboardProps {
    totalProducts: number;
    alert: { message: string; type: string };
    setAlert: any;
}

const Dashboard = ({ totalProducts, alert, setAlert }: IDashboardProps) => {
    const navigate = useNavigate();

    //Clear alert after it is displayed (either success or error)
    useEffect(() => {
        if (alert.message.length > 0) {
            setTimeout(() => {
                setAlert({ message: '', type: 'none' });
            }, 4000);
        }
    }, [alert, setAlert]);

    //Styles for tailwind
    const styles = {
        addButton:
            'flex items-center rounded bg-blue-200 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  shadow-md transition duration-150 ease-in-out hover:bg-blue-300 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg',
    };

    return (
        <div className="w-full min-h-full">
            <Alert alert={alert} />

            <div className=" m-auto px-5 py-1 max-w-[10em] text-center rounded-sm bg-blue-200">
                Total Products
            </div>
            <div className="m-auto text-center mb-4">
                <span className="mt-10 font-extrabold rounded-full bg-blue-300 p-2">
                    {totalProducts}
                </span>
            </div>
            <div className="flex justify-center space-x-2">
                <div>
                    <button
                        type="button"
                        className={`${styles.addButton}`}
                        onClick={() => {
                            navigate('/products/add');
                        }}
                    >
                        {plusIcon}
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
