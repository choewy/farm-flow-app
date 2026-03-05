import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');

function setEnvRoot() {
  const envLocalPath = path.resolve(ROOT, '.env.local');
  const envPath = path.resolve(ROOT, '.env');

  if (fs.existsSync(envLocalPath)) {
    return;
  }

  if (!fs.existsSync(envPath)) {
    return;
  }

  fs.cpSync(envPath, envLocalPath);
}

function husky() {
  spawnSync('pnpx', ['husky']);
}

setEnvRoot();
husky();
