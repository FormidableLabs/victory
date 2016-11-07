import { timer, now } from "d3-timer";

export default class Timer {
  constructor() {
    this.shouldAnimate = true;
    this.subscribers = [];
    this.loop = this.loop.bind(this);
    this.timer = timer(this.loop);
  }

  bypassAnimation() {
    this.shouldAnimate = false;
  }

  resumeAnimation() {
    this.shouldAnimate = true;
  }

  loop() {
    if (this.shouldAnimate) {
      this.subscribers.forEach((s) => {
        s.callback(now() - s.startTime);
      });
    }
  }

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }

  subscribe(callback) {
    return this.subscribers.push({
      startTime: now(),
      callback
    });
  }

  unsubscribe(id) {
    delete this.subscribers[id - 1];
  }
}
