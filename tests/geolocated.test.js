import React, { Component } from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";

import { geolocated, geoPropTypes } from "../src";

class SimpleComponent extends Component {
    render() {
        const { coords, isGeolocationEnabled, message } = this.props;
        if (isGeolocationEnabled) {
            return (
                <div>
                    {message && `${message}: `}
                    {coords && coords.latitude}, {coords && coords.longitude}
                </div>
            );
        } else {
            return <div>Geolocation NOT enabled</div>;
        }
    }
}

SimpleComponent.propTypes = {
    message: PropTypes.string,
};
SimpleComponent.propTypes = { ...SimpleComponent.propTypes, ...geoPropTypes };

const mockSuccessfulGeolocationProvider = {
    getCurrentPosition(onSuccess) {
        return onSuccess({
            coords: {
                latitude: 50,
                longitude: 20,
            },
        });
    },
    watchPosition(onSuccess) {
        return onSuccess({
            coords: {
                latitude: 50,
                longitude: 20,
            },
        });
    },
};

const mockNoopGeolocationProvider = {
    getCurrentPosition() {
        return;
    },
    watchPosition() {
        return;
    },
};

jest.useFakeTimers();

describe("Geolocated", () => {
    it("should inject the location", () => {
        const Wrapped = geolocated({
            geolocationProvider: mockSuccessfulGeolocationProvider,
        })(SimpleComponent);

        const component = renderer.create(<Wrapped />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should throw on invalid geolocation provider", () => {
        const Wrapped = geolocated({
            geolocationProvider: {},
        })(SimpleComponent);

        expect(() => renderer.create(<Wrapped />)).toThrow();
    });

    it("should pass the props", () => {
        const Wrapped = geolocated({
            geolocationProvider: mockSuccessfulGeolocationProvider,
        })(SimpleComponent);

        const component = renderer.create(<Wrapped message="Test message" />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should timeout if user decision timeout is specified", () => {
        const Wrapped = geolocated({
            userDecisionTimeout: 100,
            geolocationProvider: mockNoopGeolocationProvider,
        })(SimpleComponent);

        const component = renderer.create(<Wrapped />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        jest.runAllTimers();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should cancel user decision timeout on success", (done) => {
        const Wrapped = geolocated({
            userDecisionTimeout: 100,
            geolocationProvider: mockSuccessfulGeolocationProvider,
        })(SimpleComponent);

        const component = renderer.create(<Wrapped />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        jest.useRealTimers(); // TODO: do this with fake timers somehow
        setTimeout(() => {
            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            done();
        }, 200);
    });
});
