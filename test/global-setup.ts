import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCallback);

module.exports = async () => {
  console.log('\n\nStarting Jest Global Setup...');

  try {
    console.log('Running database migrations...');

    await exec('npm run test:migration:run');

    console.log('Migrations complete.');
  } catch (error) {
    console.error('Global Setup Failed (Migration Error):', error);
    process.exit(1);
  }

  console.log('...Jest Global Setup finished.\n');
};
