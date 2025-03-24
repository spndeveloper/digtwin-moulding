import { useState } from "react";
import {MACHINE_MODES} from "./PcbLoader"
import { audios, playAudio, stopAudio } from "../utils/AudioManager";

export const UI = ({ selectedMode, setSelectedMode }) => {

    const modeClick = (modes) => {
        stopAudio(audios.running)
        stopAudio(audios.alarm)
        if(modes === "green"){
            playAudio(audios.running);
        }
        if(modes === "yellow"){
            playAudio(audios.alarm);
        }
        setSelectedMode(modes)
    }

    return(
        <>
        <div className={"fixed z-10 bottom-4 left-1/2 flex flex-wrap justify-center items-center gap-2.5 -translate-x-1/2 w-full max-w-[75vw]"}>
            {MACHINE_MODES.map((mode, idx) => (
                <div key={mode} className={`min-w-14 min-h-14 w-14 h-14 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full shadow-md cursor-pointer ${
                    selectedMode === mode
                      ? "ring-4 ring-blue-500"
                      : ""
                  }`}
                onClick={() => modeClick(mode)}>
                    <img
                        src={`/images/${mode}.png`}
                        alt={mode}
                        className="w-full h-full"
                        />
                </div>
            ))}
        </div>
        </>
    );
}