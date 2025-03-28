import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Navigation } from "./components/Navigation";
import { UI } from "./components/UI";
import { useState } from "react";

function App() {

  const [selectedMode, setSelectedMode] = useState(null);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 10, 10], fov: 70 }}>
        <color attach="background" args={["#7f8c8d"]} />
        <Experience selectedMode={selectedMode} />
        <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1.2} />
          </EffectComposer>
      </Canvas>
      <Navigation />
    </>
  );
}

export default App;
