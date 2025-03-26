import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const AchievementChart = () => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [tableHtml, setTableHtml] = useState("");

    const getHexColorIndicator = (color) => {
        const colors = {
            GREEN: "#28a745",
            RED: "#dc3545",
            YELLOW: "#ffc107",
        };
        return colors[color] || "#6c757d";
    };

    const setLineBar = (chartValue) => {
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        const ctx = chartRef.current.getContext("2d");
        Chart.register(ChartDataLabels);

        const colorAcv = chartValue.masterIndicator === "GREEN" 
            ? chartValue.arrColor.map(() => getHexColorIndicator("GREEN"))
            : chartValue.arrColor.map((item) => getHexColorIndicator(item));

        const totalPoints = chartValue.arrActual.reduce((acc, item) => acc + item, 0);

        const newChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: Array.from({ length: 32 }, (_, i) => `MC ${i + 1}`),
                datasets: [
                    {
                        label: "Pass (%)",
                        backgroundColor: colorAcv,
                        data: chartValue.arrPercentage,
                    },
                    {
                        label: "Remaining (%)",
                        backgroundColor: "rgba(206, 212, 215, 0.5)",
                        data: chartValue.listPlanPersen,
                        grouped: false,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: (value) => `${value}%`,
                        },
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 10,
                            },
                        },
                    },
                },
                plugins: {
                    datalabels: {
                        formatter: (value) => `${value.toFixed(0)}%`,
                        color: "#CD202E",
                        anchor: "start",
                        align: "end",
                        offset: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: 4,
                        font: {
                            weight: "bold",
                            size: 10,
                        },
                    },
                    legend: { display: false },
                },
            },
        });
        setChartInstance(newChart);
        setTableHtml(chartValue.renderHtml);
    };

    const showLineBar = (lineNumbers, date) => {
        console.log("💨", lineNumbers, date);
        fetch(`http:192.168.88.62:4000/api/achievement/all_line?line_numbers=${lineNumbers}&date=${date}`)
            .then((response) => response.json())
            .then((res) => {
                
                
                const dataChart = {
                    masterIndicator: res.result[0]?.Master_Indicator || "",
                    arrPlan: res.result.map((item) => item.Planning_Points),
                    arrActual: res.result.map((item) => item.Total_Points),
                    arrColor: res.result.map((item) => item.Indicator),
                    arrPercentage: res.result.map((item) => parseInt(item.Percentage_Total_Points) || 0),
                    date: res.params.date,
                    renderHtml: res.render_html,
                    listPlanPersen: res.arrPlanPersen,
                };
                setLineBar(dataChart);
            });
    };

    useEffect(() => {
        const dateLine = new Date();
        if (new Date().getHours() < 7) {
            dateLine.setDate(dateLine.getDate() - 1);
        }
        const formattedDate = dateLine.toISOString().split("T")[0];
        const lineNumbers = Array.from({ length: 32 }, (_, i) => i + 1).join(",");
        
        showLineBar(lineNumbers, formattedDate);
    }, []);

    return (
        <div>
            <div className="mt-1" id="totalAcv">
                <canvas ref={chartRef} id="chartTotalAchievement"></canvas>
            </div>
            <table className="w-100 table-borderless text-center mt-2 mb-2" id="tableAchievement">
                <thead>
                    <tr></tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{ __html: tableHtml }} />
            </table>
        </div>
    );
};

export default AchievementChart;
