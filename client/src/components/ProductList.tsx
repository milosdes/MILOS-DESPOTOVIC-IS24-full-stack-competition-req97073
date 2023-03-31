import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/product';
import api from '../api/api';
import { editButtonIcon } from '../icons';

interface IProductListProps {
    products: {
        data: Product[];
        isLoading: boolean;
    };
}

const ProductList = ({ products }: IProductListProps) => {
    const navigate = useNavigate();

    //Simple loading display if data is loading
    if (products.isLoading) return <div>Loading...</div>;
    if (products.data) {
        const mappedProducts = products.data.map((product: any) => {
            return (
                <React.Fragment key={product.productId}>
                    <tr className="border-b hover:bg-gray-50">
                        <td className="px-6 py-2 font-medium">
                            <span className="flex">
                                <span className="px-2">
                                    {product.productId}
                                </span>
                                <span
                                    className="hover:cursor-pointer"
                                    onClick={() => {
                                        navigate(
                                            `/products/edit/${product.productId}`
                                        );
                                    }}
                                >
                                    {editButtonIcon}
                                </span>
                            </span>
                            <div className="m-2">
                                <span
                                    className="hover:cursor-pointer inline-block whitespace-nowrap rounded-full bg-red-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700"
                                    onClick={() => {
                                        navigate(
                                            `/products/delete/${product.productId}`
                                        );
                                    }}
                                >
                                    Delete
                                </span>
                            </div>
                        </td>
                        <td className="px-6 py-2">{product.productName}</td>
                        <td className="px-6 py-2">{product.scrumMasterName}</td>
                        <td className="px-6 py-2">
                            {product.productOwnerName}
                        </td>
                        <td className="px-6 py-2">
                            {product.Developers?.map((dev: string) => (
                                <div key={dev}>{dev}</div>
                            ))}
                        </td>
                        <td className="px-6 py-2">{product.startDate}</td>
                        <td className="px-6 py-2">{product.methodology}</td>
                    </tr>
                </React.Fragment>
            );
        });

        return (
            <div className="flex flex-col">
                <div className="max-w-full">
                    <div className="inline-block min-w-full py-2">
                        <div className="overflow-hidden">
                            <table className="min-w-full max-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-2">
                                            Product Number
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Product Name
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Scrum Master
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Product Owner
                                        </th>

                                        <th scope="col" className="px-6 py-2">
                                            Developer Names
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Start Date
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Methodology
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{mappedProducts}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //Need a non-conditional return statement for React component
    return <div>Loading..</div>;
};

export default ProductList;
