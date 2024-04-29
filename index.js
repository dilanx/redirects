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

const config = yaml.parse(fs.readFileSync(cfg).toString());

const dst = config['destination-directory'] || 'build';
const seo = config['seo'] || {};

log(`using destination: ${dst}`);

for (const redirect of config.redirects) {
  const from = redirect.from.split('/').filter((x) => x.length > 0);
  const { to, title, description } = redirect;

  const html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="UTF-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    seo['search-results']
      ? ''
      : '<meta name="robots" content="noindex, nofollow" />',
    `<title>${title || 'Redirecting..'}</title>`,
    title ? `<meta property="og:title" content="${title}" />` : '',
    description ? `<meta name="description" content="${description}" />` : '',
    title && seo.image
      ? `<meta property="og:image" content="${seo.image}" />`
      : '',
    title && seo['theme-color']
      ? `<meta name="theme-color" content="${seo['theme-color']}" />`
      : '',
    `<script>window.location.replace('${to}');</script>`,
    '</head>',
    '<body>',
    '<p>Redirecting...</p>',
    '</body>',
    '</html>',
  ].join('');

  const redirectDir = path.join(dst, ...from);
  fs.mkdirSync(redirectDir, { recursive: true });
  fs.writeFileSync(path.join(redirectDir, 'index.html'), html);
  log(`redirecting /${from.join('/')} to ${to}`);
}

log('done');
