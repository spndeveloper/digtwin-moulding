import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export const Technician = (props) => {
    // const group = useRef();
    const { scene, animations } = useGLTF(`models/technician.glb`)

    const mixer = useRef();
    const clonedSceneRef = useRef();
    const actionRef = useRef();

    // useEffect(() => {

    //     console.log("Technician", animations.length);
        
    //     if (animations.length) {
    //         console.log("Available animations:", animations.map(a => a.name));

    //         mixer.current = new THREE.AnimationMixer(scene);

    //         const clipObject = animations.find(
    //             (clip) => clip.name.toLowerCase().includes("Armature|mixamo.com|Layer0")) || animations[0];

    //         if (clipObject) {
    //             const action = mixer.current.clipAction(clipObject);
    //             action.play();
    //           } else {
    //             console.warn("Animasi 'jalan' tidak ditemukan.");
    //           }
    //     }
    //   }, [animations, scene]);

    //   useFrame((state, delta) => {
    //     mixer.current?.update(delta);
    //   });

    useEffect(() => {
    
            const cloneObj = clone(scene);
            clonedSceneRef.current = cloneObj;
    
            cloneObj.traverse((child) => {
                if (child.isMesh) {
                  child.material = child.material.clone();
                }
            });
    
    
            mixer.current = new THREE.AnimationMixer(cloneObj);
    
            const clipObject =
        animations.find((clip) =>
          clip.name.toLowerCase().includes("armature|mixamo.com|layer0")
        ) || animations[0];
    
      if (clipObject) {
    
    
        
    
        const action = mixer.current.clipAction(clipObject);
    
        action.time = Math.random() * clipObject.duration;
    
        action.setEffectiveTimeScale(0.9 + Math.random() * 0.2);
    
        action.setLoop(THREE.LoopRepeat, Infinity);
    
       
        actionRef.current = action;
        actionRef.current?.play();
        
      } else {
        console.warn("Animasi tidak ditemukan.");
      }
    
        
            
        },[scene, animations])
    
        useFrame((state, delta) => {
                mixer.current?.update(delta);
              });
    
    
            //   useEffect(() => {
            //     if (props.isRun) {
            //       actionRef.current?.play();
            //     }
            //   }, [props.isRun]);
    
    
        if (!clonedSceneRef.current) return null;

    return (
        <group>
            <primitive object={clonedSceneRef.current} rotation-y={degToRad(props.rotate)} />
        </group>
    )
}


useGLTF.preload("models/technician.glb");