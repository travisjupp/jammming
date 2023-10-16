// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // {
        //   name: 'track01',
        //   artist: 'artist01',
        //   album: 'album01',
        //   id: 'id01'
        // },
        // {
        //   name: 'track02',
        //   artist: 'artist02',
        //   album: 'album02',
        //   id: 'id02'
        // },
        // {
        //   name: 'track03',
        //   artist: 'artist03',
        //   album: 'album03',
        //   id: 'id03'
        // }
      ],
      playlistName: 'Custom PlaylistName',
      playlistTracks: [
        // {
        //   name: 'customTrack01',
        //   artist: 'customArtist01',
        //   album: 'customAlbum01',
        //   id: 'customID01',
        //   uri: 'spotify:track:2YFtpiy2WoAQVQbM1SIwES'
        // },
        // {
        //   name: 'customTrack02',
        //   artist: 'customArtist02',
        //   album: 'customAlbum02',
        //   id: 'customID02',
        //   uri: 'spotify:track:2YFtpiy2WoAQVQbM1SIwES'
        // },
        // {
        //   name: 'customTrack03',
        //   artist: 'customArtist03',
        //   album: 'customAlbum03',
        //   id: 'customID03',
        //   uri: 'spotify:track:2YFtpiy2WoAQVQbM1SIwES'
        // }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.moveTrackUp = this.moveTrackUp.bind(this);
    this.moveTrackDown = this.moveTrackDown.bind(this);
  }
  // add song to playlist state
  addTrack(track) {
    // is current song in the playlistTracks state?
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('guard clause ran: track exists');
      return;
    }
    // add track to end of playlistTracks
    this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
  }
  // remove track from playlist state 
  removeTrack(track) {
    // create new array with track removed
    let newPlaylistTracks = this.state.playlistTracks.filter(currentTracks => currentTracks.id !== track.id);
    // update state with new array
    this.setState({ playlistTracks: newPlaylistTracks });
  }
  // update playlist name
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
    console.log('playlistName:', this.state.playlistName);
  }
  // generate array of `uri` values called `trackURIs` from `playlistTracks`
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    // let trackURIs = this.state.playlistTracks.map(({uri}) => uri);

    console.log('trackURIs', trackURIs);
    console.log('playlistTracks', this.state.playlistTracks);

    // update the .savePlaylist() method to call Spotify.savePlaylist().

    // after calling Spotify.savePlaylist(), reset the state of playlistName
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState(
      {
        playlistName: 'New Playlist',
        playlistTracks: []
      }
    );
  }
  // search for tracks and save results
  search(searchTerm) {
    // Update the state of searchResults with the value resolved from Spotify.search()‘s promise
    Spotify.search(searchTerm)
      .then(searchResult => {
        if (searchResult === undefined) {
          throw new Error('Error: searchResult undefined');
        }
        this.setState(
          { searchResults: searchResult }
        );
      }
      )
      .catch(error => { console.log(error) });
  }

  // move playlist tracks
  moveTrackUp(track) {
    let origTrackPosition = this.state.playlistTracks.findIndex(currentTracks => currentTracks.id === track.id);
    let newPlaylistTracks = this.state.playlistTracks.filter(currentTracks => currentTracks.id !== track.id);
    let newTrackPosition = origTrackPosition - 1;
    if (newTrackPosition < 0 || newTrackPosition > this.state.playlistTracks.length) {
      return;
    };
    newPlaylistTracks.splice(newTrackPosition, 0, track);
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  moveTrackDown(track) {
    let origTrackPosition = this.state.playlistTracks.findIndex(currentTracks => currentTracks.id === track.id);
    let newPlaylistTracks = this.state.playlistTracks.filter(currentTracks => currentTracks.id !== track.id);
    let newTrackPostion = origTrackPosition + 1;
    if (newTrackPostion < 0 || newTrackPostion > this.state.playlistTracks.length) {
      return;
    };
    newPlaylistTracks.splice(newTrackPostion, 0, track);
    this.setState({ playlistTracks: newPlaylistTracks });
  }
  
// after component mounts get access token
  componentDidMount() {
    window.addEventListener('load', () => { Spotify.getAccessToken() });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* <!-- Add a Playlist component --> */}
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onMoveUp={this.moveTrackUp} onMoveDown={this.moveTrackDown}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

