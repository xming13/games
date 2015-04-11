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

        var imgTemplate = _.template('<img class="egg" src="images/eggs/<%= imgName %>-egg.png"/>');
        var imgLocked = imgTemplate({
            imgName: 'locked'
        });
        $('.egg-container').append(userData.easterEgg.followTheNumbers ? imgTemplate({
            imgName: 'red'
        }) : imgLocked);
        $('.egg-container').append(userData.easterEgg.mushrooms ? imgTemplate({
            imgName: 'orange'
        }) : imgLocked);
        $('.egg-container').append(userData.easterEgg.spotTheSpecialOne ? imgTemplate({
            imgName: 'yellow'
        }) : imgLocked);
        $('.egg-container').append(userData.easterEgg.squirrel ? imgTemplate({
            imgName: 'green'
        }) : imgLocked);
        $('.egg-container').append(userData.easterEgg.allGames ? imgTemplate({
            imgName: 'blue'
        }) : imgLocked);
        $('.egg-container').append(userData.easterEgg.findTheWord ? imgTemplate({
            imgName: 'purple'
        }) : imgLocked);
        $('.egg-container').append(userData.easterEgg.allLeaderboard ? imgTemplate({
            imgName: 'ninja'
        }) : imgLocked);
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
