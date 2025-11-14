import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCallback);

module.exports = async () => {
  console.log('\n\nStarting Jest Global Teardown...');

  try {
    console.log('Reverting database migrations...');

    await exec('npm run test:migration:revert');

    console.log('Migrations revert complete.');
  } catch (error) {
    console.error('Global Teardown Failed (Migration Error):', error);
    process.exit(1);
  }

  console.log('...Jest Global Teardown finished.\n');
};
