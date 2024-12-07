import React, { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";

const SideMenu = ({ option_list, initialIndex = 0 }) => {
    const [index, setIndex] = useState(initialIndex);

    const renderedItems = [];

    const handleMenuSwitch = (index) => {
        setIndex(index);
    }

    for (let i = 0; i < option_list.length; i++) {
        const label = option_list[i].label;
        <IoLockClosedOutline />
        const disabled = option_list[i].disabled ?? false;
        renderedItems.push(<div key={`menu-option-${label}-i`} className="flex flex-row justify-between items-center text-disabled">
            <span onClick={!disabled ? () => handleMenuSwitch(i) : null} className={`flex grow ${!disabled ? index === i ? "bg-disabled " : "" : "bg-lightShapes"}rounded-md ${!disabled ? "cursor-pointer" : ""} px-6 py-2 font-medium ${!disabled ? index === i ? "text-black" : "text-textSecoundary" : "text-disabled"}`}>{label}</span>
            {disabled && (<IoLockClosedOutline />)}
        </div>)
    }

    return (<div className="flex flex-col space-y-1 mt-5 mx-2">
        {renderedItems}
    </div>
    );
}

export default SideMenu;