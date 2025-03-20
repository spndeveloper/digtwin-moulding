import { OrbitControls } from "@react-three/drei";
import { Floor } from "./Floor";

export const Experience = ({ selectedMode }) => {
  return (
    <>
      <Floor selectedMode={selectedMode} />
    </>
  );
};
