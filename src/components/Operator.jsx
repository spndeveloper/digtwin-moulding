import { useGLTF } from "@react-three/drei";

export const Operator = (props) => {
    const { scene } = useGLTF(`models/female2.glb`)

    return (
        <group>
            <primitive object={scene} rotation-y={4.5} />
        </group>
    )
}


useGLTF.preload("models/female2.glb");