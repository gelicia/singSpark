// Our Twitter library
var Twit = require('twit');
var rest = require('restler');

// We need to include our configuration file
var T = new Twit(require('./twitterConfig.js'));
var sparkConfig = require('./sparkConfig.js');

//this could probably be part of the config file, but the config is pretty straightforward as it is
var userName = '';
T.get('account/verify_credentials', {}, function(error, data){
	userName = data.screen_name;
});

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
		//make sure it's a direct mention that wasn't played before / (it favorites when it plays)
		if(mentions[i].in_reply_to_screen_name == userName && !mentions[i].favorited){
			var tweetText = mentions[i].text.substring(11, mentions[i].text.length);
			//look for strings that are all notes
			var re = new RegExp("(^|\\s)(c|d|e|f|g|a|b|C|\\s)+", "g");
			var match = re.exec(tweetText);
			//grab the tweet that has a match and the match is more than three notes 
			if (match !== null && match[0].trim().length > 3){
				music.notes = match[0].trim();
				music.playID = mentions[i].id_str;
				return music;
			}
		}

		if (music.notes !== undefined){
			return music;
		}
	}
}

playLatestMention(); 
setInterval(playLatestMention, 1000 * 60);