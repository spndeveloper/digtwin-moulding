import { Html, Box, CameraControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { SumitomoMoldingMachine } from "./SumitomoMoldingMachine";
import { SumitomoMoldingConveyor } from "./SumitomoMoldingConveyor";
import { Operator } from "./Operator";
import { Technician } from "./Technician";
import { OperatorTable } from "./OperatorTable";
import { PcbLoader } from "./PcbLoader";
import { ConveyorPcbLoader } from "./ConveyorPcbLoader";
import { MagazineConveyor } from "./MagazineConveyor";
import { MachineCard } from "./MachineCard";
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import useMqtt from "./Mqtt";
import mqtt from "mqtt";

import { Button3D } from "./Button3D";
import { set } from "lodash";

export const Floor = ({ selectedMode }) => {
  const MQTT_BROKER_URL = "ws://192.168.88.62:9001/mqtt";
  const TOPIC_PREFIX = "1/#";

  const [client, setClient] = useState(null);

  const toggleCard = (id) => {
    // console.log(id);

    setMachineData((prevData) =>
      prevData.map((machine) =>
        machine.machine_id === id
          ? { ...machine, show_card: !machine.show_card }
          : machine
      )
    );
  };

  // MQTT Client
  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER_URL);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(TOPIC_PREFIX, (err) => {
        if (!err) {
          console.log(`Subscribed to topic ${TOPIC_PREFIX}`);
        } else {
          console.error("Failed to subscribe:", err);
        }
      });
    });

    client.on("message", (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);

      try {
        const strMessage = message.toString();
        const machineName = topic.split("/").pop();

        setMachineData((prevData) =>
          prevData.map((m) =>
            m.machine_name === machineName
              ? {
                  ...m,
                  machine_status: strMessage,
                  show_card: strMessage === "MERAH",
                }
              : m
          )
        );
      } catch (error) {
        console.error("Error parsing MQTT message:", error);
      }
    });

    setClient(client);

    return () => {
      client.end();
    };
  }, []);

  const sendMessage = (machineId, message) => {
    if (client) {
      const topic = `1/MACHINE ${machineId}`;
      client.publish(topic, message, { qos: 0, retain: false }, (err) => {
        if (err) {
          console.error("Failed to publish message:", err);
        } else {
          console.log(`Message sent to ${topic}: ${message}`);
        }
      });
    } else {
      console.error("MQTT client is not connected");
    }
  };

  const [machineData, setMachineData] = useState([
    {
      machine_id: 1,
      machine_name: "MACHINE 1",
      position: [-4.8, 0, -8.7],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 2,
      machine_name: "MACHINE 2",
      position: [-4.8, 0, -7.1],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 3,
      machine_name: "MACHINE 3",
      position: [-4.8, 0, -5.5],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 4,
      machine_name: "MACHINE 4",
      position: [-4.8, 0, -3.9],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 5,
      machine_name: "MACHINE 5",
      position: [-4.8, 0, -2.3],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 6,
      machine_name: "MACHINE 6",
      position: [-4.8, 0, -0.7],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 7,
      machine_name: "MACHINE 7",
      position: [-4.8, 0, 0.9],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 8,
      machine_name: "MACHINE 8",
      position: [-4.8, 0, 2.5],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 9,
      machine_name: "MACHINE 9",
      position: [-4.8, 0, 4.1],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 10,
      machine_name: "MACHINE 10",
      position: [-4.8, 0, 5.7],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 11,
      machine_name: "MACHINE 11",
      position: [-0.4, 0, -10.2],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 12,
      machine_name: "MACHINE 12",
      position: [-0.4, 0, -8.6],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 13,
      machine_name: "MACHINE 13",
      position: [-0.4, 0, -7],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 14,
      machine_name: "MACHINE 14",
      position: [-0.4, 0, -5.4],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 15,
      machine_name: "MACHINE 15",
      position: [-0.4, 0, -3.8],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 16,
      machine_name: "MACHINE 16",
      position: [-0.4, 0, -2.2],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 17,
      machine_name: "MACHINE 17",
      position: [-0.4, 0, -0.6],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 18,
      machine_name: "MACHINE 18",
      position: [-0.4, 0, 1],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 19,
      machine_name: "MACHINE 19",
      position: [-0.4, 0, 2.6],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 20,
      machine_name: "MACHINE 20",
      position: [-0.4, 0, 4.2],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 21,
      machine_name: "MACHINE 21",
      position: [-0.4, 0, 5.8],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 22,
      machine_name: "MACHINE 22",
      position: [14.3, 0, -6],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 23,
      machine_name: "MACHINE 23",
      position: [14.3, 0, -4.4],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 24,
      machine_name: "MACHINE 24",
      position: [14.3, 0, -2.8],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 25,
      machine_name: "MACHINE 25",
      position: [14.3, 0, -1.2],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 26,
      machine_name: "MACHINE 26",
      position: [14.3, 0, 0.4],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 27,
      machine_name: "MACHINE 27",
      position: [14.3, 0, 2],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 28,
      machine_name: "MACHINE 28",
      position: [14.3, 0, 3.6],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 29,
      machine_name: "MACHINE 29",
      position: [14.3, 0, 5.2],
      rotate: "-180",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 30,
      machine_name: "MACHINE 30",
      position: [-3.5, 0, 9.9],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 31,
      machine_name: "MACHINE 31",
      position: [-3.5, 0, 11.5],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
    {
      machine_id: 32,
      machine_name: "MACHINE 32",
      position: [-3.5, 0, 13.1],
      rotate: "0",
      scale: [0.2, 0.2, 0.2],
      show_card: false,
    },
  ]);

  const [apiData, setApiData] = useState([]);
  const [dataMachineIndiCator, setDataMachineIndiCator] = useState([]);

  const fetchDataMachineIdicator = async () => {
    try {
      const response = await fetch(
        "http://192.168.88.62:40000/api/master/list_master_machine_online_indicator?div_id=1",
        {
          headers: {
            "X-API-KEY": "jPaR07aU3A9dif9t0lYm",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.status_code === 200) {
        const updateData = result.data.list_machine_online_indicator.map(
          (dt) => ({
            ...dt,
            show_card: ["A", "T", "M"].includes(dt.code),
          })
        );
        setDataMachineIndiCator(updateData);


        const updatedOperatorData = operatorData.map((operator) => {
          // Cari data mesin yang id-nya cocok
          const matchingMachine = result.data.list_machine_online_indicator.find((dt) => {
            const machineId = parseInt(dt.machine_name.split(" ")[1]);
            return machineId === operator.id;
          });
        
          // Kalau ketemu, cek apakah code-nya "R"
          return {
            ...operator,
            isRun: matchingMachine?.code === "R"
          };
        });
        
        // console.log("🧧", updatedOperatorData);
        setOperatorData(updatedOperatorData);

        // console.log("🧧aa", result.data.list_machine_online_indicator);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOutputMachine = async () => {
    try {
      const response = await fetch(
        "http://192.168.88.62:8074/api/machines-public",
        { headers: { "X-API-KEY": "jPaR07aU3A9dif9t0lYm" } }
      ); // ganti dengan URL API kamu
      const result = await response.json();
      if (result.MESSAGETYPE === "S" && Array.isArray(result.DATA)) {
        setApiData(result.DATA);
      }
    } catch (error) {
      console.log("error fatch output machine ", error);
    }
  };

  useEffect(() => {
    fetchOutputMachine();
    fetchDataMachineIdicator();
  
    const intervalId = setInterval(() => {
      fetchOutputMachine();
      fetchDataMachineIdicator();
    }, 600000); 
  

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const combined = machineData.map((machine) => {
      const matched = apiData.find((item) => item.Id === machine.machine_id);
      const machineIndicator = dataMachineIndiCator.find(
        (machineI) => machineI.machine_name === machine.machine_name
      );
      return matched
        ? { ...machine, ...matched, ...machineIndicator }
        : machine;
    });
    console.log("Duarrrr", combined);

    setMachineData(combined);
  }, [apiData, dataMachineIndiCator]);

  const conveyorData = [
    {
      conveyor_id: 1,
      conveyor_name: "CONVEYOR 1",
      position: [-6, 0, -8.6],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 2,
      conveyor_name: "CONVEYOR 2",
      position: [-6, 0, -7],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 3,
      conveyor_name: "CONVEYOR 3",
      position: [-6, 0, -5.4],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 4,
      conveyor_name: "CONVEYOR 4",
      position: [-6, 0, -3.8],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 5,
      conveyor_name: "CONVEYOR 5",
      position: [-6, 0, -2.2],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 6,
      conveyor_name: "CONVEYOR 6",
      position: [-6, 0, -0.6],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 7,
      conveyor_name: "CONVEYOR 7",
      position: [-6, 0, 1],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 8,
      conveyor_name: "CONVEYOR 8",
      position: [-6, 0, 2.6],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 9,
      conveyor_name: "CONVEYOR 9",
      position: [-6, 0, 4.2],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 10,
      conveyor_name: "CONVEYOR 10",
      position: [-6, 0, 5.8],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 11,
      conveyor_name: "CONVEYOR 11",
      position: [0.8, 0, -10.3],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 12,
      conveyor_name: "CONVEYOR 12",
      position: [0.8, 0, -8.7],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 13,
      conveyor_name: "CONVEYOR 13",
      position: [0.8, 0, -7.1],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 14,
      conveyor_name: "CONVEYOR 14",
      position: [0.8, 0, -5.5],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 15,
      conveyor_name: "CONVEYOR 15",
      position: [0.8, 0, -3.9],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 16,
      conveyor_name: "CONVEYOR 16",
      position: [0.8, 0, -2.3],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 17,
      conveyor_name: "CONVEYOR 17",
      position: [0.8, 0, -0.7],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 18,
      conveyor_name: "CONVEYOR 18",
      position: [0.8, 0, 0.9],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 19,
      conveyor_name: "CONVEYOR 19",
      position: [0.8, 0, 2.5],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 20,
      conveyor_name: "CONVEYOR 20",
      position: [0.8, 0, 4.1],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 21,
      conveyor_name: "CONVEYOR 21",
      position: [0.8, 0, 5.7],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 22,
      conveyor_name: "CONVEYOR 22",
      position: [13.1, 0, -5.9],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 23,
      conveyor_name: "CONVEYOR 23",
      position: [13.1, 0, -4.3],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 24,
      conveyor_name: "CONVEYOR 24",
      position: [13.1, 0, -2.7],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 25,
      conveyor_name: "CONVEYOR 25",
      position: [13.1, 0, -1.1],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 26,
      conveyor_name: "CONVEYOR 26",
      position: [13.1, 0, 0.5],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 27,
      conveyor_name: "CONVEYOR 27",
      position: [13.1, 0, 2.1],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 28,
      conveyor_name: "CONVEYOR 28",
      position: [13.1, 0, 3.7],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 29,
      conveyor_name: "CONVEYOR 29",
      position: [13.1, 0, 5.3],
      rotate: "-180",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 30,
      conveyor_name: "CONVEYOR 30",
      position: [-2.3, 0, 9.8],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 31,
      conveyor_name: "CONVEYOR 31",
      position: [-2.3, 0, 11.4],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
    {
      conveyor_id: 32,
      conveyor_name: "CONVEYOR 32",
      position: [-2.3, 0, 13],
      rotate: "0",
      scale: [0.17, 0.17, 0.17],
    },
  ];

  const [buzzerData, setBuzzerData] = useState([
    {
      id: 1,
      position: [-5.94, 0.02, -10.58],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 2,
      position: [-5.94, 0.02, -8.99],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 3,
      position: [-5.94, 0.02, -7.38],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 4,
      position: [-5.94, 0.02, -5.79],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 5,
      position: [-5.94, 0.02, -4.2],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 6,
      position: [-5.94, 0.02, -2.6],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 7,
      position: [-5.94, 0.02, -0.999],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 8,
      position: [-5.94, 0.02, 0.6],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 9,
      position: [-5.94, 0.02, 2.22],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 10,
      position: [-5.94, 0.02, 3.82],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 11,
      position: [-1.25, 0.02, -10.4],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 12,
      position: [-1.25, 0.02, -8.8],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 13,
      position: [-1.25, 0.02, -7.2],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 14,
      position: [-1.25, 0.02, -5.6],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 15,
      position: [-1.25, 0.02, -4],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 16,
      position: [-1.25, 0.02, -2.4],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 17,
      position: [-1.25, 0.02, -0.8],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 18,
      position: [-1.25, 0.02, 0.8],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 19,
      position: [-1.25, 0.02, 2.4],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 20,
      position: [-1.25, 0.02, 4],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 21,
      position: [-1.25, 0.02, 5.6],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 22,
      position: [13.15, 0.02, -7.8],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 23,
      position: [13.15, 0.02, -6.2],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 24,
      position: [13.15, 0.02, -4.6],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 25,
      position: [13.15, 0.02, -3],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 26,
      position: [13.15, 0.02, -1.4],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 27,
      position: [13.15, 0.02, 0.2],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 28,
      position: [13.15, 0.02, 1.8],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 29,
      position: [13.15, 0.02, 3.4],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 30,
      position: [-4.3, 0.02, 9.7],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 31,
      position: [-4.3, 0.02, 11.3],
      color: "#f39c12",
      buzzer: false,
    },
    {
      id: 32,
      position: [-4.3, 0.02, 12.9],
      color: "#f39c12",
      buzzer: false,
    },
  ]);

  const handleBuzzer = (id, buzzer) => {
    setBuzzerData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, buzzer: !item.buzzer } : item
      )
    );

    if (!buzzer) {
      sendMessage(id, "alarm_on");
    } else {
      sendMessage(id, "alarm_off");
    }
  };

  const [operatorTableData, setOperatorTableData] = useState([
    {
      id: 1,
      position: [-7.5,-0.02,-11.7],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 2,
      position: [-7.5,-0.02,-10.1],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 3,
      position: [-7.5,-0.02,-8.5],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 4,
      position: [-7.5,-0.02,-6.9],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 5,
      position: [-7.5,-0.02,-5.3],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 6,
      position: [-7.5,-0.02,-3.7],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 7,
      position: [-7.5,-0.02,-2.1],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,
    {
      id: 8,
      position: [-7.5,-0.02,-0.5],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 9,
      position: [-7.5,-0.02,1.1],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 10,
      position: [-7.5,-0.02,2.7],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },
    {
      id: 11,
      position: [2.3,-0.02,-7.2],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    },{
      id: 12,
      position: [2.3,-0.02,-5.6],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    },{
      id: 13,
      position: [2.3,-0.02,-4],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 14,
      position: [2.3,-0.02,-2.4],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 15,
      position: [2.3,-0.02,-0.8],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 16,
      position: [2.3,-0.02,0.8],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 17,
      position: [2.3,-0.02,2.4],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 18,
      position: [2.3,-0.02,4],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 19,
      position: [2.3,-0.02,5.6],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 20,
      position: [2.3,-0.02,7.2],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 21,
      position: [2.3,-0.02,8.8],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 22,
      position: [11.6,-0.02,-9],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 23,
      position: [11.6,-0.02,-7.4],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 24,
      position: [11.6,-0.02,-5.8],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 25,
      position: [11.6,-0.02,-4.2],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 26,
      position: [11.6,-0.02,-2.6],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 27,
      position: [11.6,-0.02,-1],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 28,
      position: [11.6,-0.02,0.6],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 29,
      position: [11.6,-0.02,2.2],
      rotate: -90,
      scale: [0.2, 0.2, 0.2],
    },{
      id: 30,
      position: [-0.8,-0.02,12.9],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 31,
      position: [-0.8,-0.02,14.5],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
    ,{
      id: 32,
      position: [-0.8,-0.02,16.1],
      rotate: 90,
      scale: [0.2, 0.2, 0.2],
    }
  ])

  const [operatorData, setOperatorData] = useState([
    {
      id: 1,
      position: [-7.2,0,-8.2],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 2,
      position: [-7.2,0,-6.6],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 3,
      position: [-7.2,0,-5],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 4,
      position: [-7.2,0,-3.4],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 5,
      position: [-7.2,0,-1.8],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 6,
      position: [-7.2,0,-0.2],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 7,
      position: [-7.2,0,1.4],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 8,
      position: [-7.2,0,3],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 9,
      position: [-7.2,0,4.6],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 10,
      position: [-7.2,0,6.2],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 11,
      position: [2,0,-10.7],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 12,
      position: [2,0,-9.1],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 13,
      position: [2,0,-7.5],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 14,
      position: [2,0,-5.9],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 15,
      position: [2,0,-4.3],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 16,
      position: [2,0,-2.7],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 17,
      position: [2,0,-1.1],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 18,
      position: [2,0,0.5],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 19,
      position: [2,0,2.1],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 20,
      position: [2,0,3.7],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 21,
      position: [2,0,5.3],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 22,
      position: [11.9,0,-5.5],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 23,
      position: [11.9,0,-3.9],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 24,
      position: [11.9,0,-2.3],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 25,
      position: [11.9,0,-0.7],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 26,
      position: [11.9,0,0.9],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 27,
      position: [11.9,0,2.5],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 28,
      position: [11.9,0,4.1],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 29,
      position: [11.9,0,5.8],
      rotate: 180,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 30,
      position: [-1,0,9.4],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 31,
      position: [-1,0,11],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
    {
      id: 32,
      position: [-1,0,12.6],
      rotate: 0,
      scale: [.45, .45, .45],
      isRun: false,
    },
  ])

  const animatedLight = useRef();
  const { scene } = useGLTF("models/floorV4.glb");
  const shadowBias = -0.005;
  const shadowMapSize = 2048;

  const modalCardPosition = (id, rotate, position) => {
    if (rotate === "-180") {
      return [-2, 8, -3];
    } else {
      if (id === 11) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 12];
      }
      if (id === 12) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 11];
      }
      if (id === 13) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 9];
      }
      if (id === 14) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 7.5];
      }
      if (id === 15) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 6];
      }
      if (id === 16) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 4.2];
      }
      if (id === 17) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 2.8];
      }
      if (id === 18) {
        return [position[0] + 1, position[1] + 8.4, position[2] + 1];
      }
      if (id === 19) {
        return [position[0] + 1, position[1] + 8.4, position[2] - 0.2];
      }
      if (id === 20) {
        return [position[0] + 1, position[1] + 8.4, position[2] - 2.5];
      }
      if (id === 28) {
        return [position[0] + 1, position[1] + 8.4, position[2] - 7];
      }
      if (id === 29) {
        return [position[0] + 1, position[1] + 8.4, position[2] - 8];
      }
      if (id === 30) {
        return [position[0] + 1, position[1] + 8.4, position[2] - 9];
      }
      if (id === 31) {
        return [position[0] + 6, position[1] + 8.4, position[2] - 7];
      }
      if (id === 32) {
        return [position[0] + 6, position[1] + 8.4, position[2] - 8.5];
      }
      return [position[0], position[1], position[2]];
    }

    // if(id === 11){
    //     return [position[0], position[1], position[2]]
    // }

    // if(rotate === '-180'){
    //     return [-2, 8, -3]
    // }else{
    //     return [position[0]+8, position[1]+10, position[2]]
    // }
  };


  const [technicianData, setTechnicianData] = useState([
    {
      id: 1,
      position: [-5.8,-0.02,-9.8],
      rotate: 0,
      scale: [50, 50, 50],
    }
  ])

  return (
    <>
      <CameraControls />
      <ambientLight color="white" intensity={0.1} />
      <directionalLight position={[10, 10, 10]} intensity={4} color="white" />
      <group scale={0.66}>
        <primitive object={scene} castShadow receiveShadow />
        <group position={[5.5, 0.5, -1.2]}>
          {/* <pointLight
                        intensity={3}
                        distance={15}
                        decay={3}
                        color="#4124c9" // blue
                    /> */}
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
        {machineData.map((item, index) => (
          <group
            key={item.machine_id}
            position={item.position}
            scale={item.scale}
            onClick={(e) => {
              e.stopPropagation();
              toggleCard(item.machine_id);
            }}
          >
            <SumitomoMoldingMachine
              delay={index * 100}
              key={item.machine_id}
              mode={item.mode}
              rotate={item.rotate}
              machine_id={item.machine_id}
              machine_name={item.machine_name}
              machine_status={item.machine_status}
            />
            {item.show_card && (
              <MachineCard
                position={modalCardPosition(
                  item.machine_id,
                  item.rotate,
                  item.position
                )}
                status={1}
                output={2}
                mode={"green"}
                machine_name={item.machine_name}
                total_output={item.total_output}
                dailyplan_qty={item.dailyplan_qty}
                total_ng={item.total_ng}
                machine_status={item.machine_status}
                pass_output={item.pass_output}
                plan_qty={item.plan_qty}
                code={item.code}
                status_name={item.status_name}
                duration_text={item.duration_text}
              />
            )}
          </group>
        ))}

        {conveyorData.map((item) => (
          <group
            key={item.conveyor_id}
            position={item.position}
            scale={item.scale}
          >
            <SumitomoMoldingConveyor
              key={item.conveyor_id}
              mode={item.mode}
              rotate={item.rotate}
            />
          </group>
        ))}

        {buzzerData.map((item) => (
          <group key={item.id} position={item.position}>
            <mesh
              position={[1, 1.1, 1]}
              scale={[0.3, 0.3, 0.3]}
              onClick={(e) => {
                e.stopPropagation();
                handleBuzzer(item.id, item.buzzer);
              }}
            >
              <cylinderGeometry args={[0.2, 0.3, 0.1, 32]} />
              <meshStandardMaterial
                color={item.buzzer ? "#e74c3c" : "#f39c12"}
              />
            </mesh>
            <mesh position={[1, 1.07, 1]} scale={[0.32, 0.32, 0.32]}>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
              <meshStandardMaterial color="black" />
            </mesh>
          </group>
        ))}

        {
          operatorTableData.map((item) => (
            <group key={item.id} position={item.position} scale={item.scale}>
              <OperatorTable rotate={item.rotate}  />
          </group>
          ))
        }

        {operatorData.map((item) => (
            <group key={item.id} position={item.position} scale={item.scale}>
              {item.isRun && (<Operator rotate={item.rotate} isRun={item.isRun} />)}
              
            </group>
          ))}


        {technicianData.map((item) => (
            <group key={item.id} position={item.position} scale={item.scale}>
              <Technician rotate={item.rotate} />
              
            </group>
          ))}

      </group>

      {/* <group key={"adwadwa"} position={[1.3,0,-7.1]} scale={[.3, .3, .3]}>
          <Operator  />
      </group>

      <group key={"adwadwa1"} position={[2,0,-10.1]} scale={[.3, .3, .3]}>
          <Operator  />
      </group> */}
      


      {/* <group key={"technician1"} position={[-0.03,-0.02,-6.1]} scale={[35, 35, 35]}>
          <Technician rotate={"-180"}  />
      </group>
      <group key={"technician2"} position={[-0.03,-0.02,-5.8]} scale={[35, 35, 35]}>
          <Technician rotate={"-180"}  />
      </group> */}

      {/* <group key={"adwadwa1"} position={[-3.2,-0.02,3.7]} scale={[0.13, 0.13, 0.13]}>
          <OperatorTable rotate={"-180"}  />
      </group> */}

      {/* <group key={"adwadwa"} position={[1.7,0.3,3.05]} scale={[0.3, 0.3, 0.3]}>
          <Operator  />
      </group>

      <group key={"adwadwa1"} position={[-0.20,-0.02,3.4]} scale={[0.13, 0.13, 0.13]}>
          <OperatorTable rotate={"-180"}  />
      </group> */}
    </>
  );
};

useGLTF.preload("models/floorV4.glb");
