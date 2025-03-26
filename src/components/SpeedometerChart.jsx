import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";

const SpeedometerChart = () => {
  const [speedoValue, setSpeedoValue] = useState({
    dataValue: 0,
    dataStatus: "Poor",
    colorValue: "#CD202E",
    dataPoints: 0,
    dataPlan: 0,
    lastUpdate: "00:00 WIB",
  });

  // Fungsi untuk memformat angka
  const formattingAngka = (num) => new Intl.NumberFormat().format(num);
  const formattingTarget = (num) => (num / 1000).toFixed(1) + " K";

  // Fungsi untuk mendapatkan tanggal sesuai kondisi jam
  const getCurrentDate = () => {
    let date = new Date();
    if (date.getHours() < 7) {
      date.setDate(date.getDate() - 1);
    }
    return date.toISOString().slice(0, 10);
  };

  // Fetch data dari API
  useEffect(() => {
    const startDate = getCurrentDate();
    const endDate = getCurrentDate();

    fetch(`http://192.168.88.62:4000/api/achievement/daily_achievement?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((res) => {

        console.log("api", res);
        
        if (res.result.length > 0) {
          const data = res.result[0];
          let statusText = "Poor";
          let colorValue = "#CD202E";

          if (data.Indicator === "YELLOW") {
            statusText = "Good";
            colorValue = "#FFB100";
          }
          if (data.Indicator === "GREEN") {
            statusText = "Excellent";
            colorValue = "#20CDA3";
          }

          setSpeedoValue({
            dataValue: data.Percentage,
            dataStatus: statusText,
            colorValue: colorValue,
            dataPoints: data.Total_Points,
            dataPlan: data.Planning_Points,
            lastUpdate: data.Last_Update + " WIB",
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="speedometer-container">
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={3}
        colors={[speedoValue.colorValue]}
        arcWidth={0.3}
        percent={speedoValue.dataValue / 100}
        needleColor="#8D1620"
        textColor="#000"
      />
      {/* <div className="speedometer-details">
        <h2>Status: {speedoValue.dataStatus}</h2>
        <p>Achievement: {speedoValue.dataValue} %</p>
        <p>Points: {formattingAngka(speedoValue.dataPoints)} Pcs</p>
        <p>Plan: {formattingTarget(speedoValue.dataPlan)}</p>
        <p>Last Update: {speedoValue.lastUpdate}</p>
      </div> */}
    </div>
  );
};

export default SpeedometerChart;
