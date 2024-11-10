import React, { useState } from "react";
const SideMenu = ({ option_list, initialIndex = 0 }) => {
    const [index, setIndex] = useState(initialIndex);

    const renderedItems = [];

    const handleMenuSwitch = (index) => {
        setIndex(index);
    }

    for (let i = 0; i < option_list.length; i++) {
        renderedItems.push(<span key={`menu-option-${option_list[i]}`} onClick={() => handleMenuSwitch(i)} className={`flex grow ${index === i ? "bg-disabled " : ""}rounded-md cursor-pointer px-6 py-2 font-medium ${index === i ? "text-black" : "text-textSecoundary"}`}>{option_list[i]}</span>)
    }

    return (<div className="flex flex-col space-y-1 mt-5 mx-2">
        {renderedItems}
    </div>
    );
}

export default SideMenu;