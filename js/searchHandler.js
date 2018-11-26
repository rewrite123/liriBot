const axios = require("axios");
const SpotifyWebApi = require('node-spotify-api');

/* I know this really should not be in here, but I need this to be graded so ¯\_(ツ)_/¯ . */
var spotifyApi = new SpotifyWebApi({
	id: "4293e7d58adb40428b2a8e51e416f536",
	secret: "b57ba52eb1544a1ba3942a6b17b6b1e2"
});

var SongObj = function(){
	this.name = arguments[0] || "Not available :(";
	this.pop = arguments[1] || "Not available :(";
	this.href = document.createElement("a");
	this.href.href = "#";
	this.href.target = "_blank";
	this.href.href = arguments[2] || "#NotAvailableFrownyFace";
	this.href.textContent = (arguments[2]) ? "You can find it here! " + this.href.href : "Not available :(";
	
	this.getContainer = function(){
		var container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		
		var name = document.createElement("p");
		name.textContent = "Name: " + this.name;
		
		var pop = document.createElement("p");
		pop.textContent = "Popularity: " + this.pop;
		
		container.append(name);
		container.append(pop);
		container.append(this.href);
		return container;
	}
}

var MovieObj = function(){
	this.title = arguments[0] || "Not available :(";
	this.rating = arguments[1] || "Not available :(";
	this.length = arguments[2] || "Not available :(";
	this.imdbRating = arguments[3] || "Not available :(";
	this.image = document.createElement("img");
	this.image.width = 250;
	this.image.height = 350;
	this.image.src = arguments[4] || "";
	this.image.alt = "Not available :(";
	
	this.getContainer = function(){
		var container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		
		var title = document.createElement("p");
		title.textContent = "Title: " + this.title;
		
		var rating = document.createElement("p");
		rating.textContent = "Rating: " + this.rating;
		
		var length = document.createElement("p");
		length.textContent = "Length: " + this.length;
		
		var imdbRating = document.createElement("p");
		imdbRating.textContent = "IMDB rating: " + this.imdbRating;
		
		container.append(this.image);
		container.append(title);
		container.append(rating);
		container.append(length);
		container.append(imdbRating);
		
		return container;
	}
	
}

function search(){
	var searchTerm = document.getElementById("searchTerm").value;
	searchTerm.trim();
	searchTerm.replace(" ", "");
	if(searchTerm == ""){
		alert("You need to type something!");
	}else{
		var songSearch = document.getElementById("song");
		var movieSearch = document.getElementById("movie");
		var bandSearch = document.getElementById("band");
		if(songSearch.checked){
			searchSong();
		}else if(movieSearch.checked){
			searchMovie();
		}else if(bandSearch.checked){
			searchBand();
		}else{
			alert("Please select one of the valid search terms!");
		}
	}
}

function searchSong(){
	var searchTerm = document.getElementById("searchTerm").value;
	searchTerm.trim();
	searchTerm.replace(" ", "+");
	spotifyApi.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		console.log(JSON.stringify(data)); 
		var toDisplay = new SongObj(data.tracks.items[0].name, data.tracks.items[0].popularity, data.tracks.items[0].external_urls.spotify);
		document.getElementById("resultsContainer").innerHTML = "";
		document.getElementById("resultsContainer").append(toDisplay.getContainer());
	});
}

function searchMovie(){
	var searchTerm = document.getElementById("searchTerm").value;
	searchTerm.trim();
	searchTerm.replace(" ", "+");
	var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm;
	axios.get(url).then(function(data){
		var toDisplay = new MovieObj(data.data.Title, data.data.Rated, data.data.Runtime, data.data.imdbRating, data.data.Poster);
		document.getElementById("resultsContainer").innerHTML = "";
		document.getElementById("resultsContainer").append(toDisplay.getContainer());
	});
}

function searchBand(){
	
}