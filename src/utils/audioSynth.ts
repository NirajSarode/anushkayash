// Web Audio API ambient flute and Indian classical shehnai synth player
class AmbientAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;

  private notes = [
    // Raag Yaman / Bhupali romantic scale (C, D, E, G, A)
    261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25
  ];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isPlaying = true;
      this.playNextNote();
    } catch (err) {
      console.error('Audio initialization failed', err);
    }
  }

  private playNextNote = () => {
    if (!this.isPlaying || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Random note selection with soft pitch bending like shehnai / bansuri
    const note = this.notes[Math.floor(Math.random() * this.notes.length)];
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      note * (Math.random() > 0.5 ? 1.05 : 0.95),
      this.ctx.currentTime + 1.8
    );

    // Warm gain envelope
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 2.2);

    // Schedule next phrase
    const interval = Math.random() * 1200 + 1000;
    this.timer = window.setTimeout(this.playNextNote, interval);
  };

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
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

export const audioSynth = new AmbientAudioSynth();
