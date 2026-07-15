import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  NODE_ENV: string;
}

const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"] as const;

function validateEnv(): void {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

validateEnv();

export const env: EnvConfig = {
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  NODE_ENV: process.env.NODE_ENV || "development",
};