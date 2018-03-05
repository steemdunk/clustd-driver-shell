import * as assert from 'assert';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export interface ScriptConfig {
  shell: string;
  cwd: string;
  env: any;

  start: string;
  stop: string;
}

export interface Config {
  host: string;
  secret: string;
  script: ScriptConfig;
}

export const Config: Config = {} as any;
if (process.env.NODE_ENV !== 'TEST') {
  const file = process.env.CLUSTD_CONFIG || 'config.yml';
  const data = fs.readFileSync(file).toString('utf8');
  const raw = yaml.safeLoad(data);
  setConfig(raw);
}

export function setConfig(conf: Config) {
  Object.assign(Config, conf);
  validate();
}

function validate() {
  assert(Config.host, 'missing host config');
  assert(Config.secret, 'missing cluster secret config');
}
