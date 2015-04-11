var XMing = XMing || {};

XMing.EggCollection = new function() {
    var userData;
    var VERSION_NUMBER = 1;

    this.init = function() {
        userData = this.loadData();

        this.setupEggs();
        this.checkEggs();
    };

    this.setupEggs = function() {
        if (!userData) {
            return;
        }

        var imgTemplate = _.template('<img class="egg <%= imgName %>-egg" src="images/eggs/<%= imgName %>-egg.png"/>');
        var imgUnknown = imgTemplate({
            imgName: 'unknown'
        });
        $('.egg-container').html('');
        $('.egg-container').append(userData.easterEgg.followTheNumbers ? imgTemplate({
            imgName: 'red'
        }) : imgUnknown);
        $('.egg-container').append(userData.easterEgg.mushrooms ? imgTemplate({
            imgName: 'orange'
        }) : imgUnknown);
        $('.egg-container').append(userData.easterEgg.spotTheSpecialOne ? imgTemplate({
            imgName: 'yellow'
        }) : imgUnknown);
        $('.egg-container').append(userData.easterEgg.squirrel ? imgTemplate({
            imgName: 'green'
        }) : imgUnknown);
        $('.egg-container').append(userData.easterEgg.allGames ? imgTemplate({
            imgName: 'blue'
        }) : imgUnknown);
        $('.egg-container').append(userData.easterEgg.findTheWord ? imgTemplate({
            imgName: 'purple'
        }) : imgUnknown);
        $('.egg-container').append(userData.easterEgg.allLeaderboard ? imgTemplate({
            imgName: 'ninja'
        }) : imgUnknown);

        $('.unknown-egg').click(function() {
            swal({
                title: 'Unknown egg',
                text: 'Good luck in finding the hidden egg!',
                imageUrl: this.src,
                confirmButtonColor: '#E9E9E9'
            });
        });
        $('.red-egg').click(function() {
            swal({
                title: 'Red egg',
                text: 'Finished the puzzle in the game over screen of Follow The Numbers',
                imageUrl: $(this).src,
                confirmButtonColor: '#F00'
            });
        });
        $('.orange-egg').click(function() {
            swal({
                title: 'Orange egg',
                text: 'Discovered Pig King and Wild boar in the game over screen of Mushrooms',
                imageUrl: $(this).src,
                confirmButtonColor: '#FF7F00'
            });
        });
        $('.yellow-egg').click(function() {
            swal({
                title: 'Yellow egg',
                text: 'Finished the puzzle in the game over screen of Spot The Special One',
                imageUrl: $(this).src,
                confirmButtonColor: '#FF0'
            });
        });
        $('.green-egg').click(function() {
            swal({
                title: 'Green egg',
                text: 'Clicked on the calculator link in Squirrel And Acorn',
                imageUrl: $(this).src,
                confirmButtonColor: '#0F0'
            });
        });
        $('.blue-egg').click(function() {
            swal({
                title: 'Blue egg',
                text: 'Played all games at least once',
                imageUrl: $(this).src,
                confirmButtonColor: '#00F'
            });
        });
        $('.purple-egg').click(function() {
            swal({
                title: 'Purple egg',
                text: 'Finished the puzzle in the game over screen of Find The Word',
                imageUrl: $(this).src,
                confirmButtonColor: '#7F00FF'
            });
        });
        $('.ninja-egg').click(function() {
            swal({
                title: 'Ninja egg',
                text: 'Visited leaderboard screen for all games',
                imageUrl: $(this).src,
                confirmButtonColor: '#000'
            });
        });
    };

    this.checkEggs = function() {
        if (!userData || !userData.easterEgg || userData.collectAll) {
            return;
        }

        if (_.every(userData.easterEgg)) {
            var postingInProgress = false;
            swal({
                title: 'Congratulations!',
                text: 'You have collected all the eggs!\nWrite your name here!',
                imageUrl: 'images/love.png'
            }, function(playerName) {
                if (playerName == "") {
                    swal.showInputError("You need to write something! A nickname is fine too!");
                    return false;
                }

                if (postingInProgress) {
                    return false;
                } else {
                    postingInProgress = true;
                    $.ajax({
                        method: "POST",
                        url: 'http://weiseng.redairship.com/leaderboard/api/1/highscore.json',
                        contentType: "application/json",
                        data: JSON.stringify({
                            game_id: 8,
                            username: playerName,
                            score: 1
                        })
                    }).success(function(data) {
                        swal("Congratulations!", "You are the " + data.rank_text + " one to collect all the eggs!", "success");
                        userData.collectAll = true;
                        self.saveData(userData);
                    }).fail(function() {
                        swal("Oops...", "Something went wrong!", "error");
                    });
                }
            });
        }
    };

    // Local storage
    this.saveData = function(userData) {
        if (window.localStorage) {
            window.localStorage.setItem('data', btoa(encodeURIComponent(JSON.stringify(userData))));
        }
    };

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
            collectAll: false,
            version: VERSION_NUMBER
        };
        return data;
    };
};

$(function() {
    XMing.EggCollection.init();
});
