import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import {geolocated, geoPropTypes} from '../src/index';

class SimpleComponent extends Component {
  render() {
    const {coords, isGeolocationEnabled} = this.props;
    if (isGeolocationEnabled) {
      return (<div>
        {coords && coords.latitude}, {coords && coords.longitude}
      </div>);
    } else {
      return (<div>Geolocation NOT enabled</div>);
    }
  }
}

const mockSuccessfulGeolocationProvider = {
  getCurrentPosition(onSuccess) {
    return onSuccess({
      coords: {
        latitude: 50,
        longitude: 20,
      },
    })
  },
};

const mockNoopGeolocationProvider = {
  getCurrentPosition() {
    return;
  },
};

SimpleComponent.propTypes = {...SimpleComponent.propTypes, ...geoPropTypes };

describe('Geolocated', () => {
  it('should export a function', () => {
    expect(geolocated).to.exist;
    expect(geolocated).to.be.instanceof(Function);
  });

  it('should inject the location', () => {
    const Wrapped = geolocated({
      geolocationProvider: mockSuccessfulGeolocationProvider,
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

  it('should cancel user decision timeout on success', (done) => {
    const Wrapped = geolocated({
      userDecisionTimeout: 100,
      geolocationProvider: mockSuccessfulGeolocationProvider,
    })(SimpleComponent);

    const rendered = TestUtils.renderIntoDocument(<Wrapped />);
    const renderedNode = ReactDOM.findDOMNode(rendered);

    setTimeout(() => {
      expect(renderedNode.textContent).to.equal('50, 20');
      done();
    }, 200);
  });

  it('should timeout if user decision timeout is specified', (done) => {
    const Wrapped = geolocated({
      userDecisionTimeout: 100,
      geolocationProvider: mockNoopGeolocationProvider,
    })(SimpleComponent);

    const rendered = TestUtils.renderIntoDocument(<Wrapped />);
    const renderedNode = ReactDOM.findDOMNode(rendered);
    setTimeout(() => {
      expect(renderedNode.textContent).to.equal('Geolocation NOT enabled');
      done();
    }, 200);
  });
});
