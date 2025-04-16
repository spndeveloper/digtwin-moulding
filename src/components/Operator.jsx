import { useGLTF } from "@react-three/drei";

export const Operator = (props) => {
    const { scene } = useGLTF(`models/test-human.glb`)

    return (
        <group>
            <primitive object={scene} rotation-y={4.5} />
        </group>
    )
}


useGLTF.preload("models/test-human.glb");