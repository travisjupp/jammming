import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);

    }
    // 27. display add/remove button
    renderAction() {
        return (this.props.isRemoval ?
            <button className="Track-action" onClick={this.removeTrack}> - </button> :
            <button className="Track-action" onClick={this.addTrack}> + </button>)
    }
    // 45. add this.props.track to the playlist.
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    // 53. remove this.props.track from the playlist.
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}{/* {<!-- track name will go here -->} */}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}{/* <!-- track artist will go here--> | <!-- track album will go here --> */}</p>
                </div>
                {this.renderAction()}
                {/* <button className="Track-action"><!-- + or - will go here --></button> */}
            </div>
        );
    }
}

