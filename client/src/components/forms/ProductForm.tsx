import React, { useEffect, useState } from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { Product } from '../../../../types/product';
import { useParams, useNavigate } from 'react-router-dom';

interface IProductFormProps {
    onSubmit: any;
    productsList: Product[];
}

interface IProductFormState {
    productId?: number;
    productName: string;
    productOwnerName: string;
    Developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: string;
}

const initialValidationState = {
    productName: true,
    productOwnerName: true,
    Developers: true,
    scrumMasterName: true,
    startDate: true,
    methodology: true,
    touched: false,
};

const ProductForm = ({ onSubmit, productsList }: IProductFormProps) => {
    const { productId } = useParams();
    const navigate = useNavigate();

    //Initialize form state to  a blank form (to add new product)
    let initialState: IProductFormState = {
        productName: '',
        productOwnerName: '',
        Developers: [],
        scrumMasterName: '',
        startDate: '',
        methodology: 'Agile',
    };
    //Or if a productId exists, initialize form state with that product's data
    if (productsList && productId) {
        productsList.forEach((p) => {
            if (p.productId === parseInt(productId)) {
                initialState = p;
            }
        });
    }

    //Keeps form state that will be part of POST request
    const [formState, setFormState] = useState<IProductFormState>(initialState);
    //Keeps track of from validation state
    const [formValidation, setFormValidation] = useState(
        initialValidationState
    );
    //Sets alert message for form validation
    const [formAlert, setFormAlert] = useState<string | null>(null);
    //Manages the state of the developer input value in React
    const [developerFieldInput, setDeveloperFieldInput] = useState('');

    //Validation for the fields in the form
    const validateFields = () => {
        let validation = {};
        const setValidation = (item: string, value: boolean) => {
            validation = { ...validation, [item]: value };
        };

        //Checks to make sure start date is valid
        const startDateIsValid = (value: string) => {
            const yearMonthDay = value.split('/');
            const year = parseInt(yearMonthDay[0]);
            const month = parseInt(yearMonthDay[1]);
            const day = parseInt(yearMonthDay[2]);
            //Validate year
            if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))
                return false;
            if (year < 1900 || year > new Date().getFullYear()) return false;
            if (month === 0 || month > 12) return false;
            if (day === 0 || day > 31) return false;
            return true;
        };

        //Goes through all the fields to validate them
        if (formState.productName.length) setValidation('productName', true);
        else setValidation('productName', false);
        if (formState.productOwnerName.length)
            setValidation('productOwnerName', true);
        else setValidation('productOwnerName', false);
        if (formState.Developers.length >= 1) setValidation('Developers', true);
        else setValidation('Developers', false);
        if (formState.scrumMasterName.length)
            setValidation('scrumMasterName', true);
        else setValidation('scrumMasterName', false);
        if (formState.startDate.length && startDateIsValid(formState.startDate))
            setValidation('startDate', true);
        else setValidation('startDate', false);

        //Keeps track of the validation status, as well as which inputs have been touched
        setFormValidation({ ...formValidation, ...validation, touched: true });
    };

    //Runs the validation
    useEffect(() => {
        if (formValidation.touched) validateFields();
    }, [formState, formValidation.touched]);

    const handleInputChange = (e: any, valueName: string) => {
        setFormState({
            ...formState,
            [valueName]: e.target.value,
        });
        validateFields();
        if (formDataIsValid()) setFormAlert(null);
    };

    const handleAddDeveloper = (e: any) => {
        //If input exists, add value to form state
        if (developerFieldInput.length > 0) {
            setFormState({
                ...formState,
                Developers: [...formState.Developers, developerFieldInput],
            });
            //Reset input field
            setDeveloperFieldInput('');
        }
    };

    const handleRemoveDeveloper = (removedDev: string) => {
        //Filters out the developer that is clicked on to remove
        const listWithRemovedDeveloper = formState.Developers.filter(
            (developer) => developer !== removedDev
        );
        //Sets the state to the new array with that developer filtered out
        setFormState({
            ...formState,
            Developers: listWithRemovedDeveloper,
        });
    };

    //Checks if all the form data is valid, returns true if all validations pass
    const formDataIsValid = () => {
        return Object.values(formValidation).every((val) => val === true);
    };

    const handleFormSubmit = () => {
        validateFields();
        const isValid = formDataIsValid();
        if (isValid) {
            //Formats the startDate to YYYY/MM/DD
            const startDate = formState.startDate.split('/');
            const year = parseInt(startDate[0]);
            const month = parseInt(startDate[1]);
            const day = parseInt(startDate[2]);
            let formattedMonth;
            let formattedDay;
            if (month.toString().length === 1) {
                formattedMonth = '0' + month.toString();
            } else {
                formattedMonth = month;
            }
            if (day.toString().length === 1) {
                formattedDay = '0' + day.toString();
            } else {
                formattedDay = day;
            }
            const formattedDate = `${year.toString()}/${formattedMonth}/${formattedDay}`;
            const finalState = { ...formState, startDate: formattedDate };

            onSubmit(finalState, productId);
        } else {
            setFormAlert('Please make sure all the fields are filled in!');
        }
    };

    //Styles for tailwind
    const styles = {
        currentDevelopers:
            '[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-gray-200 py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none hover:bg-gray-300',
        closeButton:
            'text-red-500 background-transparent hover:shadow hover:bg-red-100 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
        saveButton:
            'bg-blue-600 text-white hover:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150',
        buttonsWrapper:
            'flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b',
    };

    //Map current developers to jsx
    const currentDevelopers = formState.Developers.map((developer) => {
        return (
            <span
                key={developer}
                className={`${styles.currentDevelopers}`}
                onClick={(e) => handleRemoveDeveloper(developer)}
            >
                {developer} x
            </span>
        );
    });

    return (
        <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg ">
            {formAlert ? (
                <div className="bg-red-100 text-red-700 rounded-lg p-1">
                    {formAlert}
                </div>
            ) : null}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <div className="relative mb-12">
                    {/* Product Name */}
                    <TextInput
                        name="productName"
                        labelText="Product Name"
                        value={formState.productName}
                        isInvalid={!formValidation.productName}
                        onChange={(e: any) =>
                            handleInputChange(e, 'productName')
                        }
                    />

                    {/* Scrum Master */}
                    <TextInput
                        name="scrumMasterName"
                        labelText="Scrum Master"
                        value={formState.scrumMasterName}
                        isInvalid={!formValidation.scrumMasterName}
                        onChange={(e: any) =>
                            handleInputChange(e, 'scrumMasterName')
                        }
                    />

                    {/* Product Owner */}
                    <TextInput
                        name="productOwnerName"
                        labelText="Product Owner"
                        value={formState.productOwnerName}
                        isInvalid={!formValidation.productOwnerName}
                        onChange={(e: any) =>
                            handleInputChange(e, 'productOwnerName')
                        }
                    />

                    {/* Developers */}
                    <div className="flex">
                        <TextInput
                            name="Developers"
                            labelText="Developers"
                            value={developerFieldInput}
                            isInvalid={!formValidation.Developers}
                            onChange={(e: any) =>
                                setDeveloperFieldInput(e.target.value)
                            }
                            onBlur={(e: any) => {
                                handleAddDeveloper(e);
                            }}
                        />
                        <button
                            type="button"
                            className="justify-self-end m-auto px-2 bg-gray-200 rounded-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddDeveloper(e);
                            }}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex w-full flex-wrap justify-center">
                        {currentDevelopers}
                    </div>

                    {/* Start Date  */}
                    <TextInput
                        name="startDate"
                        labelText="Start Date (YYYY/MM/DD)"
                        value={formState.startDate}
                        isInvalid={!formValidation.startDate}
                        onChange={(e: any) => handleInputChange(e, 'startDate')}
                    />

                    {/* Methodology */}
                    <SelectInput
                        name="methodology"
                        labelText="Methodology"
                        value={formState.methodology}
                        isInvalid={!formValidation.methodology}
                        onChange={(e: any) => {
                            handleInputChange(e, 'methodology');
                        }}
                        options={['Agile', 'Waterfall']}
                    />
                </div>

                <div className={`${styles.buttonsWrapper}`}>
                    <button
                        className={`${styles.closeButton}`}
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Close
                    </button>
                    <button className={`${styles.saveButton}`} type="submit">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
