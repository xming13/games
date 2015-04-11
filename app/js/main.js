var XMing = XMing || {};

XMing.EggCollection = new function() {
    var userData;
    var VERSION_NUMBER = 1;

    this.init = function() {
        userData = this.loadData();

        this.setupCollection();
    }

    this.setupCollection = function() {
        if (!userData) {
            return;
        }

        _.each(userData.easterEgg, function(value, key) {
            console.log(key + ': ' + value);
        });
    }

    // Local storage
    this.loadData = function() {
        if (window.localStorage) {
            var data = window.localStorage.getItem('data');
            if (data) {
                var parsedData = JSON.parse(decodeURIComponent(atob(data)));
                // make sure version is the same
                if (parsedData.version === VERSION_NUMBER) {
                    return parsedData;
                }
            }
        }

        var data = {
            played: {
                bunny: false,
                specialOne: false,
                mushrooms: false,
                word: false,
                numbers: false,
                squirrel: false
            },
            leaderboard: {
                bunny: false,
                specialOne: false,
                mushrooms: false,
                word: false,
                numbers: false,
                squirrel: false
            },
            squirrel: {
                level: 0,
                inHallOfFame: false
            },
            easterEgg: {
                allGames: false,
                allLeaderboard: false,
                findTheWord: false,
                followTheNumbers: false,
                spotTheSpecialOne: false,
                mushrooms: false,
                squirrel: false
            },
            version: VERSION_NUMBER
        };
        return data;
    };
};

$(function() {
    XMing.EggCollection.init();
});
