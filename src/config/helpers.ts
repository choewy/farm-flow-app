export function getEnv(key: string) {
  if (key in import.meta.env === false) {
    throw new Error(`not exists import.meta.env.${key}`);
  }

  return import.meta.env[key] as string;
}
