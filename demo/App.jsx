import React from 'react';
import Fork from 'react-ghfork';
import pkgInfo from '../package.json';
import Demo from './Demo.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  innerRef;
  getInnerRef(ref) {
    this.innerRef = ref;
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
  }

  render() {
    const { getInnerRef, getLocation } = this;
    return (<div>
      <Fork className="right" project={pkgInfo.user + '/' + pkgInfo.name} />
      <Demo ref={getInnerRef} />
      <button onClick={getLocation}>Get location</button>
    </div>);
  }
}
