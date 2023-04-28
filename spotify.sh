#!/bin/bash
# shell-script for accessing Spotify API endpoints
source ./src/private/scriptData.sh #userID, authToken

# get recommendations
if [ $1 = "getrecs" ]
then
echo "Running $1"
    if [ $2 = "-a" ]
    then
        exec curl -H "Authorization: Bearer $authToken" \
        https://api.spotify.com/v1/recommendations\?seed_artists\=$3
    elif [ $2 = "-g" ]
    then
        exec curl -H "Authorization: Bearer $authToken" \
        https://api.spotify.com/v1/recommendations\?seed_genres\=$3
    elif [ $2 = "-t" ]
    then
        exec curl -H "Authorization: Bearer $authToken" \
        https://api.spotify.com/v1/recommendations\?seed_tracks\=$3
    else
    echo "usage:"
    echo "seed artists> $1 -a 4NHQUGzhtTLFvgF5SZesLK"
    echo "seed genres> $1 -g classical,country"
    echo "seed tracks> $1 -t 0c6xIDDpzE81m2q797ordA"
    fi

# create playlist
# ex: bash spotify.sh createplist "new plist" "new desc"
elif [ $1 = "createplist" ]
then
playlistName=$2
playlistDesc=$3
echo "Running $1"
exec curl -H "Authorization: Bearer $authToken" \
-H "Content-Type: application/json" -d "{\"name\":\"$playlistName\",\"description\":\"$playlistDesc\"}" \
https://api.spotify.com/v1/users/$userID/playlists

# update playlist
# ex: bash spotify.sh updateplist 25fHlVRDZZNu0suksCNHq5 2 0 1
elif [ $1 = "updateplist" ]
then
playlistID=$2
echo "Running $1"
exec curl -X PUT https://api.spotify.com/v1/playlists/$playlistID/tracks\?uris\= \
-H "Authorization: Bearer $authToken" \
-H "Content-Type: application/json" \
-d "{\"range_start\":$3,\"insert_before\":$4,\"range_length\":$5}"

# get user playlists
# ex: bash spotify.sh getplist | grep -w id  
elif [ $1 = "getplist" ]
then
    if [ $2 = "-ids" ]
    then
    # save up to 180 playlist ids
    curl -H "Authorization: Bearer $authToken" \
    https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=0\
    > infile.json;
    curl -H "Authorization: Bearer $authToken" \
    https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=50\
    >> infile.json;
    curl -H "Authorization: Bearer $authToken" \
    https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=100\
    >> infile.json;
    curl -H "Authorization: Bearer $authToken" \
    https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=150\
    >> infile.json;

    jq -r '.items[range(0;50)].id' infile.json >> playlistIds.json;
    cat playlistIds.json;
    
    else
    exec curl -H "Authorization: Bearer $authToken" \
    https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=0 # 1-50
    # https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=50 # 51-100
    # https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=100 # 101-150
    # https://api.spotify.com/v1/me/playlists\?limit\=50\&offset\=150 # 151-200
    fi
 
# Get multiple playlist id's using jq -> https://stedolan.github.io/jq/
# bash spotify.sh getplist > infile.json
# jq -r '.items[range(0;19)].id' infile.json

# get audio features
# ex: bash spotify.sh getaudiofeats 0LSLM0zuWRkEYemF7JcfEE,5CMjjywI0eZMixPeqNd75R,0DiWol3AO6WpXZgp0goxAV
elif [ $1 = "getaudiofeats" ]
then
echo "Running $1"
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/audio-features\
?ids\=$2

# get profile
elif [ $1 = "getprofile" ]
then
echo "Running $1"
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/me

# get track
# ex: bash spotify.sh gettrack 11dFghVXANMlKmJXsNCbNl
elif [ $1 = "gettrack" ]
then
echo "Running $1"
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/tracks/$2

# get tracks
# ex: bash spotify.sh gettracks 7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B
elif [ $1 = "gettracks" ]
then
echo "Running $1"
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/tracks\
?ids\=$2
else
echo "Command not found"
fi
