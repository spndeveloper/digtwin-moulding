import { Html } from "@react-three/drei";

export const MachineCard = ({ position, status, output, mode, machine_name, total_output, dailyplan_qty, total_ng, machine_status}) => {

  console.log("✌", machine_name);
  

  return (
    <Html position={position} center distanceFactor={3}>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-6 w-64 space-y-4 border border-white border-opacity-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {machine_name}
          </h3>
          <div
            className={`w-3 h-3 rounded-full ${
              machine_status === "HIJAU"
                ? "bg-green-500"
                : machine_status === "KUNING"
                ? "bg-yellow-500"
                : machine_status === "MERAH"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          ></div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Plan:</span> {dailyplan_qty}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Output:</span> {total_output}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Not Good:</span> {total_ng}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Footer */}
        <div className="text-sm text-gray-600">
          {/* <p>Last updated: 5 mins ago</p> */}
        </div>
      </div>
    </Html>
  );
};