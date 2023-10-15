import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {

    render() {
        return (
            <div className="TrackList">
                {/* renders a set of Track components */}
                {this.props.tracks.map(track => {
                    // flag first / last track in array using props
                    // render tracks with appropriate buttons
                    return this.props.tracks.indexOf(track) === 0 ?
                        <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} isFirstTrack={true} onMoveDown={this.props.onMoveDown}>{track}</Track> :
                        this.props.tracks.indexOf(track) === this.props.tracks.length - 1 ?
                            <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} isLastTrack={true}  onMoveUp={this.props.onMoveUp}>{track}</Track> :
                            <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onMoveUp={this.props.onMoveUp} onMoveDown={this.props.onMoveDown}>{track}</Track>
                })}
            </div>
        );
    }
}
