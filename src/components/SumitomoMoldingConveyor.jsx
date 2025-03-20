import { useGLTF } from "@react-three/drei"
import { degToRad } from "three/src/math/MathUtils.js"
import { useEffect, useState } from "react"
import useMqtt from "./Mqtt"

export const SumitomoMoldingConveyor = (props) => {
    const { scene } = useGLTF(`models/sumitomo-mld2-conveyor.glb`)
    const [clonedScene, setClonedScene] = useState(null);
    const [machine, setMachine] = useState([
        {
            machine: 'MC-01',
            indicator: ''
        },
        {
            machine: 'MC-02',
            indicator: ''
        },
        {
            machine: 'MC-03',
            indicator: ''
        },
    ])

    // const mqttMessage = useMqtt('ws://192.168.88.60:9001/mqtt', '1/MACHINE 1');
    const mqttMessage = null;

    useEffect(() => {
        

        const newScene = scene.clone(true);

            newScene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();


                if (mqttMessage) {
                    if (mqttMessage === "HIJAU" && child.material.name.startsWith("GreenLight")) {
                        console.log(`Mode Green applied to ${child.material.name}`);
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 1.5;
                        child.material.toneMapped = false;
                    } else if (mqttMessage === "KUNING" && child.material.name.startsWith("YellowLight")) {
                        console.log(`Mode Yellow applied to ${child.material.name}`);
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 3;
                        child.material.toneMapped = false;
                    } else if (mqttMessage === "MERAH" && child.material.name.startsWith("RedLight")) {
                        console.log(`Mode Red applied to ${child.material.name}`);
                        child.material.emissive = child.material.color;
                        child.material.emissiveIntensity = 5;
                        child.material.toneMapped = false;
                    } else {
                        child.material.emissiveIntensity = 0;
                    }
                }

                
            }
        });


        setClonedScene(newScene);
    }, [props.mode, mqttMessage]);

    
    


    // useEffect(() => {
    //     const newScene = scene.clone(true);

    //     newScene.traverse((child) => {
    //         if (child.isMesh) {
    //             // Clone material agar tidak berbagi referensi
    //             child.material = child.material.clone();

    //             if (props.mode === "green" && child.material.name.startsWith("GreenLight")) {
    //                 console.log(`Mode Green applied to ${child.material.name}`);
    //                 child.material.emissive = child.material.color;
    //                 child.material.emissiveIntensity = 1.5;
    //                 child.material.toneMapped = false;
    //             } else if (props.mode === "yellow" && child.material.name.startsWith("YellowLight")) {
    //                 console.log(`Mode Yellow applied to ${child.material.name}`);
    //                 child.material.emissive = child.material.color;
    //                 child.material.emissiveIntensity = 3;
    //                 child.material.toneMapped = false;
    //             } else if (props.mode === "red" && child.material.name.startsWith("RedLight")) {
    //                 console.log(`Mode Red applied to ${child.material.name}`);
    //                 child.material.emissive = child.material.color;
    //                 child.material.emissiveIntensity = 5;
    //                 child.material.toneMapped = false;
    //             } else {
    //                 child.material.emissiveIntensity = 0;
    //             }
    //         }
    //     });

    //     setClonedScene(newScene);
    // }, [props.mode, mqttMessage]);

    if (!clonedScene) return null; // Mencegah error render sebelum cloning selesai

    return (
        <group>
            <primitive object={clonedScene} rotation-y={degToRad(props.rotate)} />
        </group>
    )
}

useGLTF.preload("models/sumitomo-mld2-conveyor.glb")
