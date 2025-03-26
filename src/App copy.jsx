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
      {/* <Canvas shadows camera={{ position: [4.2, 1.5, 7.5], fov: 30 }}> */}
      <Canvas shadows camera={{ position: [0, 10, 30], fov: 30 }}>
        <color attach="background" args={["#333"]} />
        <Experience selectedMode={selectedMode} />
        <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1.2} />
          </EffectComposer>
      </Canvas>
      {/* <UI selectedMode={selectedMode} setSelectedMode={setSelectedMode} /> */}
      <Navigation />
    </>
  );
}

export default App;
