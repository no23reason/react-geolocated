import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {geolocated, geoPropTypes} from '../src/index';

class SimpleComponent extends Component {
  render() {
    const {coords} = this.props;
    return (<div>
      {coords && coords.latitude}, {coords && coords.longitude}
    </div>);
  }
}

SimpleComponent.propTypes = {...SimpleComponent.propTypes, ...geoPropTypes };

describe('Geolocated', () => {
  it('should export a function', () => {
    expect(geolocated).to.exist;
    expect(geolocated).to.be.instanceof(Function);
  });

  it('should inject the location', () => {
    const mockGeolocationProvider = {
      getCurrentPosition(onSuccess) {
        return onSuccess({
          coords: {
            latitude: 50,
            longitude: 20,
          },
        })
      },
    };

    const Wrapped = geolocated({
      geolocationProvider: mockGeolocationProvider,
    })(SimpleComponent);

    const rendered = TestUtils.renderIntoDocument(<Wrapped />);
    const renderedNode = ReactDOM.findDOMNode(rendered);

    expect(renderedNode.textContent).to.equal('50, 20');
  });

  it('should throw on invalid geolocation provider', () => {
    const Wrapped = geolocated({
      geolocationProvider: {},
    })(SimpleComponent);

    expect(() => TestUtils.renderIntoDocument(<Wrapped />)).to.throw();
  });
});
