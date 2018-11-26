const axios = require("axios");

function search(){
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

function searchMovie(){
	var searchTerm = document.getElementById("searchTerm").value;
	searchTerm.trim();
	searchTerm.replace(" ", "+");
	var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm;
	axios.get(url).then(function(res){
		document.write(JSON.stringify(res));
	});
}

