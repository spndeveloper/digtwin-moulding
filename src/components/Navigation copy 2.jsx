import { useState, useEffect, useRef } from "react";
import GaugeComponent from "react-gauge-component";
import StatusLegend from "./Legend";
import Lottie from "lottie-react";
import informationIcon from "../../public/images/information-lottie.json";
import ChartDataLabels  from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement, PointElement
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import  SpeedometerChart  from "./SpeedometerChart";
import WeeklyBarChart from "./WeeklyBarChart"
import AchievementChart from "./AchievementChart"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  LineElement, PointElement
);





export const Navigation = () => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const lottieRef = useRef();

  const showMenu = () => {
    setMenu(!menu);
    if (!menu) {
      lottieRef.current.stop();
    } else {
      lottieRef.current.play();
    }
  };

  useEffect(() => {
    // Set timer untuk mengubah loading menjadi false setelah 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2000 milidetik = 2 detik

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
          <a className="pointer-events-auto" href="#">
            <img className="w-20" src="/images/dot-logo.png" />
          </a>
          <div className="flex items-cente gap-2">
            <a className="pointer-events-auto" href="#" onClick={showMenu}>
              <Lottie
                lottieRef={lottieRef}
                animationData={informationIcon}
                loop={true}
                autoplay={true}
              />
            </a>
          </div>
        </div>
      </div>

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
                  <p className="m-0 text-xs text-white">
                    (C) Change Model
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">
                    (A) Adjustment
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "yellow" }}
                  ></span>
                  <p className="m-0 text-xs text-white">
                    (Q) QC Check
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "green" }}
                  ></span>
                  <p className="m-0 text-xs text-white">
                    (R) Machine Running
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">
                    (T) Tooling Problem
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <p className="m-0 text-xs text-white">
                    (M) Machine Problem
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
