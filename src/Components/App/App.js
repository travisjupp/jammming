// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'track01',
          artist: 'artist01',
          album: 'album01',
          id: 'id01'
        },
        {
          name: 'track02',
          artist: 'artist02',
          album: 'album02',
          id: 'id02'
        },
        {
          name: 'track03',
          artist: 'artist03',
          album: 'album03',
          id: 'id03'
        }
      ],
      playlistName: 'Custom PlaylistName',
      playlistTracks: [
        {
          name: 'customTrack01',
          artist: 'customArtist01',
          album: 'customAlbum01',
          id: 'customID01'
        },
        {
          name: 'customTrack02',
          artist: 'customArtist02',
          album: 'customAlbum02',
          id: 'customID02'
        },
        {
          name: 'customTrack03',
          artist: 'customArtist03',
          album: 'customAlbum03',
          id: 'customID03'
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  // addTrack: add song to the playlist state
  addTrack(track) {
    // is current song in the playlistTracks state?
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('guard clause ran');
      return;
    }
    
    console.log('this.state.playlistTracks',this.state.playlistTracks);

    // add track to end of playlistTracks

    // this.setState((state) => state.playlistTracks.push(track)); // pushes track twice

    // let newTracks = this.state.playlistTracks.filter(trackObj => trackObj.id === track.id);
    // this.setState({playlistTracks: newTracks});

    this.setState({playlistTracks: [...this.state.playlistTracks, track]});

    // this.setState((state) => state.playlistTracks.push(track));
    
    // try a this.setState that only updates the object
    // this.setState(
    //   {
    //     playlistTracks: this.playlistTracks.push(track)
    //   }
    // );
    // console.log('addTrack():this.state.playlistName',this.state.playlistName);
    console.log('addTrack():this.state.playlistTracks:',this.state.playlistTracks);


  }

  

  /* removeTrack 49.
  In App.js create a method called removeTrack with the following functionality:

  Accepts a track argument
  Uses the track’s id property to filter it out of playlistTracks
  Sets the new state of the playlist */

  removeTrack(track) {
    // delete this.state.playlistTracks.find(savedTrack => {
    //   savedTrack.id === track.id;
    // });

    this.setState((state) => {
      return { playlistTracks: delete state.playlistTracks.find(savedTrack => savedTrack.id === track.id)}
    });
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar />
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* <!-- Add a Playlist component --> */}
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

