declare global {
  interface Window {
    tracker: Tracker;
    beforeOnloadBufer: [];
  }

  interface Tracker {
    track(event: string, ...tags: string[]): void;
  }

  interface TrackerEvent {
    event: string;
    tags: string[];
    title: string | null;
    url: string;
    ts: number;
  }
}

export {};
