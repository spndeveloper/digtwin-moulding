import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { act, useEffect } from "react"
import { AnimationMixer } from "three"
import { degToRad } from "three/src/math/MathUtils.js"


export const ConveyorPcbLoader = ({ mode }) => {
    const { scene, animations } = useGLTF(`models/conveyor-pcbloader.glb`)
    const mixer = new AnimationMixer(scene)
    
    
    useEffect(() => {

        
        if (animations.length > 0) {
            const action = mixer.clipAction(animations.find(anim => anim.name === "Running"))


            if(mode === "green"){
                action.play()
            }else{
                action.stop()
                action.reset()
            }
        }
    }, [animations, mixer])
    
        



    useFrame((_, delta) => {
        mixer.update(delta) // Update mixer setiap frame
    })

    console.log("conveyor", animations);
    

    return (
        <group>
            <primitive object={scene} rotation-y={degToRad(-90)} />
        </group>
    )
}

useGLTF.preload("models/conveyor-pcbloader.glb")