import React, { useState } from 'react';

const ToggleSwitch = ({ value, toggleSwitch, className }) => {

    return (
        <div
            className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors duration-300 ${value ? 'bg-primary' : 'bg-gray-400'
                } ${className}`}
            onClick={() => toggleSwitch()}
        >
            <span
                className={`transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 bg-white rounded-full`}
            ></span>
        </div>
    );
};

export default ToggleSwitch;
