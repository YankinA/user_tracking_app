class EventTracker implements Tracker {
  private buffer: TrackerEvent[] = [];
  private defaultTimeout = 1000;
  private sendTimeout: ReturnType<typeof setTimeout> | null = null;
  private isSending: boolean = false;

  constructor() {
    this.sendBeforeOnloadBufer();
    window.addEventListener("beforeunload", () => {
      this.sendBuffer();
    });
  }

  private sendBeforeOnloadBufer() {
    if (window.beforeOnloadBufer.length) {
      this.buffer = window.beforeOnloadBufer.splice(0);
      this.sendBySchedule();
    }
  }

  public track(event: string, ...tags: string[]): void {
    const timestamp = Math.floor(Date.now() / 1000);
    const eventData: TrackerEvent = {
      event,
      tags: tags ?? [],
      url: window.location.href,
      title: document?.title,
      ts: timestamp,
    };

    this.buffer.push(eventData);
    this.sendBySchedule();
  }

  private sendBySchedule(): void {
    if (this.sendTimeout) {
      this.clearSendTimeout();
    }

    if (this.buffer.length >= 3 || !this.isSending) {
      this.sendBuffer();
    } else {
      this.sendTimeout = setTimeout(
        () => this.sendBuffer(),
        this.defaultTimeout,
      );
    }
  }

  private async sendBuffer(): Promise<void> {
    if (this.buffer.length === 0 || this.isSending) {
      this.clearSendTimeout();
      return;
    }

    this.isSending = true;
    const events = this.buffer.splice(0);
    try {
      await fetch("http://localhost:8888/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(events),
      });

      if (this.sendTimeout === null && this.buffer.length > 0) {
        this.sendBySchedule();
      }
    } catch (error) {
      console.error("send buffer error:", error);
      setTimeout(() => {
        this.buffer.push(...events);
        this.sendBySchedule();
      }, this.defaultTimeout);
    } finally {
      this.isSending = false;
    }
  }

  private clearSendTimeout() {
    clearTimeout(this.sendTimeout);
    this.sendTimeout = null;
  }
}
