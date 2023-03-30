import React from 'react';

const SelectInput = ({
    value,
    onChange,
    labelText,
    name,
    isInvalid,
    options,
}: any) => {
    //Styles for tailwind
    const styles = {
        isInvalid: isInvalid ? 'border-red-700 bg-red-50' : '',
        select: 'peer block min-h-[auto] w-full rounded border-[1px] focus:border-blue-200 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder:opacity-0 motion-reduce:transition-none',
        label: 'bg-white px-1 pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out -translate-y-[0.9rem] scale-[0.8] text-primary motion-reduce:transition-none',
    };

    const mappedOptions = options.map((option: string) => {
        return (
            <option key={option} value={option}>
                {option}
            </option>
        );
    });

    return (
        <div className="relative m-4">
            <select
                className={`${styles.select} ${styles.isInvalid}`}
                id={name}
                name={name}
                aria-describedby={name}
                value={value}
                onChange={onChange}
            >
                {mappedOptions}
            </select>
            <label htmlFor={name} className={`${styles.label}`}>
                {labelText}
            </label>
        </div>
    );
};

export default SelectInput;
