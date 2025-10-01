// ishh10/glacier-isro/glacier-isro-62b200cb7f7a6aa9c46b16b1215c535a779ef343/src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE: string;
    readonly VITE_API_KEY: string;
    // Add other environment variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}