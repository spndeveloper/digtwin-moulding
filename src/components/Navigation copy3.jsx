import { useState, useEffect } from "react";
import StatusLegend from "./Legend"

export const Navigation = () => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);


  const showMenu = () =>{
    setMenu(!menu);
  }

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
          <a className="pointer-events-auto" href="#" onClick={showMenu}>
            <img className="w-20" src="/images/dot-logo.png" />
          </a>
          <div className="flex items-cente gap-2">adwadawdw</div>
        </div>
      </div>


      {menu && (<div className="md:px-10 flex flex-col mx-auto h-full max-w-screen-xxl w-full justify-end">
        <div className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md noscrollbar px-2 md:px-0">
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
        </div>
        {/* Asset Box */}

    

        <div className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden">
          <div className="flex items-center gap-8 pointer-events-auto noscrollbar overflow-x-auto px-6 pb-2">
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
          </div>
          <div className="flex gap-2 overflow-x-auto noscrollbar px-6">
            <button className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr border-white from-white/20 to-white/30">
              <div className="w-full h-full flex items-center justify-center bg-black/40 text-white">
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
            </button>

            <button
              key={"dawdawdhawk"}
              onClick={() => changeAsset(currentCategory.name, asset)}
              className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr border-white from-white/20 to-white/30"
            >
              <img
                className="object-cover w-full h-full"
                src="/images/dot-logo.png"
                alt="Logo"
              />
            </button>
          </div>
        </div>
      </div>)}
      
    </main>
  );
};
