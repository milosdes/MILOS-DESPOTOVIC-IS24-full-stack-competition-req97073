import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface IDeleteFormProps {
    onSubmit: any;
}

const DeleteForm = ({ onSubmit }: IDeleteFormProps) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    //Styles for tailwind
    const styles = {
        deleteButton:
            'text-red-500 background-transparent hover:shadow hover:bg-red-100 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
        closeButton:
            'bg-blue-600 text-white hover:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
        buttonsWrapper:
            'flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b',
    };

    return (
        <>
            <div className="block max-w-sm rounded-lg bg-white p-6 text-center">
                Are you sure you want to delete the product with{' '}
                <span className="font-bold">product ID {`${productId}`}</span>?
                It will be permanently deleted.
            </div>
            <div className={`${styles.buttonsWrapper}`}>
                <button
                    className={`${styles.closeButton}`}
                    type="button"
                    onClick={() => navigate('/')}
                >
                    Go back without deleting
                </button>
                <button
                    className={`${styles.deleteButton}`}
                    type="submit"
                    onClick={() => onSubmit(productId)}
                >
                    Delete
                </button>
            </div>
        </>
    );
};

export default DeleteForm;
