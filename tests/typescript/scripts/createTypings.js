const { readFileSync, writeFileSync } = require('fs');

// does what typings package used to do
const main = () => {
  const typings = readFileSync('../../index.d.ts', { encoding: 'utf8' });
  const wrapped = `declare module 'react-geolocated' {
      ${typings}
      }`;
  writeFileSync('./index.d.ts', wrapped, { encoding: 'utf8' });
};

main();
