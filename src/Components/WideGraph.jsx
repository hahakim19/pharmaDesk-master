import { Chart as ChartJS, CategoryScale, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { data, options } from "../Utils/Data/WideGraphData.jsx";
import { AiFillCaretDown } from "react-icons/ai";

const WideGraph = ({ className = "" }) => {
    ChartJS.register(CategoryScale,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        Title,
        Tooltip);

    return (
        <div className={`${className} bg-superClear rounded-xl shadow-md p-2 grid grid-rows-8`}>
            <div className="row-span-1 grid grid-rows-1 grid-cols-2">
                <span className="flex flex-row grow row-span-1 font-medium items-center">Meilleures Postes</span>
                <span className="flex flex-row grow row-span-1 text-sm justify-end items-center">
                    <span className="text-selectionBG">De</span>
                    <span className="px-1 text-xs">Jan 2023</span>
                    <AiFillCaretDown size="0.5rem" />
                    <span className="text-selectionBG pl-2">Jusqu'à</span>
                    <span className="px-1 text-xs">Déc 2023</span>
                    <AiFillCaretDown size="0.5rem" />
                </span>
            </div>
            <div className="row-span-7">
                <Line options={options} data={data} />
            </div>
        </div>);
}

export default WideGraph;