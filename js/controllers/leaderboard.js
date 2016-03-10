app.controller("leaderboard", ["$scope", "$location", "$firebaseArray", "$filter",
	function($scope, $location, $firebaseArray, $filter) {

		// Firebase highscores ref
    	var scoresRef = new Firebase("https://marty.firebaseio.com/scores/");
    	// Firebase array for filtering by partial
		$scope.allScores = $firebaseArray(scoresRef);


}]);



