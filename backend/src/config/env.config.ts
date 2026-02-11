export interface GridPulseEnv {
  nodeEnv: string;
  port: number;
  databaseHost: string;
  databasePort: number;
  databaseUser: string;
  databasePassword: string;
  databaseName: string;
  databaseUrl?: string;
}

export function getEnv(): GridPulseEnv {
  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    databaseHost: process.env.DATABASE_HOST ?? 'localhost',
    databasePort: Number(process.env.DATABASE_PORT ?? 5432),
    databaseUser: process.env.DATABASE_USER ?? 'postgres',
    databasePassword: process.env.DATABASE_PASSWORD ?? 'postgres',
    databaseName: process.env.DATABASE_NAME ?? 'gridpulse',
    databaseUrl: process.env.DATABASE_URL,
  };
}
