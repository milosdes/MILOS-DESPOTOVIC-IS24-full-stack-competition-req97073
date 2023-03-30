import React from 'react';
import { successIcon, errorIcon } from '../icons';

interface IAlertProps {
    alert: {
        message: string;
        type: string;
    };
}

const Alert = ({ alert }: IAlertProps) => {
    //Object for tailwind styles
    const styles = {
        alert: 'mb-3 inline-flex w-full items-center rounded-lg py-5 px-6 text-base text-center fixed top-0',
        successOrErr:
            alert.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700',
    };

    return (
        <>
            {alert.message.length > 0 ? (
                <div
                    className={`${styles.alert} ${styles.successOrErr}`}
                    role="alert"
                >
                    <div className="m-auto flex">
                        {alert.type === 'success' ? successIcon : errorIcon}
                        {alert.message}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Alert;
