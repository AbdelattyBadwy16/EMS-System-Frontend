import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface CollegeData {
    facultyName: string;
    committeeCount: number;
}

interface ChartsProps {
    data: CollegeData[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
    const colors = [
        '#28a745', // Green
        '#dc3545', // Red
        '#000000', // Black
        '#aeaaaa'  // Light gray
    ];

    const borderColors = [
        '#28a745', // Green
        '#dc3545', // Red
        '#000000', // Black
        '#aeaaaa'  // Light gray
    ];

    const chartData = {
        labels: data.map(item => item.facultyName),
        datasets: [
            {
                label: 'عدد اللجان',
                data: data.map(item => item.committeeCount),
                backgroundColor: data.map((_, index) => colors[index % colors.length]),
                borderColor: data.map((_, index) => borderColors[index % borderColors.length]),
                borderWidth: 1,
                borderRadius: 5, 
                barThickness: 30, 
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Charts;