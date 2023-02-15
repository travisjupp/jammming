import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);

    }

    // renderAction = (this.props.isRemoval ? <button className="Track-action" onClick={this.removeTrack}> - </button> : <button className="Track-action" onClick={this.addTrack}> + </button>
    // );

    // renderAction() {
    //     return this.props.isRemoval ? <button className="Track-action" onClick={this.removeTrack}> - </button> : <button className="Track-action" onClick={this.addTrack}> + </button>
    // }

    // 45. Create an .addTrack() method in the Track component. Use it to add this.props.track to the playlist.
    addTrack() {
        console.log('this', this);
        console.log('this.props.track', this.props.track);
        console.log('this.props.onAdd', this.props.onAdd);
        this.props.onAdd(this.props.track);
    }

    // 53. Create a .removeTrack() method in the Track component. Use it to remove this.props.track from the playlist.
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        // let renderAction = this.props.isRemoval ? <button className="Track-action" onClick={this.removeTrack}> - </button> : <button className="Track-action" onClick={this.addTrack}> + </button>;
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}{/* {<!-- track name will go here -->} */}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}{/* <!-- track artist will go here--> | <!-- track album will go here --> */}</p>
                </div>
                {/* {console.log(this.props.onAdd(this.props.track))} */}
                {/* {renderAction} */}
                {this.props.isRemoval ? <button className="Track-action" onClick={this.removeTrack}> - </button> : <button className="Track-action" onClick={this.addTrack}> + </button>}
                <button className="Track-action">{/*<!-- + or - will go here -->*/}</button>
            </div>
        );
    }
}