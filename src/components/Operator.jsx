import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export const Operator = (props) => {
    const { scene, animations } = useGLTF(`models/OPP.glb`)
    // const clonedScene = clone(scene);

    const mixer = useRef();
    const clonedSceneRef = useRef();
    const actionRef = useRef();

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
    
  } else {
    console.warn("Animasi tidak ditemukan.");
  }

    
        
    },[scene, animations])

    useFrame((state, delta) => {
            mixer.current?.update(delta);
          });


          useEffect(() => {
            if (props.isRun) {
              actionRef.current?.play();
            }
          }, [props.isRun]);


    if (!clonedSceneRef.current) return null;

    return (
        <group>
            <primitive object={clonedSceneRef.current} rotation-x={props.isRun ? degToRad(0) : degToRad(-90)} rotation-y={degToRad(props.rotate)} />
        </group>
    )
}


useGLTF.preload("models/OPP.glb");