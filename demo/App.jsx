import React from 'react';
import Fork from 'react-ghfork';
import pkgInfo from '../package.json';
import Demo from './Demo.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Fork className="right" project={pkgInfo.user + '/' + pkgInfo.name} />
        <Demo testPropPassing = {true} />
      </div>
    );
  }
}
