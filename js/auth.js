app.controller("auth", ["$scope", "$location", "$firebaseAuth", "storage",
  function($scope, $location, $firebaseAuth, storage) {

    
    // Getting firebase reference
    var ref = new Firebase("https://marty.firebaseio.com/");

    $scope.authObj = $firebaseAuth(ref);
    $scope.userObj = {};
    
    // Function to create new player/user
    $scope.registerUser = function () {
        // This to logout current signed in user
        ref.unauth();
        console.log("$scope.userObj", $scope.userObj);

        $scope.authObj.$createUser($scope.userObj)
        .then(function(userData) {
        // Setting userEamil to email entered
        var userEmail = $scope.userObj.email;
        console.log("User " + userData.uid + " created successfully!");
        // Setting user nickname
        var userNickname = $scope.userObj.nickname;
        // Getting firebase with "users" object
        var uidRef = new Firebase("https://marty.firebaseio.com/users/" + userData.uid);
        // Getting firebase with "scores" object
        var scoresRef = new Firebase("https://marty.firebaseio.com/scores/");
        // Sending new info to "users" object: uid and email
        uidRef.set({

         uid: userData.uid,
         email: userEmail

        })
        // Sending new info to "scores" object: score and email
        scoresRef.push({

         score: 0,
         email: userEmail,
         uid: userData.uid

        })
        // Logging-in user
        $scope.loginUser();
        // In case of error
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    };

    // Function to log-in player/user
    $scope.loginUser = function () {
      // Getting firebase reference
      var ref = new Firebase("https://marty.firebaseio.com/");
      // This to logout current signed in user
      ref.unauth();
    	$scope.authObj.$authWithPassword($scope.userObj)
      .then(function(authData) {
      console.log("$scope.userObj", $scope.userObj);
          console.log("Logged in as:", authData.uid);
          // Setting userID 
		      storage.setUserId(authData.uid);
          // Setting userEmail
          storage.setUserEmail($scope.userObj.email);
		      // Move to "start" page
          $location.path('/start');
          // In case of error
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    };

}]);	