/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Add your environment variables here for type safety and IntelliSense
  readonly VITE_API_KEY: string;
  // You can list other VITE_ variables here as well
  // readonly VITE_OTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}