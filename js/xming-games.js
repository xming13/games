var XMing = XMing || {};

XMing.Games = new function() {
    var xming_preload_images = [];

    this.preloadImages = function() {
        for (var i = 0; i < 10; i++) {
            xming_preload_images[i] = new Image();
        }

        xming_preload_images[0].src = "https://xming13.github.io/games/images/icons/icon-easter-bunnies.png";
        xming_preload_images[1].src = "https://xming13.github.io/games/images/icons/icon-easter-bunnies-hover.png";
        xming_preload_images[2].src = "https://xming13.github.io/games/images/icons/icon-catch-a-falling-star.png";
        xming_preload_images[3].src = "https://xming13.github.io/games/images/icons/icon-catch-a-falling-star-hover.png";
        xming_preload_images[4].src = "https://xming13.github.io/games/images/icons/icon-spot-the-special-one.png";
        xming_preload_images[5].src = "https://xming13.github.io/games/images/icons/icon-spot-the-special-one-hover.png";
        xming_preload_images[6].src = "https://xming13.github.io/games/images/icons/icon-mushrooms.png";
        xming_preload_images[7].src = "https://xming13.github.io/games/images/icons/icon-mushrooms-hover.png";
        xming_preload_images[8].src = "https://xming13.github.io/games/images/icons/icon-find-the-word.png";
        xming_preload_images[9].src = "https://xming13.github.io/games/images/icons/icon-find-the-word-hover.png";
    };

    this.appendGameListHtml = function() {
        var container = document.getElementById("container");
        if (container) {
            var div = document.createElement("div");
            div.className = "xming-games clearfix";

            var aFallingStar = document.createElement("a");
            aFallingStar.className = "icon-catch-a-falling-star icon-game";
            aFallingStar.setAttribute("href", "https://xming13.github.io/catch-a-falling-star");
            aFallingStar.setAttribute("data-info", "Catch a Falling Star");

            var aFindTheWord = document.createElement("a");
            aFindTheWord.className = "icon-find-the-word icon-game";
            aFindTheWord.setAttribute("href", "https://xming13.github.io/find-the-word");
            aFindTheWord.setAttribute("data-info", "Find The Word");

            var aEasterBunnies = document.createElement("a");
            aEasterBunnies.className = "icon-easter-bunnies icon-game";
            aEasterBunnies.setAttribute("href", "https://xming13.github.io/easter-bunnies");
            aEasterBunnies.setAttribute("data-info", "Easter Bunnies");

            var aSpotTheSpecialOne = document.createElement("a");
            aSpotTheSpecialOne.className = "icon-spot-the-special-one icon-game icon-left";
            aSpotTheSpecialOne.setAttribute("href", "https://xming13.github.io/spot-the-special-one");
            aSpotTheSpecialOne.setAttribute("data-info", "Spot The Special One");

            var aMushrooms = document.createElement("a");
            aMushrooms.className = "icon-mushrooms icon-game icon-left";
            aMushrooms.setAttribute("href", "https://xming13.github.io/mushrooms");
            aMushrooms.setAttribute("data-info", "Mushrooms");

            div.appendChild(aFallingStar);
            div.appendChild(aFindTheWord);
            div.appendChild(aEasterBunnies);
            div.appendChild(aSpotTheSpecialOne);
            div.appendChild(aMushrooms);
            container.appendChild(div);
        }
    };
};

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

addLoadEvent(function() {
    XMing.preloadImages();
    XMing.appendGameListHtml();
});