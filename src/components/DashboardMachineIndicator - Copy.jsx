import React, { useEffect, useState } from "react";

const DashboardMachineIndicator = () => {
  const [dataMachine, setDataMachine] = useState([]);
  const [listStatusMachine, setListStatusMachine] = useState([]);
  const [updateTime, setUpdateTime] = useState("");
  const [loading, setLoading] = useState(true);
  const darkenColor = (color) => {
    if (color.startsWith("#")) {
      color = color.slice(1);
    }
    if (color.length !== 6) return "#000000";
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    r = Math.max(0, r - 30);
    g = Math.max(0, g - 30);
    b = Math.max(0, b - 30);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };
  const initialMachineIndicator = async () => {
    try {
      const response = await fetch(
        "http://192.168.88.62:40000/api/master/list_master_machine_online_indicator?div_id=1",
        {
          headers: {
            "X-API-KEY": "jPaR07aU3A9dif9t0lYm",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.status_code === 200) {
        const dateTime = new Date();
        setUpdateTime(
          dateTime.toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
        );
        const list_machine_online_indicator =
          result.data.list_machine_online_indicator.map((item) => ({
            ...item,
            name: item.machine_name.split(" ")[1],
          }));
        setDataMachine(list_machine_online_indicator);
        const list_status_machine = result.data.list_status_machine;
        setListStatusMachine(list_status_machine);
        console.log("🎃", list_machine_online_indicator);
      }
      // Pastikan response sesuai struktur, misalnya result.DATA adalah array
      // if (result.MESSAGETYPE === "S" && Array.isArray(result.data)) {
      //     // setApiData(result.DATA);
      //     // const updatedData = result.DATA.map(machine => ({
      //     //     ...machine,
      //     //     show_card: machine.machine_status === "MERAH"
      //     // }));
      //     console.log("aaaaaaaaaaaaaaaa");

      //     // setApiData(updatedData);
      // }
    } catch (error) {
      console.error("Error fetching API data:", error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };
  useEffect(() => {
    initialMachineIndicator();
  }, []);
  if (loading) {
    return (
      <div className="px-4 flex h-full w-full bg-gradient-to-br items-center justify-center from-black/30 to-indigo-900/20 rounded-3xl flex flex-col py-2">
        {/* <div className="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-20 h-20"></div> */}
        <div className="flex space-x-2">
        <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0s]"></span>
        <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
      </div>
    );
  }
  return (
    <div className="px-4 flex h-full w-full bg-gradient-to-br from-black/30 to-indigo-900/20 rounded-3xl flex flex-col py-2">
      <div className="flex justify-between text-white">
        <div>Machine Online Indicator</div>
        <div>last Update : {updateTime}</div>
      </div>
      {/* <div className="flex gap-2 pointer-events-auto py-3"> */}
      <div className="flex gap-4 flex-wrap py-3">
        {dataMachine.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 w-20 h-20 rounded-xl"
            style={{
              backgroundColor: item.color,
              border: `4px solid ${darkenColor(item.color)}`,
            }}
          >
            <span className="text-white font-bold text-xl">{item.name}</span>
            {item.code !== "R" && item.code !== "N" && (
              <div className="flex items-center gap-1 text-white font-semibold">
                <span className="text-md">{item.code}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.9}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="text-md">{item.duration_text}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* </div> */}
      <div className="flex justify-center">
        {listStatusMachine.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <p className="m-0 text-xs text-white">
              ({item.code}) {item.status_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardMachineIndicator;
