import { timer, now } from "d3-timer";

export default class Timer {
  constructor() {
    this.shouldAnimate = true;
    this.subscribers = [];
    this.loop = this.loop.bind(this);
    this.timer = null;
    this.activeSubscriptions = 0;
  }

  bypassAnimation() {
    this.shouldAnimate = false;
  }

  resumeAnimation() {
    this.shouldAnimate = true;
  }

  loop() {
    this.subscribers.forEach((s) => {
      s.callback(now() - s.startTime, s.duration);
    });
  }

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

  subscribe(callback, duration) {
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
