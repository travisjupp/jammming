import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';


export class TrackList extends React.Component {

    render() {
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {this.props.tracks.map(track => {

                    console.log('first', track.name, this.props.tracks.indexOf(track) === 0);
                    console.log('last', track.name, this.props.tracks.indexOf(track) === this.props.tracks.length - 1);


                    // tag first / last track in array using props
                    return this.props.tracks.indexOf(track) === 0 ?
                        <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} firstTrack={true} >{track}</Track> :
                        this.props.tracks.indexOf(track) === this.props.tracks.length - 1 ?
                            <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} lastTrack={true} >{track}</Track> :
                            <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} >{track}</Track>

                    // return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} >{track}</Track>
                })}
            </div>
        );
    }
}
