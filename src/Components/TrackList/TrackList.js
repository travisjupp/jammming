import React from 'react';
import './TrackList.css';

export class TrackList extends React.Component {

    render() {
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {this.props.tracks.map(track => <p key={track.id}>{track.name} {track.artist} {track.album}</p>)}
            </div>
        );
    }
}
