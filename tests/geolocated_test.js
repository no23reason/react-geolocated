import {geolocated} from '../src/index';

describe('Geolocated', function() {
  it('should export a function', function() {
    expect(geolocated).to.exist;
    expect(geolocated).to.be.instanceof(Function);
  });
});
