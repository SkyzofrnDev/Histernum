import { useState, useEffect, useRef } from 'react';
import { youtubeOEmbedFetcher } from '../Utils/youtubeFetcher';

// Custom hook untuk fetch YouTube video data
export const useYouTubeVideo = (videoIdOrUrl) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoIdOrUrl) return;

    const fetchVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        // Extract video ID dari URL atau gunakan langsung jika sudah ID
        const videoId = videoIdOrUrl.includes('youtube.com') || videoIdOrUrl.includes('youtu.be')
          ? youtubeOEmbedFetcher.extractVideoId(videoIdOrUrl)
          : videoIdOrUrl;

        if (!videoId) {
          throw new Error('Video ID tidak valid');
        }

        const data = await youtubeOEmbedFetcher.fetchVideoData(videoId);
        setVideoData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching YouTube video:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoIdOrUrl]);

  return { videoData, loading, error };
};

// Hook untuk fetch multiple videos
export const useMultipleYouTubeVideos = (videoIdsOrUrls) => {
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchedUrlsRef = useRef(new Set());

  useEffect(() => {
    if (!videoIdsOrUrls || videoIdsOrUrls.length === 0) return;

    // Check if we already have data for these URLs
    const urlsString = JSON.stringify(videoIdsOrUrls);
    if (fetchedUrlsRef.current.has(urlsString)) {
      return; // Already fetched, don't fetch again
    }

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const promises = videoIdsOrUrls.map(async (videoIdOrUrl) => {
          try {
            const videoId = videoIdOrUrl.includes('youtube.com') || videoIdOrUrl.includes('youtu.be')
              ? youtubeOEmbedFetcher.extractVideoId(videoIdOrUrl)
              : videoIdOrUrl;

            if (!videoId) {
              throw new Error('Video ID tidak valid');
            }

            const data = await youtubeOEmbedFetcher.fetchVideoData(videoId);
            return { success: true, data, error: null };
          } catch (err) {
            return { success: false, data: null, error: err.message };
          }
        });

        const results = await Promise.all(promises);
        setVideosData(results);
        
        // Mark as fetched
        fetchedUrlsRef.current.add(urlsString);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching multiple YouTube videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videoIdsOrUrls]);

  return { videosData, loading, error };
};
