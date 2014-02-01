// Our Twitter library
var Twit = require('twit');
var rest = require('restler');

// We need to include our configuration file
var T = new Twit(require('./twitterConfig.js'));
var sparkConfig = require('./sparkConfig.js');


function playLatestMention() {
	//get the 10 latest mentions
	T.get('statuses/mentions_timeline', {count:10}, function (error, data) {
		//noise to signal finds the last good unplayed one, gets all the notes out, and returns
		//that and the tweet's ID
		var music = noiseToSignal(data);

		//send an api call to spark that will play the sound
		rest.post('https://api.spark.io/v1/devices/' + sparkConfig.deviceID + '/sing', {
			data: { 'access_token': sparkConfig.accessToken,
			'args': music.notes }
		}).on('complete', function(data, response) {
			//when it's done, favorite the tweet so the person knows they are now a performer
			T.post('favorites/create', { id: music.playID }, function(err, reply) {});
		});
	});
}

function noiseToSignal(mentions){
	//return both the music.notes and the music.playID of the tweet that was played for favoriting
	var music = {};

	for (var i = 0; i < mentions.length; i++) {
		//mentions[i];
	}

	//var re = new RegExp("(c|d|e|f|g|a|b|C)+", "g");
	var thisTweet = data[0].text;
		
	console.log(data[0]);
	console.log(music);
	return music;
}

//playLatestMention();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
//setInterval(playLatestMention, 1000 * 60);
