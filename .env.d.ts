interface ImportMetaEnv {
  readonly VITE_SECRET_KEY: string;
  readonly DB_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}