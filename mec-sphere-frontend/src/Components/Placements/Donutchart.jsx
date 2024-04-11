import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Flex } from '@chakra-ui/react';

const DonutChart = () => {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['CS', 'EC', 'EEE', 'Mech', 'EB'],
                datasets: [{
                    label: 'Placements',
                    data: [80, 70, 60, 65, 75], // Example data for placements percentage
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <Flex w={'30vw'} h={'50vh'} p={3}  justifyContent={'center'}>
            <canvas ref={chartRef}></canvas>
        </Flex>
    );
};

export default DonutChart;
