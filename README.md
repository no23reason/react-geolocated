[![build status](https://secure.travis-ci.org/no23reason/react-geolocated.svg)](http://travis-ci.org/no23reason/react-geolocated)
[![codecov](https://codecov.io/gh/no23reason/react-geolocated/branch/master/graph/badge.svg)](https://codecov.io/gh/no23reason/react-geolocated)
[![npm version](https://img.shields.io/npm/v/react-geolocated.svg)](https://www.npmjs.com/package/react-geolocated)
[![bitHound Score](https://www.bithound.io/github/no23reason/react-geolocated/badges/score.svg)](https://www.bithound.io/github/no23reason/react-geolocated)
[![Dependency Status](https://david-dm.org/no23reason/react-geolocated.svg)](https://david-dm.org/no23reason/react-geolocated)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
# react-geolocated - React.js Higher-Order Component for using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)

## Demo
Basic demo can be found at the [demo page](https://no23reason.github.io/react-geolocated/).

## Basic Usage

Install using `npm`:
```js
npm install react-geolocated --save
```

Then use in your application like this:

```js
import React from 'react';
import {geolocated} from 'react-geolocated';

class Demo extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(Demo);
```

## Props
The props passed to the wrapped component are:
```js
{
    coords: {
        latitude,
        longitude,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed,
    },
    isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
    isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
    positionError, // object with the error returned from the Geolocation API call
}
```
The `coords` prop is equivalent to the [Coordinates](https://developer.mozilla.org/en-US/docs/Web/API/Coordinates) object and the `positionError` is equivalent to the [PositionError](https://developer.mozilla.org/en-US/docs/Web/API/PositionError).

### PropTypes
Unfortunately, the `geolocated` HOC cannot add the prop types to the wrapped component directly, as the ESLint will not pick that up.  For this reason, prop types are exported as the `geoPropTypes` object.
Using them is simple with [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
(or if you already depend on it, lodash [`merge`](https://lodash.com/docs#merge) function is useful as well),
or, if your environment supports it, using the [object spread syntax](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):
```js
import React from 'react';
import {geolocated, geoPropTypes} from 'react-geolocated';

class Demo extends React.Component {
  // Same as the basic example
}

// Using Object.assign
Demo.propTypes = Object.assign({}, Demo.propTypes, geoPropTypes);
// Using ES6 object spread syntax
Demo.propTypes = {...Demo.propTypes, ...geoPropTypes};

export default geolocated()(Demo);
```

## Configuration
The `geolocated` function takes optional configuration parameter:
```js
{
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    userDecisionTimeout: null,
    geolocationProvider: navigator.geolocation
}
```
The `positionOptions` object corresponds to the [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) of the Geolocation API.

If set, the `userDecisionTimeout` determines how much time (in miliseconds) we give the user to make the decision whether to allow to share their location or not.
In Firefox, if the user declines to use their location, the Geolocation API call does not end with an error.
Therefore we want to fallback to the error state if the user declines and the API does not tell us.

The `geolocationProvider` allows to specify alternative source of the geolocation API. This was added mainly for testing purposes, however feel free to use it if need be.

## TypeScript
This project ships with type definitions for TypeScript provided. You can use them in your TypeScript files like this:
```js
import * as React from 'react';
import {GeolocatedProps, geolocated} from 'react-geolocated';

interface IDemoProps extends GeolocatedProps {}

class Demo extends React.Component<IDemoProps, {}> {
  render(): React.ReactElement<{}> {
    return <div>lattitude: {this.props.coords && this.props.coords.latitude}</div>;
  }
}

export default geolocated()(Demo);
```

## Browser support
|  Chrome &ge; 5  |  Firefox &ge; 3.5  |  Internet Explorer &ge; 9  |  Opera &ge; 10.60  |  Safari &ge; 5  |
|:-:|:-:|:-:|:-:|:-:|
|  ![Chrome logo](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png)  |  ![Firefox logo](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png)  |  ![Internet Explorer logo](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png)  |  ![Opera logo](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png)  |  ![Safari logo](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png)  |

## Acknowledgements

Many thanks belong to [@mcumpl](https://github.com/mcumpl) for the original idea for this as well as many suggestions and comments.

This project uses the [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate) and [browser-icons](https://github.com/alrra/browser-logos).

## License

*react-geolocated* is available under MIT. See [LICENSE](https://github.com/no23reason/react-geolocated/tree/master/LICENSE) for more details.
