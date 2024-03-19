import fs from 'fs';
import path from 'path';

function log(msg) {
  console.log('generate-redirects:', msg);
}

const cfg = process.env.INPUT_REDIRECT_CONFIGURATION || 'redirects.txt';

if (!fs.existsSync(cfg)) {
  log(`configuration file not found: ${cfg}`);
  process.exit(1);
}

log(`using configuration: ${cfg}`);

const dst = process.env.INPUT_DESTINATION_DIRECTORY || 'build';

log(`using destination: ${dst}`);

const lines = fs.readFileSync(cfg).toString().split('\n');

for (const line of lines) {
  const l = line.trim();
  if (l.length === 0) continue;
  if (l.startsWith('#')) continue;
  const redirectLine = line.split(' ');
  const from = redirectLine[0].split('/').filter((x) => x.length > 0);
  const to = redirectLine[1];
  const redirectDir = path.join(dst, ...from);
  fs.mkdirSync(redirectDir, { recursive: true });
  fs.writeFileSync(
    path.join(redirectDir, 'index.html'),
    `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><title>Redirecting...</title><script>window.location.replace(\`${to}\`);</script></head></html>`
  );
  log(`redirecting /${from.join('/')} to ${to}`);
}

log('done');
