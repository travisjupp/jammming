source ./src/private/scriptData.sh #userID, authToken

# get recommendations
if [ $1 = "getrecs" ]
then
echo "Running $1"
    if [[ $2 = "-a" ]]
    then
        exec curl -H "Authorization: Bearer $authToken" \
        https://api.spotify.com/v1/recommendations\?seed_artists\=$3
    elif [[ $2 = "-g" ]]
    then
        exec curl -H "Authorization: Bearer $authToken" \
        https://api.spotify.com/v1/recommendations\?seed_genres\=$3
    elif [[ $2 = "-t" ]]
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
elif [ $1 = "createplist" ]
then
echo "Running $1"
exec curl -H "Authorization: Bearer $authToken" \
-H "Content-Type: application/json" -d '{"name":"playlistName"}' \
https://api.spotify.com/v1/users/$userID/playlists

# get user playlists
elif [ $1 = "getplist" ]
then
echo "Running $1"
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/me/playlists
# https://api.spotify.com/v1/me/playlists\?offset\=

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