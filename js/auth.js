app.controller("auth", ["$scope", "$location", "$firebaseAuth", "storage",
  function($scope, $location, $firebaseAuth, storage) {

  	// Getting firebase reference
	var ref = new Firebase("https://marty.firebaseio.com/");


    $scope.authObj = $firebaseAuth(ref);
    $scope.userObj = {};
    
    // Function to create new player/user
    $scope.registerUser = function () {

        console.log("$scope.userObj", $scope.userObj);

        $scope.authObj.$createUser($scope.userObj)
        .then(function(userData) {
	      console.log("User " + userData.uid + " created successfully!");
	      // Getting firebase with "users" object
		  var uidRef = new Firebase("https://marty.firebaseio.com/users/" + userData.uid);
		  // Sending new info to object: uid and email
		  uidRef.set({

		  	uid: userData.uid,
		  	email: $scope.userObj.email

		  })
		  // Logging user
	      $scope.loginUser();
	      // In case of error
    	}).catch(function(error) {
    		console.error("Error: ", error);
    	});
    };

    // Function to log-in player/user
    $scope.loginUser = function () {
    	$scope.authObj.$authWithPassword($scope.userObj)
    	.then(function(authData) {
          console.log("Logged in as:", authData.uid);
          // Setting userID 
		  storage.setUserId(authData.uid);
		  // Move to "start" page
          $location.path('/start');
          // In case of error
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    };

}]);	