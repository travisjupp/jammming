# Codecademy Front-End Engineer path Challenge Project: Jammming

[![Netlify Status](https://api.netlify.com/api/v1/badges/e2ba751a-e875-47a2-8548-ce95a591b877/deploy-status)](https://app.netlify.com/sites/react-jammming-spotify/deploys)

## Description
Jammming is a React application that lets a user search Spotify for audio tracks to create and save playlists to a Spotify account using the [Spotify Web API](https://developer.spotify.com/documentation/web-api).

This app uses React class component methods to perform various tasks, stateful components hold search results and playlist information, and a Spotify utility module to handle endpoint requests.

Live site: https://react-jammming-spotify.netlify.app/


## Setup Instructions

Setup necessary [Spotify Web API](https://developer.spotify.com/documentation/web-api) authorization credentials by creating an app on the [Spotify Dashboard](https://developer.spotify.com/dashboard)

For local development mode, check `Spotify.js` uses `redirectURI = 'http://localhost:3000/'` and the apps [Spotify Dashboard](https://developer.spotify.com/dashboard) configurations __redirect URI__ is also set to `'http://localhost:3000/'` 

Run `npm install` to install dependencies.

Start the server with `npm start` and visit http://localhost:3000/

## Spotify Utility module

The `Spotify` utility module is in charge of user authorization, track searches, and saving playlists using the following methods:

* `getAccessToken()` authenticates users using [implicit grant flow](https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow)

* `search()` searches for tracks by sending a GET request to the Spotify `/v1/search` API endpoint

* `savePlaylist()` saves custom playlists to a Spotify account by sending a GET request to `/v1/me`, then a POST request to the `/v1/users/<username>/playlists` Spotify API endpoints

## State

This application has two stateful components:  

The `App` component manages the applications __playlist name__ as a string and __playlist tracks__ as an array of track objects.

```js
// App.js
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
```
The `SearchBar` component holds the __search terms__ state as a string.
```js
// SearchBar.js
searchTerm: 'search term'
```
## Components

* App
  * renders SearchBar, SearchResults, and Playlist components
  * methods
    * adding/removing tracks
    * updating playlist name
    * saving playlists
    * searching for tracks
    * moving playlist tracks
  * holds playlist-name, playlist-tracks state

* Playlist
  * renders a playlist using Tracklist component and an input for naming playlists

* SearchBar
  * renders an input field for searching tracks
  * holds search-term state

* SearchResults
  * renders search results using Tracklist component

* TrackList
  * renders a list of tracks using Track component

* Track
  * renders individual tracks with track details and buttons for adding/removing/moving playlist tracks
