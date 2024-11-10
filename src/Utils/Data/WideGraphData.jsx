import { tailwindColors } from "../../utils/Colors.jsx";


export const options = {
    interaction: {
        mode: 'index',
        axis: 'x',
        intersect: false,
    },
    scales: {
        x: {
            title: {
                display: false,
                text: 'Mois',
            },
            grid: {
                display: false,
            },
            ticks: {
                color: tailwindColors.textSecoundary,
            },
        },
        y: {
            title: {
                display: false,
                text: 'Revenue (DZD)',
            },
            ticks: {
                display: false,
            },
        },
    },
};

export const data = {
    labels: ["Jan 2023", "Fév 2023", "Mar 2023", "Avr 2023", "Mai 2023", "Juin 2023", "Juil 2023", "Août 2023", "Sep 2023", "Oct 2023", "Nov 2023", "Déc 2023"],
    datasets: [
        {
            label: "Revenue (DZD)",
            data: [null, 12000, 43000, 37000, 25000, 15000, 48000, 22000, 31000, 45000, 28000, null],
            borderColor: tailwindColors.primary,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 2,
            pointHitRadius: 10,
            pointRadius: 0,
        },
        {
            label: "Dépenses (DZD)",
            data: [null, 8000, 25000, 18000, 12000, 9000, 22000, 11000, 15000, 20000, 14000, null],
            borderColor: tailwindColors.lightShapes,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 1,
            pointHitRadius: 10,
            pointRadius: 0,
        },
    ],
};