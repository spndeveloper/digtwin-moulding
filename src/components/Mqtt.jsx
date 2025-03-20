import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const useMqtt = (brokerUrl, topic) => {
    const [message, setMessage] = useState(null);
    const [currentTopic, setCurrentTopic] = useState(null);

    useEffect(() => {
        const client = mqtt.connect(brokerUrl);

        client.on('connect', () => {
            console.log('Connected to MQTT Broker');
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Subscribed to ${topic}`);
                    setCurrentTopic(topic); // Simpan topic setelah berhasil subscribe
                }
            });
        });

        client.on('message', (receivedTopic, payload) => {
            if (receivedTopic === topic) {
                const message = payload.toString();
                setMessage(message);
                setCurrentTopic(receivedTopic);
                console.log(`Received message on ${receivedTopic}: ${message}`);
            }
        });

        client.on('error', (err) => {
            console.error('Connection error: ', err);
            client.end();
        });

        client.on('close', () => {
            console.log('Connection closed');
        });

        return () => {
            client.end();
        };
    }, [brokerUrl, topic]);

    return { message, topic: currentTopic };
};

export default useMqtt;