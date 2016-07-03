[![build status](https://secure.travis-ci.org/no23reason/react-geolocated.svg)](http://travis-ci.org/no23reason/react-geolocated) [![bitHound Score](https://www.bithound.io/github/no23reason/react-geolocated/badges/score.svg)](https://www.bithound.io/github/no23reason/react-geolocated) [![Dependency Status](https://david-dm.org/no23reason/react-geolocated.svg)](https://david-dm.org/no23reason/react-geolocated)
# react-geolocated - React.js Higher-Order Component for using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)

## Basic Usage

```js
import React from 'react';
import {geolocated} from 'react-geolocated';

class Demo extends React.Component {
  render() {
    return this.props.isGeolocationEnabled && <table>
      <tbody>
        <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
        <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
      </tbody>
    </table>;
  }
}

export default geolocated()(Demo);
```

## Acknowledgements

This project uses the [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate).

## License

*react-geolocated* is available under MIT. See LICENSE for more details.
