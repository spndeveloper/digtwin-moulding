const statuses = [
    { code: "N", label: "No Schedule", color: "#1D5D9B" },
    { code: "C", label: "Change Model", color: "#FE0000" },
    { code: "A", label: "Adjustment", color: "#FE0000" },
    { code: "Q", label: "QC Check", color: "#F8DE22" },
    { code: "R", label: "Machine Running", color: "#54B435" },
    { code: "T", label: "Tooling Problem", color: "#FE0000" },
    { code: "M", label: "Machine Problem", color: "#FE0000" }
  ];
  
  export default function StatusLegend() {
    return (
      <div className="flex items-center gap-6 text-lg font-semibold bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md rounded w-full">
        {statuses.map(({ code, label, color }) => (
          <div key={code} className="flex items-center gap-2 p-2">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
            <p className="m-0 text-sm text-white">({code}) {label}</p>
          </div>
        ))}
      </div>
    );
  }