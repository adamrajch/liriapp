require("dotenv").config();
var key = require('./keys');
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(key.spotify);
var axios = require("axios");
var spotify = new Spotify(key.spotify);
var artistInput = process.argv[2]
var artist = process.argv.slice(3).join(" ");
var bandsAPI = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
if (artistInput == 'concert-this') {
    console.log('hello')
    axios.get(bandsAPI).then(
        function (response) {
            // console.log(response.data[0]);
            console.log('Venue: ' + response.data[0].venue.name)
            console.log('Location: ' + response.data[0].venue.city + ' ' + response.data[0].venue.region)
        }
    );
}
else if (artistInput == 'movie-this') {
    if (process.argv[3]) {
        var movieNames = "";
        for (let i = 3; i < process.argv.length; i++) {
            movieNames += process.argv[i];
            movieNames += " ";
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieNames + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(
            function (response) {

                console.log("Title: " + response.data.Title)
                console.log("Year: " + response.data.Year)
                console.log("Rating: " + response.data.Rating)
                console.log("Country: " + response.data.Country)
                console.log("Language: " + response.data.Language)
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
            }

        );
    }
    else {
        var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(
            function (response) {

                console.log("Title: " + response.data.Title)
                console.log("Year: " + response.data.Year)
                console.log("Rating: " + response.data.Rating)
                console.log("Country: " + response.data.Country)
                console.log("Language: " + response.data.Language)
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
            }

        );


    }


}
else if (artistInput == 'spotify-this-song') {
    var songName = "";
    for (let i = 3; i < process.argv.length; i++) {
        songName += process.argv[i];
        songName += " ";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[1].artist);
        console.log(data.tracks.items[1].artists[0].name);
        console.log(data.tracks.items[1].name);
        console.log(data.tracks.items[1].preview_url);
        // console.log(data.tracks.items[1].album.artists);
    });
}


