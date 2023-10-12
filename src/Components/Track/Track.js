import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.trackUp = this.trackUp.bind(this);
        this.trackDown = this.trackDown.bind(this);
    }
    // display add/remove button
    renderAction() {
        return (
            !this.props.isRemoval ?
                <button className="Track-action" onClick={this.addTrack}> + </button> :
                this.props.isFirstTrack ?
                    <>
                        <button className="Track-action" onClick={this.trackDown}>&darr;</button>
                        <button className="Track-action" onClick={this.removeTrack}> - </button>
                    </> :
                    this.props.isLastTrack ?
                        <>
                            <button className="Track-action" onClick={this.trackUp}>&uarr;</button><button className="Track-action" onClick={this.removeTrack}> - </button>
                        </> :

                        <>
                            <button className="Track-action" onClick={this.trackUp}>&uarr;</button>
                            <button className="Track-action" onClick={this.trackDown}>&darr;</button>
                            <button className="Track-action" onClick={this.removeTrack}> - </button>
                        </>
        )
    }
    // add this.props.track to the playlist.
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    // remove this.props.track from the playlist.
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    // move track handlers
    trackUp() {
        this.props.onMoveUp(this.props.track);
    }

    trackDown() {
        this.props.onMoveDown(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

