import { useSpring, animated } from "@react-spring/three";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export const Button3D = ({ position = [0, 0, 0], onClick }) => {
    const [pressed, setPressed] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Animasi posisi saat ditekan
    const { scale, positionY } = useSpring({
        scale: pressed ? 0.9 : 1, // Mengecilkan tombol saat ditekan
        positionY: pressed ? position[1] - 0.1 : position[1], // Tombol turun sedikit saat ditekan
        config: { mass: 1, tension: 200, friction: 10 }
    });

    useFrame(() => {
        document.body.style.cursor = hovered ? "pointer" : "default";
    });

    return (
        <animated.mesh
            position={[position[0], positionY, position[2]]}
            scale={scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => {
                setPressed(false);
                if (onClick) onClick();
            }}
        >
            {/* Bentuk tombol */}
            <boxGeometry args={[1.5, 0.5, 0.3]} />
            <meshStandardMaterial color={hovered ? "#ff6347" : "#007bff"} />
        </animated.mesh>
    );
};
