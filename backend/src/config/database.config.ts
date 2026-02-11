import { getEnv } from './env.config';

export function databaseConfig(): Record<string, unknown> {
  const env = getEnv();
  if (env.databaseUrl) {
    return { connectionString: env.databaseUrl };
  }
  return {
    host: env.databaseHost,
    port: env.databasePort,
    user: env.databaseUser,
    password: env.databasePassword,
    database: env.databaseName,
  };
}
