import { BrowserRouter, Route, Routes } from "react-router";
import MusicPlayer from "./components/music-player";
import AllSongs from "./components/all-songs";
import PlayLists from "./components/playlist";


export default function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <main className="app-main">
          {/* Navbar */}
          <div className="player-section">
            <MusicPlayer/>
          </div>
          <div className="content-section">
            <Routes>
              <Route path="/" element={<AllSongs/>} />
              <Route path="/playlists" element={<PlayLists/>} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}
