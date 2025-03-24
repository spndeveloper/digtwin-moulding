import { useGLTF } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";

export const SumitomoMoldingMachine = (props) => {
    const { scene } = useGLTF(`models/sumitomo-mld2.glb`);
    const [clonedScene, setClonedScene] = useState(null);
    const blinkRef = useRef(false);
    const redLightMaterialRef = useRef(null);

    // console.log("scene", scene);
    

    useEffect(() => {
        console.log("Current machine status:", props.machine_status);
        const newScene = scene.clone(true);

        newScene.traverse((child) => {
            if (child.isMesh) {
                // Clone material untuk memastikan perubahan tidak mempengaruhi material asli
                child.material = child.material.clone();

                // Reset semua lampu ke keadaan awal
                child.material.emissiveIntensity = 0;

                if (props.machine_status) {
                    if (props.machine_status === "HIJAU" && child.material.name.startsWith("GreenLight")) {
                        // Logika untuk status hijau
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 1.5;
                        child.material.toneMapped = false;
                    } else if (props.machine_status === "KUNING" && child.material.name.startsWith("YellowLight")) {
                        // Logika untuk status kuning
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 3;
                        child.material.toneMapped = false;
                    } else if (props.machine_status === "MERAH" && child.material.name.startsWith("RedLight")) {
                        // Logika untuk status merah
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 5;
                        child.material.toneMapped = false;
                    } else if (props.machine_status === "alarm_on" && child.material.name.startsWith("RedLight")) {
                        // Simpan material lampu merah ke ref
                        redLightMaterialRef.current = child.material;
                        blinkRef.current = true; // Aktifkan blinking
                    } else if (props.machine_status === "alarm_off" && child.material.name.startsWith("GreenLight")) {
                        // Matikan blinking dan setel lampu hijau
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

    // Gunakan useFrame untuk animasi blinking
    useFrame((state) => {
   
        if (blinkRef.current && redLightMaterialRef.current) {
 
            const intensity = Math.sin(state.clock.elapsedTime * 10) * 0.5 + 0.5; 
            redLightMaterialRef.current.emissiveIntensity = intensity * 5; 
        }
    });

    if (!clonedScene) return null;

    return (
        <group>
            <primitive object={clonedScene} rotation-y={degToRad(props.rotate)} />
        </group>
    );
};

useGLTF.preload("models/sumitomo-mld2.glb");