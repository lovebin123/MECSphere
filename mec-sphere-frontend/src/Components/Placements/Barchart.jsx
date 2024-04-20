import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Flex } from '@chakra-ui/react';

const BarChart = () => {
    const chartRef = useRef();
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                  label: 'Placed',
                  data: [100, 130, 200, 120, 300],
                  backgroundColor: 'rgba(52,222,236, 0.2)',
                  borderColor: 'rgba(52,222,236, 1)',
                  borderWidth: 2,
                  fill:true,
                  pointBackgroundColor: 'rgba(52,222,236, 1)',
                  pointBorderColor: '#fff',
                  pointBorderWidth: 1,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  cubicInterpolationMode: 'monotone' 
              }]
          },
          options: {
              plugins: {
                  legend: {
                      display: false
                  }
              },
              scales: {
                  x: {
                      grid: {
                          display: false
                      }
                  },
                  y: {
                      beginAtZero: true,
                      grid: {
                          display:false
                      },
                      ticks: {
                          color: 'rgba(0, 0, 0, 0.5)',
                          font: {
                              size: 12
                          }
                      }
                  }
              },
              elements: {
                  line: {
                      tension: 0.4
                  }
              },
              animation: {
                  duration: 1000
              }
          }
      });

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <Flex h={'60vh'} w={'53vw'} p={3}>
          <canvas  ref={chartRef}></canvas>
        </Flex>
    );
};

export default BarChart;
