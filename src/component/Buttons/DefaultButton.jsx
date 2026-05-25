import React from 'react';

const DefaultButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full
                py-2 px-8
                rounded-xl
                font-semibold
                text-white
                transition-all duration-200
                shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5

                ${
                    disabled
                        ? 'bg-gray-600 cursor-not-allowed opacity-50'
                        : `
                            bg-gradient-to-r
                            from-black via-gray-900 to-gray-800
                            hover:from-gray-900 hover:via-black hover:to-gray-900
                            focus:outline-none
                            focus:ring-2 focus:ring-gray-500/40
                        `
                }
            `}
        >
            {label}
        </button>
    );
};

export default DefaultButton;