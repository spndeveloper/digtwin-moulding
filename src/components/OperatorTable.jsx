import { useGLTF } from "@react-three/drei";

export const OperatorTable = (props) => {
    const { scene } = useGLTF(`models/operator-table.glb`)

    return (
        <group>
            <primitive object={scene} rotation-y={props.rotate} />
        </group>
    )
}


useGLTF.preload("models/operator-table.glb");