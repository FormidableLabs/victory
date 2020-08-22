import { timer, now } from "d3-timer";

export default class Timer {
  constructor() {
    this.shouldAnimate = true;
    this.subscribers = [];
    this.loop = this.loop.bind(this);
    this.timer = timer(this.loop);
    this.timer.stop();
    this.timerActive = false;
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
    this.timer.start();
    this.timerActive = true;
  }

  stop() {
    this.timer.stop();
    this.timerActive = false;
  }

  subscribe(callback, duration) {
    if (!this.timerActive) {
      this.timer.restart(this.loop);
      this.timerActive = true;
    }
    duration = this.shouldAnimate ? duration : 0;
    return this.subscribers.push({
      startTime: now(),
      callback,
      duration
    });
  }

  unsubscribe(id) {
    if (id !== null) {
      delete this.subscribers[id - 1];
      if (this.subscribers[this.subscribers.length - 1] === undefined) {
        this.timer.stop();
        this.timerActive = false;
      }
    }
  }
}
