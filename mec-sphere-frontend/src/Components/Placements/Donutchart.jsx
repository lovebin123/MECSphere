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
                    data: [80, 70, 60, 65, 75], 
                    backgroundColor: [
                        'rgba(105,101,219, 0.6)',
                        'rgba(100,138,242, 0.6)',
                        'rgba(93,177,253, 0.6)',
                        'rgba(52,222,236, 0.6)',
                        'rgba(111,249,224, 0.6)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <Flex w={'25vw'} h={'280'} p={3} justifyContent={'center'} mt={'-10'}>
            <canvas ref={chartRef}></canvas>
        </Flex>
    );
};

export default DonutChart;
