import React, { useState } from 'react';
import { useYouTubeVideo } from '../../Hooks/useYouTubeVideo';

// Component untuk menambahkan video YouTube dengan mudah
const YouTubeVideoAdder = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const { videoData, loading, error } = useYouTubeVideo(videoUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      setIsFetching(true);
      // URL akan di-fetch otomatis oleh hook
    }
  };

  const handleReset = () => {
    setVideoUrl('');
    setIsFetching(false);
  };

  return (
    <div className="bg-[#202f36] p-6 rounded-lg border border-[#37464f]">
      <h3 className="text-white text-xl font-bold mb-4">Tambah Video YouTube</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            YouTube URL atau Video ID:
          </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtu.be/S7GVz-YGWrY atau S7GVz-YGWrY"
            className="w-full px-3 py-2 bg-[#131f24] border border-[#37464f] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#58cc02]"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!videoUrl.trim() || loading}
            className="px-4 py-2 bg-[#58cc02] text-white rounded-md hover:bg-[#4fb302] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Fetching...' : 'Fetch Video'}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#58cc02] mx-auto mb-2"></div>
          <p className="text-white text-sm">Memuat data video...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-4 p-3 bg-red-900 border border-red-600 rounded-md">
          <p className="text-red-300 text-sm">Error: {error}</p>
        </div>
      )}

      {/* Video Data Display */}
      {videoData && !loading && (
        <div className="mt-6 p-4 bg-[#131f24] rounded-lg border border-[#37464f]">
          <h4 className="text-white font-bold mb-3">Video Data:</h4>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-400">Title:</span>
              <span className="text-white ml-2">{videoData.title}</span>
            </div>
            
            <div>
              <span className="text-gray-400">Channel:</span>
              <span className="text-white ml-2">{videoData.channelTitle}</span>
            </div>
            
            <div>
              <span className="text-gray-400">Video ID:</span>
              <span className="text-white ml-2">{videoData.id}</span>
            </div>
            
            <div>
              <span className="text-gray-400">URL:</span>
              <a 
                href={videoData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#58cc02] ml-2 hover:underline"
              >
                {videoData.url}
              </a>
            </div>
          </div>

          {/* Thumbnail Preview */}
          {videoData.thumbnail.high && (
            <div className="mt-4">
              <span className="text-gray-400 text-sm">Thumbnail:</span>
              <img 
                src={videoData.thumbnail.high} 
                alt={videoData.title}
                className="mt-2 w-48 h-36 object-cover rounded-md"
              />
            </div>
          )}

          {/* Code untuk copy-paste */}
          <div className="mt-4 p-3 bg-[#0a0f12] rounded-md">
            <span className="text-gray-400 text-sm">Code untuk ditambahkan ke videoData:</span>
            <pre className="text-xs text-green-400 mt-2 overflow-x-auto">
{`{
  id: ${Date.now()},
  youtubeUrl: "${videoData.id}",
},`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideoAdder;
