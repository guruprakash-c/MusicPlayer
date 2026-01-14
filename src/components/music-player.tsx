import { useEffect, useRef, type ChangeEvent } from "react";
import { useMusic } from "../hooks/useMusic";

export default function MusicPlayer() {
    const {currentTrack, currentTime, formatTime, duration, setDuration, setCurrentTime, nextTrack, prevTrack,play, pause, isPlaying, volume, setVolume } = useMusic();
    const audioRef = useRef(null);

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const audio = audioRef.current;
        if(!audio) return;
        //const target = e.target as HTMLInputElement;
        const newTime = parseFloat(e.target.value);
        (audio as HTMLMediaElement).currentTime = newTime;
        setCurrentTime(newTime);
    };
    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        (audio as HTMLMediaElement).volume = volume;
    },[volume])

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        if(isPlaying) (audio as HTMLMediaElement).play().catch((err) => console.error(err));
        else (audio as HTMLMediaElement).pause();

    },[isPlaying])

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        const handleLoadedMetaData = () :void => {
            setDuration((audio as HTMLMediaElement).duration);
        };
        const handleTimeUpdate = () :void  => {
            setCurrentTime((audio as HTMLMediaElement).currentTime);
        };
        const handleEnded = () :void  => {
            nextTrack()
        };

        (audio as HTMLMediaElement).addEventListener("loadedmetadata", handleTimeUpdate);
        (audio as HTMLMediaElement).addEventListener("canplay", handleTimeUpdate);
        (audio as HTMLMediaElement).addEventListener("timeupdate", handleTimeUpdate);
        (audio as HTMLMediaElement).addEventListener("ended", handleEnded);


        return () :void  => {
            (audio as HTMLMediaElement).removeEventListener("loadedmetadata", handleLoadedMetaData);
            (audio as HTMLMediaElement).removeEventListener("canplay", handleTimeUpdate);
            (audio as HTMLMediaElement).removeEventListener("timeupdate", handleTimeUpdate);
            (audio as HTMLMediaElement).removeEventListener("ended", handleEnded);

        }
    }, [setDuration, setCurrentTime, currentTrack, nextTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;
        (audio as HTMLMediaElement).load();
        setCurrentTime(0);
        setDuration(0);
    },[currentTrack, setCurrentTime, setDuration]);

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    const progressStyle = {
        '--progress': `${progressPercentage}%`,
    } as React.CSSProperties;
    return(
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous"/>
            <div className="track-info">
                <h3 className="track-title">{currentTrack.title}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
            </div>
            <div className="progress-container">
                <span className="time">{formatTime(currentTime)}</span>
                <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime || 0} className="progress-bar" onChange={() => handleTimeChange} onInput={() => handleTimeChange} style={progressStyle} />
                <span className="time">{formatTime(duration)}</span>
            </div>
            <div className="controls">
                <button className="control-btn" onClick={() => prevTrack()}>⏮</button>
                <button className="control-btn play-btn" onClick={() => isPlaying ? pause() : play() }>
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="control-btn" onClick={() => nextTrack()}>⏭</button>
            </div>
            <div className="volume-container">
                <span className="volume-icon">🔊</span>
                <input type="range" min="0" max="1" step="0.1" onChange={() => handleVolumeChange} value={volume} className="volume-bar" />
            </div>
        </div>
    );
}