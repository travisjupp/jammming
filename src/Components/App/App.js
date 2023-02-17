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
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  // 41. add song to playlist state
  addTrack(track) {
    // is current song in the playlistTracks state?
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('guard clause ran: track exists');
      return;
    }
    // add track to end of playlistTracks
    this.setState({playlistTracks: [...this.state.playlistTracks, track]});
  }
  // 49. remove track from playlist state 
  removeTrack(track) {
    // create new array with track removed
    let newPlaylistTracks = this.state.playlistTracks.filter(currentTracks => currentTracks.id !== track.id);
    // update state with new array
    this.setState({playlistTracks: newPlaylistTracks});
  }
  // 57. update playlist name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
    console.log('playlistName:', this.state.playlistName);
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
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

