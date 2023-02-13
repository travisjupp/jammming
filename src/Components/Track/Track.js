import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    renderAction() {
        // SHOULD THIS METHOD 'RETURN' THIS JSX?
        return <button className='Track-action'>{this.props.isRemoval ? '-' : '+'}</button>
    }
    
    // 45. Create an .addTrack() method in the Track component. Use it to add this.props.track to the playlist.
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{/* {<!-- track name will go here -->} */}</h3>
                    <p>{/* <!-- track artist will go here--> | <!-- track album will go here --> */}</p>
                </div>
                <button className="Track-action" onClick={this.addTrack}>{/* <!-- + or - will go here --> */}</button>
            </div>
        );
    }
}