app.controller("leaderboard", ["$scope", "$location", "$firebaseArray", "storage", "$firebaseObject",
  function($scope, $location, $firebaseArray, storage, $firebaseObject) {



		// Firebase highscores ref
    	var scoresRef = new Firebase("https://marty.firebaseio.com/scores/");

  		scoresRef.once('value', function(snap) {
  			var thisUsersCurrentScores = snap.val();
  			for (var eachScoresKey in thisUsersCurrentScores) {
  				console.log(thisUsersCurrentScores[eachScoresKey].score)
  			}
  		})
  		




}]);



// scoresRef.orderByChild('uid').equalTo('81304731-6fdc-4f73-a3f4-6ccf739d00ac').once('value', function(snap) { 
// 	console.log(snap.val()) 
// })