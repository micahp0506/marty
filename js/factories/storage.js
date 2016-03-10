app.factory("storage", function() {
  var userId = null;
  var userScore = 0;
  var userEmail;


  return {
    getUserId: function() {
      return userId;
    },
    setUserId: function(id) {
      userId = id;
    },
    setUserScore: function(score) {
      userScore = score;
    },
    getUserScore: function() {
      return userScore;
    },
    setUserEmail: function(email) {
      userEmail = email;
    },
    getUserEmail: function() {
      return userEmail;
    }
  };
});
