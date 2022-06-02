import { timer, now } from "victory-vendor/d3-timer";

interface D3Timer {
  new (callback): void;
  stop(): void;
}

type Callback = (elapsed: number, duration: number) => void;

export default class Timer {
  private shouldAnimate: boolean;
  private readonly subscribers: Array<{
    callback: Callback;
    startTime: number;
    duration: number;
  }>;
  private activeSubscriptions: number;
  private timer: D3Timer | null;

  constructor() {
    this.shouldAnimate = true;
    this.subscribers = [];
    this.timer = null;
    this.activeSubscriptions = 0;
  }

  bypassAnimation() {
    this.shouldAnimate = false;
  }

  resumeAnimation() {
    this.shouldAnimate = true;
  }

  loop = () => {
    this.subscribers.forEach((s) => {
      s.callback(now() - s.startTime, s.duration);
    });
  };

  start() {
    if (!this.timer) {
      this.timer = timer(this.loop);
    }
  }

  stop() {
    if (this.timer) {
      this.timer.stop();
      this.timer = null;
    }
  }

  subscribe(callback: Callback, duration: number) {
    duration = this.shouldAnimate ? duration : 0;
    const subscriptionID = this.subscribers.push({
      startTime: now(),
      callback,
      duration
    });
    this.activeSubscriptions++;
    this.start();
    return subscriptionID;
  }

  unsubscribe(id) {
    if (id !== null && this.subscribers[id - 1]) {
      delete this.subscribers[id - 1];
      this.activeSubscriptions--;
    }
    if (this.activeSubscriptions === 0) {
      this.stop();
    }
  }
}
