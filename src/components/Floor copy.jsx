import { Html, Box, CameraControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { SumitomoMoldingMachine } from "./SumitomoMoldingMachine";
import { SumitomoMoldingConveyor } from "./SumitomoMoldingConveyor";
import { PcbLoader } from "./PcbLoader";
import { ConveyorPcbLoader } from "./ConveyorPcbLoader";
import { MagazineConveyor } from "./MagazineConveyor";
import { MachineCard } from "./MachineCard";
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import useMqtt from "./Mqtt"

// Buat instance alova
const alovaInstance = createAlova({
    requestAdapter: adapterFetch(),
    // Mengonversi response menjadi JSON
    responded: response => response.json()
  });

export const Floor = ({ selectedMode }) => {

    const [showCard, setShowCard] = useState({
        green: false,
        yellow: false,
        red: false,
      });
    
      // Fungsi untuk toggle card
      const toggleCard = (id) => {
        console.log(id);
        
        setMachineData((prevData) =>
            prevData.map((machine) =>
            machine.machine_id === id
                ? { ...machine, show_card: !machine.show_card }
                : machine
            )
        );
      };



    const [machineData, setMachineData] = useState([
        {
            machine_id: 1,
            machine_name: "MACHINE 1",
            position: [-4.8, 0, -8.7],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 2,
            machine_name: "MACHINE 2",
            position: [-4.8, 0, -7.1],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 3,
            machine_name: "MACHINE 3",
            position: [-4.8, 0, -5.5],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 4,
            machine_name: "MACHINE 4",
            position: [-4.8, 0, -3.9],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 5,
            machine_name: "MACHINE 5",
            position: [-4.8, 0, -2.3],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 6,
            machine_name: "MACHINE 6",
            position: [-4.8, 0, -0.7],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 7,
            machine_name: "MACHINE 7",
            position: [-4.8, 0, 0.9],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 8,
            machine_name: "MACHINE 8",
            position: [-4.8, 0, 2.5],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 9,
            machine_name: "MACHINE 9",
            position: [-4.8, 0, 4.1],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 10,
            machine_name: "MACHINE 10",
            position: [-4.8, 0, 5.7],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 11,
            machine_name: "MACHINE 11",
            position: [-0.4, 0, -9.7],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 12,
            machine_name: "MACHINE 12",
            position: [-0.4, 0, -8.1],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 13,
            machine_name: "MACHINE 3",
            position: [-0.4, 0, -6.5],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 14,
            machine_name: "MACHINE 14",
            position: [-0.4, 0, -4.9],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 15,
            machine_name: "MACHINE 15",
            position: [-0.4, 0, -3.3],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 16,
            machine_name: "MACHINE 16",
            position: [-0.4, 0, -1.6],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 17,
            machine_name: "MACHINE 17",
            position: [-0.4, 0, 0],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 18,
            machine_name: "MACHINE 18",
            position: [-0.4, 0, 1.6],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 19,
            machine_name: "MACHINE 19",
            position: [-0.4, 0, 3.],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 20,
            machine_name: "MACHINE 20",
            position: [-0.4, 0, 4.8],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 21,
            machine_name: "MACHINE 21",
            position: [14.3, 0, -4.2],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 22,
            machine_name: "MACHINE 22",
            position: [14.3, 0, -1],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 23,
            machine_name: "MACHINE 23",
            position: [14.3, 0, 0.6],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 24,
            machine_name: "MACHINE 24",
            position: [14.3, 0, 2.2],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 25,
            machine_name: "MACHINE 25",
            position: [14.3, 0, 3.8],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 26,
            machine_name: "MACHINE 26",
            position: [14.3, 0, 5.4],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 27,
            machine_name: "MACHINE 27",
            position: [14.3, 0, -2.6],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 28,
            machine_name: "MACHINE 28",
            position: [-0.4, 0, 9.3],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 29,
            machine_name: "MACHINE 29",
            position: [-0.4, 0, 10.9],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        },
        {
            machine_id: 30,
            machine_name: "MACHINE 30",
            position: [-0.4, 0, 12.5],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
            show_card: false
        }
    ])


    const [apiData, setApiData] = useState([]);
    // const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch("http://192.168.88.62:8074/api/machines-public", {headers: {"X-API-KEY": "jPaR07aU3A9dif9t0lYm"}}); // ganti dengan URL API kamu
            const result = await response.json();
            // Pastikan response sesuai struktur, misalnya result.DATA adalah array
            if (result.MESSAGETYPE === "S" && Array.isArray(result.DATA)) {
                setApiData(result.DATA);
            }
            } catch (error) {
            console.error("Error fetching API data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const combined = machineData.map((machine) => {
          const matched = apiData.find((item) => item.Id === machine.machine_id);
          return matched ? { ...machine, ...matched } : machine;
        });
        setMachineData(combined);
    }, [apiData]);


    console.log('combinedData', machineData);

    const conveyorData = [
        {
            conveyor_id: 1,
            conveyor_name: "CONVEYOR 1",
            position: [-6.5, 0, -8.5],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 2,
            conveyor_name: "CONVEYOR 2",
            position: [-6.5, 0, -6.9],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 3,
            conveyor_name: "CONVEYOR 3",
            position: [-6.5, 0, -5.3],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 4,
            conveyor_name: "CONVEYOR 4",
            position: [-6.5, 0, -3.7],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 5,
            conveyor_name: "CONVEYOR 5",
            position: [-6.5, 0, -2.1],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 6,
            conveyor_name: "CONVEYOR 6",
            position: [-6.5, 0, -0.5],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 7,
            conveyor_name: "CONVEYOR 7",
            position: [-6.5, 0, 1.1],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 8,
            conveyor_name: "CONVEYOR 8",
            position: [-6.5, 0, 2.7],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 9,
            conveyor_name: "CONVEYOR 9",
            position: [-6.5, 0, 4.3],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 10,
            conveyor_name: "CONVEYOR 10",
            position: [-6.5, 0, 5.9],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 11,
            conveyor_name: "CONVEYOR 11",
            position: [1.3, 0, -8.5],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 12,
            conveyor_name: "CONVEYOR 12",
            position: [1.3, 0, -6.9],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 13,
            conveyor_name: "CONVEYOR 13",
            position: [1.3, 0, -5.3],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 14,
            conveyor_name: "CONVEYOR 14",
            position: [1.3, 0, -3.7],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 15,
            conveyor_name: "CONVEYOR 15",
            position: [1.3, 0, -2.1],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 16,
            conveyor_name: "CONVEYOR 16",
            position: [1.3, 0, -0.4],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 17,
            conveyor_name: "CONVEYOR 17",
            position: [1.3, 0, 1.2],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 18,
            conveyor_name: "CONVEYOR 18",
            position: [1.3, 0, 2.8],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 19,
            conveyor_name: "CONVEYOR 19",
            position: [1.3, 0, 4.4],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 20,
            conveyor_name: "CONVEYOR 20",
            position: [1.3, 0, 6],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 21,
            conveyor_name: "CONVEYOR 21",
            position: [13, 0, -4],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 22,
            conveyor_name: "CONVEYOR 22",
            position: [13, 0, -2.4],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 23,
            conveyor_name: "CONVEYOR 23",
            position: [13, 0, -0.8],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 24,
            conveyor_name: "CONVEYOR 24",
            position: [13, 0, 0.8],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 25,
            conveyor_name: "CONVEYOR 25",
            position: [13, 0, 2.4],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 26,
            conveyor_name: "CONVEYOR 26",
            position: [13, 0, 4],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 27,
            conveyor_name: "CONVEYOR 27",
            position: [13, 0, 5.6],
            rotate: "-180",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 28,
            conveyor_name: "CONVEYOR 28",
            position: [1.3, 0, 10.5],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 29,
            conveyor_name: "CONVEYOR 29",
            position: [1.3, 0, 12.1],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        },
        {
            conveyor_id: 30,
            conveyor_name: "CONVEYOR 30",
            position: [1.3, 0, 13.7],
            rotate: "0",
            scale: [0.2, 0.2, 0.2],
        }
    ]

    

      

    const animatedLight = useRef()
    // const {scene} = useGLTF("models/moulding-floor.glb")
    const {scene} = useGLTF("models/floorV2.glb")
    const shadowBias = -0.005;
    const shadowMapSize = 2048;
    return (
        <>
            <CameraControls />
            {/* <ambientLight intensity={0.1} /> */}
            <directionalLight position={[6, 4, 6]} intensity={3} color="white" />
            <group scale={0.66}>
                <primitive object={scene} />
                <group position={[5.5, 0.5, -1.2]}>
                    <pointLight
                        intensity={3}
                        distance={15}
                        decay={3}
                        color="#4124c9" // blue
                    />
                    <Box scale={0.1} visible={false}>
                        <meshBasicMaterial color="white" />
                    </Box>
                </group>
                <group position={[-3, 3, -2]}>
                    <pointLight
                        intensity={3}
                        decay={3}
                        distance={6}
                        color="#a5adff" // purple
                    />
                    <Box scale={0.1} visible={false}>
                        <meshBasicMaterial color="white" />
                    </Box>
                    </group>

                    <group position={[0, 2.5, 0.5]} ref={animatedLight}>
                    <pointLight
                        intensity={0.9}
                        decay={2}
                        distance={10}
                        castShadow
                        color="#f7d216" // Orange
                        shadow-bias={shadowBias}
                        shadow-mapSize-width={shadowMapSize}
                        shadow-mapSize-height={shadowMapSize}
                    />
                    <Box scale={0.1} visible={false}>
                        <meshBasicMaterial color="white" />
                    </Box>
                </group>





                {/* area one */}
                {machineData.map((item) => (
                    <group key={item.machine_id} position={item.position} scale={item.scale} onClick={(e) => {
                        e.stopPropagation(); // Menghentikan propagasi event ke objek lain
                        toggleCard(item.machine_id);
                      }}>
                        <SumitomoMoldingMachine key={item.machine_id} mode={item.mode} rotate={item.rotate} machine_id={item.machine_id} machine_name={item.machine_name} machine_status={item.machine_status} />
                        {item.show_card && <MachineCard position={[-2, 8, -3]} status={1} output={2} mode={"green"} machine_name={item.machine_name} total_output={item.total_output} dailyplan_qty={item.dailyplan_qty} total_ng={item.total_ng}  />}
                    </group>
                ))}

                {conveyorData.map((item) => (
                    <group key={item.conveyor_id} position={item.position} scale={item.scale}>
                        <SumitomoMoldingConveyor key={item.conveyor_id} mode={item.mode} rotate={item.rotate} />
                    </group>
                ))}

                {/* <group position={[-4.8, 0, -8.7]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingMachine key={"green"} mode={"green"} rotate={-180} />
                    {showCard.green && (<MachineCard position={[-2, 8, -3]} status={1} output={2} mode={"green"} />)}
                    
                </group>
                <group position={[-6.5, 0, -8.5]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, -7.1]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"yellow"} mode={"yellow"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, -6.9]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, -5.5]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, -5.3]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, -3.9]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, -3.7]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, -2.3]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, -2.1]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, -0.7]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, -0.5]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, 0.9]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, 1.1]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, 2.5]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, 2.7]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, 4.1]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, 4.3]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[-4.8, 0, 5.7]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[-6.5, 0, 5.9]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group> */}
                {/* end one */}

                {/* area two */}
                {/* <group position={[-0.4, 0, -9.7]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, -8.5]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, -8.1]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, -6.9]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, -6.5]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, -5.3]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, -4.9]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, -3.7]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, -3.3]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, -2.1]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, -1.6]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, -0.4]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, 0]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, 1.2]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, 1.6]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, 2.8]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, 3.2]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, 4.4]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, 4.8]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, 6]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group> */}
                {/* end two */}

                {/* area three */}
                {/* <group position={[14.3, 0, -4.2]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[13, 0, -4]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[14.3, 0, -2.6]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[13, 0, -2.4]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[14.3, 0, -1]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[13, 0, -0.8]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[14.3, 0, 0.6]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[13, 0, 0.8]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[14.3, 0, 2.2]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[13, 0, 2.4]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[14.3, 0, 3.8]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[13, 0, 4]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group>
                <group position={[14.3, 0, 5.4]} scale={[0.2, 0.2, 0.2]}>
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={-180} />
                </group>
                <group position={[13, 0, 5.6]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={-180} />
                </group> */}
                {/* end three */}

                {/* area four */}
                {/* <group position={[-0.4, 0, 9.3]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, 10.5]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, 10.9]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, 12.1]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group>
                <group position={[-0.4, 0, 12.5]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")} >
                    <SumitomoMoldingMachine key={"red"} mode={"red"} rotate={0} />
                </group>
                <group position={[1.3, 0, 13.7]} scale={[0.2, 0.2, 0.2]} onClick={() => toggleCard("green")}>
                    <SumitomoMoldingConveyor key={"a"} mode={"a"} rotate={0} />
                </group> */}
                {/* end area four */}
            </group>

        </>
    )
}

useGLTF.preload("models/moulding-floor.glb")