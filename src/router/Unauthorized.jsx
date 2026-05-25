import React, { useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { Navigate } from 'react-router-dom';

const Unauthorized = () => {

    // clear localStorage immediately
    localStorage.clear();

    const [count, setCount] = useState(4);
    const [redirect, setRedirect] = useState(false);

    // countdown logic
    if (count > 0) {
        setTimeout(() => {
            setCount(count - 1);
        }, 1000);
    }

    // redirect after countdown
    if (count === 0 && !redirect) {
        setTimeout(() => {
            setRedirect(true);
        }, 500);
    }

    // redirect to home
    if (redirect) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4">
            <div className="bg-[#111111] shadow-2xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-800">

                <div className="flex justify-center mb-6">
                    <div className="bg-red-500/10 text-red-500 p-4 rounded-full border border-red-500/20">
                        <MdLockOutline size={48} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">
                    Unauthorized Access
                </h1>

                <p className="text-gray-400 mb-4 leading-relaxed">
                    You don’t have permission to access this page.
                </p>

                <p className="text-gray-400 mb-6 leading-relaxed">
                    Your session has been cleared for security reasons.
                </p>

                <div className="bg-black border border-gray-700 rounded-xl py-4 mb-6">
                    <p className="text-gray-400 text-sm mb-2">
                        Redirecting to home page in
                    </p>

                    <h2 className="text-5xl font-bold text-white">
                        {count}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                        seconds
                    </p>
                </div>

                <button
                    onClick={() => setRedirect(true)}
                    className="w-full px-5 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-semibold transition duration-200"
                >
                    Go Now
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;