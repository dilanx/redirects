const core = require('@actions/core');
const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

function log(msg) {
  console.log('generate-redirects:', msg);
}

const cfg = core.getInput('redirect-configuration') || 'redirects.yml';

if (!fs.existsSync(cfg)) {
  log(`configuration file not found: ${cfg}`);
  process.exit(1);
}

log(`using configuration: ${cfg}`);

const dst = core.getInput('destination-directory') || 'build';

log(`using destination: ${dst}`);

const config = yaml.parse(fs.readFileSync(cfg).toString());

for (const { from, to } of config.redirects) {
  const l = line.trim();
  const redirectDir = path.join(dst, ...from);
  fs.mkdirSync(redirectDir, { recursive: true });
  fs.writeFileSync(
    path.join(redirectDir, 'index.html'),
    `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><title>Redirecting...</title><script>window.location.replace(\`${to}\`);</script></head></html>`
  );
  log(`redirecting /${from.join('/')} to ${to}`);
}

log('done');
