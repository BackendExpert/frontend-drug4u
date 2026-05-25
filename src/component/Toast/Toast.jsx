import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const Toast = ({ success, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = success ? (
        <FaCheckCircle className="text-white w-5 h-5" />
    ) : (
        <FaTimesCircle className="text-white w-5 h-5" />
    );

    const toastStyle = success
        ? "bg-gradient-to-r from-black via-gray-900 to-gray-800 border-l-4 border-gray-500"
        : "bg-gradient-to-r from-red-600 via-red-700 to-red-800 border-l-4 border-red-400";

    return (
        <div
            className={`flex items-center w-full max-w-sm p-4 mb-4 text-white rounded-2xl shadow-xl backdrop-blur-md
                        transform transition-all duration-500 ease-out ${toastStyle}`}
            role="alert"
        >

            <div className="flex items-center justify-center w-9 h-9 bg-white/10 rounded-xl mr-3 shadow-inner">
                {icon}
            </div>

     
            <div className="flex-1 text-sm font-semibold tracking-wide">
                {message}
            </div>


            <button
                onClick={onClose}
                type="button"
                className="ml-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition"
                aria-label="Close"
            >
                <FaTimes className="w-3 h-3" />
            </button>
        </div>
    );
};

export default Toast;