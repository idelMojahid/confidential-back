const PROFILE = '/home/ubuntu/.profile';
const YARN = '/usr/local/lib/npm/bin/yarn';

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  shipit.initConfig({
    default: {
      deployTo: `/home/ubuntu/corporeal-api`,
      repositoryUrl: `git@github.com:digital-factory-saham/api-myauto-corporeal.git`,
      ignores: [
        '.git',
        '.circleci',
        '.ssh',
        'ansible',
        'coverage',
        'node_modules',
        'test',
        '.env',
        '.gitignore',
        'Dockerfile',
        'Vagrantfile',
        '*.md',
      ],
      rsync: ['--del'],
      keepReleases: 3,
      shallowClone: true,
    },
    staging: {
      branch: 'staging',
      strict: 'no', // Required for CircleCi auto deploy
      servers: 'ubuntu@corporeal-staging.df.sahamassurance.ma',
    },
    preprod: {
      branch: 'staging',
      servers: 'ubuntu@corporeal-preprod.df.sahamassurance.ma',
    },
    prod: {
      branch: 'production',
      servers: 'ubuntu@corporeal.sahamassurance.ma',
    },
  });

  shipit.on('updated', () => {
    return shipit.start('install');
  });

  shipit.on('deployed', () => {
    return shipit.start('restart');
  });

  shipit.blTask('install', () => {
    shipit.log('\n### Installing dependencies...\n');
    return shipit
      .remote(
        `cd ${shipit.releasePath} && source ${PROFILE} && ${YARN} install --frozen-lockfile`,
      )
      .then(() => {
        shipit.log('\n### Install successfull!\n');
      })
      .catch(err => {
        shipit.log(`\n### Install failed: ${err}\n`);
        throw err;
      })
      .then(buidTS);
  });

  var buidTS = () => {
    shipit.log('\n### Build TS files...\n');
    return shipit
      .remote(
        `cd ${shipit.releasePath} && source ${PROFILE} && ${YARN} build`,
      )
      .then(() => {
        shipit.log('\n### Build successfull!\n');
      })
      .catch(err => {
        shipit.log(`\n### Build failed: ${err}\n`);
        throw err;
      });
  };

  shipit.blTask('restart', () => {
    shipit.log('\n### Restarting server...\n');
    return shipit
      .remote(
        `cd ${shipit.releasePath} && source ${PROFILE} && ${YARN} start:prod`,
      )
      .then(() => {
        shipit.log('\n### Restart successfull!\n');
      })
      .catch(err => {
        shipit.log(`\n### Restart failed: ${err}\n`);
        throw err;
      });
  });
};
