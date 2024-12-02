declare namespace NodeJS {
  interface ProcessEnv {
    // Authentication
    AUTH_SECRET: string;

    // Environment
    NEXT_PUBLIC_ENVIRONMENT: string;

    // Dynamic Auth Configuration
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID: string;
    NEXT_DYNAMIC_BEARER_TOKEN: string;

    // Database Configuration
    DATABASE_URL: string;
    DATABASE_AUTH_TOKEN: string;

    // API Keys
    DEBANK_API_KEY: string;
  }
}
