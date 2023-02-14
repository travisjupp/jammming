import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';


export class TrackList extends React.Component {

    render() {
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} >{track}</Track>)}
                {/* <Track onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} /> */}
            </div>
        );
    }
}

