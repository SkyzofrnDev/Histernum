import React, { useMemo } from "react";
import CardLearn from "../../Components/Card/CardLearn";
import { useMultipleYouTubeVideos } from "../../Hooks/useYouTubeVideo";

// 🔹 Data video - cukup masukkan YouTube URL atau ID
const videoData = [
  {
    id: 1,
    youtubeUrl: "https://youtu.be/S7GVz-YGWrY?si=K1wmw7mk1Z9FGLzh", // URL lengkap
  },
  {
    id: 2,
    youtubeUrl: "dQw4w9WgXcQ", 
  },
  {
    id: 3,
    youtubeUrl: "S7GVz-YGWrY", 
  }
];

const Lesson = () => {
  // Memoize YouTube URLs untuk mencegah re-fetch yang tidak perlu
  const youtubeUrls = useMemo(() => 
    videoData.map(video => video.youtubeUrl), 
    [] // Empty dependency array karena videoData statis
  );
  
  const { videosData, loading, error } = useMultipleYouTubeVideos(youtubeUrls);

  // Show loading only if we don't have any data yet
  if (loading && videosData.length === 0) {
    return (
      <div className="py-20 px-20 space-y-5">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58cc02] mx-auto mb-4"></div>
          <p>Memuat video...</p>
        </div>
      </div>
    );
  }

  if (error && videosData.length === 0) {
    return (
      <div className="py-20 px-20 space-y-5">
        <div className="text-red-400 text-center">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-20 space-y-5">
      {videosData.map((videoResult, index) => {
        const originalVideo = videoData[index];
        
        if (!videoResult.success || !videoResult.data) {
          return (
            <div key={originalVideo.id} className="text-red-400 p-4 border border-red-400 rounded-lg">
              <p>Error loading video: {videoResult.error}</p>
              <p>URL: {originalVideo.youtubeUrl}</p>
            </div>
          );
        }

        const video = videoResult.data;
        
        return (
          <CardLearn
            key={originalVideo.id}
            title={video.title}
            description={video.description || `Video dari ${video.channelTitle}`}
            source={`YouTube: ${video.channelTitle}`}
            imgSrc={video.thumbnail.high || video.thumbnail.medium || video.thumbnail.default}
            link={video.url}
          />
        );
      })}
      
      {/* Show loading indicator for individual videos if still loading */}
      {loading && videosData.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-white">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#58cc02]"></div>
            <span className="text-sm">Memuat video tambahan...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;
