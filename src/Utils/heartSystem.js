// Heart System untuk game seperti Duolingo
// Menggunakan cookies untuk persist data

const HEART_COOKIE_NAME = 'game_hearts';
const HEART_REGENERATION_TIME = 20 * 60 * 1000; // 20 menit dalam milliseconds
const MAX_HEARTS = 5;

// Helper functions untuk cookies
const setCookie = (name, value, days = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Heart System Class
class HeartSystem {
  constructor() {
    this.hearts = this.loadHearts();
    this.lastRegeneration = this.loadLastRegeneration();
    this.regenerateHearts();
  }

  // Load hearts dari cookie
  loadHearts() {
    const heartsData = getCookie(HEART_COOKIE_NAME);
    if (heartsData) {
      try {
        return JSON.parse(heartsData);
      } catch (e) {
        console.error('Error parsing hearts data:', e);
      }
    }
    // Default: 5 hearts penuh
    return {
      current: MAX_HEARTS,
      max: MAX_HEARTS
    };
  }

  // Load last regeneration time dari cookie
  loadLastRegeneration() {
    const lastRegen = getCookie('heart_last_regen');
    return lastRegen ? parseInt(lastRegen) : Date.now();
  }

  // Save hearts ke cookie
  saveHearts() {
    setCookie(HEART_COOKIE_NAME, JSON.stringify(this.hearts));
  }

  // Save last regeneration time ke cookie
  saveLastRegeneration() {
    setCookie('heart_last_regen', this.lastRegeneration.toString());
  }

  // Regenerate hearts berdasarkan waktu
  regenerateHearts() {
    const now = Date.now();
    const timeSinceLastRegen = now - this.lastRegeneration;
    
    if (timeSinceLastRegen >= HEART_REGENERATION_TIME) {
      const heartsToAdd = Math.floor(timeSinceLastRegen / HEART_REGENERATION_TIME);
      this.hearts.current = Math.min(this.hearts.max, this.hearts.current + heartsToAdd);
      this.lastRegeneration = now;
      this.saveHearts();
      this.saveLastRegeneration();
    }
  }

  // Get current hearts
  getHearts() {
    this.regenerateHearts(); // Update hearts sebelum return
    return this.hearts.current;
  }

  // Get max hearts
  getMaxHearts() {
    return this.hearts.max;
  }

  // Use a heart (ketika salah jawab)
  useHeart() {
    this.regenerateHearts(); // Update hearts dulu
    if (this.hearts.current > 0) {
      this.hearts.current--;
      this.saveHearts();
      return true; // Berhasil menggunakan heart
    }
    return false; // Tidak ada heart tersisa
  }

  // Add heart (untuk testing atau reward)
  addHeart() {
    this.regenerateHearts();
    if (this.hearts.current < this.hearts.max) {
      this.hearts.current++;
      this.saveHearts();
      return true;
    }
    return false; // Hearts sudah penuh
  }

  // Get time until next heart regeneration
  getTimeUntilNextHeart() {
    this.regenerateHearts();
    if (this.hearts.current >= this.hearts.max) {
      return 0; // Hearts sudah penuh
    }
    
    const now = Date.now();
    const timeSinceLastRegen = now - this.lastRegeneration;
    const timeUntilNext = HEART_REGENERATION_TIME - (timeSinceLastRegen % HEART_REGENERATION_TIME);
    
    return timeUntilNext;
  }

  // Format time untuk display
  formatTimeUntilNextHeart() {
    const timeMs = this.getTimeUntilNextHeart();
    if (timeMs === 0) return null;
    
    const minutes = Math.floor(timeMs / (60 * 1000));
    const seconds = Math.floor((timeMs % (60 * 1000)) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Check if player can play (has hearts)
  canPlay() {
    this.regenerateHearts();
    return this.hearts.current > 0;
  }

  // Reset hearts (untuk testing)
  resetHearts() {
    this.hearts.current = this.hearts.max;
    this.lastRegeneration = Date.now();
    this.saveHearts();
    this.saveLastRegeneration();
  }
}

// Export singleton instance
export const heartSystem = new HeartSystem();

// Export class untuk testing
export { HeartSystem };
