'use client'

import { useState, useEffect } from 'react'

interface Track {
  id: string
  title: string
  artist: string
  cover: string
  duration: number
}

const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    duration: 200,
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration: 234,
  },
  {
    id: '3',
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    duration: 182,
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    duration: 203,
  },
  {
    id: '5',
    title: 'Peaches',
    artist: 'Justin Bieber',
    cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
    duration: 198,
  },
]

export default function Home() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= currentTrack.duration) {
          handleNext()
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, currentTrackIndex])

  const currentTrack = MOCK_TRACKS[currentTrackIndex]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % MOCK_TRACKS.length)
    setProgress(0)
  }

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length)
    setProgress(0)
  }

  const toggleFavorite = (trackId: string) => {
    setFavorites(prev =>
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    )
  }

  const filteredTracks = MOCK_TRACKS.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-black flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black text-white">
            <span className="text-green-500">♪</span> Spotify Clone
          </h1>
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-full bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Playlist */}
        <div className="flex-1 overflow-y-auto px-6 py-6 border-r border-slate-800">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4">Now Playing</h2>
            
            {/* Now Playing Card */}
            <div className="bg-gradient-to-br from-green-500/20 to-slate-800 rounded-xl p-6 mb-8 border border-green-500/20">
              <div className="flex gap-6">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-green-500 font-semibold mb-2">Now Playing</p>
                    <h3 className="text-4xl font-bold text-white mb-2">{currentTrack.title}</h3>
                    <p className="text-xl text-slate-400">{currentTrack.artist}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleFavorite(currentTrack.id)}
                      className={`p-3 rounded-full text-2xl ${favorites.includes(currentTrack.id) ? 'text-green-500' : 'text-slate-400 hover:text-white'}`}
                    >
                      {favorites.includes(currentTrack.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={currentTrack.duration}
                  value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>{Math.floor(progress / 60)}:{String(progress % 60).padStart(2, '0')}</span>
                  <span>{Math.floor(currentTrack.duration / 60)}:{String(currentTrack.duration % 60).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <button onClick={handlePrev} className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition text-xl">
                  ⏮️
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-green-500 text-black hover:bg-green-400 transition transform hover:scale-110 text-3xl"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button onClick={handleNext} className="p-3 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition text-xl">
                  ⏭️
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xl">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="text-sm text-slate-400 w-8">{volume}%</span>
              </div>
            </div>

            {/* Playlist */}
            <h2 className="text-2xl font-bold text-white mb-4">Playlist</h2>
            <div className="space-y-2">
              {filteredTracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => setCurrentTrackIndex(index)}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    currentTrackIndex === index
                      ? 'bg-green-500/20 border border-green-500'
                      : 'bg-slate-800/30 hover:bg-slate-800/60 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img src={track.cover} alt={track.title} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{track.title}</p>
                      <p className="text-slate-400 text-sm truncate">{track.artist}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(track.id)
                      }}
                      className="p-2 hover:bg-slate-700 rounded transition text-lg"
                    >
                      {favorites.includes(track.id) ? '❤️' : '🤍'}
                    </button>
                    <p className="text-slate-400 text-sm w-12 text-right">
                      {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:flex md:flex-col w-80 bg-slate-900/50 border-l border-slate-800 p-6 overflow-y-auto">
          <h3 className="text-xl font-bold text-white mb-4">❤️ Favorites</h3>
          <div className="space-y-2">
            {MOCK_TRACKS.filter(t => favorites.includes(t.id)).map(track => (
              <div key={track.id} className="p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/60 transition cursor-pointer" onClick={() => setCurrentTrackIndex(MOCK_TRACKS.indexOf(track))}>
                <p className="text-white font-semibold text-sm truncate">{track.title}</p>
                <p className="text-slate-400 text-xs truncate">{track.artist}</p>
              </div>
            ))}
            {favorites.length === 0 && <p className="text-slate-400 text-sm">No favorites yet</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
