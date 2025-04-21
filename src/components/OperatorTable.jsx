import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { degToRad } from "three/src/math/MathUtils.js";

export const OperatorTable = (props) => {
    const { scene } = useGLTF(`models/operator-table.glb`)
    const [clonedScene, setClonedScene] = useState(null);

    useEffect(() => {
        const newScene = scene.clone(true);

        newScene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
            }
        })
        
        setClonedScene(newScene);
    },[])


    if (!clonedScene) return null;

    return (
        <group>
            <primitive object={clonedScene} rotation-y={degToRad(props.rotate)} />
        </group>
    )
}


useGLTF.preload("models/operator-table.glb");