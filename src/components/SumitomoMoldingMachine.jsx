import { useGLTF, Text3D, Billboard } from "@react-three/drei"; // ✅ Gunakan Text3D
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";

export const SumitomoMoldingMachine = (props) => {
    const { scene, nodes, materials } = useGLTF("models/sumitomo-mld2.glb");
    const [clonedScene, setClonedScene] = useState(null);
    const blinkRef = useRef(false);
    const redLightMaterialRef = useRef(null);
    const [textPosition, setTextPosition] = useState([-0.179854, -0.495859, 5.1934]); // Default posisi teks
    const [textRotation, setTextRotation] = useState([0, 0, 0]); // Default posisi teks
    const [displayText, setDisplayText] = useState("1"); // Isi teks default
    const cube009Ref = useRef();
    const cube012Ref = useRef();

    const group = useRef();

    const initialPosition = nodes.Cube009.position.toArray();
    const initialPositionTwo = nodes.Cube012.position.toArray();

    const { position, position2 } = useSpring({
        from: { 
                position: [initialPosition[0]-2.75, parseFloat(initialPosition[1]), initialPosition[2]],
                position2: [initialPositionTwo[0], parseFloat(initialPositionTwo[1]), initialPositionTwo[2]],
            }, // Posisi awal (kanan)
        to: async (next) => {

            await new Promise(resolve => setTimeout(resolve, props.delay || 0));
            
            while (true) {
                await next(
                    { 
                        position: [initialPosition[0]-7.7, initialPosition[1], initialPosition[2]],
                    }
                );
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Jeda 1 detik
                await next(
                    { 
                        position2: [initialPositionTwo[0], initialPositionTwo[1]-40, initialPositionTwo[2]],
                    }
                );
                await new Promise((resolve) => setTimeout(resolve, 500)); // Jeda 1 detik
                await next(
                    { 
                        position2: [initialPositionTwo[0], initialPositionTwo[1], initialPositionTwo[2]],
                    }
                );
                await new Promise((resolve) => setTimeout(resolve, 500)); // Jeda 1 detik
                await next(
                    { 
                        position: [initialPosition[0]-2.75, initialPosition[1], initialPosition[2]],  
                    }
                );
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Jeda 1 detik
            }
        },
        config: { mass: 1, tension: 120, friction: 20 },
        loop: { reverse: true }, // Animasi bolak-balik
      });
      


    useEffect(() => {
        console.log("Current machine status:", props.machine_status);
        const newScene = scene.clone(true);

        newScene.traverse((child) => {

            if (child.isMesh && child.name === "Cube009") {
                cube009Ref.current = child; // Simpan referensi ke Cube009
                console.log("Cube009 found:", child);
              }

              if (child.isMesh && child.name === "Cube012") {
                cube012Ref.current = child; // Simpan referensi ke Cube009
                console.log("Cube0012 found:", child);
              }


            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.emissiveIntensity = 0; 
                

                if (props.rotate === "-180") {
                    setTextPosition([child.position.x+0.3, child.position.y-0.64, child.position.z-4.1]); 
                    setDisplayText(props.machine_id); 
                    setTextRotation([0, degToRad(90), 0])
                    console.log("💥 Text Updated");
                }else{
                    setTextPosition([child.position.x-0.2, child.position.y-0.6, child.position.z+4]);
                    setTextRotation([0, degToRad(-90), 0])
                    setDisplayText(props.machine_id)
                }

                if (props.machine_status) {
                    if (props.machine_status === "HIJAU" && child.material.name.startsWith("GreenLight")) {
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 1.5;
                        child.material.toneMapped = false;
                    } else if (props.machine_status === "KUNING" && child.material.name.startsWith("YellowLight")) {
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 3;
                        child.material.toneMapped = false;
                    } else if (props.machine_status === "MERAH" && child.material.name.startsWith("RedLight")) {
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 5;
                        child.material.toneMapped = false;
                    } else if (props.machine_status === "alarm_on" && child.material.name.startsWith("RedLight")) {
                        redLightMaterialRef.current = child.material;
                        redLightMaterialRef.current.emissive = child.material.color;
                        redLightMaterialRef.current.toneMapped = false;
                        blinkRef.current = true;
                    } else if (props.machine_status === "alarm_off" && child.material.name.startsWith("GreenLight")) {
                        blinkRef.current = false;
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 1.5;
                        child.material.toneMapped = false;
                    }
                }
            }
        });

        setClonedScene(newScene);
    }, [props.machine_status, scene]);

    useFrame((state) => {

        if (cube009Ref.current) {
            if (props.machine_status === "HIJAU") {
              // Terapkan posisi animasi ke Cube009
              cube009Ref.current.position.z = position.get()[0];
            } else {
              // Kembalikan ke posisi awal jika status bukan HIJAU
              cube009Ref.current.position.z = initialPosition[2];
            }
          }

          if (cube012Ref.current) {
            if (props.machine_status === "HIJAU") {
              // Terapkan posisi animasi ke Cube009
              cube012Ref.current.position.y = position2.get()[1];
            } else {
              // Kembalikan ke posisi awal jika status bukan HIJAU
              cube012Ref.current.position.y = initialPositionTwo[1];
            }
          }


        if (blinkRef.current && redLightMaterialRef.current) {
            const intensity = (Math.sin(state.clock.elapsedTime * 5) + 1) / 2 * 5;
            redLightMaterialRef.current.emissiveIntensity = intensity;
        }
    });

    if (!clonedScene) return null;

    return (
        <group ref={group} {...props} dispose={null}>


            <primitive object={clonedScene} rotation-y={degToRad(props.rotate)} />
        

            {/* ✅ Teks Utama */}
            <Text3D 
                position={textPosition} 
                rotation={textRotation} 
                size={0.3}
                font="/fonts/helvetiker_regular.typeface.json"
                height={0.1} 
                curveSegments={12} 
                bevelEnabled 
                bevelThickness={0.02} 
                bevelSize={0.01} 
                bevelOffset={0}
                bevelSegments={5}
            >
                {displayText}
                <meshStandardMaterial color="white" /> {/* Warna teks utama putih */}
            </Text3D>
        </group>
    );
};

useGLTF.preload("models/sumitomo-mld2.glb");
