export const audios = {
    running: new Audio("/audios/air-conditioner.mp3"),
    alarm: new Audio("/audios/alarm.mp3"),
}

export const playAudio = (audio) => {
    audio.currentTime = 0
    audio.loop = false
    audio.play()

    audio.addEventListener("ended", () => {
        audio.currentTime = 0
        audio.play()
    })
}

export const stopAudio = (audio) => {
    audio.pause()
    audio.currentTime = 0
}
