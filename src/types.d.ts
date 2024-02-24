export {};

declare global {
  interface Config {
    baseApi: string;
  }
  interface Window {
    config: Config;
  }
}
