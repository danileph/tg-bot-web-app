export {};

declare global {
  interface Window {
    config: {
      baseApi: string;
    };
  }
}
