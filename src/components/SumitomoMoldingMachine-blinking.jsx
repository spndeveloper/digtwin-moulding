import { useGLTF } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export const SumitomoMoldingMachine = (props) => {
    const { scene } = useGLTF("models/sumitomo-mld2.glb");
    const [clonedScene, setClonedScene] = useState(null);
    const blinkRef = useRef(false);
    const redLightMaterialRef = useRef(null);

    useEffect(() => {
        console.log("Current machine status:", props.machine_status);
        const newScene = scene.clone(true);

        newScene.traverse((child) => {
            if (child.isMesh) {
                // Clone material untuk memastikan perubahan tidak mempengaruhi material asli
                child.material = child.material.clone();
                child.material.emissiveIntensity = 0; // Reset semua lampu

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
                        redLightMaterialRef.current = child.material; // Simpan material ke ref
                        redLightMaterialRef.current.emissive = child.material.color;
                        redLightMaterialRef.current.toneMapped = false;
                        blinkRef.current = true; // Aktifkan blinking
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

    // Gunakan useFrame untuk animasi blinking
    useFrame((state) => {
        if (blinkRef.current && redLightMaterialRef.current) {
            const intensity = (Math.sin(state.clock.elapsedTime * 5) + 1) / 2 * 5;
            redLightMaterialRef.current.emissiveIntensity = intensity; // Atur blinking
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
