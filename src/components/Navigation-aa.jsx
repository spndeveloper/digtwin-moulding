import { useState, useEffect, useRef } from "react";
// import GaugeComponent from "react-gauge-component";
// import StatusLegend from "./Legend";
// import Lottie from "lottie-react";
// import informationIcon from "../../public/images/information-lottie.json";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import SpeedometerChart from "./SpeedometerChart";
import WeeklyBarChart from "./WeeklyBarChart";
import AchievementChart from "./AchievementChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  LineElement,
  PointElement
);

export const Navigation = () => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [nav, setNav] = useState(false);
  const [dashboard1, setDasboard1] = useState(false);
  const lottieRef = useRef();

  const showMenu = () => {
    setMenu(!menu);
    if (!menu) {
      setNav(false);
      setDasboard1(false);
    }
    // if (!menu) {
    //   lottieRef.current.stop();
    // } else {
    //   lottieRef.current.play();
    // }
  };
  const showNav = () => {
    setNav(!nav);
  };
  const closeAll = () => {
    setMenu(false);
    setNav(true);
    setDasboard1(false);
  };
  const showDasboard1 = () => {
    setDasboard1(!dashboard1);
    if (!dashboard1) {
      setNav(false);
      setMenu(false);
    }
  };
  const buttons = [{
    title: "Dashboard Achievement"
  }, {
    title: "Indicator Machine"
  }];

  // const Machines = Array.from({ length: 30 });

  const [dataMachine, setDataMachine] = useState([
    {
      id: 1,
      color: "R",
    },
    {
      id: 2,
      color: "M",
    },
    {
      id: 3,
      color: "T",
    },
    {
      id: 4,
      color: "A",
    },
    {
      id: 5,
      color: "N",
    },
    {
      id: 6,
      color: "C",
    },
    {
      id: 7,
      color: "Q",
    },
    {
      id: 8,
      color: "R",
    },
    {
      id: 9,
      color: "M",
    },
    {
      id: 10,
      color: "T",
    },
    {
      id: 11,
      color: "A",
    },
    {
      id: 12,
      color: "C",
    },
    {
      id: 13,
      color: "N",
    },
    {
      id: 14,
      color: "Q",
    },
    {
      id: 15,
      color: "R",
    },
    {
      id: 16,
      color: "M",
    },
    {
      id: 17,
      color: "T",
    },
    {
      id: 18,
      color: "A",
    },
    {
      id: 19,
      color: "C",
    },
    {
      id: 20,
      color: "N",
    },
    {
      id: 21,
      color: "Q",
    },
    {
      id: 22,
      color: "R",
    },
    {
      id: 23,
      color: "M",
    },
    {
      id: 24,
      color: "T",
    },
    {
      id: 25,
      color: "A",
    },
    {
      id: 26,
      color: "C",
    },
    {
      id: 27,
      color: "N",
    },
    {
      id: 28,
      color: "Q",
    },
    {
      id: 29,
      color: "R",
    },
    {
      id: 30,
      color: "M",
    },
    {
      id: 31,
      color: "T",
    },
    {
      id: 32,
      color: "A",
    }
  ])

  const getStatusColor = (code) => {
    const statusColorMap = {
      R: "rgb(84,180,53)", // Machine Running
      M: "rgb(254,0,0)", // Machine Problem
      T: "rgb(254,0,0)", // Tooling Problem
      A: "rgb(254,0,0)", // Adjustment
      C: "rgb(171,133,88)", // Change Model
      N: "rgb(29,93,155)", // No Schedule
      Q: "rgb(248,222,34)", // QC Check
    };
    return statusColorMap[code] || "grey";
  }

  const darkenColor = (color) => {
    const rgbValues = color.match(/\d+/g);
      if (!rgbValues) return "rgb(0, 0, 0)";
      let [r, g, b] = rgbValues.map(Number);
      r = Math.max(0, r - 10);
      g = Math.max(0, g - 10);
      b = Math.max(0, b - 10);
      return `rgb(${r}, ${g}, ${b})`;
  }

  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    const slider = scrollRef.current;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    scrollRef.current.isDown = false;
  };


  useEffect(() => {
    const initialMachineIndicator = async () => {
      try {
      const response = await fetch("http://192.168.88.62:40000/api/master/list_master_machine_online_indicator?div_id=1", {headers: { 
        "X-API-KEY": "jPaR07aU3A9dif9t0lYm", 
        "Content-Type": "application/json"
      }});
      const result = await response.json();
      console.log(result);

      if(result.status_code === 200){
        const list_machine_online_indicator = result.data.list_machine_online_indicator
        const list_status_machine = result.list_status_machine
        console.log(list_machine_online_indicator);
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
      }
    };

    initialMachineIndicator();
  }, []);

  const handleMouseMove = (e) => {
    const slider = scrollRef.current;
    if (!slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1.5; // kecepatan drag
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };
  useEffect(() => {
    // Set timer untuk mengubah loading menjadi false setelah 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000 milidetik = 2 detik

    // Bersihkan timer saat komponen di-unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pointer-events-none fixed z-10 inset-0 select-none">
      <div
        className={`absolute inset-0 bg-black z-10 pointer-events-none flex items-center justify-center transition-opacity  duration-1000 ${loading ? "opacity-100" : "opacity-0"}`}
      >
        <img src="/images/dot-logo.png" className="w-40 animate-pulse" />
      </div>
      <div className="mx-auto h-full max-w-screen-xxl w-full flex flex-col justify-between absolute inset-0">
        <div className="flex justify-between items-center p-10">
          <a className="pointer-events-auto" href="#" onClick={showNav}>
            <img className="w-20" src="/images/dot-logo.png" />
          </a>
          <a className="pointer-events-auto" href="#" onClick={closeAll}>
            {(menu || dashboard1) && (
              <div className=" flex items-center justify-center bg-transparent text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </a>
        </div>
      </div>
      {nav && (
        <div className="md:px-10 flex flex-col mx-auto h-full  w-4xl justify-end">
          {/* <div className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md noscrollbar px-2 md:px-0">
          <button
            key={`1dawdwadw`}
            className="w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2 border-transparent"
          >
            <div
              className="w-full h-full rounded-md"
              style={{ backgroundColor: "#fff" }}
            />
            dwadwadwa
          </button>
          <StatusLegend />
        </div> */}
          {/* Asset Box */}

          <div className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md flex flex-col py-3 gap-3 overflow-hidden">
            {/* <div className="flex items-center gap-8 pointer-events-auto noscrollbar overflow-x-auto px-6 pb-2">
            <button
              key={"dawdwajdhawkj"}
              className="transition-colors duration-200 font-medium flex-shrink-0 border-b text-white shadow-purple-100 border-b-white"
            >
              Machine Indicator
            </button>
            <button
              key={"dawdwajdhawkj"}
              className="transition-colors duration-200 font-medium flex-shrink-0 border-b text-white shadow-purple-100 border-b-white"
            >
              dawdawdwa
            </button>
          </div> */}
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className="flex gap-2 overflow-x-auto overflow-y-hidden noscrollbar pointer-events-auto px-3"
            >
              <div className="flex gap-4 flex-nowrap">
                {buttons.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-[100px]">
                    <button
                      key={index}
                      onClick={index === 0 ? showMenu : showDasboard1}
                      className="w-20 h-20 flex items-center justify-center flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr border-white from-white/20 to-white/30"
                    >
                      <img
                        className="w-12 h-12 object-contain"
                        src="/images/dashboard-achievement-logo.png"
                        alt={`Logo ${index + 1}`}
                      />
                    </button>
                    <span className="leading-none text-center text-white mt-1">
                    {item.title}
                    </span>
                  </div>
                ))}
              </div>
              {/* <button
                onClick={showMenu}
                className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr border-white from-white/20 to-white/30"
              >
                <img
                  className="object-cover w-full h-full"
                  src="/images/dot-logo.png"
                  alt="Logo"
                />
              </button> */}
            </div>
          </div>
        </div>
      )}

      <div className="md:px-10 flex flex-col mx-auto h-full max-w-screen-xxl w-full justify-end items-end">
        {menu && (
          <div className="md:rounded-t-lg bg-gradient-to-br backdrop-blur-sm drop-shadow-md flex flex-col p-2 gap-3 overflow-hidden min-w-[40%] items-end">
            <div className="grid grid-cols-2 gap-4 justify-between rounded-3xl w-full">
              <div className="bg-gradient-to-br from-black/30 to-indigo-900/20 p-5 rounded-3xl flex flex-col space-y-2">
                <div className="text-white">
                  <div className="flex justify-between text-sm">
                    <div>Statistic</div>
                    <div>Target</div>
                  </div>
                  <div className="flex justify-between font-bold text-md">
                    <div>Today Achievement</div>
                    <div>0 K</div>
                  </div>
                </div>
                <div>
                  <SpeedometerChart />
                </div>

                <div className="flex justify-start">
                  <div className="flex items-center gap-2 p-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: "red" }}
                    ></span>
                    <p className="m-0 text-xs text-white">Poor {"( < 90% )"}</p>
                  </div>
                  <div className="flex items-center gap-2 p-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: "yellow" }}
                    ></span>
                    <p className="m-0 text-xs text-white">
                      Good {"( 90% - 95%)"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 p-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: "green" }}
                    ></span>
                    <p className="m-0 text-xs text-white">
                      Excellent {"( > 95% )"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-black/30 to-indigo-900/20 p-5 rounded-3xl">
                <WeeklyBarChart />
              </div>
            </div>
            <div className="px-4 flex w-full bg-gradient-to-br from-black/30 to-indigo-900/20 rounded-3xl flex flex-col py-2">
              <div className="flex justify-between text-white">
                <div>25 Mar 2024</div>
                <div> Total Achievement 0 PCS</div>
              </div>
              <div>
                <AchievementChart />
              </div>
              <div className="flex justify-start">
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "blue" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(N) No Schedule</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(C) Change Model</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(A) Adjustment</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "yellow" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(Q) QC Check</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "green" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(R) Machine Running</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(T) Tooling Problem</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(M) Machine Problem</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {dashboard1 && (
          <div className="md:rounded-t-lg bg-gradient-to-br backdrop-blur-sm drop-shadow-md flex flex-col p-2 gap-3 overflow-hidden max-w-[60%] min-h-[40%] items-end">
            <div className="px-4 flex h-full w-full bg-gradient-to-br from-black/30 to-indigo-900/20 rounded-3xl flex flex-col py-2">
              <div className="flex justify-between text-white">
                <div>Machine Online Indicator</div>
                <div>last Update :asdas</div>
              </div>
              {/* <div className="flex gap-2 pointer-events-auto py-3"> */}
                <div className="flex gap-4 flex-wrap py-3">
                  {dataMachine.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 w-20 h-20 rounded-xl" 
                      style={{
                        backgroundColor: getStatusColor(item.color),
                        border: `1px solid ${darkenColor(item.color)}`
                      }}
                    >
                      <span className='text-white font-bold text-xl'>{item.id}</span>
                    </div>
                  ))}
                </div>
              {/* </div> */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "blue" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(N) No Schedule</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(C) Change Model</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(A) Adjustment</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "yellow" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(Q) QC Check</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "green" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(R) Machine Running</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(T) Tooling Problem</p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">(M) Machine Problem</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
