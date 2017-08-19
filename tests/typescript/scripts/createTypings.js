const fs = require('fs');

// does what typings package used to do
const main = () => {
  const typings = fs.readFileSync('../../index.d.ts', { encoding: 'utf8' });
  const wrapped = `declare module 'react-geolocated' {
      ${typings}
      }`;
  fs.writeFileSync('./index.d.ts', wrapped, { encoding: 'utf8' });
};

main();
