// Mast Magan Instrumental Player & Audio Controller
class MastMaganAudioController {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private hasInitialized: boolean = false;

  private initAudio() {
    if (this.hasInitialized || typeof window === 'undefined') return;
    this.hasInitialized = true;
    try {
      // Prioritize m4a for fast mobile loading, fallback to mp3
      const audio = new Audio('/audio/mast_magan.m4a');
      audio.loop = true;
      audio.preload = 'auto';

      audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });
      audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });
      audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
      audio.addEventListener('error', () => {
        // Fallback to mp3 if m4a fails
        if (audio.src.endsWith('.m4a')) {
          audio.src = '/audio/mast_magan.mp3';
          audio.load();
        }
      });

      this.audio = audio;
    } catch (err) {
      console.warn('Audio initialization error:', err);
    }
  }

  public subscribe(cb: (playing: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.isPlaying);
      } catch (e) {
        console.error(e);
      }
    });
  }

  public async start(): Promise<boolean> {
    this.initAudio();
    if (!this.audio) return false;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Audio playback error:', err);
      return false;
    }
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioSynth = new MastMaganAudioController();

