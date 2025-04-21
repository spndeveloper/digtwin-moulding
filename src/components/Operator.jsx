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
    action.play();
  } else {
    console.warn("Animasi tidak ditemukan.");
  }

        // if (animations.length) {
        //     mixer.current = new THREE.AnimationMixer(clonedScene);
        // }

        // const clipObject = animations.find(
        //     (clip) => clip.name.toLowerCase().includes("Armature|mixamo.com|Layer0")) || animations[0];

        // if (clipObject) {
        //     const action = mixer.current.clipAction(clipObject);
        //     console.log("Animasi ditemukan.");
        //     action.play();
        //   } else {
        //     console.warn("Animasi 'jalan' tidak ditemukan.");
        //   }

        // clonedScene.traverse((child) => {
        //     if (child.isMesh) {
        //         child.material = child.material.clone();
        //     }
        // })
        
    },[scene, animations])

    useFrame((state, delta) => {
            mixer.current?.update(delta);
          });


    if (!clonedSceneRef.current) return null;

    return (
        <group>
            <primitive object={clonedSceneRef.current} rotation-x={degToRad(0)} rotation-y={degToRad(props.rotate)} />
        </group>
    )
}


useGLTF.preload("models/OPP.glb");