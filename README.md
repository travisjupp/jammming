# Challenge Project: Jammming

[![Netlify Status](https://api.netlify.com/api/v1/badges/e2ba751a-e875-47a2-8548-ce95a591b877/deploy-status)](https://app.netlify.com/sites/react-jammming-spotify/deploys)

## Description
Jammming is a React application that lets a user search Spotify for audio tracks to create and save playlists to a Spotify account using the [Spotify Web API](https://developer.spotify.com/documentation/web-api).

This app uses React class component methods to manage state, and a Spotify utility module to handle endpoint requests.

This Challenge Project is a part of the CodeCademy Front-End Engineer path, more info can be found at https://www.codecademy.com/

Live site: https://react-jammming-spotify.netlify.app/

## Technologies used

* `react` v. 18.2.0
* `react-dom` v. 18.2.0
* `react-scripts` v. 5.0.1
* `npm` v. 8.19.2

## Setup Instructions

Setup necessary [Spotify Web API](https://developer.spotify.com/documentation/web-api) authorization credentials by creating an app on the [Spotify Dashboard](https://developer.spotify.com/dashboard)

For local development mode, check `Spotify.js` uses `redirectURI = 'http://localhost:3000/'` and the apps [Spotify Dashboard](https://developer.spotify.com/dashboard) configurations __redirect URI__ is also set to `'http://localhost:3000/'` 

Run `npm install` to install dependencies.

Start the server with `npm start` and visit http://localhost:3000/

## Spotify utility module
[src/util/Spotify.js](./src/util/Spotify.js)

The `Spotify` utility module handles user authorization, track searches, and saving playlists

| Method name | Parameters | Description |
| ----------- | ----------- | ----------- |
| `getAccessToken()` | none | Authenticates users using Spotify API's [implicit grant flow](https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow) and returns an access token |
| `search()`  | term string | Searches for tracks by sending a GET request to the Spotify `/v1/search` API endpoint and returns an array of track objects |
| `savePlaylist()` | name string, track URI's array | Saves custom playlists to a Spotify account by sending a GET request to `/v1/me`, then a POST request to the `/v1/users/<username>/playlists` Spotify API endpoints

## State

This application has two stateful components:  

The `App` component manages the applications __search results__, __playlist name__, and __playlist tracks__:

```js
// App.js
...
searchResults: [
    // Search objects
    {
        name: 'Track01',
        artist: 'Artist01',
        album: 'Album01',
        id: 'ID01'
    },
    {
        name: 'Track02',...
    }
],
playlistName: 'Custom PlaylistName',
playlistTracks: [
    // Track objects
    {
        name: 'Track01',
        artist: 'Artist01',
        album: 'Album01',
        id: 'ID01',
        uri: 'spotify:track:2YFtpiy2WoAQVQbM1SIwES'
    },
    {
        name: 'Track02'...
    }
]
...
```
The `SearchBar` component holds the __search terms__ state as a string:
```js
// SearchBar.js
searchTerm: 'search term'
```
## Components

### `App`
[src/Components/App/App.js](./src/Components/App/App.js)

Renders `SearchBar`, `SearchResults`, and `Playlist` components

#### STATE  
Holds playlist-name, playlist-tracks state

#### PROPS & METHODS

| Method name | Parameters | Description |
| ----------- | ----------- | ----------- |
| `addTrack()` | track object | Add track to playlist tracks |
| `removeTrack()` | track object | Remove track from playlist tracks |
| `moveTrackUp()` | track object | Move track object up |
| `moveTrackDown()` | track object | Move track object down |
| `updatePlaylistName()` | name string | Update playlist name |
| `savePlaylist()` | track object | Save playlist name & tracks |
| `search()` | search string | Update search results |


### `Playlist`
[src/Components/Playlist/Playlist.js](./src/Components/Playlist/Playlist.js)

Renders a playlist using `Tracklist` component and an input for naming playlists

#### PROPS
| Prop name | Type | Description |
| --------- | --------- | --------- |
| `playlistTracks` | array | Array of track objects |
| `onRemove()` | method | Remove track from playlist tracks |
| `onNameChange()` | method | Update playlist name |
| `onSave()` | method | Save playlist name & tracks |
| `onMoveUp()` | method | Move track object up |
| `onMoveDown()` | method | Move track object down |


### `SearchBar`
[src/Components/SearchBar/SearchBar.js](./src/Components/SearchBar/SearchBar.js)

Renders an input field for searching tracks

#### PROPS
| Prop name | Type | Description |
| --------- | --------- | --------- |
| `onSearch()` | method | Update search results |

#### STATE
Holds search-term state


### `SearchResults`
[src/Components/SearchResults/SearchResults.js](./src/Components/SearchResults/SearchResults.js)

Renders search results using `Tracklist` component

#### PROPS
| Prop name | Type | Description |
| --------- | --------- | --------- |
| `searchResults` | array | Array of search results |
| `onAdd()` | method | Add track to playlist tracks |


### `TrackList`
[src/Components/TrackList/TrackList.js](./src/Components/TrackList/TrackList.js)

Renders a list of tracks using `Track` component

#### PROPS
| Prop name | Type | Description |
| --------- | --------- | --------- |
| `tracks` | array | Array of track objects |
| `onAdd()` | method | Add track to playlist tracks |
| `onRemove()` | method | Remove track from playlist tracks |
| `isRemoval` | bool | Flag tracks for removal |
| `onMoveUp()` | method |  Move track object up |
| `onMoveDown()` | method |  Move track object down |


### `Track`
[src/Components/Track/Track.js](./src/Components/Track/Track.js)

Renders individual tracks with track details and buttons for adding/removing/moving playlist tracks

#### PROPS
| Prop name | Type | Description |
| --------- | --------- | --------- |
| `track` | object | A single track object |
| `onAdd()` | method | Add track to playlist tracks |
| `onRemove()` | method | Remove track from playlist tracks |
| `isRemoval` | bool | Flag tracks for removal |
| `isFirstTrack` | bool | Flag first tracks |
| `isLastTrack` | bool | Flag last tracks |
| `onMoveUp()` | method |  Move track object up |
| `onMoveDown()` | method |  Move track object down |



## Extras

### Spotify API script

Access Spotify API endpoints with [spotify.sh](./spotify.sh)