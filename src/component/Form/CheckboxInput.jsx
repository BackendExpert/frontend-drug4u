import React from 'react';

const CheckboxInput = ({
    label,
    name,
    checked,
    onChange,
    required = false,
}) => {
    return (
        <div className="w-full mb-5 flex items-center gap-3">

            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={onChange}
                required={required}
                className="
                    w-4 h-4
                    accent-gray-700
                    cursor-pointer
                    transition-all duration-200
                "
            />

            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default CheckboxInput;