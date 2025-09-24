// YouTube Video Fetcher
// Menggunakan YouTube Data API v3 untuk mengambil metadata video

class YouTubeFetcher {
  constructor() {
    // YouTube Data API v3 key - Anda perlu mengganti dengan API key sendiri
    this.apiKey = 'YOUR_YOUTUBE_API_KEY'; // Ganti dengan API key Anda
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  // Extract video ID dari YouTube URL
  extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtu\.be\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }

  // Fetch video metadata dari YouTube API
  async fetchVideoData(videoId) {
    if (!videoId) {
      throw new Error('Video ID tidak valid');
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/videos?id=${videoId}&key=${this.apiKey}&part=snippet,statistics,contentDetails`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        throw new Error('Video tidak ditemukan');
      }

      const video = data.items[0];
      const snippet = video.snippet;
      const statistics = video.statistics;
      const contentDetails = video.contentDetails;

      return {
        id: videoId,
        title: snippet.title,
        description: snippet.description,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        thumbnail: {
          default: snippet.thumbnails.default?.url,
          medium: snippet.thumbnails.medium?.url,
          high: snippet.thumbnails.high?.url,
          standard: snippet.thumbnails.standard?.url,
          maxres: snippet.thumbnails.maxres?.url
        },
        duration: contentDetails.duration,
        viewCount: statistics.viewCount,
        likeCount: statistics.likeCount,
        commentCount: statistics.commentCount,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      };
    } catch (error) {
      console.error('Error fetching YouTube video data:', error);
      throw error;
    }
  }

  // Fetch multiple videos
  async fetchMultipleVideos(videoIds) {
    const promises = videoIds.map(id => this.fetchVideoData(id));
    try {
      const results = await Promise.allSettled(promises);
      return results.map((result, index) => ({
        id: videoIds[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : null
      }));
    } catch (error) {
      console.error('Error fetching multiple videos:', error);
      throw error;
    }
  }

  // Format duration dari ISO 8601 ke readable format
  formatDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  // Format number dengan separator
  formatNumber(num) {
    return parseInt(num).toLocaleString();
  }

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Fallback fetcher tanpa API key (menggunakan oEmbed)
class YouTubeOEmbedFetcher {
  constructor() {
    this.baseUrl = 'https://www.youtube.com/oembed';
  }

  extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtu\.be\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }

  async fetchVideoData(videoId) {
    if (!videoId) {
      throw new Error('Video ID tidak valid');
    }

    try {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const response = await fetch(
        `${this.baseUrl}?url=${encodeURIComponent(videoUrl)}&format=json`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        id: videoId,
        title: data.title,
        description: '', // oEmbed tidak menyediakan description
        channelTitle: data.author_name,
        publishedAt: '', // oEmbed tidak menyediakan published date
        thumbnail: {
          default: data.thumbnail_url,
          medium: data.thumbnail_url,
          high: data.thumbnail_url,
          standard: data.thumbnail_url,
          maxres: data.thumbnail_url
        },
        duration: '', // oEmbed tidak menyediakan duration
        viewCount: '', // oEmbed tidak menyediakan view count
        likeCount: '', // oEmbed tidak menyediakan like count
        commentCount: '', // oEmbed tidak menyediakan comment count
        url: videoUrl,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
      };
    } catch (error) {
      console.error('Error fetching YouTube video data via oEmbed:', error);
      throw error;
    }
  }
}

// Export instances
export const youtubeFetcher = new YouTubeFetcher();
export const youtubeOEmbedFetcher = new YouTubeOEmbedFetcher();

// Export classes
export { YouTubeFetcher, YouTubeOEmbedFetcher };
