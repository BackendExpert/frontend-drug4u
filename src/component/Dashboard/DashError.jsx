import React from "react";
import { AlertTriangle, ArrowRight, LifeBuoy } from "lucide-react";

const DashError = () => {
    return (
        <div className="flex min-h-[80vh] w-full items-center justify-center px-6 py-16 bg-white">

            <div className="max-w-2xl text-center">

                {/* Icon */}
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-black" />
                        <div className="relative p-6">
                            <AlertTriangle
                                className="w-16 h-16 text-white"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                </div>

                {/* Code */}
                <h1 className="text-7xl font-bold tracking-tight text-black">
                    501
                </h1>

                {/* Title */}
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
                    Module Under Development
                </h2>

                {/* Description */}
                <p className="mt-4 text-base leading-7 text-gray-500 max-w-xl mx-auto">
                    This monitoring module is currently being engineered for MHMS enterprise deployment.
                    Please revisit later or contact the platform administrator.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">

                    <button
                        onClick={() => window.location.href = "/dashboard"}
                        className="group flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all"
                    >
                        <span>Return to Dashboard</span>
                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition"
                        />
                    </button>

                    <a
                        href="#"
                        className="flex items-center gap-2 text-gray-500 font-medium hover:text-black transition"
                    >
                        <LifeBuoy size={18} />
                        <span>Contact Support</span>
                    </a>

                </div>

                {/* Footer */}
                <p className="mt-14 text-[10px] tracking-[4px] uppercase text-gray-300">
                    MHMS Enterprise Platform
                </p>

            </div>
        </div>
    );
};

export default DashError;