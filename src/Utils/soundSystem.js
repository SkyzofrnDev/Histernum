// Sound System untuk game effects
// Menggunakan Web Audio API untuk kontrol volume dan playback

class SoundSystem {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.volume = 0.7; // Default volume (0.0 - 1.0)
    this.isMuted = false;
    this.init();
  }

  // Initialize audio context
  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  // Load sound file
  loadSound(name, url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audio.volume = this.volume;
      
      audio.addEventListener('canplaythrough', () => {
        this.sounds[name] = audio;
        resolve(audio);
      });
      
      audio.addEventListener('error', (e) => {
        console.error(`Error loading sound ${name}:`, e);
        reject(e);
      });
    });
  }

  // Play sound effect
  playSound(name, volume = null) {
    if (this.isMuted) return;

    const sound = this.sounds[name];
    if (!sound) {
      console.warn(`Sound ${name} not found`);
      return;
    }

    try {
      // Clone audio untuk bisa play multiple times
      const audioClone = sound.cloneNode();
      audioClone.volume = volume !== null ? volume : this.volume;
      
      // Reset to beginning
      audioClone.currentTime = 0;
      
      // Play the sound
      const playPromise = audioClone.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Error playing sound ${name}:`, error);
        });
      }
    } catch (e) {
      console.warn(`Error playing sound ${name}:`, e);
    }
  }

  // Set global volume
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    // Update all loaded sounds
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume;
    });
  }

  // Mute/unmute all sounds
  setMuted(muted) {
    this.isMuted = muted;
  }

  // Get current volume
  getVolume() {
    return this.volume;
  }

  // Check if muted
  isMuted() {
    return this.isMuted;
  }

  // Preload all game sounds
  async preloadSounds() {
    const soundFiles = {
      correct: '/Sound/Voicy_Correct answer sound effect .mp3',
      wrong: '/Sound/Voicy_Bad answer.mp3',
      levelComplete: '/Sound/Voicy_Level complete .mp3'
    };

    const loadPromises = Object.entries(soundFiles).map(([name, url]) => 
      this.loadSound(name, url).catch(e => {
        console.warn(`Failed to load ${name}:`, e);
        return null;
      })
    );

    try {
      await Promise.all(loadPromises);
      console.log('All sounds loaded successfully');
    } catch (e) {
      console.warn('Some sounds failed to load:', e);
    }
  }

  // Play correct answer sound
  playCorrect() {
    this.playSound('correct');
  }

  // Play wrong answer sound
  playWrong() {
    this.playSound('wrong');
  }

  // Play level complete sound
  playLevelComplete() {
    this.playSound('levelComplete');
  }
}

// Export singleton instance
export const soundSystem = new SoundSystem();

// Export class for testing
export { SoundSystem };
