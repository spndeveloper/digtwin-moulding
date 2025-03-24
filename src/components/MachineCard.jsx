import { Html } from "@react-three/drei";

export const MachineCard = ({
  position,
  status,
  output,
  mode,
  machine_name,
  total_output,
  dailyplan_qty,
  total_ng,
  machine_status,
}) => {
  console.log("✌", machine_name);

  return (
    <Html position={position} center distanceFactor={3}>
      <div className="rounded-2xl overflow-hidden shadow-lg bg-white min-w-[22dvw] w-fit">
        {/* Header dengan latar belakang hijau */}
        <div
          className={`bg-green-500 text-white px-6 py-4 ${
            machine_status === "HIJAU"
              ? "bg-green-500"
              : machine_status === "KUNING"
                ? "bg-yellow-500"
                : machine_status === "MERAH"
                  ? "bg-red-500"
                  : "bg-gray-500"
          }`}
        >
          <h3 className="font-bold text-xl">{machine_name}</h3>
          <div className="font-bold text-xl">
            Status Machine:{" "}
            {machine_status === "HIJAU"
              ? "Running"
              : machine_status === "KUNING"
                ? "Under Maintenance"
                : machine_status === "MERAH"
                  ? "InActive"
                  : "-"}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Status Indicator */}
          <div className="font-bold space-y-2">
            <div className="flex items-center justify-items-center justify-center text-3xl">
              Output
            </div>
            <div className="flex items-center justify-items-center justify-center text-5xl">
              0
            </div>
            <div className="flex items-center justify-items-center justify-center text-xl">
              Customer : -
            </div>
          </div>

          {/* Informasi Mesin */}
          {/* <div className="space-y-2">
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Rencana Harian:</span>{" "}
              {dailyplan_qty}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Total Output:</span> {total_output}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Tidak Baik:</span> {total_ng}
            </p>
          </div> */}
        </div>

        {/* Footer */}
        {/* <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-gray-700 text-sm">Mode: {mode}</p>
          <p className="text-gray-700 text-sm">Output: {output}</p>
        </div> */}
      </div>
    </Html>
  );
};
