import { createContext, useContext, useState, type ReactNode, useMemo } from "react";

// 1. Define strict types
interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  duration: string;
}

interface MusicContextType {
  allSongs: Song[];
  currentTrack: Song;
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  handlePlaylist: (song: Song, index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  formatTime: (time: number) => string;
  play: () => void;
  pause: () => void;
  setDuration: (d: number) => void;
  setCurrentTime: (t: number) => void;
  setVolume: (v: number) => void;
}

const SONGS: Song[] = [
  { id: 1, title: "Keep You Away", artist: "EchoBR", url: "/songs/Keep You Away.wav", duration: "4:32" },
  { id: 2, title: "Breaching", artist: "EchoBR", url: "/songs/Breaching.wav", duration: "3:45" },
  { id: 3, title: "Forgotten Memories", artist: "EchoBR", url: "/songs/Forgotten Memories.wav", duration: "3:12" },
  { id: 4, title: "Glacier Blue", artist: "EchoBR", url: "/songs/Glacier Blue.wav", duration: "3:28" },
  { id: 5, title: "In Love", artist: "EchoBR", url: "/songs/In Love.wav", duration: "3:15" }
];

export const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [allSongs] = useState<Song[]>(SONGS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Song>(SONGS[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlaylist = (song: Song, index: number) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(true); // Usually you want to play when selecting
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % allSongs.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(allSongs[nextIndex]);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    const nextIndex = currentTrackIndex === 0 ? allSongs.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(allSongs[nextIndex]);
    setIsPlaying(false);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time) || time === undefined) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const value = useMemo(() => ({
    allSongs,
    currentTrack,
    currentTrackIndex,
    currentTime,
    duration,
    isPlaying,
    volume,
    handlePlaylist,
    nextTrack,
    prevTrack,
    formatTime,
    play,
    pause,
    setDuration,
    setCurrentTime,
    setVolume
  }), [allSongs, currentTrack, currentTrackIndex, currentTime, duration, isPlaying, volume]);

  return <MusicContext value={value}>{children}</MusicContext>;
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
