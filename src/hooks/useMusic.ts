import { useState } from "react";

const songs = [
  {
    id: 1,
    title: "Keep You Away",
    artist: "EchoBR",
    url: "/songs/Keep You Away.wav",
    duration: "4:32",
  },
  {
    id: 2,
    title: "Breaching",
    artist: "EchoBR",
    url: "/songs/Breaching.wav",
    duration: "3:45",
  },
  {
    id: 3,
    title: "Forgotten Memories",
    artist: "EchoBR",
    url: "/songs/Forgotten Memories.wav",
    duration: "3:12",
  },
  {
    id: 4,
    title: "Glacier Blue",
    artist: "EchoBR",
    url: "/songs/Glacier Blue.wav",
    duration: "3:28",
  },
  {
    id: 5,
    title: "In Love",
    artist: "EchoBR",
    url: "/songs/In Love.wav",
    duration: "3:15",
  }
];

export const useMusic = () => {
    const [allSongs, setAllSongs]  = useState(songs); 
    const [currentTrack, setCurrentTrack]  = useState(songs[0]); 
    const [currentTrackIndex, setCurrentTrackIndex]  = useState(0);
    const [currentTime, setCurrentTime]  = useState(0);
    const [duration, setDuration]  = useState(0);
    const [isPlaying, setIsPlaying]  = useState(false);
    const [volume, setVolume]  = useState(1);

    const handlePlaylist = (song:any, index:number) =>{
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
    }

    const nextTrack = () => {
      setCurrentTrackIndex((prev) => {
        const nextIndex = (prev + 1) % allSongs.length;
        setCurrentTrack(allSongs[nextIndex]);
        return nextIndex;
      });
      setIsPlaying(false);
    };

    const prevTrack = () => {
      setCurrentTrackIndex((prev) => {
        const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
        setCurrentTrack(allSongs[nextIndex]);
        return nextIndex;
      });
      setIsPlaying(false);
    };

    const formatTime = (time:number) => {
        if(isNaN(time) || time === undefined) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2,"0")}`;
    }

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);

    return { allSongs, handlePlaylist, currentTrack, currentTrackIndex, currentTime, formatTime, duration, setDuration, setCurrentTime, nextTrack, prevTrack, play, pause, isPlaying, volume, setVolume}
}