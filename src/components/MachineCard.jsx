import { Html } from "@react-three/drei";

export const MachineCard = ({
  position,
  status,
  output,
  mode,
  machine_name,
  status_name,
  total_output,
  dailyplan_qty,
  total_ng,
  machine_status,
  pass_output,
  plan_qty,
  code,
  duration_text,
}) => {
  console.log("✌", machine_name);
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
  };

  return (
    <Html position={position} center distanceFactor={3}>
      <div className="rounded-2xl overflow-hidden shadow-lg bg-white min-w-[22dvw] w-fit">
        {/* Header dengan latar belakang hijau */}
        <div
          className={`text-white px-6 py-4`}
          style={{
            backgroundColor: getStatusColor(code),
          }}
        >
          <h3 className="font-bold text-xl">{machine_name}</h3>
          <div className={`font-bold text-xl ${code === 'R' ? '' : 'flex justify-between'}`}
           >
            <span>Status: {status_name}</span>
            {code !== "R" && (
              <span className="text-yellow-200 text-4xl">{duration_text}</span>
            )}
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="font-bold space-y-2">
            <div className="flex items-center justify-items-center justify-center text-3xl">
              Output
            </div>
            <div className="flex items-center justify-items-center justify-center text-4xl">
              {pass_output || 0} / {plan_qty || 0}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};
