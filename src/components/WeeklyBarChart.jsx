import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

const WeeklyBarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Menghitung tanggal 7 hari terakhir
        const currentDate = new Date();
        let endDate = new Date();
        let startDate = new Date();

        if (currentDate.getHours() > 6) {
            startDate.setDate(currentDate.getDate() - 6);
        } else {
            startDate.setDate(currentDate.getDate() - 7);
            endDate.setDate(currentDate.getDate() - 1);
        }

        // Format tanggal YYYY-MM-DD
        const formatDate = (date) => date.toISOString().split("T")[0];
        const startDateStr = formatDate(startDate);
        const endDateStr = formatDate(endDate);

        fetch(`http://192.168.88.62:4000/api/achievement/daily_achievement?startDate=${startDateStr}&endDate=${endDateStr}`)
            .then((response) => response.json())
            .then((data) => {
                
                const arrPlan = [];
                const arrActual = [];
                const arrColor = [];

                data.result.forEach((item) => {
                    arrPlan.push(item.Planning_Points);
                    arrActual.push(item.Total_Points);
                    arrColor.push(getHexColorIndicator(item.Indicator));
                });

                setChartData({
                    labels: getLast7Days(),
                    datasets: [
                        {
                            label: "Planning",
                            type: "line",
                            borderColor: "rgb(0, 0, 0)",
                            borderWidth: 3,
                            data: arrPlan,
                            order: 1,
                        },
                        {
                            label: "Actual",
                            type: "bar",
                            stack: "qlt",
                            backgroundColor: arrColor,
                            data: arrActual,
                            order: 2,
                            categoryPercentage: 0.7,
                        },
                        {
                            label: "Target",
                            type: "bar",
                            backgroundColor: "rgba(206, 212, 215, 0.5)",
                            stack: "qlt",
                            data: arrPlan.map((plan, index) => Math.max(0, plan - arrActual[index])),
                            order: 2,
                            categoryPercentage: 0.7,
                        },
                    ],
                });
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Fungsi untuk mendapatkan 7 hari terakhir dalam format "dd MMM"
    const getLast7Days = () => {
        const dates = [];
        const currentDate = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);
            dates.push(date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }));
        }
        return dates;
    };

    // Fungsi untuk mengonversi indikator warna
    const getHexColorIndicator = (indicator) => {
        const colorMap = {
            "RED": "#CD202E",
            "YELLOW": "#FFB100",
            "GREEN": "#20CDA3"
        };
        return colorMap[indicator] || "#CD202E";
    };

    return (
        <div style={{ width: "100%", height: "300px" }}>
            {chartData ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                stacked: true,
                                beginAtZero: true,
                                ticks: {
                                        color: "white",
                                        // font: {
                                        //   size: 18,
                                        // },
                                        
                                    callback: (value) => {
                                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                                        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                                        return value;
                                    },
                                },
                            },
                            x: {
                                ticks: {
                                    color: "white"
                                }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            datalabels: {
                                formatter: (value) => (value >= 1000 ? `${(value / 1000).toFixed(0)} K` : value.toFixed(2)),
                                color: (context) => (context.datasetIndex === 1 ? "#CD202E" : "black"),
                                anchor: "start",
                                align: "end",
                                backgroundColor: "rgba(255,255,255,0.8)",
                                borderRadius: 4,
                                font: { weight: "bold", size: 12 },
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WeeklyBarChart;