import { clientIDval } from '../private/keys';
let accessToken;

const clientID = clientIDval;
const redirectURI = 'http://localhost:3000/';
const baseURL = 'https://api.spotify.com';




// Spotify module
const Spotify = {
    getAccessToken() { // 78. users access token set? return value if so
        if (accessToken) {
            console.log('returning access token...');
            return accessToken;
        }

        // build URL and get auth key

        // returns same value, replace?
        // window.location.href.match(/access_token=([^&]*)/)[1]
        if (!window.location.hash.substring(1).match(/access_token=([^&]*)/) && !accessToken) {
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
    // 85. In the Spotify object, add a method called search that accepts a parameter for the user’s search term.
    // .search() returns a promise that will eventually resolve to the list of tracks from the search.
    async search(term) {
        if (!accessToken) {
            this.getAccessToken();
        }
        
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
                return data;

            } catch (e) {
                console.log(e);
            }
        

    },
    // 89. savePlaylist writes custom playlist to Spotify account
    async savePlaylist(playlistName, trackURIs) {
        // 
        // if (!playlistName || !trackURIs.length) { return; }
        if (!(playlistName && trackURIs)) { // 90. check values are saved. if not, return
            console.log('savePlaylist params false, early return');
            return;
        }
        let spAccessToken = accessToken; // let accessToken = this.getAccessToken();
        let headers = {
            'Authorization': 'Bearer ' + spAccessToken,
        }
        // 92. request Spotify username. Convert the response to JSON and save the response id parameter to the user’s ID variable.
        let userID;
        try {
            let response = await fetch(`${baseURL}/v1/me`, { method: 'GET', headers: headers });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(`Requesting username. ${data.error.status} ${data.error.message}`);
            };
            // save id to userID var
            userID = data.id;
            console.log('userID: ', userID);
        } catch (e) {
            console.log(e);
        }

        // 93. Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.

        // Use the Spotify playlist endpoints to find a request that creates a new playlist.

        // Set the playlist name to the value passed into the method.

        // Convert the response to JSON and save the response id parameter to a variable called playlistID.
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
                // console.log(response.status);
                throw new Error(`Creating playlist. ${data.error.status} ${data.error.message}`);
            };
            // save playlist id to playlistID var
            playlistID = data.id;
            console.log('playlistID ', playlistID);

        } catch (e) {
            console.log(e);
        }
        // 94. Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.

        // Use the Spotify playlist endpoints to find a request that adds tracks to a playlist.

        // Set the URIs parameter to an array of track URIs passed into the method.

        // Convert the response to JSON and save the response id parameter to a variable called playlistID.

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
            console.log('playlistID', playlistID);

        } catch (e) {
            console.log(e);
        }
    }
}

// save access token, expiration, and state from URL
// this runs getAccessToken on first load and saves token/ sets timeout on redirect

if (window.location.hash.substring(1).match(/access_token=([^&]*)/)) {
    console.log('saving access token, expiration from URL...');
    // returns same value, replace?
    // window.location.href.match(/access_token=([^&]*)/)[1]
    accessToken = window.location.hash.substring(1).match(/access_token=([^&]*)/)[1]; // '<token>'

    let tokenExpiration = parseInt(window.location.hash.substring(1).match(/expires_in=([^&]*)/)[1]); // '3600'

    // set access token to expire and clear URL
    window.setTimeout(() => {
        accessToken = ''; // clear token
        window.history.pushState('Access Token', null, '/'); // clear URL
        console.log('clearToken ran');
        console.log('calling getAccessToken');
        Spotify.getAccessToken(); // replace expired token
    }, tokenExpiration * 1000);
} else {
    console.log('Access token not in URL running getAccessToken...');
    Spotify.getAccessToken();
}

export default Spotify;