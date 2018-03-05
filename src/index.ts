import { DriverMachine, DriverClient } from 'clustd-lib';
import * as childProcess from 'child_process';
import { Config } from './config';
import * as util from 'util';

const exec = util.promisify(childProcess.exec);

export class ShellDriver extends DriverMachine {

  constructor() {
    super({
      id: 'driver-shell',
      secret: Config.secret
    }, Config.host);
  }

  async trigger(isMaster: boolean): Promise<void> {
    let script: string;
    if (isMaster) {
      this.logger.info('Starting service...');
      script = Config.script.start;
    } else {
      this.logger.info('Stopping service...');
      script = Config.script.stop;
    }

    try {
      const { stdout, stderr } = await exec(script, {
        timeout: 10000,
        env: Config.script.env,
        cwd: Config.script.cwd,
        shell: Config.script.shell
      });

      if (!(stdout || stderr)) this.logger.info('No output from script');
      if (stdout) this.logger.info('stdout:', stdout);
      if (stderr) this.logger.info('stderr:', stderr);
    } catch (e) {
      this.logger.error('Failed to run script', e);
    }
  }
}

const dm = new ShellDriver();
dm.connect();
