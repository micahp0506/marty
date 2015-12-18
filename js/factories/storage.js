app.factory("storage", function() {
  var userId = null;
  var userScore = 0;
  var userEmail;
  // var scoresRef = new Firebase("https://marty.firebaseio.com/");
  // var user = scoresRef.getAuth();

  return {
    getUserId: function() {
      // if (!!user) {
      //   return user.uid;
      // } else {
        return userId;
      // }
    },
    setUserId: function(id) {
      userId = id;
      console.log("userID set to:", id);
    },
    setUserScore: function(score) {
      userScore = score;
      console.log("userScore set to:", score);
    },
    getUserScore: function() {
      return userScore;
    },
    setUserEmail: function(email) {
      userEmail = email;
      console.log("userEmail set to:", email);
    },
    getUserEmail: function() {
      return userEmail;
    }
  };
});