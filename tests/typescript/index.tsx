import * as React from "react";
import { GeolocatedProps, geolocated } from "../..";

interface IDemoProps {
    label: string;
}

class Demo extends React.Component<IDemoProps & GeolocatedProps, {}> {
    render(): JSX.Element {
        return (
            <div>
                latitude: {this.props.coords && this.props.coords.latitude}
                isGeolocationAvailable: {this.props.isGeolocationAvailable}
                isGeolocationEnabled: {this.props.isGeolocationEnabled}
                positionError: {this.props.positionError}
            </div>
        );
    }
}

function StatelessDemo(props: {} & GeolocatedProps): JSX.Element {
    return (
        <div>
            latitude: {props.coords && props.coords.latitude}
            isGeolocationAvailable: {props.isGeolocationAvailable}
            isGeolocationEnabled: {props.isGeolocationEnabled}
            positionError: {props.positionError}
        </div>
    );
}

const StatelessDemoWrapped = geolocated()(StatelessDemo);
const StatefulWrapped = geolocated({
    userDecisionTimeout: 5000,
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 20,
        timeout: 10000,
    },
})(Demo);
const Suppressed = geolocated({
    suppressLocationOnMount: true,
})(Demo);
const Watched = geolocated({
    watchPosition: true,
})(Demo);

<div>
    <StatelessDemoWrapped isGeolocationEnabled={false} />
    <StatefulWrapped label="Hello!" />
    <Suppressed label="Hi!" />
    <Watched label="Yello!" onSuccess={position => console.log(position)} />
</div>;
