import { useState, useEffect } from "react";

export const Navigation = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set timer untuk mengubah loading menjadi false setelah 2 detik
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000); // 2000 milidetik = 2 detik
    
        // Bersihkan timer saat komponen di-unmount
        return () => clearTimeout(timer);
      }, []);

    return(
    
        <main className="pointer-events-none fixed z-10 inset-0 select-none">
            <div
                className={`absolute inset-0 bg-black z-10 pointer-events-none flex items-center justify-center transition-opacity  duration-1000 ${loading ? 'opacity-100' : 'opacity-0'}`}
            >
                <img
                    src="/images/dot-logo.png"
                    className="w-40 animate-pulse"
                />
            </div>
            <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
                <div className="flex justify-between items-center p-10">
                    <a
                        className="pointer-events-auto"
                        href="#"
                    >
                        <img className="w-20" src="/images/dot-logo.png" />
                    </a>
                    <div className="flex items-cente gap-2">
                    
                    </div>
                </div>
            </div>
            <div className="md:px-10 flex flex-col">
                <div className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20  backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden ">
                    <div className="flex items-center gap-8 pointer-events-auto noscrollbar overflow-x-auto px-6 pb-2">
                    <button
                        key={1}
                        className={`transition-colors duration-200 font-medium flex-shrink-0 border-b text-gray-200 hover:text-gray-100 border-b-transparent `}
                    >
                        dwadwawda
                    </button>
                    </div>
                </div>
            </div>
        </main>
        
    );
}