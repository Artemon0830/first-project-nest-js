export type ConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: JwtConfig;
  aws: AwsConfig;
};
export type AppConfig = {
  port: number;
  host: string;
};
export type DatabaseConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  name: string;
};
export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};
export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
export type AwsConfig = {
  bucketName: string;
  accessKey: string;
  secretKey: string;
  region: string;
  ACL: string;
  endpoint: string;
};
