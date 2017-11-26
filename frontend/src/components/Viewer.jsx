import React, { Component } from 'react';
import STLViewer from 'stl-viewer';

export default class Viewer extends Component {
  render() {
    return (
      <STLViewer
        className="viewer"
        url={this.props.image}
        width={800}
        height={500}
        modelColor="#ffffff"
        backgroundColor="#000000"
        rotate
        orbitControls
      />
    );
  }
}
