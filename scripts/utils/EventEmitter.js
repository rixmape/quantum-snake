class EventEmitter {
  constructor() {
      this.listeners = new Map();
  }

  on(event, callback) {
      if (!this.listeners.has(event)) {
          this.listeners.set(event, []);
      }
      this.listeners.get(event).push(callback);
  }

  off(event, callback) {
      if (!this.listeners.has(event)) return;
      const filters = this.listeners.get(event).filter(listener => listener !== callback);
      this.listeners.set(event, filters);
  }

  emit(event, ...args) {
      if (!this.listeners.has(event)) return;
      this.listeners.get(event).forEach(callback => callback(...args));
  }

  once(event, callback) {
      const onceWrapper = (...args) => {
          callback(...args);
          this.off(event, onceWrapper);
      };
      this.on(event, onceWrapper);
  }
}

export default EventEmitter;