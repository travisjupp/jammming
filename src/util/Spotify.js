const clientID = 'c76cb3963c544805bf457075575dc6f6';
// const redirectURI = 'http://localhost:3000/'; // use this for local development mode
const redirectURI = 'https://react-jammming-spotify.netlify.app/';
let accessToken;
const baseURL = 'https://api.spotify.com';

// Spotify utility module
const Spotify = {
    getAccessToken() {
        // return token if set
        if (accessToken) {
            console.log('returning access token...');
            return accessToken;
        }
        // build URL and get auth key
        const accessTokenFromURL = window.location.href.match(/access_token=([^&]*)/);
        const tokenExpirationFromURL = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenFromURL && tokenExpirationFromURL) {
            console.log('getting token from URL...');
            accessToken = accessTokenFromURL[1];
            const tokenExpiration = Number(tokenExpirationFromURL[1]);

            // clear parameters, allows grab new token at expiration
            window.setTimeout(() => accessToken = '', tokenExpiration * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            console.log('building auth URL...');
            const scope = 'playlist-modify-public';

            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(clientID);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirectURI);
            // url += '&state=' + encodeURIComponent(state);

            window.location = url; // redirects after this
        }
    },
    // search for tracks
    async search(term) {
        Spotify.getAccessToken();
        try {
            let response = await fetch(`${baseURL}/v1/search?type=track&q=${term}
                        `, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(`${data.error.status} ${data.error.message}`)
            };
            if (data.tracks.items.length > 0) {
                return data.tracks.items.map((track) => {
                    return {
                        'id': track.id,
                        'name': track.name,
                        'artist': track.artists[0].name,
                        'album': track.album.name,
                        'uri': track.uri,
                    }
                });
            } else {
                return [];
            }
        } catch (e) {
            console.log(e);
        }
    },
    // write custom playlist to Spotify account
    async savePlaylist(playlistName, trackURIs) {
        // check values are saved. if not, return
        if (!(playlistName && trackURIs)) {
            console.log('savePlaylist params false, early return');
            return;
        }
        Spotify.getAccessToken();
        let headers = {
            'Authorization': 'Bearer ' + accessToken,
        }
        // request Spotify username, save the response id parameter to the user’s ID variable.
        let userID;
        try {
            let response = await fetch(`${baseURL}/v1/me`, { method: 'GET', headers: headers });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(`Requesting username. ${data.error.status} ${data.error.message}`);
            };
            userID = data.id;
        } catch (e) {
            console.log(e);
        }
        // use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
        let playlistID;
        try {
            let response = await fetch(`${baseURL}/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: playlistName
                }),
            });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(`Creating playlist. ${data.error.status} ${data.error.message}`);
            };
            playlistID = data.id;
            console.log('playlistID', playlistID);
        } catch (e) {
            console.log(e);
        }
        // use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
        try {
            let response = await fetch(`${baseURL}/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    uris: trackURIs
                }),
            });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(`Adding playlist tracks. ${data.error.status} ${data.error.message}`);
            };
            playlistID = data.snapshot_id;
            console.log('snapshot_id', playlistID);
        } catch (e) {
            console.log(e);
        }
    }
}

export default Spotify;
