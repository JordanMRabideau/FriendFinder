var friends = require("../data/friends.js")

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends)
    })
    
    app.post("/api/friends", function(req, res){
        var user = req.body;
        for (i in user.scores) {
            user.scores[i] = parseInt(user.scores[i]);
        }
        var differenceArray = [];
        function compatCheck() {
            for (i in friends) {
                var totalDifference = 0
                for (j in friends[i].scores) {
                    var difference = Math.abs(friends[i].scores[j] - user.scores[j]);
                    totalDifference += difference;
                }
                differenceArray.push(totalDifference)
            }
            var minDif = Math.min(...differenceArray);
            console.log("minimum difference: " + minDif);
            var matchIndex = differenceArray.indexOf(minDif)
            console.log("match index: " + matchIndex);
            var match = friends[matchIndex];
            console.log(match);
            
        }
        compatCheck();
        friends.push(user)
        res.json(match);
        
    })


}

