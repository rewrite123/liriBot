/* 
 * This program was create by Greenman for the University of Austin's coding bootcamp through Trilogy as homework.
 * It creates a simple GUI using electron, which is then in turn used to make api calls to either spotify to find songs and bands that are playing nearby, or omdb for movies.
 * Use npm install to install all the neccessary components.
 * You can find the most up-to-date version here: https://github.com/rewrite123/liriBot
*/

const { app, BrowserWindow } = require('electron');

var win = null;

app.on("window-all-closed", function(e){
	if(process.platform != "darwin"){
		app.quit();
	}
});

app.on("ready", function(e){
	win = new BrowserWindow({width: 640, height: 480});
	win.loadURL('file://' + __dirname + '/html/index.html');
	
	win.on("closed", function(e){
		win = null;
	});
	
});
