var plan = require('flightplan');

// configuration
plan.target('production', [
  {
    host: 'home693585470.1and1-data.host',
    username: 'u90146671',
    port: 2222,
    agent: process.env.SSH_AUTH_SOCK
  },
]);

// run commands on localhost
plan.local(function(local) {
  // uncomment these if you need to run a build on your machine first
  // local.log('Run build');
  // local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '~/www/');
});