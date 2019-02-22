var friends = require("../data/friends.js")

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends)
    })
    
    app.post("/api/friends", function(req, res){
        var user = req.body;
        var match;
        for (i in user.scores) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        var differenceArray = [];
        
        // This function takes the user's input and compares that to the scores of preexisting friends
        function compatCheck() {
            for (i in friends) {
                var totalDifference = 0
                // The difference between the user's score and the friend's score is calculated by adding the difference of each question
                // the total difference for each 'friend' is pushed into differenceArray 
                for (j in friends[i].scores) {
                    var difference = Math.abs(friends[i].scores[j] - user.scores[j]);
                    totalDifference += difference;
                }
                differenceArray.push(totalDifference)
            }
            // The minimum total difference is calculated by using the Math.min() method.
            // The index of the minumum difference will correspond to the index of the friend that it belongs to in the friends array.
            // This index is then used to find the friend with the lowest difference and saves that friend as the match.
            var minDif = Math.min(...differenceArray);
            var matchIndex = differenceArray.indexOf(minDif)
            match = friends[matchIndex];
            
        }
        compatCheck();
        friends.push(user)
        res.json(match);
        
    })


}

