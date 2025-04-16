import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Technician = (props) => {
    const group = useRef();
    const { scene, animations } = useGLTF(`models/technician.glb`)

    const mixer = useRef();

    useEffect(() => {

        console.log("Technician", animations.length);
        
        if (animations.length) {
            console.log("Available animations:", animations.map(a => a.name));

            mixer.current = new THREE.AnimationMixer(scene);

            const clipObject = animations.find(
                (clip) => clip.name.toLowerCase().includes("Armature|mixamo.com|Layer0")) || animations[0];

            if (clipObject) {
                const action = mixer.current.clipAction(clipObject);
                action.play();
              } else {
                console.warn("Animasi 'jalan' tidak ditemukan.");
              }
        //   mixer.current = new THREE.AnimationMixer(scene);
    
        // //   // Cari animasi bernama "jalan"
        //   const action = mixer.current.clipAction(
        //     // animations.find((clip) => clip.name.toLowerCase() === "jalan")
        //     animations.find((clip) => console.log("🙌", clip))
        //     // )
        //   );
    
        // //   if (action) {
        // //     action.play();
        // //   }
        }
      }, [animations, scene]);

      useFrame((state, delta) => {
        mixer.current?.update(delta);
      });

    return (
        <group ref={group} {...props}>
            <primitive object={scene} rotation-y={3.1} />
        </group>
    )
}


useGLTF.preload("models/technician.glb");