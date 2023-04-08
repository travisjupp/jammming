source ./src/private/scriptData.sh #userID, authToken

# get recommendations
# ex: bash spotify.sh getrecs 4NHQUGzhtTLFvgF5SZesLK
# ex: bash spotify.sh getrecsg classical,country
# ex: bash spotify.sh getrecst 0c6xIDDpzE81m2q797ordA
if [ $1 = "getrecs" ]
then
echo Running getrecs
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/recommendations\?seed_artists\=$2
elif [ $1 = "getrecsg" ]
then
echo Running getrecsg
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/recommendations\?seed_genres\=$2
elif [ $1 = "getrecst" ]
then
echo Running getrecst
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/recommendations\?seed_tracks\=$2

# create playlist
elif [ $1 = "createplist" ]
then
echo Running createplist
exec curl -H "Authorization: Bearer $authToken" \
-H "Content-Type: application/json" -d '{"name":"playlistName"}' \
https://api.spotify.com/v1/users/$userID/playlists

# get audio features
# ex: bash spotify.sh getaf 0LSLM0zuWRkEYemF7JcfEE,5CMjjywI0eZMixPeqNd75R,0DiWol3AO6WpXZgp0goxAV
elif [ $1 = "getaudiofeats" ]
then
echo Running getaudiofeats
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/audio-features\
?ids\=$2

# get profile
elif [ $1 = "getprofile" ]
then
echo Running getprofile
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/me

# get track
# ex: bash spotify.sh gettrack 11dFghVXANMlKmJXsNCbNl
elif [ $1 = "gettrack" ]
then
echo Running gettrack
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/tracks/$2

# get tracks
# ex: bash spotify.sh gettracks 7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B
elif [ $1 = "gettracks" ]
then
echo Running gettracks
exec curl -H "Authorization: Bearer $authToken" \
https://api.spotify.com/v1/tracks\
?ids\=$2


fi

