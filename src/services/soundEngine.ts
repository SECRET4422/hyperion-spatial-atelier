// Web Audio API procedural sound engine

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;

  constructor() {
    // Initialized lazily on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientDrone();
    } else {
      this.startAmbientDrone();
      this.playChime();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playTick(frequency: number = 1200, type: OscillatorType = 'sine') {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext policy catch
    }
  }

  public playLaser(frequency: number = 800) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {
      // ignore
    }
  }

  public playChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        
        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 0.5);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.52);
      });
    } catch {
      // ignore
    }
  }

  public startAmbientDrone() {
    if (this.isMuted || !this.ctx) return;
    if (this.droneGain) return; // already active

    try {
      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 2.0);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // Slight detune A2

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.droneGain = droneGain;
      this.osc1 = osc1;
      this.osc2 = osc2;
    } catch {
      // ignore
    }
  }

  public stopAmbientDrone() {
    if (!this.ctx || !this.droneGain) return;
    try {
      this.droneGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        if (this.osc1) { this.osc1.stop(); this.osc1.disconnect(); this.osc1 = null; }
        if (this.osc2) { this.osc2.stop(); this.osc2.disconnect(); this.osc2 = null; }
        if (this.droneGain) { this.droneGain.disconnect(); this.droneGain = null; }
      }, 900);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
