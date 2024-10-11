import React from 'react';

const JobIcon = ({ className = "w-6 h-6 text-gray-600" }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.404 1.586A2 2 0 0116 20H8a2 2 0 01-1.596-.414L5 17h5m0-10V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 10v-4m-4 4v-6m0-4h8"
            />
        </svg>
    );
};

export default JobIcon;
