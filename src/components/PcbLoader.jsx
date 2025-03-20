import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { degToRad } from "three/src/math/MathUtils.js"

export const MACHINE_MODES = [
    "red",
    "yellow",
    "green"
]

export const PcbLoader = ({ mode }) => {
    const { scene } = useGLTF(`models/pcb-loader.glb`)

    useEffect(() => {
        scene.traverse((child) => {
            console.log("mode", mode);

            if(child.isMesh){
                if(mode === "green" && child.material.name.startsWith("GreenLight")){
                    child.material.emissive = child.material.color
                    child.material.emissiveIntensity = 1.5
                    child.material.toneMapped = false;
                }else if (mode === "yellow" && child.material.name.startsWith("YellowLight")) {
                    child.material.emissive = child.material.color;
                    child.material.emissiveIntensity = 3;
                    child.material.toneMapped = false;
                } else if (mode === "red" && child.material.name.startsWith("RedLight")) {
                    child.material.emissive = child.material.color;
                    child.material.emissiveIntensity = 5;
                    child.material.toneMapped = false;
                } else {
                    child.material.emissiveIntensity = 0;
                }
            }
        })
    }, [scene, mode])

    return (
        <group>
            <primitive object={scene} rotation-y={degToRad(-90)} castShadow />
        </group>
    )
}

useGLTF.preload("models/pcb-loader.glb")